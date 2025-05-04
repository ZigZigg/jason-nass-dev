'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Spin } from 'antd';
import { PlayCircleFilled } from '@ant-design/icons';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail: string;
}

const VideoPlayer = ({ videoUrl, thumbnail }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const thumbnailUrl = thumbnail



  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        setShowThumbnail(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      const handleLoadStart = () => {
        setIsLoading(true);
      };

      const handleCanPlay = () => {
        setIsLoading(false);
      };

      const handlePlay = () => {
        setShowThumbnail(false);
      };

      videoElement.addEventListener('loadstart', handleLoadStart);
      videoElement.addEventListener('canplay', handleCanPlay);
      videoElement.addEventListener('play', handlePlay);

      return () => {
        videoElement.removeEventListener('loadstart', handleLoadStart);
        videoElement.removeEventListener('canplay', handleCanPlay);
        videoElement.removeEventListener('play', handlePlay);
      };
    }
  }, []);

  return (
        <div className="relative w-full aspect-video rounded-[4px] overflow-hidden">
          {showThumbnail && thumbnailUrl && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center bg-black"
              onClick={!isLoading ? handlePlayPause : undefined}
              style={!isLoading ? { cursor: 'pointer' } : undefined}
            >
              <Image
                src={thumbnailUrl}
                alt="Video thumbnail"
                layout="fill"
                objectFit="contain"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {isLoading ? (
                  <Spin size="large" />
                ) : (
                  <PlayCircleFilled className="text-white text-6xl opacity-80 hover:opacity-100 transition-opacity pointer-events-none" />
                )}
              </div>
            </div>
          )}
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full"
            onClick={handlePlayPause}
            controls
            preload="auto"
          />
        </div>
  );
};

export default VideoPlayer;
