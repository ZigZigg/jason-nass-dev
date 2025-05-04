import React from 'react'
import Image from 'next/image'
import StrategicPlanningSponsors from './Sponsors'

const IntroductionVideo = () => {
  return (
    <div className="flex-1 px-[16px] md:px-[0px] md:w-[60%] xl:w-auto">
      <h3 className="text-[32px] uppercase text-[#205A93] mb-6 font-semibold">
        Introduction Video
      </h3>
      
      <div className="bg-white rounded-md overflow-hidden">
        <div className="relative">
          {/* Video Container */}
          <div className="w-full aspect-video relative">
            
            <video 
              className="w-full h-full object-cover rounded-t-md"
              poster="/images/strategic-planning/video-thumb-01.png"
              controls
              src="https://assetsdev.jason.org/resource_assets/53727/32788/LEVL_VID_FeelingNinja.mp4"
            />
          </div>
          
          {/* Video Content */}
          <div className="flex flex-col pt-[24px] pb-6">
            <div className="flex justify-between items-start gap-[20px]">
              <h4 className="text-[24px] font-bold m-0 text-[#212B36]">
                A 1-minute message from Superintendent John Doe on the importance of strategic planning in school districts.
              </h4>
              <button 
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#667085" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </button>
            </div>
            
            <div className="border-t border-[#D0D5DD] border-opacity-50 my-2"></div>
            
            <div>
              <p className="text-base text-[#637381] mb-2">
                &ldquo;Strategic planning isn&apos;t just about setting goals—it&apos;s about creating a roadmap for meaningful, lasting impact.&rdquo;
              </p>
              <span className="text-sm text-[#0F72F3] cursor-pointer hover:underline">
                Show Detail
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Topic Section */}
      <h3 className="text-[32px] uppercase text-[#205A93] mb-6 font-semibold mt-8">
        VIDEO KEY TOPIC
      </h3>
      
      <div className="bg-white rounded-md overflow-hidden">
        <div className="relative">
          {/* Video Container */}
          <div className="w-full aspect-video relative">
            <video 
              className="w-full h-full object-cover rounded-t-md"
              poster="/images/strategic-planning/video-thumb-02.png"
              controls
              src="https://assetsdev.jason.org/resource_assets/53727/32788/LEVL_VID_FeelingNinja.mp4"
            />
          </div>
          
          {/* Video Content */}
          <div className="flex flex-col pt-[24px] pb-6">
            <div className="flex justify-between items-start gap-[20px]">
              <h4 className="text-[24px] font-bold m-0 text-[#212B36]">
                The Pillars of Strategic Planning
              </h4>
              <button 
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#667085" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </button>
            </div>
            
            <div className="border-t border-[#D0D5DD] border-opacity-50 my-2"></div>
            
            <div>
              <p className="text-base text-[#637381]">
                This deep-dive video explains the essential pillars of an effective strategic plan, including:
                <br />
                <span className="block pl-6 mt-1">• Vision & Mission Alignment</span>
                <span className="block pl-6">• Stakeholder Engagement</span>
                <span className="block pl-6">• Data-Driven Decision Making</span>
                <span className="block pl-6">• Implementation & Accountability</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Monograph Section */}
      <h3 className="text-[32px] uppercase text-[#205A93] mb-6 font-semibold mt-8">
        MONOGRAPH: A SUPERINTENDENT&apos;S APPROACH TO STRATEGIC PLANNING
      </h3>
      
      <div className="flex flex-col gap-4">
        <p className="text-base text-[#637381]">
          Superintendent John Doe outlines a step-by-step approach to developing a successful strategic plan. Key takeaways include:
          <br />
          <span className="block pl-6 mt-1">• Building a shared vision</span>
          <span className="block pl-6">• Defining measurable goals</span>
          <span className="block pl-6">• Using data to drive continuous improvement</span>
          <span className="block pl-6">• Ensuring community and staff buy-in</span>
        </p>
        
        <a href="/files/sample_doc.docx" download className="inline-block w-full md:w-fit">
          <div className="flex items-center gap-2 p-[10px_14px] bg-white border border-[#EAECF0] rounded-tr-lg rounded-br-lg rounded-bl-lg justify-between md:justify-start">
            <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              {/* Document Icon */}
              <Image src="/images/icons/doc-file-type.svg" alt="DOC" width={40} height={40} />
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#344054]">Book recommendations.docx</span>
              <span className="text-sm text-[#475467]">1.2 MB</span>
            </div>
            </div>

            
            <div className="ml-2 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0003 13.3327L10.0003 3.33268M10.0003 13.3327L6.66699 9.99935M10.0003 13.3327L13.3337 9.99935M3.33366 16.666H16.667" stroke="#344054" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </a>
      </div>
      <StrategicPlanningSponsors slice={5} />
    </div>
  )
}

export default IntroductionVideo