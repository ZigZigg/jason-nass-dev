'use client';

import BaseButton from '@/app/atomics/button/BaseButton';
import BaseInput from '@/app/atomics/input/BaseInput';
import { Form } from 'antd';
// import { useDispatch } from "react-redux";
import { useState } from 'react';
import { useUpdateStyle } from '@/app/hooks/useUpdateStyle';
import ResetNewPasswordSuccess from './Success';

export default function ChangePasswordMain() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [form] = Form.useForm();
  useUpdateStyle();

  // const dispatch = useDispatch();

  const onFinish = async () => {
    setIsSuccess(true);
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
          <p className="uppercase mb-[16px] text-black text-[32px] font-[700] text-center leading-[130%] font-oswald">
          change password
          </p>
          <p className='w-full text-[16px] text-[#475467] text-center font-[400] font-inter'>Your new password must be different to previously used passwords.</p>
          <Form.Item
            style={{ marginTop: '16px', marginBottom: '16px' }}
            label="Current password"
            name="current-password"
            rules={[
              { required: true, message: 'Please input your current password!' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                message:
                  'Password must be at least 6 characters, contain at least one uppercase and one lowercase letter!',
              },
            ]}
          >
            <BaseInput type="password" placeholder='Enter your current password' />
          </Form.Item>
          <Form.Item
            style={{ marginTop: '16px', marginBottom: '16px' }}
            label="New password"
            name="password"
            rules={[
              { required: true, message: 'Please input your new password!' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                message:
                  'Password must be at least 6 characters, contain at least one uppercase and one lowercase letter!',
              },
            ]}
          >
            <BaseInput type="password" placeholder='Enter your new password' />
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


          <Form.Item className='!mb-0 !mt-[32px]'>
            <BaseButton
              customType="primaryActive"
              type="default"
              htmlType="submit"
              block
              className="!bg-[#212B36]"
            >
              <span className="font-oswald !text-[#fff] uppercase">change password</span>
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
        {isSuccess ? <ResetNewPasswordSuccess /> : mainForm()}
      </div>
    </div>
  );
}
