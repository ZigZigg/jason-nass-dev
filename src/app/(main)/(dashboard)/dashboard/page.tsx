'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

// interface CategoryCardProps {
//   title: string;
//   imageSrc: string;
//   alt: string;
//   link: string;
// }

// const CategoryCard = ({ title, imageSrc, alt, link }: CategoryCardProps) => {

//   return (
//     <Link href={`${link}`} className="flex flex-col items-center w-full rounded-[8px] bg-white shadow-sm hover:shadow-md transition-shadow">
//       <div className="w-full h-[180px] relative">
//         <Image 
//           src={imageSrc}
//           alt={alt}
//           fill
//           className="object-cover w-full h-full rounded-t-[8px]"
//         />
//       </div>
//       <div className="w-full px-[12px] py-[12px] bg-[#CBE0F3] rounded-b-[8px]">
//         <h3 className="font-[600] text-[16px] text-[#212B36] leading-[1.375em] font-roboto">
//           {title}
//         </h3>
//       </div>
//     </Link>
//   );
// };

export default function DashboardPage() {
  const { data: session } = useSession();

  // const categories = [
  //   {
  //     id: 1,
  //     title: "Communication (Written/Oral)",
  //     imageSrc: "/images/dashboard/communication.png",
  //     alt: "Communication icon",
  //     link: "/communication"
  //   },
  //   {
  //     id: 2,
  //     title: "Strategic Planning",
  //     imageSrc: "/images/dashboard/strategic-planning.png",
  //     alt: "Strategic Planning icon",
  //     link: "/strategic-planning"
  //   },
  //   {
  //     id: 3,
  //     title: "Building Powerful Teams",
  //     imageSrc: "/images/dashboard/teams.png",
  //     alt: "Teams icon",
  //     link: "/building-powerful-teams"
  //   },
  //   {
  //     id: 4,
  //     title: "Navigating Politics",
  //     imageSrc: "/images/dashboard/politics.png",
  //     alt: "Politics icon",
  //     link: "/navigating-politics"
  //   },
  //   {
  //     id: 5,
  //     title: "Changes in Tech/AI",
  //     imageSrc: "/images/dashboard/tech-ai.png",
  //     alt: "Tech/AI icon",
  //     link: "/changes-in-tech-ai"
  //   },
  //   {
  //     id: 6,
  //     title: "Crisis Management",
  //     imageSrc: "/images/dashboard/crisis.png",
  //     alt: "Crisis Management icon",
  //     link: "/crisis-management"
  //   },
  //   {
  //     id: 7,
  //     title: "Finances",
  //     imageSrc: "/images/dashboard/finances.png",
  //     alt: "Finances icon",
  //     link: "/finances"
  //   },
  //   {
  //     id: 8,
  //     title: "Social Media",
  //     imageSrc: "/images/dashboard/social-media.png",
  //     alt: "Social Media icon",
  //     link: "/social-media"
  //   }
  // ];

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
];

  return (
    <div className="w-full h-full w-full md:w-[720px] xl:w-[1280px] px-[16px] md:px-[0px] py-[24px] mx-auto">
      <h1 className="text-[#205A93] text-[32px] font-[600] font-oswald text-left md:text-center  uppercase leading-[1.48em]">
        Welcome, {session?.user?.fullName}
      </h1>

      <div className="flex flex-col gap-[24px] py-[24px] xl:h-[calc(100vh_-_265px)]">
        {/* <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[24px]">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id}
              title={category.title}
              imageSrc={category.imageSrc}
              alt={category.alt}
              link={category.link}
            />
          ))}
        </div> */}
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
              <div className="relative overflow-hidden flex-shrink-0 border-y-[2px] border-[#000] bg-gray-100">
                <Image
                  src={item.imageUrl}
                  alt={`${item.label} - Leadership module`}
                  width={224}
                  height={140}
                  priority={index < 4} // Prioritize above-the-fold images
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 224px"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  className="object-cover w-full group-hover:scale-105 transition-transform duration-300 aspect-[224/140]"
                />
              </div>

              {/* Bottom Title - Fixed height for alignment */}
              <div className="pt-2 flex items-center justify-center">
                <h3 className="text-[14px] md:text-[16px] font-bold text-[#1d1d1f] text-center leading-[20px] md:leading-[25px] line-clamp-2 md:line-clamp-none uppercase">
                  {item.label}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 