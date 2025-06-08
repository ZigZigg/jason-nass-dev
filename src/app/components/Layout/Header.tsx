import Link from 'next/link';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import BaseButton from '@/app/atomics/button/BaseButton';
import { Dropdown, MenuProps, Popover } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import MenuMobile from './commons/MenuMobile';
import { useOrientation } from '@/app/providers/OrientationProvider';

const Header = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [openMenuDesktop, setOpenMenuDesktop] = useState(false);
  const orientation = useOrientation();
  const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password', '/change-password'].includes(pathname);
  // Define navigation links
  const navLinks = useMemo(() => {
    if (isAuthPage) {
      return [];
    }
    if (status === 'authenticated') {
      return [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '#', label: 'Resources' },
        { href: '#', label: 'Support' },
      ];
    }
    return [
      { href: 'https://www.nass.us/aboutnass', label: 'About' },
      { href: 'https://www.nass.us/contact-us', label: 'Contact' },
      { href: 'https://www.nass.us/benefits', label: 'Benefits' },
    ];
  }, [status, isAuthPage]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex flex-row items-center gap-[8px]" onClick={() => {router.push('/change-password')}}>
          <Image src="/images/icons/user.svg" alt="icon-account-settings" width={16} height={16} />
          <span className="text-[14px] font-[500] font-roboto text-[#637381]">
            Account Settings
          </span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="flex flex-row items-center gap-[8px]" onClick={() => handleSignOut()}>
          <Image src="/images/icons/log-out.svg" alt="icon-logout" width={16} height={16} />
          <span className="text-[14px] font-[500] font-roboto text-[#637381]">Log out</span>
        </div>
      ),
    },
  ];
  const handleSignOut = async () => {
    try {
      // Attempt to sign out
      await signOut({ redirect: false });
      
      // Check both cookie and localStorage for session tokens
      const checkSession = () => {
        const cookieCleared = document.cookie.indexOf('next-auth.session-token') === -1 &&
                             document.cookie.indexOf('__Secure-next-auth.session-token') === -1;
        
        const localStorageCleared = !window.localStorage.getItem('next-auth.session-token') &&
                                   !window.localStorage.getItem('next-auth.callback-url');
        
        if (cookieCleared && localStorageCleared) {
          // Session is fully cleared, safe to redirect
          router.push('/');
        } else {
          // Manually clear any remaining tokens
          window.localStorage.removeItem('next-auth.session-token');
          window.localStorage.removeItem('next-auth.callback-url');
          window.localStorage.removeItem('next-auth.csrf-token');
          
          // Try again, but limit retries
          if (retryCount < 5) {
            setTimeout(() => checkSession(), 100);
            retryCount++;
          } else {
            // Fallback: force redirect after max retries
            console.warn('Session cleanup taking longer than expected, forcing redirect');
            router.push('/');
          }
        }
      };
      
      let retryCount = 0;
      checkSession();
      
    } catch (error) {
      console.error('Sign out error:', error);
      // Fallback in case of sign out errors
      window.localStorage.removeItem('next-auth.session-token');
      window.localStorage.removeItem('next-auth.callback-url');
      window.localStorage.removeItem('next-auth.csrf-token');
      router.push('/');
    }
  };

  useEffect(() => {
    setOpenMenuMobile(false);
    setOpenMenuDesktop(false);
  }, [orientation]);

  const renderRightActions = useCallback(() => {
    const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password', '/change-password'].includes(pathname);

    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          {status === 'loading' ? (
            <></>
          ) : status === 'unauthenticated' && !isAuthPage ? (
            renderUnAuthActions()
          ) : status === 'authenticated' ? (
            renderAuthActions()
          ) : (
            <></>
          )}
        </div>
        <Popover
          styles={{
            root: {
              width: '100%',
              top: '60px',
            },
            body: {
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '0px',
              backgroundColor: '#11304E',
              padding: '0px',
            },
          }}
          className="block md:hidden"
          placement="bottom"
          content={
            <MenuMobile
              setOpenMenuMobile={setOpenMenuMobile}
              authStatus={status}
              handleSignOut={handleSignOut}
            />
          }
          trigger="click"
          arrow={false}
          open={openMenuMobile}
          onOpenChange={(visible) => {
            setOpenMenuMobile(visible);
          }}
        >
          {openMenuMobile ? (
            <Image src="/images/icons/close-white.svg" alt="icon-menu" width={24} height={24} />
          ) : (
            <Image src="/images/icons/menu-bar.svg" alt="icon-menu" width={24} height={24} />
          )}
        </Popover>
      </div>
    );
  }, [status, openMenuMobile, pathname, openMenuDesktop, setOpenMenuDesktop]);

  const renderAuthActions = useCallback(() => {
    return (
      <Dropdown
        menu={{ items }}
        placement="bottomRight"
        trigger={['click']}
        open={openMenuDesktop}
        onOpenChange={setOpenMenuDesktop}
      >
        <div className="flex flex-row items-center gap-[12px] cursor-pointer">
          <Image
            src={session?.user?.avatar || '/default-avatar.png'} // Path to your logo file in the public folder
            alt="Avatar"
            width={40} // Adjust based on your logo's dimensions
            height={40}
            className="rounded-full w-[40px] h-[40px] object-cover"
          />
          <span className="text-[16px] text-[#fff] font-[500] hidden md:block">
            {session?.user?.fullName}
          </span>
          <Image
            className="hidden md:block"
            src="/images/icons/down-white.svg" // Path to your logo file in the public folder
            alt="icon-down"
            width={24} // Adjust based on your logo's dimensions
            height={24}
          />
        </div>
      </Dropdown>
    );
  }, [session, openMenuDesktop, setOpenMenuDesktop]);

  const renderUnAuthActions = useCallback(() => {
    return (
      <>
        <BaseButton
          onClick={() => router.push('/signup')}
          className="!bg-[#F2DF0A] h-auto !py-[8px] !hidden md:!block"
          size="large"
        >
          <span className="text-[#212B36] text-[16px] font-[500] font-oswald">SIGN UP</span>
        </BaseButton>
        <BaseButton
          onClick={() => router.push('/login')}
          className="bg-transparent h-auto !py-[8px] !hidden md:!block"
          size="large"
        >
          <span className="text-[#212B36] text-[16px] font-[500] font-oswald">LOG IN</span>
        </BaseButton>
      </>
    );
  }, []);

  const pageActions = () => {
    const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(pathname);
    const isPublicPage = pathname.includes('/leadership');
    const isTransparentPage = ['/change-password'].includes(pathname);
    const isHomePage = ['/', '/dashboard'].includes(pathname);
    if (isHomePage) {
      return null;
    }
    return (
      <div
        className={`flex flex-row h-[70px] flex md:hidden w-full px-[16px] md:px-[0px] ${
          (isAuthPage || isTransparentPage) ? 'bg-[#F4F9FF]' : 'bg-[#fff]'
        }`}
      >
        <Link href={isAuthPage || isPublicPage ? '/' : '/dashboard'} className="flex items-center gap-1 md:mb-0">
          <Image src="/images/icons/arrow-back-grey.svg" alt="arrow-back" width={24} height={24} />
          <span  className="font-roboto text-[14px] text-[#212B36] hover:underline">
            {isAuthPage || isPublicPage ? 'Back to NASS Home Page' : 'Back to Dashboard'}
          </span>
        </Link>
      </div>
    );
  };

  return (
    <div className="w-full h-auto flex flex-col">
      <nav className="bg-[#11304E] text-white ">
        <div className="container mx-auto flex justify-between items-center w-full md:w-[720px] xl:w-[1280px] h-[60px] md:h-[78px] px-[16px] md:px-[0px]">
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={`key-${link.label}`}
                href={link.href}
                target={link.href.includes('http') ? '_blank' : '_self'}
                className="uppercase font-oswald hover:text-gray-300 text-[16px] md:text-[12px] xl:text-[16px] font-[400] !text-[#fff]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div
            id="logo-container"
            className="h-[54px] w-[141px] md:w-[240px] xl:w-[392px] flex items-center justify-center"
          >
            <Image
              src="/images/main-logo.png"
              alt="Logo"
              width={392}
              height={54}
              className="object-contain hidden md:block"
            />
            <Image
              src="/images/nass-logo-mobile.png"
              alt="Logo"
              width={141}
              height={54}
              className="object-contain block md:hidden"
            />
          </div>

          {renderRightActions()}
        </div>
      </nav>
      {pageActions()}
    </div>
  );
};

export default Header;
