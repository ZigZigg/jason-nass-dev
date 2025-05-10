import BaseButton from '@/app/atomics/button/BaseButton';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

interface Props {
  setOpenMenuMobile: (value: boolean) => void;
  authStatus: 'loading' | 'unauthenticated' | 'authenticated';
  handleSignOut: () => void;
}

const MenuMobile = ({ authStatus, handleSignOut, setOpenMenuMobile }: Props) => {
  const router = useRouter();
  // Define navigation links based on authentication status
  const navLinks = useMemo(() => {
    if (authStatus === 'unauthenticated') {
      return [
        { href: 'https://www.nass.us/aboutnass/', label: 'About' },
        { href: 'https://www.nass.us/contact-us', label: 'Contact' },
        { href: 'https://www.nass.us/benefits', label: 'Benefits' },
      ];
    }
    return [
      { href: '/', label: 'Dashboard' },
      { href: '#', label: 'Resources' },
      { href: '#', label: 'Support' },
    ];
  }, [authStatus]);
  
  const onSignOut = () => {
    setOpenMenuMobile(false);
    handleSignOut();
  }

  return (
    <div className="w-[100%] py-[40px] px-[16px]">
      <div className="flex flex-col gap-[32px] mb-[190px]">
        {navLinks.map((link) => (
          <Link
            key={`key-${link.label}`}
            href={link.href}
            target={link.href.includes('http') ? '_blank' : '_self'}
            className="uppercase font-oswald hover:text-gray-300 text-[36px] font-[700] !text-[#fff]"
            onClick={() => setOpenMenuMobile(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
      
      {authStatus === 'unauthenticated' && (
        <div id="menu-mobile-buttons" className="flex flex-col gap-[24px]">
          <BaseButton 
            onClick={() => {
              setOpenMenuMobile(false);
              window.location.href = '/signup';
            }} 
            className="!bg-[#F2DF0A] h-auto !py-[8px]" 
            size="large"
          >
            <span className="text-[#212B36] text-[16px] font-[500] font-oswald">SIGN UP</span>
          </BaseButton>
          <BaseButton 
            onClick={() => {
              setOpenMenuMobile(false);
              window.location.href = '/login';
            }} 
            className="bg-transparent h-auto !py-[8px]" 
            size="large"
          >
            <span className="text-[#212B36] text-[16px] font-[500] font-oswald">LOG IN</span>
          </BaseButton>
        </div>
      )}
      
      {authStatus === 'authenticated' && (
        <div id="menu-mobile-buttons" className="flex flex-col gap-[16px]">
          <div className='flex flex-row items-center py-[8px] gap-[24px]' onClick={() => {router.push('/change-password')}}>
            <Image src='/images/icons/user-white.svg' alt='user' width={24} height={24} />
            <span className='text-[#fff] text-[24px] font-[500] font-roboto leading-[100%]'>Account Settings</span>
          </div>
          <div onClick={onSignOut} className='flex flex-row items-center py-[8px] gap-[24px]'>
            <Image src='/images/icons/log-out-white.svg' alt='user' width={24} height={24} />
            <span className='text-[#fff] text-[24px] font-[500] font-roboto leading-[100%]'>Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuMobile;
