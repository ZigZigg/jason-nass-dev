'use client';

import BaseButton from '@/app/atomics/button/BaseButton';
import { Form } from 'antd';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Props {
  email: string;
}
export default function CheckEmail({ email }: Props) {
  const [countdown, setCountdown] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [form] = Form.useForm();

  const onFinish = async () => {
    // Open email client
    window.location.href = "mailto:";
  };

  const onResend = () => {
    if (countdown > 0) return;
    
    // Set countdown to 5 seconds
    setCountdown(5);
    
    // Start countdown timer
    timer.current = setInterval(() => {
      setCountdown(prevCount => {
        if (prevCount <= 1) {
          // Clear interval when countdown reaches 0
          if (timer.current) {
            clearInterval(timer.current);
          }
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    // Resend email logic here
    // TODO: Implement actual email resend functionality
  };

  // Clear timer on component unmount
  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

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
      <div className="w-full flex justify-center items-center">
        <div className="w-[56px] h-[56px] rounded-[12px] border border-[#EAECF0] mb-[16px] flex justify-center items-center">
          <Image src="/images/icons/mail.svg" alt="email-check" width={24} height={24} />
        </div>
      </div>
      <p className="mb-[16px] text-black text-[32px] font-[700] text-center leading-[130%] font-oswald">
        CHECK YOUR EMAIL
      </p>
      <p className="w-full text-[16px] text-[#475467] text-center font-[400] font-inter">{`We sent a password reset link to ${email}`}</p>
      <Form.Item className="!mb-0 !mt-[32px]">
        <BaseButton
          customType="primaryActive"
          type="default"
          htmlType="button"
          onClick={() => window.open('mailto:', '_blank')}
          block
          className="!bg-[#212B36]"
        >
          <span className="font-oswald !text-[#fff]">OPEN EMAIL APP</span>
        </BaseButton>
      </Form.Item>
      <div className="mt-[32px] flex justify-center items-center">
        <span className="text-[14px] text-[#475467]">Didn&apos;t receive the email?</span>
        <span 
          onClick={onResend} 
          className={`mx-[5px] text-[14px] ${countdown > 0 ? '!text-[#475467]' : 'text-[#205A93]'} font-[700] underline ${countdown > 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {`Click to resend ${countdown > 0 ? `(${countdown}s)` : ''}`}
        </span>
      </div>
    </Form>
  );
}
