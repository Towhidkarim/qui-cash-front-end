import { LoginForm } from '@/components/layout/sign-in/sign-in-form';
import { Link } from 'react-router';
import Logo from '@/components/layout/logo';
import Providers from '@/components/providers';

export default function LoginPage() {
  return (
    <Providers>
      <div className='grid min-h-svh'>
        <div className='flex flex-col gap-4 p-6 md:p-10 pb-5'>
          <div className='flex justify-center gap-2'>
            <Link to='/' className='flex items-center gap-2 font-medium'>
              <Logo />
            </Link>
          </div>
          <div className='flex flex-1 justify-center items-center'>
            <LoginForm />
          </div>
        </div>
      </div>
    </Providers>
  );
}
