'use client';

import BaseButton from '@/app/atomics/button/BaseButton';
import BaseInput from '@/app/atomics/input/BaseInput';
import { Form, message, Checkbox } from 'antd';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import { useDispatch } from "react-redux";
import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import NotificationContext from '@/app/context/NotificationContext';
import { IconType } from 'antd/es/notification/interface';
import { useUpdateStyle } from '@/app/hooks/useUpdateStyle';

export default function SignInMain() {
  const router = useRouter();
  const { api } = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const { update, status } = useSession();
  console.log("🚀 ~ SignInMain ~ status:", status)

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
        router.push('/dashboard');
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
  // const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const result = await signIn('login', {
        redirect: false,
        ...values,
        email: values.email.trim(), // Trim spaces from the email
      });

      if (result?.error) {
        onNotification(result?.error, 'error');
        setIsLoading(false);
      } else {
        // Save or remove email based on remember choice
        if (values.remember) {
          localStorage.setItem('rememberedEmail', values.email.trim());
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Update the session to ensure it reflects the latest authentication state
        await update();
        
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('An error occurred. Please try again.');
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
