import { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Filter,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
} from 'lucide-react';
import { useGetAllTransactionsQuery } from '@/redux/api/transaction.api';
import type { TTRansaction } from '@/lib/types';
import { format } from 'date-fns';

const ITEMS_PER_PAGE = 15;

export default function ManageTransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [transaction, setTransactions] = useState<TTRansaction[]>([]);
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [amountFilter, setAmountFilter] = useState({ min: '', max: '' });
  const [currentPage, setCurrentPage] = useState(1);

  const { data: transactionsData } = useGetAllTransactionsQuery(undefined);
  useEffect(() => {
    if (transactionsData?.data) setTransactions(transactionsData.data);
  }, [transactionsData?.data]);

  const filteredTransactions = useMemo(() => {
    return transaction.filter((transaction) => {
      const matchesSearch =
        transaction.initiatorName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.recipientName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesType =
        typeFilter === 'all' || transaction.transactionType === typeFilter;
      const matchesStatus =
        statusFilter === 'all' ||
        transaction.transactionStatus === statusFilter;

      const matchesAmount =
        (amountFilter.min === '' ||
          transaction.amount >= Number.parseFloat(amountFilter.min)) &&
        (amountFilter.max === '' ||
          transaction.amount <= Number.parseFloat(amountFilter.max));

      return matchesSearch && matchesType && matchesStatus && matchesAmount;
    });
  }, [searchTerm, typeFilter, statusFilter, amountFilter, transaction]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Statistics
  const stats = useMemo(() => {
    const total = filteredTransactions.length;
    const successful = filteredTransactions.filter(
      (t) =>
        t.transactionStatus !== 'failed' && t.transactionStatus !== 'pending'
    ).length;
    const pending = filteredTransactions.filter(
      (t) => t.transactionStatus === 'pending'
    ).length;
    const failed = filteredTransactions.filter(
      (t) => t.transactionStatus === 'failed'
    ).length;
    const totalAmount = filteredTransactions
      .filter((t) => t.transactionStatus !== 'failed')
      .reduce((sum, t) => sum + t.amount, 0);

    return { total, successful, pending, failed, totalAmount };
  }, [filteredTransactions]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'successful':
        return (
          <Badge className='bg-green-100 hover:bg-green-100 text-green-800'>
            Successful
          </Badge>
        );
      case 'pending':
        return (
          <Badge className='bg-yellow-100 hover:bg-yellow-100 text-yellow-800'>
            Pending
          </Badge>
        );
      case 'failed':
        return (
          <Badge className='bg-red-100 hover:bg-red-100 text-red-800'>
            Failed
          </Badge>
        );
      default:
        return <Badge variant='secondary'>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeMap = {
      cashIn: {
        label: 'Cash In',
        className: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
      },
      cashOut: {
        label: 'Cash Out',
        className: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
      },
      sendMoney: {
        label: 'Send Money',
        className: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100',
      },
      addMoneyAdmin: {
        label: 'Add Money (Admin)',
        className: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
      },
    };

    const typeInfo = typeMap[type as keyof typeof typeMap] || {
      label: type,
      className: 'bg-gray-100 text-gray-800',
    };
    return <Badge className={typeInfo.className}>{typeInfo.label}</Badge>;
  };

  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStatusFilter('all');
    setAmountFilter({ min: '', max: '' });
    setCurrentPage(1);
  };

  return (
    <div className='bg-background p-6 min-h-screen'>
      <div className='space-y-6 mx-auto max-w-7xl'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='font-bold text-foreground text-3xl'>
              Transaction Management
            </h1>
            <p className='text-muted-foreground'>
              Monitor and analyze all transaction activities
            </p>
          </div>
          <div className='flex gap-2'>
            {/* <Button variant='outline' size='sm'>
            <Button variant='outline' size='sm'>
              <RefreshCw className='mr-2 w-4 h-4' />
              Refresh
            </Button> */}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5'>
          <Card>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-sm'>
                Total Transactions
              </CardTitle>
              <Users className='w-4 h-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-primary text-2xl'>
                {stats.total}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-sm'>Successful</CardTitle>
              <TrendingUp className='w-4 h-4 text-green-600' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-green-600 text-2xl'>
                {stats.successful}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-sm'>Pending</CardTitle>
              <RefreshCw className='w-4 h-4 text-yellow-600' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-yellow-600 text-2xl'>
                {stats.pending}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-sm'>Failed</CardTitle>
              <TrendingDown className='w-4 h-4 text-red-600' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-red-600 text-2xl'>
                {stats.failed}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-sm'>
                Total Volume
              </CardTitle>
              <DollarSign className='w-4 h-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-primary text-2xl'>
                TK&nbsp;{stats.totalAmount.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Filter className='w-5 h-5' />
              Filters & Search
            </CardTitle>
            <CardDescription>
              Search and filter transactions by various criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6'>
              {/* Search */}
              <div className='lg:col-span-2'>
                <div className='relative'>
                  <Search className='top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform' />
                  <Input
                    placeholder='Search by names...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='pl-10'
                  />
                </div>
              </div>

              {/* Type Filter */}
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder='Transaction Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Types</SelectItem>
                  <SelectItem value='cashIn'>Cash In</SelectItem>
                  <SelectItem value='cashOut'>Cash Out</SelectItem>
                  <SelectItem value='sendMoney'>Send Money</SelectItem>
                  <SelectItem value='addMoneyAdmin'>
                    Add Money (Admin)
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Status</SelectItem>
                  <SelectItem value='succesful'>Successful</SelectItem>
                  <SelectItem value='pending'>Pending</SelectItem>
                  <SelectItem value='failed'>Failed</SelectItem>
                </SelectContent>
              </Select>

              {/* Amount Range */}
              <Input
                placeholder='Min Amount'
                type='number'
                value={amountFilter.min}
                onChange={(e) =>
                  setAmountFilter((prev) => ({ ...prev, min: e.target.value }))
                }
              />

              <Input
                placeholder='Max Amount'
                type='number'
                value={amountFilter.max}
                onChange={(e) =>
                  setAmountFilter((prev) => ({ ...prev, max: e.target.value }))
                }
              />
            </div>

            <div className='flex justify-between items-center mt-4'>
              <p className='text-muted-foreground text-sm'>
                Showing {paginatedTransactions.length} of{' '}
                {filteredTransactions.length} transactions
              </p>
              <Button variant='outline' size='sm' onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction Records</CardTitle>
            <CardDescription>
              Detailed view of all transaction activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='border rounded-md'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Initiator</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className='py-8 text-muted-foreground text-center'
                      >
                        No transactions found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    paginatedTransactions.map((transaction) => (
                      <TableRow
                        key={transaction._id}
                        className='hover:bg-muted/50'
                      >
                        <TableCell className='font-medium'>
                          {transaction.initiatorName}
                        </TableCell>
                        <TableCell>{transaction.recipientName}</TableCell>
                        <TableCell className='font-mono'>
                          TK&nbsp;{transaction.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {getTypeBadge(transaction.transactionType)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(transaction.transactionStatus)}
                        </TableCell>
                        <TableCell className='text-muted-foreground'>
                          {/* {new Date(transaction.createdAt).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )} */}
                          {format(new Date(transaction.createdAt), 'p, PP')}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='flex justify-between items-center mt-4'>
                <div className='text-muted-foreground text-sm'>
                  Page {currentPage} of {totalPages}
                </div>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
