import { getLocalStorageItem } from '@/utils/utility';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// this hoc will check for auth across app
export const withAuth = (OriginalComponent: any) => {
  function HOCAuth(props: any) {
    const pathName = usePathname();
    const router = useRouter();
    useEffect(() => {
        const token = getLocalStorageItem('token');
        if(!token) {
            router.push('/');
            // return null;
        } else {
            if(pathName === '/') {
                router.push('/products');
                // return null;
            }
        }
    }, [pathName, router])
    return <OriginalComponent {...props} />;
  }

  HOCAuth.displayName = 'HOCAuth';

  return HOCAuth;
};
