import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const mockData = [
    {
        title: "Communication, Behaviors, Actions, Calm, Written, Oral",
        label: "The Effective Superintendent's Communication Toolkit",
        imageUrl: '/images/leadership/communication-module.png'
    },
    {
        title: "Strategic Planning and Building a Positive and Productive Culture",
        label: 'Successful Strategic Planning',
        imageUrl: '/images/leadership/strategic-module.png'
    },
    {
        title: "Board/Superintendent/CFO Team",
        label: 'Building A Cohesive Board/Superintendent/CFO Team',
        imageUrl: '/images/leadership/team-module.png'
    },
    {
        title: "Navigating Politics",
        label: 'Navigating Divergent Political Pressures',
        imageUrl: '/images/leadership/policital-module.png'
    },
    {
        title: 'Technology \n and AI',
        label: 'TBD',
        imageUrl: '/images/leadership/technology-module.png'
    },
    {
        title: "Human Talent/Connections with Staff and Unions",
        label: 'Building Trust and Rapport with Personnel',
        imageUrl: '/images/leadership/building-module.png'
    },
    {
        title: "Crisis Management as CEO: Planning, Safety, Communication, Operations, Spokesperson",
        label: 'Developing Effective Crisis Management',
        imageUrl: '/images/leadership/crisis-module.png'
    },
    {
        title: "Adapting to Changing Dynamics",
        label: 'Adapting to Changing Dynamics',
        imageUrl: '/images/leadership/adapting-module.png'
    },
]

const ListToolkit = () => {
  return (
    <div id="leadership-toolkit-list" className="mx-auto max-w-full md:max-w-[720px] xl:max-w-[1280px] px-[16px] md:px-[0px] pt-[60px] md:pt-[84px] pb-[24px]">
      <div className="w-full">
        {/* Grid Layout - Responsive: 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-[12px] gap-y-[18px] md:gap-[24px] lg:gap-y-[58px] lg:gap-x-[38px]">
          {mockData.map((item, index) => (
            <Link 
              key={index}
              href={`/leadership/${index + 1}`}
              className="rounded-lg overflow-hidden group cursor-pointer flex flex-col"
            >
              {/* Top Subtitle - Fixed height for alignment */}
              <div className="pb-2 h-[38px] md:h-[40px] flex items-center justify-center">
                <p className="text-[12px] md:text-[14px] italic text-[#1d1d1f] text-center font-[400] leading-[14px] md:leading-[20px] line-clamp-2 md:line-clamp-none">
                  {item.title}
                </p>
              </div>

              {/* Image Container - Fixed height for row alignment */}
              <div className="relative overflow-hidden flex-shrink-0 border-y-[2px] border-[#000]">
                <Image
                  src={item.imageUrl}
                  alt={item.label}
                  width={224}
                  height={140}
                  className="object-cover w-full group-hover:scale-105 transition-transform duration-300 aspect-[224/140]"
                />
              </div>

              {/* Bottom Title - Fixed height for alignment */}
              <div className="pt-2 flex items-center justify-center">
                <h3 className="text-[14px] md:text-[16px] font-bold text-[#1d1d1f] text-center leading-[20px] md:leading-[25px] line-clamp-2 md:line-clamp-none">
                  {item.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ListToolkit