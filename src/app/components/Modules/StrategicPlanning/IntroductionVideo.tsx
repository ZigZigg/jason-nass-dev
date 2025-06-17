import React from 'react';
import Image from 'next/image';
import VideoSection from './VideoSection';
import StrategicPlanningSponsors from './Sponsors';

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
    videos: Video[];
  };
  monograph: {
    title: string;
    description: string;
    bulletPoints: string[];
    downloadFile: FileInfo;
    isShowDetail?: boolean;
  };
  sponsorsSlice: number;
}

interface Props {
  data: IntroductionVideoData;
}

const IntroductionVideo = ({ data }: Props) => {
  return (
    <div className="flex-1 px-[16px] md:px-[0px] md:w-[60%] xl:max-w-none xl:flex-1">
      {/* Introduction Videos Section */}
      <h3 className="text-[32px] uppercase text-[#205A93] mb-6 font-semibold">{data.title}</h3>
      <VideoSection videos={data.videos} />

      {/* Key Topic Videos Section */}
      <h3 className="text-[32px] uppercase text-[#205A93] mb-6 font-semibold mt-8">
        {data.keyTopicVideo.title}
      </h3>
      <VideoSection videos={data.keyTopicVideo.videos} isKeyTopic={true} />

      {/* Monograph Section */}
      <h3 className="text-[32px] uppercase text-[#205A93] mb-6 font-semibold mt-8">
        {data.monograph.title}
      </h3>

      <div className="flex flex-col gap-4">
        <p className="text-base text-[#637381]">
          {data.monograph.description}
          <br />
          {data.monograph.bulletPoints.map((point, index) => (
            <span key={index} className="block pl-6 mt-1">
              • {point}
            </span>
          ))}
        </p>

        <a
          href={data.monograph.downloadFile.path}
          download
          className="inline-block w-full md:w-fit"
        >
          <div className="flex items-center gap-2 p-[10px_14px] bg-white border border-[#EAECF0] rounded-tr-lg rounded-br-lg rounded-bl-lg justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                {/* Document Icon */}
                <Image
                  src={`/images/icons/${data.monograph.downloadFile.type.toLowerCase()}-file-type.svg`}
                  alt={data.monograph.downloadFile.type}
                  width={40}
                  height={40}
                />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#344054]">
                  {data.monograph.downloadFile.name}
                </span>
                <span className="text-sm text-[#475467]">{data.monograph.downloadFile.size}</span>
              </div>
            </div>

            <div className="ml-2 flex items-center justify-center">
              <Image src="/images/icons/download.svg" alt="Download" width={20} height={20} />
            </div>
          </div>
        </a>
      </div>
      <StrategicPlanningSponsors slice={data.sponsorsSlice} />
    </div>
  );
};

export default IntroductionVideo;
