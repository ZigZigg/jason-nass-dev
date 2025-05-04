import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UnauthorizedFooter from './commons/UnauthorizedFooter';

const Footer = () => {
  const pathname = usePathname();
  const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(pathname);
  const isDashboardPage = pathname === '/';
  const isAuthDashboardPage = pathname === '/dashboard';
  return (
    <footer className="bg-[#11304E] text-white">
      {!isDashboardPage && (
        <div
          id="action-footer"
          className={`py-6 px-4 md:px-8 ${
            isAuthPage ? 'bg-[#F4F9FF]' : 'bg-[#fff]'
          }`}
        >
          <div className="container mx-auto w-full md:w-[720px] xl:w-[1280px] flex flex-col md:flex-row justify-between items-center gap-[32px]">
            {isAuthDashboardPage ? (
              <span className="text-[14px] font-roboto font-[400] order-2 md:order-1 text-[#212B36]">
                2025 Jason Learning x NASS. All right reserved.
              </span>
            ) : (
              <div className="flex items-center gap-1 mb-4 md:mb-0 hidden md:flex">
                <Image
                  src="/images/icons/arrow-back-grey.svg"
                  alt="arrow-back"
                  width={24}
                  height={24}
                />
                <Link
                  href="/"
                  className="font-roboto text-[14px] text-[#212B36] hover:underline"
                >
                  {isAuthPage ? 'Back to NASS Home Page' : 'Back to Dashboard'}
                </Link>
              </div>
            )}

            <div className="flex gap-6 order-1 md:order-2">
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

      {isDashboardPage && <UnauthorizedFooter />}
    </footer>
  );
};

export default Footer;
