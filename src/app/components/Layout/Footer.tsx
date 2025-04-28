import Image from 'next/image';
import Link from 'next/link';
import { Input } from 'antd';
import BaseButton from '@/app/atomics/button/BaseButton';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  const isDashboardPage = pathname === '/';
  const isAuthDashboardPage = pathname === '/dashboard';
  return (
    <footer className="bg-[#11304E] text-white">
      {!isDashboardPage && (
        <div
          id="action-footer"
          className={`py-6 px-4 md:px-8 ${isAuthPage ? 'bg-[#F5F5F5]' : 'bg-[#fff]'} hidden md:block`}
        >
          <div className="container mx-auto w-full md:w-[720px] xl:w-[1280px] flex flex-col md:flex-row justify-between items-center">
            {
              isAuthDashboardPage ?
               (<span className='text-[14px] font-roboto font-[400] text-[#212B36]'>2025 Jason Learning x NASS. All right reserved.</span>):
               (<div className="flex items-center gap-1 mb-4 md:mb-0">
                <Image
                  src="/images/icons/arrow-back-grey.svg"
                  alt="arrow-back"
                  width={24}
                  height={24}
                />
                <Link href="/" className="font-roboto text-[14px] text-[#212B36] hover:underline">
                  Back to Dashboard
                </Link>
              </div>)
            }
            
            <div className="flex gap-6">
              <Link
                target="_blank"
                href="https://79c90ad4-eed2-49e5-971f-afd416f04229.usrfiles.com/ugd/79c90a_8d54506aff6b4b2bbdeca11b144b673a.pdf"
                className="font-roboto text-[14px] text-[#212B36] hover:underline underline"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto w-full md:w-[720px] xl:w-[1280px] px-[16px] md:px-[0px] py-[80px] xl:py-20 flex flex-col gap-[40px] xl:gap-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-[40px] xl:gap-8">
            <div className="h-[40px] xl:h-[54px] w-full md:w-[240px] xl:w-[482px]">
              <Image
                src="/images/main-logo.svg"
                alt="Logo"
                width={482}
                height={54}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-[24px] xl:gap-10">
              <Link
                href="/about"
                className="font-roboto !font-[600] text-[18px] md:text-[16px] xl:text-[18px] !text-[#fff] hover:text-gray-300"
              >
                About Us
              </Link>
              <Link
                href="/membership"
                className="font-roboto !font-[600] text-[18px] md:text-[16px] xl:text-[18px] !text-[#fff] hover:text-gray-300"
              >
                Membership
              </Link>
              <Link
                href="/contact"
                className="font-roboto !font-[600] text-[18px] md:text-[16px] xl:text-[18px] !text-[#fff] hover:text-gray-300"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="h-px bg-white/20 w-full block md:hidden"></div>
          <div
            id="subscribe"
            className="flex flex-col gap-[16px] justify-center md:justify-self-end w-full md:w-auto"
          >
            <h3 className="font-roboto font-[600] text-[16px] text-white !mb-[0px]">Subscribe</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter your email"
                className="bg-transparent border border-white p-[12px] !rounded-[8px] text-white text-[16px] h-[48px] w-full md:!w-[185px] xl:!w-[265px] px-4 !placeholder-[#505050]"
                style={{ height: '48px' }}
              />
              <BaseButton
                className="!bg-transparent !border !border-white !rounded-[8px] h-[48px]"
                style={{ height: '48px' }}
              >
                <span className="font-roboto font-[400] text-[16px] text-white">Subscribe</span>
              </BaseButton>
            </div>
            <p className="text-[12px] font-roboto text-white font-[400]">
              <span>By subscribing you agree to with our</span>
              <Link href="/privacy-policy" className="text-[12px] !text-white !underline ml-[4px]">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="h-px bg-white/20 w-full"></div>
          <div className="flex flex-col md:flex-row justify-between gap-[24px] xl:gap-0 py-[8px]">
            <span className="text-[14px] md:text-[12px] xl:text-[16px] font-roboto font-[400] text-white w-full md:w-[140px] xl:w-auto">
              2025 Jason Learning x NASS. All right reserved.
            </span>
            <div className="flex gap-8">
              <div className="flex items-center gap-1">
                <Image src="/images/icons/email-white.svg" alt="mail" width={24} height={24} />
                <span className="text-[16px] md:text-[12px] xl:text-[16px] font-roboto font-[400] text-white">
                  hello@relume.io
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Image src="/images/icons/phone-white.svg" alt="mail" width={24} height={24} />
                <span className="text-[16px] md:text-[12px] xl:text-[16px] font-roboto font-[400] text-white">
                  +1 (555) 000-0000
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] md:text-[12px] xl:text-[14px] font-roboto font-[400] text-white">
                Follow Us:
              </span>
              <div className="flex gap-3">
                <Image src="/images/icons/fb-white.svg" alt="mail" width={24} height={24} />
                <Image src="/images/icons/insta-white.svg" alt="mail" width={24} height={24} />
                <Image src="/images/icons/x-white.svg" alt="mail" width={24} height={24} />
                <Image src="/images/icons/linkedin-white.svg" alt="mail" width={24} height={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
