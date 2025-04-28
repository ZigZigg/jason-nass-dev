import Link from 'next/link';
import React, { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import BaseButton from '@/app/atomics/button/BaseButton';
import { Dropdown, MenuProps, Popover } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import MenuMobile from './commons/MenuMobile';



const Header = () => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
// Define navigation links
  const navLinks = useMemo(() => {

    if(status === 'authenticated') {
      return [
        { href: '/', label: 'Dashboard' },
        { href: '#', label: 'Resources' },
        { href: '#', label: 'Support' },
      ]
    }
    return [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/help', label: 'Help' },
    ]
  }, [status]);

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex flex-row items-center gap-[8px]" onClick={() => {}}>
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
    await signOut({ redirect: false }); // Sign out without redirecting
    router.push('/login'); // Redirect to the login page after signing out
  };
  const renderRightActions = useCallback(() => {
    const isAuthPage = pathname === '/login' || pathname === '/signup';

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
  }, [status, openMenuMobile, pathname]);

  const renderAuthActions = useCallback(() => {
    return (
      <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
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
  }, [session]);

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
    const isAuthPage = pathname === '/login' || pathname === '/signup';
    return (
      <div className={`flex flex-row h-[70px] flex md:hidden w-full px-[16px] md:px-[0px] ${isAuthPage ? 'bg-[#F5F5F5]' : 'bg-[#fff]'}`}>
        <div className="flex items-center gap-1 md:mb-0">
          <Image src="/images/icons/arrow-back-grey.svg" alt="arrow-back" width={24} height={24} />
          <Link 
            href="/" 
            className="font-roboto text-[14px] text-[#212B36] hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-auto flex flex-col">
      <nav className="bg-[#11304E] text-white ">
        <div className="container mx-auto flex justify-between items-center w-full md:w-[720px] xl:w-[1280px] h-[60px] md:h-[78px] px-[16px] md:px-[0px]">
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="uppercase font-oswald hover:text-gray-300 text-[16px] md:text-[12px] xl:text-[16px] font-[400] !text-[#fff]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div
            id="logo-container"
            onClick={() => router.push('/')}
            className="h-[54px] w-[141px] md:w-[240px] xl:w-[392px] flex items-center justify-center"
          >
            <Image
              src="/images/main-logo.svg"
              alt="Logo"
              width={392}
              height={54}
              className="object-contain hidden md:block"
            />
            <Image
              src="/images/nass-logo-mobile.svg"
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
