// import { GalleryVerticalEnd } from 'lucide-react';

import { LoginForm } from '@/components/layout/sign-in/sign-in-form';
import { Link } from 'react-router';
import Logo from '@/components/layout/logo';
import Providers from '@/components/providers';

export default function LoginPage() {
  return (
    <Providers>
      <div className='grid lg:grid-cols-2 min-h-svh'>
        <div className='flex flex-col gap-4 p-6 md:p-10 pb-5'>
          <div className='flex justify-center md:justify-start gap-2'>
            <Link to='/' className='flex items-center gap-2 font-medium'>
              <Logo />
            </Link>
          </div>
          <div className='flex flex-1 justify-center items-center'>
            <div className='w-full max-w-xs'>
              <LoginForm />
            </div>
          </div>
        </div>
        <div className='hidden lg:block relative bg-muted'>
          <img
            src='/placeholder.svg'
            alt='Image'
            className='absolute inset-0 dark:brightness-[0.2] dark:grayscale w-full h-full object-cover'
          />
        </div>
      </div>
    </Providers>
  );
}
