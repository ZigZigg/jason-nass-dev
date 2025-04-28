'use client'
import BaseButton from '@/app/atomics/button/BaseButton';
import { useRouter } from 'next/navigation';

const CallToAction = () => {
  const router = useRouter();
  return (
    <section 
       id="become-a-member"
      className="py-[80px] xl:py-28 px-5 md:px-16 bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(/images/cta-background.jpg)'
      }}
    >
      <div className="container mx-auto flex flex-col items-center text-center gap-[24px] xl:gap-6">
        <h2 className="font-oswald font-[600] text-[44px] md:text-[54px] text-white uppercase leading-tight">
          Ready to Shape the Future of Education?
        </h2>
        <p className="text-white text-[16px] md:text-[18px] max-w-2xl font-roboto">
          Join the movement to drive change and make a lasting impact on education.
        </p>
        <div className="flex flex-row gap-4 pt-4">
          <BaseButton 
            className="!bg-[#F2DF0A] h-auto"
            size="large"
            onClick={() => {router.push('/login')}}
          >
            <span className='text-[#212B36] text-[16px] font-[500] font-oswald'>
            BECOME A MEMBER
            </span>

          </BaseButton>
          <BaseButton 
            className="bg-transparent h-auto"
            size="large"
          >
            <span className='text-[#212B36] text-[16px] font-[500] font-oswald'>
            LEARN MORE

            </span>
          </BaseButton>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 