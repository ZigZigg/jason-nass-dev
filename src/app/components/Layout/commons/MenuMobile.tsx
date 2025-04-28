import BaseButton from '@/app/atomics/button/BaseButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

interface Props {
  setOpenMenuMobile: (value: boolean) => void;
  authStatus: 'loading' | 'unauthenticated' | 'authenticated';
  handleSignOut: () => void;
}

const MenuMobile = ({ authStatus, handleSignOut, setOpenMenuMobile }: Props) => {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';
  
  // Define navigation links based on authentication status
  const navLinks = useMemo(() => {
    if (authStatus === 'unauthenticated') {
      return [
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
        { href: '/help', label: 'Help' },
      ];
    }
    return [
      { href: '/', label: 'Dashboard' },
      { href: '#', label: 'Resources' },
      { href: '#', label: 'Support' },
    ];
  }, [authStatus]);
  
  return (
    <div className="w-[100%] py-[40px] px-[16px]">
      <div className="flex flex-col gap-[32px] mb-[190px]">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="uppercase font-oswald hover:text-gray-300 text-[36px] font-[700] !text-[#fff]"
            onClick={() => setOpenMenuMobile(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
      
      {!isAuthPage && authStatus === 'unauthenticated' && (
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
        <div id="menu-mobile-buttons" className="flex flex-col gap-[24px]">
          <BaseButton 
            onClick={() => {
              setOpenMenuMobile(false);
              handleSignOut();
            }} 
            className="bg-transparent h-auto !py-[8px]" 
            size="large"
          >
            <span className="text-[#212B36] text-[16px] font-[500] font-oswald">LOG OUT</span>
          </BaseButton>
        </div>
      )}
    </div>
  );
};

export default MenuMobile;
