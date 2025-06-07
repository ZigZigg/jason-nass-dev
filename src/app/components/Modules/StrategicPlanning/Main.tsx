import React from 'react'
import IntroductionVideo from './IntroductionVideo'
import ResourceArticles from './ResourceArticles'
import { StrategicPlanningData } from '@/app/types/leadership'

interface Props {
  data: StrategicPlanningData;
}

const MainStrategicPlanning = ({ data }: Props) => {
  return (
    <>
      <IntroductionVideo data={data.introductionVideo} />
      <ResourceArticles data={data.resourceArticles} />
    </>
  )
}

export default MainStrategicPlanning