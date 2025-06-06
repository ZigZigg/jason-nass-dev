'use client';

import BaseButton from '@/app/atomics/button/BaseButton';
import BaseInput from '@/app/atomics/input/BaseInput';
import NotificationContext from '@/app/context/NotificationContext';
import { useUpdateStyle } from '@/app/hooks/useUpdateStyle';
import { Form, message } from 'antd';
import { IconType } from 'antd/es/notification/interface';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

export default function SignUpMain() {
  const { api } = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(false);
  const { update, status } = useSession();
  useUpdateStyle()
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

  useEffect(() => {
    if(status === 'authenticated'){
      setTimeout(() => {
        setIsLoading(false)
        window.location.href = '/dashboard';
      }, 1000);
    }
  }, [status]);

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const trimmedValues = {
        ...values,
        email: values.email.trim(),
        name: values.name.trim(),
      };

      const result = await signIn('signup', {
        redirect: false,
        ...trimmedValues,
      });

      if (result?.error) {
        onNotification(result?.error, 'error');
        setIsLoading(false);
      } else {
        // Update the session to ensure it reflects the latest authentication state
        await update();
        
      }
    } catch (error) {
      console.error('SignUp error:', error);
      message.error('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-auto md:h-[100vh] landscape:max-lg:h-[auto] flex flex-col align-center justify-center items-center px-[20px] landscape:max-lg:py-[24px] md:px-[0px] bg-[#F4F9FF] pb-[40px] md:pb-[0px]">
      <div className="flex flex-col justify-center items-center w-full h-fit md:w-[420px] p-[20px] md:p-[40px] bg-white rounded-[16px]">
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className="w-full auth-form"
        >
          <p className="text-black text-[32px] font-[700] text-center leading-[130%] font-oswald uppercase">SIGN UP</p>
          <Form.Item
            style={{ marginTop: '16px', marginBottom: '16px' }}
            label="Name"
            name="name"
            required={true}
            className='custom-input-label'
            rules={[
              {
                validator: (_, value) => {
                  if (!value || value.trim() === '') {
                    return Promise.reject('Please input your name!');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <BaseInput placeholder='Enter your name' />
          </Form.Item>
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
            <BaseInput placeholder='Enter your email' />
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
            <BaseInput type="password" placeholder='Enter your password' />
          </Form.Item>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            style={{ position: 'absolute' }}
          />
          <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password2"
            style={{ position: 'absolute' }}
          />
          <Form.Item
            style={{ marginTop: '16px', marginBottom: '32px' }}
            label="Confirm password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please input your confirm password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!')
                  );
                },
              }),
            ]}
          >
            <BaseInput type="password" placeholder='Enter your confirm password' />
          </Form.Item>

          <Form.Item style={{ marginBottom: '0px' }}>
            <BaseButton
              customType="primaryActive"
              type="default"
              htmlType="submit"
              block
              className='!bg-[#212B36]'
              loading={isLoading}
            >
              <span className='font-oswald !text-[#fff] uppercase'>
                Sign up
              </span>
            </BaseButton>
          </Form.Item>
        </Form>
      </div>
      <div className="mt-[24px] flex justify-center items-center">
        <span className="text-[16px]">Already have an account?</span>
        <Link style={{ textDecoration: 'underline' }} className="mx-[5px] text-[16px]! !text-[#11304E]" href="/login">
          Log In
        </Link>
      </div>
    </div>
  );
}
