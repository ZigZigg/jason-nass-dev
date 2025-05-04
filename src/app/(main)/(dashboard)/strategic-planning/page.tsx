import IntroductionVideo from '@/app/components/Modules/StrategicPlanning/IntroductionVideo';
import ResourceArticles from '@/app/components/Modules/StrategicPlanning/ResourceArticles';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const StrategicPlanningPage = () => {
  return (
    <div className="mx-auto max-w-full md:max-w-[720px] xl:max-w-[1280px] flex flex-col">
      <div
        className={`hidden md:flex flex-row h-[70px] flex w-full px-[16px] md:px-[0px] bg-[#fff]'
    }`}
      >
        <div className="flex items-center gap-1 md:mb-0">
          <Image src="/images/icons/arrow-back-grey.svg" alt="arrow-back" width={24} height={24} />
          <Link href="/" className="font-roboto text-[14px] text-[#212B36] hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-[80px] md:gap-[24px] xl:gap-[80px] pb-[72px] md:pb-[64px] md:pb-[0px] md:border-b border-[#D0D5DD]">
        <IntroductionVideo />
        <ResourceArticles />
      </div>
    </div>
  );
};

export default StrategicPlanningPage;
