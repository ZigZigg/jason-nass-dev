'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  alt: string;
  link: string;
}

const CategoryCard = ({ title, imageSrc, alt, link }: CategoryCardProps) => {

  return (
    <Link href={`${link}`} className="flex flex-col items-center w-full rounded-[8px] bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="w-full h-[180px] relative">
        <Image 
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover w-full h-full rounded-t-[8px]"
        />
      </div>
      <div className="w-full px-[12px] py-[12px] bg-[#CBE0F3] rounded-b-[8px]">
        <h3 className="font-[600] text-[16px] text-[#212B36] leading-[1.375em] font-roboto">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default function DashboardPage() {
  const { data: session } = useSession();

  const categories = [
    {
      id: 1,
      title: "Communication (Written/Oral)",
      imageSrc: "/images/dashboard/communication.png",
      alt: "Communication icon",
      link: "/communication"
    },
    {
      id: 2,
      title: "Strategic Planning",
      imageSrc: "/images/dashboard/strategic-planning.png",
      alt: "Strategic Planning icon",
      link: "/strategic-planning"
    },
    {
      id: 3,
      title: "Building Powerful Teams",
      imageSrc: "/images/dashboard/teams.png",
      alt: "Teams icon",
      link: "/building-powerful-teams"
    },
    {
      id: 4,
      title: "Navigating Politics",
      imageSrc: "/images/dashboard/politics.png",
      alt: "Politics icon",
      link: "/navigating-politics"
    },
    {
      id: 5,
      title: "Changes in Tech/AI",
      imageSrc: "/images/dashboard/tech-ai.png",
      alt: "Tech/AI icon",
      link: "/changes-in-tech-ai"
    },
    {
      id: 6,
      title: "Crisis Management",
      imageSrc: "/images/dashboard/crisis.png",
      alt: "Crisis Management icon",
      link: "/crisis-management"
    },
    {
      id: 7,
      title: "Finances",
      imageSrc: "/images/dashboard/finances.png",
      alt: "Finances icon",
      link: "/finances"
    },
    {
      id: 8,
      title: "Social Media",
      imageSrc: "/images/dashboard/social-media.png",
      alt: "Social Media icon",
      link: "/social-media"
    }
  ];


  return (
    <div className="w-full h-full w-full md:w-[720px] xl:w-[1280px] px-[16px] md:px-[0px] py-[24px] mx-auto">
      <h1 className="text-[#205A93] text-[32px] font-[600] font-oswald text-left md:text-center  uppercase leading-[1.48em]">
        Welcome, {session?.user?.fullName}
      </h1>

      <div className="flex flex-col gap-[24px] py-[24px] xl:h-[calc(100vh_-_265px)]">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[24px]">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id}
              title={category.title}
              imageSrc={category.imageSrc}
              alt={category.alt}
              link={category.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 