'use client';
import Image from 'next/image';
import { Typography } from 'antd';

const { Link } = Typography;

const TrendingNews = () => {
  // Mock data for trending news
  const trendingNews = [
    {
      id: 1,
      title: 'Data-Driven Decision Making in Education',
      description:
        'Explore best practices for using data to inform policy decisions, resource allocation, and student outcomes.',
      image: '/images/trending-image-2.png',
      tag: 'Recently Viewed',
    },
    {
      id: 2,
      title: 'Data-Driven Decision Making in Education',
      description:
        'Explore best practices for using data to inform policy decisions, resource allocation, and student outcomes.',
      image: '/images/trending-image-2.png',
    },
    {
      id: 3,
      title: 'Data-Driven Decision Making in Education',
      description:
        'Explore best practices for using data to inform policy decisions, resource allocation, and student outcomes.',
      image: '/images/trending-image-3.png',
    },
  ];

  return (
    <section className="bg-white py-[80px] xl:py-[100px]">
      <div className="mx-auto max-w-full md:max-w-[720px] xl:max-w-[1280px] px-[16px] md:px-[0px] flex flex-col gap-[32px] xl:gap-[54px]">
        <h2 className="font-oswald font-semibold text-[36px] xl:text-[64px] text-[#205A93] uppercase leading-[1.48]">
          trending now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-[24px] xl:gap-[40px]">
          {trendingNews.map((news) => (
            <div key={news.id} className="flex flex-col gap-[24px] md:gap-[18px] xl:gap-8">
              <div className="relative w-full aspect-[370/240] xl:aspect-[380/253] rounded-lg overflow-hidden">
                <Image src={news.image} alt={news.title} fill className="object-cover" />
                {news.tag && (
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#00000080]">
                    <div className="absolute top-[16px] left-[16px] bg-black/30 text-white/80 px-2 py-1 rounded backdrop-blur-md border border-white/80 text-sm">
                      {news.tag}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="font-roboto font-bold text-[24px] md:text-[18px] xl:text-[24px] text-[#11304E] leading-[1.171]">
                  {news.title}
                </h3>
                <p className="font-roboto text-[16px] md:text-[14px] xl:text-[16px] text-[#637381] leading-[1.5]">
                  {news.description}
                </p>
                <Link
                  href="https://www.multibriefs.com/briefs/NASSORG/NASSORG042425.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-roboto text-[#0F72F3] text-[14px] md:text-[12px] xl:text-[14px] leading-[1.5] !underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingNews;
