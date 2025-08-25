import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

export default function HeroSection() {
  return (
    <div className='w-full'>
      <div className='mx-auto container'>
        <div className='flex flex-col justify-center items-center gap-8 py-20 lg:py-32'>
          <div>
            <Button variant='secondary' size='sm' className='gap-4'>
              Payments Made Effortless <MoveRight className='w-4 h-4' />
            </Button>
          </div>
          <div id='hero' className='flex flex-col gap-4'>
            <h1 className='max-w-2xl font-regular text-5xl md:text-7xl text-center tracking-tighter'>
              <span className=''>Your Digital Wallet, Done Right</span>
              <span className='relative flex justify-center md:pt-1 md:pb-4 w-full overflow-hidden text-center'></span>
            </h1>

            <p className='px-2 max-w-2xl text-muted-foreground text-lg md:text-xl text-center leading-relaxed tracking-tight'>
              Managing your finances shouldn’t feel complicated. Say goodbye to
              cash hassles and outdated payment methods. Our digital wallet lets
              you send, receive, and manage money with speed, security, and
              simplicity — all in one place.
            </p>
          </div>
          <div id='cta' className='flex flex-row gap-3'>
            <Link to='/signup'>
              <Button size='lg' className='gap-4' variant='outline'>
                Get Started Now!
              </Button>
            </Link>
            <Button size='lg' className='gap-4' asChild>
              <Link to='/signup'>
                Sign up here <MoveRight className='w-4 h-4' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
