'use client';

import BaseButton from '@/app/atomics/button/BaseButton';
import BaseInput from '@/app/atomics/input/BaseInput';
import { Form, message, Checkbox, Divider } from 'antd';
import { signIn, useSession } from 'next-auth/react';
// import { useDispatch } from "react-redux";
import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import NotificationContext from '@/app/context/NotificationContext';
import { IconType } from 'antd/es/notification/interface';
import { useUpdateStyle } from '@/app/hooks/useUpdateStyle';
import Image from 'next/image';

export default function SignInMain() {
  const { api } = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { status } = useSession();
  
  useUpdateStyle();
  
  useEffect(() => {
    // Load saved email if exists
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      form.setFieldsValue({ email: savedEmail, remember: true });
    }
  }, [form]);

  useEffect(() => {
    if(status === 'authenticated'){
      setTimeout(() => {
        setIsLoading(false)
        window.location.href = '/dashboard';
      }, 1000);
    }
  }, [status]);

  const onNotification = (description: string, type: IconType = 'error') => {
    api!.open({
      message: '',
      description,
      duration: 2,
      closeIcon: false,
      type: type,
    });
  };

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      // Save or remove email based on remember choice
      if (values.remember) {
        localStorage.setItem('rememberedEmail', values.email.trim());
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      console.log("🚀 ~ onFinish ~ values:", values)
      // Use custom Cognito signin API
      const response = await fetch('/api/auth/cognito-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email.trim(),
          password: values.password,
        }),
      });

      const result = await response.json();
      console.log("🚀 ~ onFinish ~ result:", result)

      if (!response.ok) {
        throw new Error(result.error || 'Authentication failed');
      }

      if (result.success && result.tokens) {
        // Create NextAuth session using credentials provider with Cognito tokens
        const authResult = await signIn('login', {
          redirect: false,
          email: values.email.trim(),
          cognitoTokens: JSON.stringify(result.tokens),
        });

        if (authResult?.error) {
          throw new Error(authResult.error);
        }

        message.success('Login successful!');
        // Navigation will be handled by useEffect when status changes to 'authenticated'
      } else if (result.challenge) {
        // Handle challenges like MFA, password reset, etc.
        onNotification(`Additional verification required: ${result.challenge}`, 'warning');
      }
    } catch (error: any) {
      console.log('Login error:', error.message);
      onNotification(error.message || 'An error occurred. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      setIsLoading(true);
      
      // Get Microsoft OAuth URL from our API
      const response = await fetch('/api/auth/microsoft-oauth');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get Microsoft OAuth URL');
      }
      
      // Redirect directly to Microsoft OAuth
      window.location.href = data.authUrl;
      
    } catch (error: any) {
      console.error('Microsoft login error:', error);
      onNotification('Microsoft login failed. Please try again.', 'error');
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full h-auto md:h-[100vh] landscape:max-lg:h-[auto] flex flex-col align-center justify-center items-center px-[20px] landscape:max-lg:py-[24px] md:px-[0px] bg-[#F4F9FF] pb-[40px] md:pb-[0px]`}
    >
      <div className="flex flex-col justify-center items-center w-full h-fit md:w-[420px] p-[20px] md:p-[40px] bg-white rounded-[16px]">
        <Form
          form={form}
          name="login"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          className="w-full auth-form"
        >
          <p className="text-black text-[32px] font-[700] text-center leading-[130%] font-oswald">
            LOG IN
          </p>
          <Form.Item
            style={{ marginTop: '16px', marginBottom: '16px' }}
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();

                  // Trim spaces from start and end before checking
                  const trimmedEmail = value.trim();
                  if(trimmedEmail.length === 0) {
                    return Promise.reject('Please input your email!');
                  }
                  // Check if there are any spaces in the middle
                  if (trimmedEmail.includes(' ')) {
                    return Promise.reject('The input is not valid email!');
                  }

                  // Validate as standard email
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (emailRegex.test(trimmedEmail)) {
                    return Promise.resolve();
                  }

                  return Promise.reject('The input is not valid email!');
                },
              },
            ]}
          >
            <BaseInput placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            style={{ marginTop: '16px', marginBottom: '16px' }}
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                message:
                  'Password must be at least 6 characters, contain at least one uppercase and one lowercase letter!',
              },
            ]}
          >
            <BaseInput type="password" placeholder="Enter your password" />
          </Form.Item>

          <div className="flex justify-between items-center w-full mb-[16px]">
            <Form.Item
              name="remember"
              className="border border-red"
              valuePropName="checked"
              noStyle
            >
              <Checkbox className="custom-checkbox !text-[#637381]">Remember me</Checkbox>
            </Form.Item>
            <Link className="font-[600] !text-[#205A93] text-[16px]!" href="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <Form.Item style={{ marginBottom: '0px' }}>
            <BaseButton
              loading={isLoading}
              customType="primaryActive"
              type="default"
              htmlType="submit"
              block
              className="!bg-[#212B36]"
            >
              <span className="font-oswald !text-[#fff]">LOG IN</span>
            </BaseButton>
          </Form.Item>
        </Form>

        <Divider className="!my-6">
          <span className="text-gray-500 text-sm">OR</span>
        </Divider>

        <BaseButton
          onClick={handleMicrosoftLogin}
          loading={isLoading}
          type="default"
          block
          className="!bg-white !border-gray-300 hover:!bg-gray-50 !h-12 flex items-center justify-center gap-3"
        >
          <Image
            src="/images/icons/microsoft.svg"
            alt="Microsoft"
            width={20}
            height={20}
          />
          <span className="text-gray-700 font-medium">Continue with Microsoft</span>
        </BaseButton>
      </div>
      <div className="mt-[24px] flex justify-center items-center">
        <span className="text-[16px]">Don&apos;t have an account?</span>
        <Link
          style={{ textDecoration: 'underline' }}
          className="mx-[5px] text-[16px]! !text-[#11304E]"
          href="/signup"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
