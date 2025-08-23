import { Badge } from '@/components/ui/badge';
import type { TTRansaction } from '@/lib/types';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';

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
    <div className='overflow-x-auto overflow-y-hidden'>
      {transactionDataRefined.map((transaction, index) => (
        <div key={transaction._id} className=''>
          <div className='group flex justify-between items-center hover:bg-muted/50 p-4 rounded-lg transition-colors'>
            <div className='flex items-center gap-4'>
              <div
                className={`p-2 hidden md:block rounded-full ${
                  transaction.recipientId === userId
                    ? 'bg-chart-5/10 text-chart-5'
                    : 'bg-chart-2/10 text-chart-2'
                }`}
              >
                {/* {transaction.type === 'credit' ? (
                            <ArrowUpRight className='w-4 h-4' />
                          ) : (
                            <ArrowDownLeft className='w-4 h-4' />
                          )} */}
              </div>
              <div>
                <div className='flex flex-row gap-2 text-sm md:text-base'>
                  <p className='font-medium text-foreground truncate'>
                    {transaction.initiatorName}
                  </p>
                  <ArrowRight />
                  <p className='font-medium text-foreground truncate'>
                    {transaction.recipientName}
                  </p>
                </div>
                <div className='flex items-center gap-2 mt-1'>
                  <p className='text-muted-foreground text-xs md:text-sm'>
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
                  transaction.recipientId === userId
                    ? 'text-chart-5'
                    : 'text-chart-2'
                }`}
              >
                {transaction.recipientId === userId ? '+' : ''}
                TK&nbsp;
                {Math.abs(transaction.amount).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
          {index < (transactionDataRefined.length ?? 0) - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
