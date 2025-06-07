import Image from 'next/image';
import React from 'react';
import ListToolkit from './ListToolkit';

const LeadershipToolkit = () => {
  return (
    <section id="leadership-toolkit" className="bg-[#f7f7f7] py-[14px]">
      <div
        id="leadership-toolkit-intro"
        className="mx-auto max-w-full md:max-w-[720px] xl:max-w-[1280px] px-[16px] md:px-[0px]"
      >
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-row items-center justify-between w-[324px]">
            <Image
              src="/images/logo-main-02.webp"
              alt="Leadership Toolkit Logo"
              width={88}
              height={88}
              className="w-[88px] h-[88px]"
            />
            <Image
              src="/images/logo-black.webp"
              alt="Leadership Toolkit Logo"
              width={188}
              height={74}
              className="w-[188px] h-[74px]"
            />
          </div>
          {/* Main Title */}
          <div className="text-center  mt-[24px] md:mt-[18px]">
            <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-6 font-roboto">
              EXECUTIVE LEADERSHIP TOOLKIT
              <br />
              <span className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl">
                FOR SUPERINTENDENTS
              </span>
            </h1>

            {/* Divider Line */}
            <div className="w-32 lg:w-[436px] h-1 bg-[#a28231] mx-auto mb-8"></div>
          </div>

          {/* Content Paragraphs */}
          <div className="mx-auto text-left space-y-6 mb-4">
            <p className="text-[18px] sm:text-xl lg:text-2xl text-gray-700 leading-relaxed !mb-[18px]">
              The National Association of School Superintendents and JASON Learning are partnering
              to create meaningful leadership learning experience and library of best practices for
              America’s top educational leaders.
            </p>

            <p className="text-[18px] sm:text-xl lg:text-2xl text-gray-700 leading-relaxed !mb-[18px]">
              This project provides applied research by examining real world success stories shared
              by practicing superintendents that explore successful strategies for dealing with the
              challenges prevalent in the world of education today.
            </p>

            <p className="text-[18px] sm:text-xl lg:text-2xl text-gray-700 leading-relaxed !mb-[18px]">
              Each comprehensive NASS/JASON Leadership curriculum includes a video narrative about
              the superintendent, a video case study of a district solution, a monograph providing
              details, and select print and digital materials, which serve as shared artifacts.
            </p>
          </div>

          {/* Sponsored By */}
          <div className="text-center mb-4">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 italic font-light">
              Sponsored by: TBD
            </p>
          </div>

          {/* Color Circles */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[72px] lg:h-[72px] bg-[#f68e25] rounded-full"></div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[72px] lg:h-[72px] bg-[#6699c1] rounded-full"></div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[72px] lg:h-[72px] bg-[#1aa790] rounded-full"></div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[72px] lg:h-[72px] bg-[#f26222] rounded-full"></div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[72px] lg:h-[72px] bg-[#00abbd] rounded-full"></div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[72px] lg:h-[72px] bg-[#022f5b] rounded-full"></div>
          </div>
        </div>
      </div>
      <ListToolkit />
    </section>
  );
};

export default LeadershipToolkit;
