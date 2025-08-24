import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetMyTransactionsQuery } from '@/redux/api/transaction.api';
import { useGetMyUserInfoQuery } from '@/redux/api/user.api';
import TransactionDisplay from './transaction-display';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { subDays } from 'date-fns';
import { Separator } from '@/components/ui/separator';

export default function TransactionHistoryUser() {
  const [page, setPage] = useState(0);
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const { data: userData } = useGetMyUserInfoQuery(undefined);
  const { data: transactionData, isLoading: transactionDataIsLoding } =
    useGetMyTransactionsQuery(undefined);

  return (
    <div className='bg-background p-4 md:p-6 lg:p-8 min-h-screen'>
      <div className='flex md:flex-row flex-col md:justify-between md:items-center gap-4'>
        <div className='my-4 max-w-7xl'>
          <h1 className='font-bold text-foreground text-3xl'>
            Transaction History
          </h1>
          <p className='text-muted-foreground'>
            Here's all of your Transaction information.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          {/* <Button variant='outline' size='sm'>
                      <TrendingUp className='mr-2 w-4 h-4' />
                      View Reports
                    </Button> */}
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className='flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your latest financial activity
                </CardDescription>
              </div>
            </div>

            <div className='flex md:flex-row flex-col gap-4'>
              <div className='flex flex-wrap gap-2'>
                <Button
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('all')}
                  size='sm'
                >
                  All
                </Button>
                <Button
                  variant={selectedType === 'send' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('send')}
                  size='sm'
                >
                  Sent
                </Button>
                <Button
                  variant={selectedType === 'receive' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('receive')}
                  size='sm'
                >
                  Received
                </Button>
                <Button
                  variant={selectedType === 'cashout' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('cashout')}
                  size='sm'
                >
                  Cash Out
                </Button>
              </div>
              <Separator orientation='vertical' className='px-4' />
              <div className='flex flex-wrap gap-2'>
                <Button
                  variant={selectedDays === null ? 'default' : 'outline'}
                  onClick={() => setSelectedDays(null)}
                  size='sm'
                >
                  All Time
                </Button>
                <Button
                  variant={selectedDays === 1 ? 'default' : 'outline'}
                  onClick={() => setSelectedDays(1)}
                  size='sm'
                >
                  Last 24h
                </Button>
                <Button
                  variant={selectedDays === 3 ? 'default' : 'outline'}
                  onClick={() => setSelectedDays(3)}
                  size='sm'
                >
                  3 Days
                </Button>
                <Button
                  variant={selectedDays === 7 ? 'default' : 'outline'}
                  onClick={() => setSelectedDays(7)}
                  size='sm'
                >
                  7 Days
                </Button>
                <Button
                  variant={selectedDays === 15 ? 'default' : 'outline'}
                  onClick={() => setSelectedDays(15)}
                  size='sm'
                >
                  15 Days
                </Button>
                <Button
                  variant={selectedDays === 30 ? 'default' : 'outline'}
                  onClick={() => setSelectedDays(30)}
                  size='sm'
                >
                  30 Days
                </Button>
              </div>
            </div>
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
            <>
              <TransactionDisplay
                skip={page * 10}
                limit={page * 10 + 10}
                userId={userData.data._id}
                transactionsData={transactionData.data.filter((transaction) => {
                  if (selectedType !== 'all' && userData.data?._id) {
                    if (
                      selectedType === 'receive' &&
                      transaction.recipientId !== userData.data._id
                    )
                      return false;
                    if (
                      selectedType === 'send' &&
                      transaction.recipientId === userData.data._id
                    )
                      return false;
                    if (
                      selectedType === 'cashout' &&
                      transaction.transactionType !== 'cashOut'
                    )
                      return false;
                  }

                  // Filter by date range
                  if (selectedDays !== null) {
                    const transactionDate = new Date(transaction.createdAt);
                    const cutoffDate = subDays(new Date(), selectedDays);
                    return transactionDate >= cutoffDate;
                  }

                  return true;
                })}
              />
              <div className='flex flex-row justify-center items-center gap-3'>
                prev
                {Array.from({
                  length: Math.ceil(transactionData.data.length / 10),
                }).map((_item, index) => (
                  <Button
                    variant={page === index ? 'default' : 'outline'}
                    onClick={() => setPage(index)}
                    size='icon'
                    key={index}
                  >
                    {index + 1}
                  </Button>
                ))}
                next
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
