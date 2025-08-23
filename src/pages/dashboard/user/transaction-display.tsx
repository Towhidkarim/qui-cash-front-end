import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { TTRansaction } from '@/lib/types';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { format } from 'date-fns';
import { ArrowRight, MoreHorizontal } from 'lucide-react';

export default function TransactionDisplay({
  skip = 0,
  limit = 10,
  transactionsData,
  userId,
}: {
  skip: number;
  limit: number;
  userId: string;
  transactionsData: TTRansaction[];
}) {
  const transactionDataReversed = transactionsData
    .map((item) => item)
    .reverse();
  const transactionDataRefined = transactionDataReversed.filter(
    (_item, index) => index >= skip && index <= limit
  );
  return (
    <>
      {transactionDataRefined.map((transaction, index) => (
        <div key={transaction._id}>
          <div className='group flex justify-between items-center hover:bg-muted/50 p-4 rounded-lg transition-colors'>
            <div className='flex items-center gap-4'>
              <div
                className={`p-2 rounded-full ${
                  transaction.transactionType === 'sendMoney'
                    ? 'bg-chart-2/10 text-chart-2'
                    : 'bg-chart-5/10 text-chart-5'
                }`}
              >
                {/* {transaction.type === 'credit' ? (
                            <ArrowUpRight className='w-4 h-4' />
                          ) : (
                            <ArrowDownLeft className='w-4 h-4' />
                          )} */}
              </div>
              <div>
                <div className='flex flex-row gap-2'>
                  <p className='font-medium text-foreground'>
                    {transaction.initiatorName}
                  </p>
                  <ArrowRight />
                  <p className='font-medium text-foreground'>
                    {transaction.recipientName}
                  </p>
                </div>
                <div className='flex items-center gap-2 mt-1'>
                  <p className='text-muted-foreground text-sm'>
                    {format(new Date(transaction.createdAt), 'p, PP')}
                  </p>
                  <Badge variant='secondary' className='text-xs capitalize'>
                    {transaction.transactionType}
                  </Badge>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <span
                className={`font-semibold ${
                  ['addMoneyAdmin', 'cashIn', 'sendMoney'].includes(
                    transaction.transactionType
                  ) && transaction.recipientId === userId
                    ? 'text-chart-5'
                    : 'text-chart-2'
                }`}
              >
                {(transaction.transactionType === 'addMoneyAdmin' ||
                  transaction.transactionType === 'cashIn') &&
                transaction.recipientId === userId
                  ? '+'
                  : ''}
                TK&nbsp;
                {Math.abs(transaction.amount).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </span>
              <Button
                variant='ghost'
                size='sm'
                className='opacity-0 group-hover:opacity-100 transition-opacity'
              >
                <MoreHorizontal className='w-4 h-4' />
              </Button>
            </div>
          </div>
          {index < (transactionDataRefined.length ?? 0) - 1 && <Separator />}
        </div>
      ))}
    </>
  );
}
