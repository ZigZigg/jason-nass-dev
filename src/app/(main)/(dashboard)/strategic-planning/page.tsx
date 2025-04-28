import IntroductionVideo from '@/app/components/Modules/StrategicPlanning/IntroductionVideo'
import ResourceArticles from '@/app/components/Modules/StrategicPlanning/ResourceArticles'
import React from 'react'

const StrategicPlanningPage = () => {
  return (
    <div className='mx-auto max-w-full md:max-w-[720px] xl:max-w-[1280px] flex flex-col md:flex-row gap-[80px] md:gap-[24px] xl:gap-[80px] pb-[72px] md:pb-[64px] md:pb-[0px] md:pt-[72px] md:border-b border-[#D0D5DD]'>
        <IntroductionVideo />
        <ResourceArticles />
    </div>
  )
}

export default StrategicPlanningPage