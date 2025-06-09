'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Input from 'antd/es/input/Input';
import BaseButton from '@/app/atomics/button/BaseButton';

export default function NotFound() {
  useEffect(() => {
    const actionFooter = document.getElementById('action-footer');
    if (actionFooter) {
      actionFooter.style.backgroundColor = '#F4F9FF';
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F9FF] flex flex-col items-center justify-center px-4 py-16">
      <div className="container mx-auto w-full md:w-[720px] xl:w-[1280px]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 lg:gap-8">
          {/* Left Side Content */}
          <div
            id="not-found-content"
            className="bg-white rounded-2xl p-[24px] md:p-[32px] lg:p-[64px] flex flex-col items-center gap-8 w-full lg:w-auto"
          >
            {/* Content Section */}
            <div className="flex flex-col gap-[24px] md:gap-[52px] items-left">
              {/* Title and Description */}
              <div className="flex flex-col items-left gap-[23px]">
                <h1 className="font-oswald font-semibold text-[40px] md:text-[34px] lg:text-[80px] leading-[1em] uppercase text-left text-[#205A93]">
                  Coming Soon!
                </h1>
                <p className="font-roboto font-normal text-[12px] md:text-[14px] lg:text-[16px] leading-[1.5em] text-[#212B36] text-left max-w-[400px]">
                  Are you ready to get something new from us.
                  <br />
                  Then subscribe the news latter to get latest updates?
                </p>
              </div>

                             {/* Email Input and Button */}
               <div id="not-found-input" className="flex flex-row items-center gap-4 w-full">
                 <Input
                   placeholder="Enter your email"
                   className="!flex-1 !h-[48px] !bg-white !border !border-[#E4E4E4] !rounded-[4px] !px-3 !py-3 font-roboto !text-[12px] md:!text-[14px] lg:!text-[16px] placeholder:text-[12px] md:placeholder:text-[14px] lg:placeholder:text-[16px] !placeholder-[#C8C8C8]"
                 />
                <BaseButton className="!border !border-[#212B36] !bg-[#212B36] !text-[#212B36] !px-2 md:!px-6 !py-2 md:!py-3  !h-[48px]  !rounded-[4px] hover:!bg-[#212B36] hover:!text-white transition-colors">
                  <span className="font-oswald font-medium text-[12px] md:text-[14px] lg:text-[16px] text-white leading-[1.5em] uppercase">
                    NOTIFY ME
                  </span>
                </BaseButton>
              </div>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-end">
            <div className="relative w-full md:w-[320px] lg:w-[600px]">
              <Image
                src="/images/404-image.svg"
                alt="404 Page Not Found"
                width={700}
                height={500}
                quality={100}
                priority
                className="w-full h-auto object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 700px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
