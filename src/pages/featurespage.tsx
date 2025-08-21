import React from 'react';

import {
  CreditCard,
  Headphones,
  LayoutDashboard,
  Percent,
  Send,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FeaturesPage() {
  const features = [
    {
      title: 'For Everyone, Everywhere',
      description:
        'Whether you’re a student, professional, or business owner, our wallet fits your lifestyle.',
      icon: <Users />,
    },
    {
      title: 'Lightning-Fast Transfers',
      description:
        'Send and receive money instantly, anytime, anywhere—no delays, no worries.',
      icon: <Send />,
    },
    {
      title: 'Transparent Pricing',
      description:
        'No hidden fees, no surprises—just fair, simple rates for every transaction.',
      icon: <Percent />,
    },
    {
      title: 'Unmatched Security',
      description:
        'Credential ncryption, protected login, and fraud detection to keep your money safe.',
      icon: <ShieldCheck />,
    },
    {
      title: 'Bill Payments Made Simple',
      description:
        'Pay your utility bills, mobile recharge, and more in just a few taps.',
      icon: <CreditCard />,
    },
    {
      title: '24/7 Customer Support',
      description:
        'Need help? Our support team (and smart AI assistants) are always here for you.',
      icon: <Headphones />,
    },
    {
      title: 'Cash-In & Cash-Out Anywhere',
      description:
        'Top-up your wallet or withdraw cash from thousands of partner locations easily.',
      icon: <Wallet />,
    },
    {
      title: 'Comprehensive Dashbaord',
      description: 'Comprehensive management options for agents and users',
      icon: <LayoutDashboard />,
    },
  ];

  return (
    <div className='z-10 relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto py-10 max-w-7xl'>
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        'group/feature relative flex flex-col my-10 py-10 dark:border-neutral-800 lg:border-r',
        (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
        index < 4 && 'lg:border-b dark:border-neutral-800'
      )}
    >
      {index < 4 && (
        <div className='absolute inset-0 bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent opacity-0 group-hover/feature:opacity-100 w-full h-full transition duration-200 pointer-events-none' />
      )}
      {index >= 4 && (
        <div className='absolute inset-0 bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent opacity-0 group-hover/feature:opacity-100 w-full h-full transition duration-200 pointer-events-none' />
      )}
      <div className='z-10 relative mb-4 px-10 text-neutral-600 dark:text-neutral-400'>
        {icon}
      </div>
      <div className='z-10 relative mb-2 px-10 font-bold text-lg'>
        <div className='left-0 absolute inset-y-0 bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 rounded-tr-full rounded-br-full w-1 h-6 group-hover/feature:h-8 origin-center transition-all duration-200' />
        <span className='inline-block text-neutral-800 dark:text-neutral-100 transition group-hover/feature:translate-x-2 duration-200'>
          {title}
        </span>
      </div>
      <p className='z-10 relative px-10 max-w-xs text-neutral-600 dark:text-neutral-300 text-sm'>
        {description}
      </p>
    </div>
  );
};
