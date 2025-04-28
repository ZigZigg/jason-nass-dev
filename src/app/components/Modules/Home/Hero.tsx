'use client'
import Image from 'next/image';
import BaseButton from '@/app/atomics/button/BaseButton';

const Hero = () => {
  const handleJoinNow = () => {
    const element = document.getElementById('become-a-member');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-full md:max-w-[720px] xl:max-w-[1280px] flex flex-col md:flex-row items-center gap-8 md:gap-20 px-[16px] md:px-[0px] py-12 md:py-[80px]">
        <div id="hero-content" className="flex-1 flex flex-col gap-[24px] md:gap-6 w-full order-2 md:order-1">
          <h1 className="font-oswald font-bold text-[36px] md:text-[42px] xl:text-[64px] text-[#205A93] leading-[1.2] md:leading-[1.3]">
            EMPOWERING SUPERINTENDENTS. ELEVATING EDUCATION.
          </h1>
          <p className="text-[#637381] text-[18px] md:text-[20px] leading-[1.5] font-roboto">
            Join a nationwide community shaping the future of education.
          </p>
          <div className="flex flex-row gap-[16px] md:mt-6">
            <BaseButton 
              type="primary"
              className="!border-[#11304E] !bg-[#11304E] !py-3 !px-6 h-auto uppercase tracking-wide !rounded-[4px] hover:!bg-[#0d2a45] transition-colors w-auto"
              style={{ minWidth: '120px', height: '48px', lineHeight: '1' }}
              size="large"
              onClick={handleJoinNow}
            >
                <span className='!text-white font-oswald font-medium !text-[16px]'>
                    JOIN NOW
                </span>
            </BaseButton>
            <BaseButton 
              type="default"
              className="!bg-transparent !border-[1px] !border-[#212B36] !py-3 !px-6 h-auto uppercase tracking-wide !rounded-[4px] hover:!bg-[#f5f5f5] hover:!text-[#212B36] transition-colors w-auto"
              style={{ minWidth: '120px', height: '48px', lineHeight: '1' }}
              size="large"
              onClick={() => {window.open('https://www.nass.us/aboutnass', '_blank')}}
            >
                <span className='!text-[#212B36] font-oswald font-medium !text-[16px]'>
                LEARN MORE
                </span>
              
            </BaseButton>
          </div>
        </div>
        <div id="hero-image" className="flex-1 w-full aspect-[370/263] md:aspect-[1/1] relative rounded-xl overflow-hidden order-1 md:order-2 mb-0 md:mb-0 md:mt-0">
          <Image
            src="/images/hero-image.png"
            alt="Educators collaborating"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero; 