import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const useUpdateStyle = () => {
   const pathname = usePathname();
   const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(pathname);
   useEffect(() => {
    if(isAuthPage){
        console.log('isAuthPage', isAuthPage)
        document.body.style.backgroundColor = '#F4F9FF';
    }
    return () => {
        document.body.style.backgroundColor = 'transparent';
    }
   },[isAuthPage])
};

