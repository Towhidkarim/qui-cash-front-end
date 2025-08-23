import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Logo from './logo';
import { Link } from 'react-router';
import { ModeToggle } from '../mode-toggle';
import { useGetMyUserInfoQuery } from '@/redux/api/user.api';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
];

export default function NavBar() {
  const { data } = useGetMyUserInfoQuery(undefined);
  return (
    <header className='top-0 z-10 sticky bg-background px-4 md:px-6 border-b'>
      <div className='flex justify-between items-center gap-4 h-16'>
        {/* Left side */}
        <div className='flex items-center gap-2'>
          {/* Mobile menu */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className='group md:hidden size-8'
                variant='ghost'
                size='icon'
              >
                <svg
                  className='pointer-events-none'
                  width={16}
                  height={16}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4 12L20 12'
                    className='group-aria-expanded:rotate-[315deg] origin-center transition-all -translate-y-[7px] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]'
                  />
                  <path
                    d='M4 12H20'
                    className='group-aria-expanded:rotate-45 origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]'
                  />
                  <path
                    d='M4 12H20'
                    className='group-aria-expanded:rotate-[135deg] origin-center transition-all translate-y-[7px] group-aria-expanded:translate-y-0 duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]'
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align='start' className='md:hidden p-1 w-36'>
              <NavigationMenu className='*:w-full max-w-none'>
                <NavigationMenuList className='flex-col items-start gap-0 md:gap-2'>
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem
                      key={index}
                      className='px-4 py-3 w-full'
                    >
                      <NavigationMenuLink href={link.href} className='py-2'>
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className='flex items-center gap-6'>
            <Link to='/' className='text-primary hover:text-primary/90'>
              <Logo />
            </Link>
          </div>
        </div>
        {/* Middle Section */}
        <div>
          <NavigationMenu className='max-md:hidden'>
            <NavigationMenuList className='gap-2 -translate-x-4'>
              {navigationLinks.map((link, index) => (
                <NavigationMenuItem key={index}>
                  <Link
                    to={link.href}
                    className='px-4 py-1.5 font-medium text-muted-foreground hover:text-primary'
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Right side */}
        <div className='flex items-center gap-4'>
          <ModeToggle />
          {data?.data ? (
            <>
              <Button asChild>
                <Link to='/signin'>Dashboard</Link>
              </Button>
              <Button>Log Out</Button>
            </>
          ) : (
            <Button asChild>
              <Link to='/signin'>Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
