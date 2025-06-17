import MainStrategicPlanning from '@/app/components/Modules/StrategicPlanning/Main';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Mock data for Strategic Planning
const strategicPlanningData = {
  introductionVideo: {
    title: 'Introduction Video',
    videos: [
      {
        id: 1,
        url: 'https://assetsdev.jason.org/resource_assets/53727/32788/LEVL_VID_FeelingNinja.mp4',
        thumbnail: '/images/strategic-planning/video-thumb-01.png',
        title: 'A 1-minute message from Superintendent John Doe on the importance of strategic planning in school districts.',
        quote: 'Strategic planning isn\'t just about setting goals—it\'s about creating a roadmap for meaningful, lasting impact.',
        showDetail: true
      }
    ],
    keyTopicVideo: {
      title: 'Video Key Topic',
      videos:[{
        id: 2,
        url: 'https://assetsdev.jason.org/resource_assets/53727/32788/LEVL_VID_FeelingNinja.mp4',
        thumbnail: '/images/strategic-planning/video-thumb-02.png',
        title: 'The Pillars of Strategic Planning',
        description: 'This deep-dive video explains the essential pillars of an effective strategic plan, including:',
        bulletPoints: [
          'Vision & Mission Alignment',
          'Stakeholder Engagement',
          'Data-Driven Decision Making',
          'Implementation & Accountability'
        ]
      }]
    },
    monograph: {
      title: 'Monograph: A Superintendent\'s Approach to Strategic Planning',
      description: 'Superintendent John Doe outlines a step-by-step approach to developing a successful strategic plan. Key takeaways include:',
      bulletPoints: [
        'Building a shared vision',
        'Defining measurable goals',
        'Using data to drive continuous improvement',
        'Ensuring community and staff buy-in'
      ],
      downloadFile: {
        name: 'Book recommendation.docx',
        size: '1.2 MB',
        path: '/files/Book recommendation.docx',
        type: 'DOC' as const
      }
    },
    sponsorsSlice: 5
  },
  resourceArticles: {
    title: 'Resource Articles',
    articles: [
      {
        id: 1,
        title: 'Building a Strategic Vision for Schools',
        description: 'Learn how to craft a compelling vision statement that aligns with your district\'s goals and community values.',
        imagePath: '/images/strategic-planning/subject-01.jpg',
        file: {
          name: 'Sample material.pdf',
          size: '1.2 MB',
          path: '/files/Sample material.pdf',
          type: 'PDF' as const,
          color: '#D92D20',
        },
      },
      {
        id: 2,
        title: 'Data-Driven Decision Making in Education',
        description: 'Explore best practices for using data to inform policy decisions, resource allocation, and student outcomes.',
        imagePath: '/images/strategic-planning/subject-02.jpg',
        file: {
          name: 'Sample material.pdf',
          size: '1.2 MB',
          path: '/files/Sample material.pdf',
          type: 'PDF' as const,
          color: '#D92D20',
        },
      },
      {
        id: 3,
        title: 'Engaging Stakeholders in Strategic Planning',
        description: 'Discover strategies for involving teachers, parents, and community members in shaping your district\'s future.',
        imagePath: '/images/strategic-planning/subject-03.jpg',
        file: {
          name: 'Book recommendation.docs',
          size: '1.2 MB',
          path: '/files/Book recommendation.docx',
          type: 'DOC' as const,
          color: '#205A93',
        },
      },
    ]
  }
};

const StrategicPlanningPage = () => {
  return (
    <div className="mx-auto max-w-full md:max-w-[720px] xl:max-w-[1280px] flex flex-col">
      <div
        className={`hidden md:flex flex-row h-[70px] flex w-full px-[16px] md:px-[0px] bg-[#fff]'
    }`}
      >
        <Link href="/dashboard" className="flex items-center gap-1 md:mb-0">
          <Image src="/images/icons/arrow-back-grey.svg" alt="arrow-back" width={24} height={24} />
          <span  className="font-roboto text-[14px] text-[#212B36] hover:underline">
            Back to Dashboard
          </span>
        </Link>
      </div>
      <div className="flex flex-col md:flex-row gap-[80px] md:gap-[24px] xl:gap-[80px] pb-[72px] md:pb-[64px] md:pb-[0px] md:border-b border-[#D0D5DD]">
        <MainStrategicPlanning data={strategicPlanningData} />
      </div>
    </div>
  );
};

export default StrategicPlanningPage;
