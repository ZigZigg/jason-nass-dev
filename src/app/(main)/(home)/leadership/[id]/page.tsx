import { mockLeadershipData } from '@/app/components/Modules/Home/Leadership/mockData';
import MainStrategicPlanning from '@/app/components/Modules/StrategicPlanning/Main';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

interface LeadershipDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const LeadershipDetailPage = async ({ params }: LeadershipDetailPageProps) => {
  // Check authentication on server side
  const session = await getServerSession(authOptions);
  
  const { id } = await params;
  const pageId = Number(id);
  const pageData = mockLeadershipData[pageId - 1]; // Convert to 0-based index

  if (!pageData) {
    notFound();
  }
  if (!session) {
    redirect('/login');
  }
  return (
    <div className="mx-auto max-w-full md:max-w-[720px] xl:max-w-[1280px] flex flex-col">
      <div
        className={`flex flex-col md:flex-row h-auto md:h-[70px] flex w-full px-[16px] md:px-[0px] bg-[#fff] items-start md:items-center justify-between w-full gap-[22px]'
    }`}
      >
        <Link href="/dashboard" className="hidden md:flex items-center gap-1 md:mb-0">
          <Image src="/images/icons/arrow-back-grey.svg" alt="arrow-back" width={24} height={24} />
          <span  className="font-roboto text-[14px] text-[#212B36] hover:underline">
            Back to Dashboard
          </span>
        </Link>
        {pageData.heading && (
          <div className="flex items-center justify-start">
            <span
              style={{ fontFamily: 'sans-serif' }}
              className="text-[16px] md:text-[18px] lg:text-[22px] md:max-w-[330px] lg:max-w-[700px] font-[200] text-[#1d1d1f] uppercase text-start md:text-end leading-[24px] mb-[18px] md:mb-0"
            >
              {pageData.heading}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-[80px] md:gap-[24px] xl:gap-[80px] pb-[72px] md:pb-[64px] md:pb-[0px] md:border-b border-[#D0D5DD]">
        <MainStrategicPlanning data={pageData} />
      </div>
    </div>
  );
};

export default LeadershipDetailPage;
