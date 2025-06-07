import { mockLeadershipData } from '@/app/components/Modules/Home/Leadership/mockData';
import MainStrategicPlanning from '@/app/components/Modules/StrategicPlanning/Main'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'




interface LeadershipDetailPageProps {
  params: Promise<{
    id: string
  }>,
}

const LeadershipDetailPage = async ({ params }: LeadershipDetailPageProps) => {
  const { id } = await params;
  const pageId = parseInt(id);
  const pageData = mockLeadershipData[pageId - 1]; // Convert to 0-based index

  if (!pageData) {
    return <div>Page not found</div>;
  }

  return (
    <div className="mx-auto max-w-full md:max-w-[720px] xl:max-w-[1280px] flex flex-col">
      <div
        className={`hidden md:flex flex-row h-[70px] flex w-full px-[16px] md:px-[0px] bg-[#fff]'
    }`}
      >
        <div className="flex items-center gap-1 md:mb-0">
          <Image src="/images/icons/arrow-back-grey.svg" alt="arrow-back" width={24} height={24} />
          <Link href="/" className="font-roboto text-[14px] text-[#212B36] hover:underline">
            Back to NASS Home Page
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-[80px] md:gap-[24px] xl:gap-[80px] pb-[72px] md:pb-[64px] md:pb-[0px] md:border-b border-[#D0D5DD]">
       <MainStrategicPlanning data={pageData} />
      </div>
    </div>
  )
}

export default LeadershipDetailPage