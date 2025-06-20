'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';

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

interface VideoSectionProps {
  videos: Video[];
  isKeyTopic?: boolean;
}

// Media component for individual video/image
const MediaItem = ({ 
  video, 
  isActive = true, 
  shouldLoad = true 
}: { 
  video: Video; 
  isActive?: boolean; 
  shouldLoad?: boolean; 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause video when slide becomes inactive
  React.useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive]);

  return (
    <div className="w-full aspect-video relative">
      {video.url && shouldLoad ? (
        <video
          ref={videoRef}
          className="w-full h-full rounded-t-md"
          poster={video.thumbnail}
          controls
          playsInline
          webkit-playsinline="true"
          src={video.url}
        />
      ) : (
        <Image src={video.thumbnail} alt={video.title} fill className="object-cover rounded-t-md" />
      )}
    </div>
  );
};

// Content component for video information
const VideoContent = ({ video, isKeyTopic = false }: { video: Video; isKeyTopic?: boolean }) => (
  <div className="flex flex-col pt-[24px] pb-6">
    <div className="flex justify-between items-start gap-[20px]">
      <h4 className="text-[24px] font-bold m-0 text-[#212B36]">{video.title}</h4>
      <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
        <Image
          src="/images/icons/heart.svg"
          alt="Heart"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      </button>
    </div>

    <div className="border-t border-[#D0D5DD] border-opacity-50 my-2"></div>

    <div>
      {!isKeyTopic && video.quote && (
        <p className="text-base text-[#637381] mb-2">&ldquo;{video.quote}&rdquo;</p>
      )}
      {isKeyTopic && video.description && (
        <p className="text-base text-[#637381]">
          {video.description}
          <br />
          {video.bulletPoints?.map((point, index) => (
            <span key={index} className="block pl-6 mt-1">
              • {point}
            </span>
          ))}
        </p>
      )}
      {video.showDetail && (
        <span className="text-sm text-[#0F72F3] cursor-pointer underline">Show Detail</span>
      )}
    </div>
  </div>
);

// Video Section component (handles single video or carousel for media only)
const VideoSection = ({ videos, isKeyTopic = false }: VideoSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [loadedVideos, setLoadedVideos] = useState(new Set([0])); // Start with first video loaded
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const currentVideo = videos[activeIndex] || videos[0];

  // Load video when it becomes active or adjacent (preload next/prev)
  const handleSlideChange = (swiper: SwiperType) => {
    const newActiveIndex = swiper.activeIndex;
    setActiveIndex(newActiveIndex);
    
    // Load current, previous, and next videos for smooth navigation
    const toLoad = new Set(loadedVideos);
    toLoad.add(newActiveIndex);
    if (newActiveIndex > 0) toLoad.add(newActiveIndex - 1);
    if (newActiveIndex < videos.length - 1) toLoad.add(newActiveIndex + 1);
    
    setLoadedVideos(toLoad);
  };

  return (
    <div className="bg-white rounded-md overflow-hidden">
      <div className="relative">
        {/* Media Container - Single or Carousel */}
        {videos.length <= 1 ? (
          // Single video/image - always load immediately
          <MediaItem video={videos[0]} isActive={true} shouldLoad={true} />
        ) : (
          // Multiple videos - carousel with lazy loading
          <>
            <div className="relative w-full overflow-hidden">
              <Swiper
                modules={[]}
                spaceBetween={0}
                slidesPerView={1}
                onSlideChange={handleSlideChange}
                onSwiper={(swiperInstance) => {
                  setSwiper(swiperInstance);
                }}
                className="media-carousel !w-full"
                style={{ width: '100%' }}
              >
                {videos.map((video, index) => (
                  <SwiperSlide key={video.id}>
                    <MediaItem 
                      video={video} 
                      isActive={index === activeIndex} 
                      shouldLoad={loadedVideos.has(index)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <button
                ref={prevRef}
                onClick={() => swiper?.slidePrev()}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 w-10 h-10 bg-white/90 hover:bg-white rounded-full hidden md:flex items-center justify-center shadow-lg transition-all duration-200 pointer-events-auto cursor-pointer "
                aria-label="Previous video"
                style={{ zIndex: 50 }}
              >
                <Image
                  src="/images/icons/arrow-left.svg"
                  alt="Previous"
                  width={20}
                  height={20}
                  className="w-5 h-5 pointer-events-none"
                />
              </button>

              <button
                ref={nextRef}
                onClick={() => swiper?.slideNext()}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 w-10 h-10 bg-white/90 hover:bg-white rounded-full hidden md:flex items-center justify-center shadow-lg transition-all duration-200 pointer-events-auto cursor-pointer"
                aria-label="Next video"
                style={{ zIndex: 50 }}
              >
                <Image
                  src="/images/icons/arrow-right.svg"
                  alt="Next"
                  width={20}
                  height={20}
                  className="w-5 h-5 pointer-events-none"
                />
              </button>
            </div>

            {/* Custom Pagination Dots - Outside Swiper */}
            <div className="flex justify-center items-center gap-4 mt-4">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiper?.slideTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === activeIndex
                      ? 'bg-[#205A93] w-6' // Active dot - longer and blue
                      : 'bg-gray-300 hover:bg-gray-400' // Inactive dot - gray with hover
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Content Section - Updates based on active slide */}
        <VideoContent video={currentVideo} isKeyTopic={isKeyTopic} />
      </div>
    </div>
  );
};

export default VideoSection; 