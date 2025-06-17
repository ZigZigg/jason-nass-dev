"use client";

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonial = () => {
  // Mock data for testimonials
  const testimonials = [
    {
      id: 1,
      quote: 'NAS has been invaluable for my leadership growth.',
      name: 'Jane Doe',
      title: 'Superintendent',
      image: '/images/testimonial-image.png',
    },
    {
      id: 2,
      quote: 'The resources provided have transformed our district\'s approach.',
      name: 'John Smith',
      title: 'District Director',
      image: '/images/testimonial-image.png',
    },
    {
      id: 3,
      quote: 'Connecting with fellow educators has been the highlight of my membership.',
      name: 'Emily Johnson',
      title: 'Principal',
      image: '/images/testimonial-image.png',
    },
    {
      id: 4,
      quote: 'The professional development opportunities are second to none.',
      name: 'Michael Brown',
      title: 'Education Consultant',
      image: '/images/testimonial-image.png',
    },
    {
      id: 5,
      quote: 'This organization truly understands the challenges we face in modern education.',
      name: 'Sarah Williams',
      title: 'Superintendent',
      image: '/images/testimonial-image.png',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);

  // Handle pagination click
  const handlePaginationClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <section className="bg-[#EEF8FF] py-[80px] xl:py-[100px]">
      <div id="testimonial-content" className="mx-auto max-w-full flex flex-col items-center gap-6">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="testimonial-content w-full"
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            // Re-initialize navigation after Swiper initialization
            setTimeout(() => {
              if (swiper.navigation && prevRef.current && nextRef.current) {
                swiper.navigation.destroy();
                swiper.navigation.init();
                swiper.navigation.update();
              }
            });
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="flex flex-col md:flex-row gap-[32px] xl:gap-[80px]">
                <div className="relative w-full md:w-[316px] xl:w-[616px] aspect-[616/465] overflow-hidden flex-shrink-0 rounded-[12px]">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-[24px] xl:gap-[80px] justify-center flex-1">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className="relative h-5 w-5">
                        <Image
                          src="/images/star-icon.svg"
                          alt="Star"
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                  <h3 className="font-roboto font-bold text-[36px] xl:text-[44px] text-[#212B36] leading-[1.4]">
                    {testimonial.quote}
                  </h3>
                  <div className="flex items-center gap-5">
                    <div className="flex flex-col">
                      <p className="font-roboto font-semibold text-[16px] text-[#212B36]">{testimonial.name}</p>
                      <p className="font-roboto text-[16px] text-[#637381]">{testimonial.title}</p>
                    </div>
                    <div className="h-10 border-l border-gray-300"></div>
                    <div className="relative w-[200px] h-[34px] xl:w-[315px] xl:h-[54px]">
                      <Image
                        src="/images/nass-logo.png"
                        alt="Organization logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div id="testimonial-pagination" className="flex justify-between items-center w-full mt-0 xl:mt-6 px-0">
          <div id="testimonial-pagination-dots" className="flex gap-2 hidden md:flex">
            {testimonials.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-black' : 'bg-[#8D8D8D]'} cursor-pointer`}
                onClick={() => handlePaginationClick(index)}
                role="button"
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div id="testimonial-pagination-buttons" className="flex gap-4">
            <button 
              ref={prevRef}
              className="w-10 h-10 rounded-full border border-black flex items-center justify-center cursor-pointer"
              aria-label="Previous slide"
            > 
              <Image src="/images/icons/arrow-black.svg" alt="Previous slide" width={20} height={20} className="object-contain rotate-180" />
            </button>
            <button 
              ref={nextRef}
              className="w-10 h-10 rounded-full border border-black flex items-center justify-center cursor-pointer"
              aria-label="Next slide"
            >
              <Image src="/images/icons/arrow-black.svg" alt="Previous slide" width={20} height={20} className="object-contain" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial; 