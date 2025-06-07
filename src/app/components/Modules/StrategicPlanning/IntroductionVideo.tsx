import React from 'react'
import Image from 'next/image'
import StrategicPlanningSponsors from './Sponsors'

interface FileInfo {
  name: string;
  size: string;
  path: string;
  type: 'PDF' | 'JPG' | 'DOC';
  color?: string;
}

interface Video {
  id: number;
  url: string;
  thumbnail: string;
  title: string;
  quote?: string;
  description?: string;
  bulletPoints?: string[];
  showDetail?: boolean;
}

interface IntroductionVideoData {
  title: string;
  videos: Video[];
  keyTopicVideo: {
    title: string;
    video: Video;
  };
  monograph: {
    title: string;
    description: string;
    bulletPoints: string[];
    downloadFile: FileInfo;
  };
  sponsorsSlice: number;
}

interface Props {
  data: IntroductionVideoData;
}

const IntroductionVideo = ({ data }: Props) => {
  const mainVideo = data.videos[0]; // Get the first video for now

  return (
    <div className="flex-1 px-[16px] md:px-[0px] md:w-[60%] xl:w-auto">
      <h3 className="text-[32px] uppercase text-[#205A93] mb-6 font-semibold">
        {data.title}
      </h3>
      
      <div className="bg-white rounded-md overflow-hidden">
        <div className="relative">
          {/* Video Container */}
          <div className="w-full aspect-video relative">
            {mainVideo.url ? (
              <video 
                className="w-full h-full object-cover rounded-t-md"
                poster={mainVideo.thumbnail}
                controls
                src={mainVideo.url}
              />
            ) : (
              <Image
                src={mainVideo.thumbnail}
                alt={mainVideo.title}
                fill
                className="object-cover rounded-t-md"
              />
            )}
          </div>
          
          {/* Video Content */}
          <div className="flex flex-col pt-[24px] pb-6">
            <div className="flex justify-between items-start gap-[20px]">
              <h4 className="text-[24px] font-bold m-0 text-[#212B36]">
                {mainVideo.title}
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
                &ldquo;{mainVideo.quote}&rdquo;
              </p>
              {mainVideo.showDetail && (
                <span className="text-sm text-[#0F72F3] cursor-pointer underline">
                  Show Detail
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Topic Section */}
      <h3 className="text-[32px] uppercase text-[#205A93] mb-6 font-semibold mt-8">
        {data.keyTopicVideo.title}
      </h3>
      
      <div className="bg-white rounded-md overflow-hidden">
        <div className="relative">
          {/* Video Container */}
          <div className="w-full aspect-video relative">
            {data.keyTopicVideo.video.url ? (
              <video 
                className="w-full h-full object-cover rounded-t-md"
                poster={data.keyTopicVideo.video.thumbnail}
                controls
                src={data.keyTopicVideo.video.url}
              />
            ) : (
              <Image
                src={data.keyTopicVideo.video.thumbnail}
                alt={data.keyTopicVideo.video.title}
                fill
                className="object-cover rounded-t-md"
              />
            )}
          </div>
          
          {/* Video Content */}
          <div className="flex flex-col pt-[24px] pb-6">
            <div className="flex justify-between items-start gap-[20px]">
              <h4 className="text-[24px] font-bold m-0 text-[#212B36]">
                {data.keyTopicVideo.video.title}
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
                {data.keyTopicVideo.video.description}
                <br />
                {data.keyTopicVideo.video.bulletPoints?.map((point, index) => (
                  <span key={index} className="block pl-6 mt-1">• {point}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Monograph Section */}
      <h3 className="text-[32px] uppercase text-[#205A93] mb-6 font-semibold mt-8">
        {data.monograph.title}
      </h3>
      
      <div className="flex flex-col gap-4">
        <p className="text-base text-[#637381]">
          {data.monograph.description}
          <br />
          {data.monograph.bulletPoints.map((point, index) => (
            <span key={index} className="block pl-6 mt-1">• {point}</span>
          ))}
        </p>
        
        <a href={data.monograph.downloadFile.path} download className="inline-block w-full md:w-fit">
          <div className="flex items-center gap-2 p-[10px_14px] bg-white border border-[#EAECF0] rounded-tr-lg rounded-br-lg rounded-bl-lg justify-between md:justify-start">
            <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              {/* Document Icon */}
              <Image src={`/images/icons/${data.monograph.downloadFile.type.toLowerCase()}-file-type.svg`} alt={data.monograph.downloadFile.type} width={40} height={40} />
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#344054]">{data.monograph.downloadFile.name}</span>
              <span className="text-sm text-[#475467]">{data.monograph.downloadFile.size}</span>
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
      <StrategicPlanningSponsors slice={data.sponsorsSlice} />
    </div>
  )
}

export default IntroductionVideo