'use client';

import BaseButton from '@/app/atomics/button/BaseButton';
import BaseInput from '@/app/atomics/input/BaseInput';
import { Form } from 'antd';
// import { useDispatch } from "react-redux";
import Link from 'next/link';
import { useState } from 'react';
import { useUpdateStyle } from '@/app/hooks/useUpdateStyle';
import CheckEmail from './CheckEmail';

export default function ForgotPasswordMain() {


  const [emailReset, setEmailReset] = useState('');
  const [form] = Form.useForm();
  useUpdateStyle();

  // const dispatch = useDispatch();

  const onFinish = async (values: any) => {
    setEmailReset(values.email);
  };

  const mainForm = () => {
    return (
        <Form
          form={form}
          name="login"
          initialValues={{ remember: false }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          className="w-full auth-form"
        >
          <p className="mb-[16px] text-black text-[32px] font-[700] text-center leading-[130%] font-oswald">
          FORGOT PASSWORD
          </p>
          <p className='w-full text-[16px] text-[#475467] text-center font-[400] font-inter'>No worries, we’ll send you reset instructions.</p>
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


          <Form.Item className='!mb-0 !mt-[32px]'>
            <BaseButton
              customType="primaryActive"
              type="default"
              htmlType="submit"
              block
              className="!bg-[#212B36]"
            >
              <span className="font-oswald !text-[#fff]">RESET PASSWORD</span>
            </BaseButton>
          </Form.Item>
        </Form>
    )
  }

  return (
    <div
      className={`mt-[56px] md:mt-[0px] w-full h-auto md:h-[100vh] landscape:max-lg:h-[auto] flex flex-col align-center justify-center items-center px-[20px] landscape:max-lg:py-[24px] md:px-[0px] bg-[#F4F9FF] pb-[74px] md:pb-[0px]`}
    >
      <div className="flex flex-col justify-center items-center w-full h-fit md:w-[420px] p-[20px] md:p-[40px] bg-white rounded-[16px]"> 
        { emailReset ? <CheckEmail email={emailReset} /> : mainForm()}
      </div>
      <div className="mt-[24px] flex justify-center items-center">
        <Link
          style={{ textDecoration: 'underline' }}
          className="mx-[5px] text-[16px]!"
          href="/login"
        >
          Back to log in
        </Link>
      </div>
    </div>
  );
}
