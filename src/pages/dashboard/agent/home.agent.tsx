'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  TrendingUp,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetMyWalletQuery } from '@/redux/api/wallet.api';
import { AnimatedCounter } from '@/components/animated-counter';
import { useGetMyTransactionsQuery } from '@/redux/api/transaction.api';
import TransactionDisplay from '../user/transaction-display';
import { useGetMyUserInfoQuery } from '@/redux/api/user.api';
import { Link } from 'react-router';

export default function AgentHomeDashboard() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  //   const currentBalance = 12847.65;

  const { data: walletData, isLoading: walletDataisLoading } =
    useGetMyWalletQuery(undefined);
  const { data: userData } = useGetMyUserInfoQuery(undefined);

  const { data: transactionData, isLoading: transactionDataIsLoding } =
    useGetMyTransactionsQuery(undefined);

  return (
    <div className='bg-background p-4 md:p-6 lg:p-8 min-h-screen'>
      <div className='space-y-8 mx-auto max-w-7xl'>
        {/* Header */}
        <div className='flex md:flex-row flex-col md:justify-between md:items-center gap-4'>
          <div>
            <h1 className='font-bold text-foreground text-3xl'>
              Agent Dashboard
            </h1>
            <p className='text-muted-foreground'>
              Welcome back {userData?.data?.firstName}! Here's your agent
              financial overview.
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Button disabled variant='outline' size='sm'>
              <TrendingUp className='mr-2 w-4 h-4' />
            </Button>
          </div>
        </div>

        {/* Balance Card */}
        <Card className='bg-gradient-to-br from-sky-600 to-sky-50 text-primary-foreground'>
          <CardHeader className='pb-2'>
            <div className='flex justify-between items-center'>
              <CardTitle className='font-medium text-primary-foreground/90 text-lg'>
                Current Balance
              </CardTitle>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => setBalanceVisible(!balanceVisible)}
                className='hover:bg-primary-foreground/10 text-primary-foreground/90 hover:text-primary-foreground'
              >
                {balanceVisible ? (
                  <Eye className='w-4 h-4' />
                ) : (
                  <EyeOff className='w-4 h-4' />
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {walletDataisLoading ? (
              <div className='space-y-2'>
                <Skeleton className='rounded-full w-44 h-20' />
              </div>
            ) : (
              <div className='space-y-2'>
                <sup className='m-2 text-lg'>TK</sup>
                {balanceVisible ? (
                  <AnimatedCounter
                    duration={750}
                    value={walletData?.data?.balance ?? 0}
                  />
                ) : (
                  <span className='font-bold text-4xl md:text-5xl'>••••••</span>
                )}
                <p className='text-primary-foreground/80 text-sm'>
                  +2.5% from last month
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-sm'>
                Total Cash Out
              </CardTitle>
              <ArrowUpRight className='w-4 h-4 text-chart-2' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-chart-2 text-2xl'>
                TK&nbsp;
                {transactionData?.data
                  ? transactionData.data
                      .reduce(
                        (prev, curr) =>
                          (prev +=
                            curr.transactionType === 'cashOut'
                              ? curr.amount
                              : 0),
                        0
                      )
                      ?.toLocaleString()
                  : 0}
              </div>
              <p className='text-muted-foreground text-xs'>
                total cash out amount
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-sm'>
                Total Cash In
              </CardTitle>
              <ArrowDownLeft className='w-4 h-4 text-chart-5' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-chart-5 text-2xl'>
                TK&nbsp;
                {transactionData?.data
                  ? transactionData.data
                      .reduce(
                        (prev, curr) =>
                          (prev +=
                            curr.transactionType === 'cashIn'
                              ? curr.amount
                              : 0),
                        0
                      )
                      ?.toLocaleString()
                  : 0}
              </div>
              <p className='text-muted-foreground text-xs'>
                total cash in amount
              </p>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg transition-shadow'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-sm'>
                Debit + Credit
              </CardTitle>
              <DollarSign className='w-4 h-4 text-chart-1' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-chart-1 text-2xl'>
                TK&nbsp;
                {transactionData?.data
                  ? transactionData.data
                      .reduce((prev, curr) => (prev += curr.amount), 0)
                      ?.toLocaleString()
                  : 0}
              </div>
              <p className='text-muted-foreground text-xs'>
                Total Debit + Credit on this account
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your latest financial activity
                </CardDescription>
              </div>
              <Button variant='outline' size='sm' asChild>
                <Link to='/dashboard/agent/history'>View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            {transactionDataIsLoding ?? (
              <>
                {Array.from<number>({ length: 5 }).map((item) => (
                  <>
                    <Skeleton key={item} className='my-3 w-full h-10' />
                    <Separator className='w-full' />
                  </>
                ))}
              </>
            )}
            {transactionData?.data && userData?.data && (
              <TransactionDisplay
                skip={0}
                limit={5}
                userId={userData.data._id}
                transactionsData={transactionData.data}
              />
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {/* <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your finances efficiently</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='gap-4 grid grid-cols-2 md:grid-cols-4'>
              <Button
                className='flex-col gap-2 bg-transparent h-20'
                variant='outline'
              >
                <CreditCard className='w-6 h-6' />
                <span className='text-sm'>Transfer</span>
              </Button>
              <Button
                className='flex-col gap-2 bg-transparent h-20'
                variant='outline'
              >
                <DollarSign className='w-6 h-6' />
                <span className='text-sm'>Pay Bills</span>
              </Button>
              <Button
                className='flex-col gap-2 bg-transparent h-20'
                variant='outline'
              >
                <TrendingUp className='w-6 h-6' />
                <span className='text-sm'>Invest</span>
              </Button>
              <Button
                className='flex-col gap-2 bg-transparent h-20'
                variant='outline'
              >
                <ArrowUpRight className='w-6 h-6' />
                <span className='text-sm'>Export</span>
              </Button>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
