'use client';

import BaseButton from '@/app/atomics/button/BaseButton';
import { Form } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function ResetNewPasswordSuccess() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = async () => {

    router.push('/login');
  };


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
          <Image src="/images/icons/check-circle.svg" alt="email-check" width={24} height={24} />
        </div>
      </div>
      <p className="uppercase mb-[16px] text-black text-[32px] font-[700] text-center leading-[130%] font-oswald">
      password reset
      succesfully
      </p>
      <p className="w-full text-[16px] text-[#475467] text-center font-[400] font-inter">{`Your password has been successfully reset. Click below to log in magically.`}</p>
      <Form.Item className="!mb-0 !mt-[32px]">
        <BaseButton
          customType="primaryActive"
          type="default"
          htmlType="button"
          block
          className="!bg-[#212B36]"
          onClick={onFinish}
        >
          <span className="font-oswald !text-[#fff]">CONTINUE</span>
        </BaseButton>
      </Form.Item>

    </Form>
  );
}
