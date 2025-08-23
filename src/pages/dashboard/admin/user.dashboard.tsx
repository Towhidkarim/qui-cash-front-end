import Logo from '@/components/layout/logo';
import LogOutButton from '@/components/logout-button';
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useGetMyUserInfoQuery } from '@/redux/api/user.api';

import { User, Home, Settings, Users, ArrowRightLeft } from 'lucide-react';
import { Link, Outlet, ScrollRestoration, useLocation } from 'react-router';

// Menu items
const items = [
  {
    title: 'Home',
    url: '/dashboard/admin',
    icon: Home,
  },
  {
    title: 'Manage Users',
    url: '/dashboard/admin/manage-users',
    icon: Users,
  },
  {
    title: 'Manage Transactions',
    url: '/dashboard/admin/manage-transactions',
    icon: ArrowRightLeft,
  },

  {
    title: 'Settings',
    url: '/dashboard/admin/settings',
    icon: Settings,
  },
];

export function AdminDashboard() {
  const { data, isLoading } = useGetMyUserInfoQuery(undefined);
  const location = useLocation();
  return (
    <SidebarProvider>
      <ScrollRestoration />
      <Sidebar>
        <SidebarContent className='bg-background'>
          <SidebarGroup>
            <SidebarGroupLabel className='m-5'>
              <Logo />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className='my-5'>
                {items.map((item) => (
                  <SidebarMenuItem className='p-2' key={item.title}>
                    <SidebarMenuButton
                      className={cn(
                        location.pathname === item.url
                          ? 'bg-sky-600 py-5 text-white'
                          : 'py-5'
                      )}
                      asChild
                      tooltip={item.title}
                    >
                      <Link className='p-2 px-4' to={item.url}>
                        <item.icon className='scale-120' />
                        <span className='ml-3 text-lg'>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarGroup>
            <SidebarMenuButton className='justify-between gap-3 w-full h-12'>
              <div className='flex items-center gap-2 min-w-44'>
                {isLoading ? (
                  <Skeleton className='shadow rounded-full w-full h-24' />
                ) : (
                  <>
                    <User className='rounded-md w-5 h-5' />
                    <div className='flex flex-col items-start'>
                      <span className='font-medium text-sm'>
                        {data?.data?.firstName}
                      </span>
                      <span className='text-muted-foreground text-xs'>
                        {data?.data?.email}
                      </span>
                    </div>
                  </>
                )}
              </div>
              {/* <ChevronsUpDown className='rounded-md w-5 h-5' /> */}
            </SidebarMenuButton>
            <LogOutButton />
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>

      <main className='flex-1'>
        <div className='px-4 py-2'>
          <SidebarTrigger className='mt-2 w-4 h-4' />
        </div>
        <div className='md:ml-[16rem] p-6 max-w-screen'>
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
