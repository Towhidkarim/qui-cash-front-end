import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Facebook, Instagram, Linkedin, Send, Twitter } from 'lucide-react';
import { ModeToggle } from '../mode-toggle';
import { Link } from 'react-router';

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '#', label: 'About' },
];

export default function FooterSection() {
  return (
    <footer className='relative bg-background border-t text-foreground transition-colors duration-300'>
      <div className='mx-auto px-4 md:px-6 lg:px-8 py-12 container'>
        <div className='gap-12 grid md:grid-cols-2 lg:grid-cols-4'>
          <div className='relative'>
            <h2 className='mb-4 font-bold text-3xl tracking-tight'>
              Stay Connected
            </h2>
            <p className='mb-6 text-muted-foreground'>
              Join our newsletter for the latest updates and exclusive offers.
            </p>
            <form className='relative'>
              <Input
                type='email'
                placeholder='Enter your email'
                className='backdrop-blur-sm pr-12'
              />
              <Button
                type='submit'
                size='icon'
                className='top-1 right-1 absolute bg-primary rounded-full w-8 h-8 text-primary-foreground hover:scale-105 transition-transform'
              >
                <Send className='w-4 h-4' />
                <span className='sr-only'>Subscribe</span>
              </Button>
            </form>
            <div className='top-0 -right-4 absolute bg-primary/10 blur-2xl rounded-full w-24 h-24' />
          </div>
          <div>
            <h3 className='mb-4 font-semibold text-lg'>Quick Links</h3>
            <nav id='quick-links' className='space-y-2 text-sm'>
              {navigationLinks.map((item, index) => (
                <Link
                  key={index}
                  to={item.href}
                  className='block hover:text-primary capitalize transition-colors'
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3 className='mb-4 font-semibold text-lg'>Contact Us</h3>
            <address className='space-y-2 text-sm not-italic'>
              <p>123 QuiCash</p>
              <p>Rajshahi , TC, Bangladesh</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: hello@quicash.com</p>
            </address>
          </div>
          <div className='relative'>
            <h3 className='mb-4 font-semibold text-lg'>Follow Us</h3>
            <div className='flex space-x-4 mb-6'>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='rounded-full'
                    >
                      <Facebook className='w-4 h-4' />
                      <span className='sr-only'>Facebook</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='rounded-full'
                    >
                      <Twitter className='w-4 h-4' />
                      <span className='sr-only'>Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='rounded-full'
                    >
                      <Instagram className='w-4 h-4' />
                      <span className='sr-only'>Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      size='icon'
                      className='rounded-full'
                    >
                      <Linkedin className='w-4 h-4' />
                      <span className='sr-only'>LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className='flex items-center gap-3 space-x-2'>
              {/* <Sun className='w-4 h-4' />
              <Switch
                id='dark-mode'
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className='w-4 h-4' />
              <Label htmlFor='dark-mode' className='sr-only'>
                Toggle dark mode
              </Label> */}
              Theme
              <ModeToggle />
            </div>
          </div>
        </div>
        <div className='flex md:flex-row flex-col justify-between items-center gap-4 mt-12 pt-8 border-t text-center'>
          <p className='text-muted-foreground text-sm'>
            © 2025 QuiCash. All rights reserved.
          </p>
          <nav className='flex gap-4 text-sm'>
            <a href='#' className='hover:text-primary transition-colors'>
              Privacy Policy
            </a>
            <a href='#' className='hover:text-primary transition-colors'>
              Terms of Service
            </a>
            <a href='#' className='hover:text-primary transition-colors'>
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
