'use client';
import { Video } from '@/app/types/leadership';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';

// Define file type for articles
type FileType = 'PDF' | 'JPG' | 'DOC';

// File information interface
interface FileInfo {
  name: string;
  size: string;
  path: string;
  type: FileType;
  color?: string;
}

// Article interface
interface Article {
  id: number;
  title: string;
  description: string;
  imagePath: string;
  file: FileInfo;
  videos?: Video[];
}

// Resource Articles Data interface
interface ResourceArticlesData {
  title: string;
  subTitle?: string;
  articles: Article[];
}

interface Props {
  data: ResourceArticlesData;
}

// Document icon component
const DocumentIcon: React.FC<{ fileType: 'PDF' | 'JPG' | 'DOC' }> = ({ fileType }) => {
  return (
    <Image
      src={`/images/icons/${fileType.toLowerCase()}-file-type.svg`}
      alt={fileType}
      width={40}
      height={40}
    />
  );
};

// Download icon component
const DownloadIcon: React.FC = () => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.0003 13.3327L10.0003 3.33268M10.0003 13.3327L6.66699 9.99935M10.0003 13.3327L13.3337 9.99935M3.33366 16.666H16.667"
        stroke="#344054"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// File download component
const FileDownload: React.FC<{ file: FileInfo }> = ({ file }) => {
  return (
    <a href={file.path} download className="inline-block w-full">
      <div className="flex items-center gap-2 p-[10px_14px] bg-white border border-[#EAECF0] rounded-tr-lg rounded-br-lg rounded-bl-lg justify-between">
        <div className="flex items-center gap-2 md:w-[80%]">
          <div className="relative w-8 h-8">
            <DocumentIcon fileType={file.type} />
          </div>

          <div className="flex flex-col">
            <span className="text-sm md:text-[10px] xl:text-sm font-medium text-[#344054] whitespace-nowrap overflow-hidden text-ellipsis">
              {file.name}
            </span>
            <span className="text-sm text-[#475467]">{file.size}</span>
          </div>
        </div>

        <div className="ml-2 flex items-center justify-center">
          <DownloadIcon />
        </div>
      </div>
    </a>
  );
};

// Media component for individual video/image
const MediaItem: React.FC<{ video?: Video; imagePath?: string; title: string; isActive?: boolean }> = ({ 
  video, 
  imagePath, 
  title, 
  isActive = true 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause video when slide becomes inactive
  React.useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  return (
    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
      {video?.url ? (
        <video
          ref={videoRef}
          className="w-full h-full rounded-lg"
          poster={video.thumbnail}
          controls
          src={video.url}
        />
      ) : (
        <Image
          src={video?.thumbnail || imagePath || ''}
          alt={title}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 320px"
        />
      )}
    </div>
  );
};

// Article component
const ArticleItem: React.FC<{ article: Article }> = ({ article }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

  const hasVideos = article.videos && article.videos.length > 0;
  const hasMultipleVideos = hasVideos && article.videos!.length > 1;

  const renderMedia = () => {
    if (!hasVideos) {
      // Show static image
      return <MediaItem imagePath={article.imagePath} title={article.title} />;
    }

    if (!hasMultipleVideos) {
      // Show single video
      return <MediaItem video={article.videos![0]} title={article.title} />;
    }

    // Show carousel for multiple videos
    return (
      <div className="relative">
        <Swiper
          modules={[]}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiperInstance) => {
            setSwiper(swiperInstance);
          }}
          className="article-media-carousel !w-full"
          style={{ width: '100%' }}
        >
          {article.videos!.map((video, index) => (
            <SwiperSlide key={video.id}>
              <MediaItem 
                video={video} 
                title={article.title} 
                isActive={index === activeIndex} 
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Dots - Outside Swiper */}
        <div className="flex justify-center items-center gap-2 mt-3">
          {article.videos!.map((_, index) => (
            <button
              key={index}
              onClick={() => swiper?.slideTo(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === activeIndex
                  ? 'bg-[#205A93] w-6' // Active dot - longer and blue
                  : 'bg-gray-300 hover:bg-gray-400' // Inactive dot - gray with hover
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {renderMedia()}

      <div className="flex flex-col gap-3">
        <h4 className="text-[24px] md:text-[18px] xl:text-[24px] font-bold text-[#11304E]">
          {article.title}
        </h4>

        <p className="text-base text-[#637381]">{article.description}</p>

        <FileDownload file={article.file} />
      </div>
    </div>
  );
};

const ResourceArticles: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col px-[16px] md:px-[0px] w-full md:w-[220px] xl:w-[320px] flex-shrink-0 gap-6">
      <h3 className="text-[32px] uppercase text-[#205A93] font-semibold">{data.title}</h3>
      {data.subTitle && <p className="text-base text-[#637381]">{data.subTitle}</p>}
      <div className="flex flex-col gap-10">
        {data.articles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ResourceArticles;
