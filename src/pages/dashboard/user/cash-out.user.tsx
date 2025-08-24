import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Search, User, DollarSign, Send, ArrowLeft, Check } from 'lucide-react';
import { useLazyGetUserInfoByPhoneNumberQuery } from '@/redux/api/user.api';
import type { TUserData } from '@/lib/types';
import { toast } from 'sonner';
import { useCashOutMutation } from '@/redux/api/transaction.api';
import { useNavigate } from 'react-router';

const phoneSchema = z.object({
  phone: z
    .string()
    .min(11, 'Phone number must be at least 10 digits')
    .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format'),
});

const amountSchema = z.object({
  amount: z
    .number()
    .min(20, 'Amount must be at least TK 20')
    .max(10000, 'Amount cannot exceed  TK 100,000'),
});

type Step = 'phone' | 'search' | 'amount' | 'confirm';

export default function CashOutPage() {
  const [triggerGetUserInfo, { isFetching }] =
    useLazyGetUserInfoByPhoneNumberQuery();

  const navigate = useNavigate();

  const [cashOut, { isLoading: transactionIsLoading }] = useCashOutMutation();

  const [currentStep, setCurrentStep] = useState<Step>('phone');
  const [searchResults, setSearchResults] = useState<TUserData | null>(null);
  const [selectedUser, setSelectedUser] = useState<TUserData | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '' },
  });

  const amountForm = useForm<z.infer<typeof amountSchema>>({
    resolver: zodResolver(amountSchema),
    defaultValues: { amount: 0 },
  });

  const handlePhoneSubmit = async (values: z.infer<typeof phoneSchema>) => {
    // setPhoneNumber(values.phone);
    setIsSearching(true);
    const res = await triggerGetUserInfo(values.phone);

    if (res.data?.data?.role !== 'agent') setSearchResults(null);
    else setSearchResults(res.data?.data ?? null);
    setCurrentStep('search');
    setIsSearching(isFetching);
  };

  const handleUserSelect = (user: TUserData) => {
    setSelectedUser(user);
    setCurrentStep('amount');
  };

  const handleAmountSubmit = (values: z.infer<typeof amountSchema>) => {
    setAmount(values.amount);
    setCurrentStep('confirm');
  };

  const handlecashOut = async () => {
    setIsSubmitting(true);
    if (!selectedUser) return;
    const res = await cashOut({
      recipientPhoneNumber: selectedUser.phoneNumber,
      amount,
    });
    console.log(res.data);
    if (!res.data?.data) {
      toast.error('Cash out failed, error occured');
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(transactionIsLoading);
    //   alert('Money sent successfully!');
    toast.success('Cash out successfully!');
    // Reset form
    setCurrentStep('phone');
    setSelectedUser(null);
    setSearchResults(null);
    setPhoneNumber('');
    setAmount(0);
    phoneForm.reset();
    amountForm.reset();
    navigate('/dashboard/user');
  };

  const getStepNumber = (step: Step) => {
    const steps = { phone: 1, search: 2, amount: 3, confirm: 4 };
    return steps[step];
  };

  const isStepComplete = (step: Step) => {
    const currentStepNum = getStepNumber(currentStep);
    const stepNum = getStepNumber(step);
    return stepNum < currentStepNum;
  };

  return (
    <div className='bg-background p-4 min-h-screen'>
      <div className='mx-auto max-w-2xl'>
        {/* Progress Bar */}
        <div className='mb-8'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='font-bold text-foreground text-3xl'>Cash Out</h1>
            <div className='text-muted-foreground text-sm'>
              Step {getStepNumber(currentStep)} of 4
            </div>
          </div>

          <div className='flex items-center space-x-4'>
            {(['phone', 'search', 'amount', 'confirm'] as Step[]).map(
              (step, index) => (
                <div key={step} className='flex items-center'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      isStepComplete(step)
                        ? 'bg-primary text-primary-foreground'
                        : currentStep === step
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isStepComplete(step) ? (
                      <Check className='w-4 h-4' />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < 3 && (
                    <div
                      className={`w-12 h-0.5 ${
                        isStepComplete(
                          (['phone', 'search', 'amount', 'confirm'] as Step[])[
                            index + 1
                          ]
                        )
                          ? 'bg-primary'
                          : 'bg-muted'
                      }`}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Step 1: Phone Number Input */}
        {currentStep === 'phone' && (
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Search className='w-5 h-5' />
                Enter Agent Phone Number
              </CardTitle>
              <CardDescription>
                Enter the phone number of the agent you want to cash out to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...phoneForm}>
                <form
                  onSubmit={phoneForm.handleSubmit(handlePhoneSubmit)}
                  className='space-y-4'
                >
                  <FormField
                    control={phoneForm.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='017xxxxxxxx'
                            {...field}
                            className='text-lg'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type='submit'
                    className='w-full'
                    disabled={isSearching}
                  >
                    {isSearching ? 'Searching...' : 'Search Agent'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: User Selection */}
        {currentStep === 'search' && (
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='w-5 h-5' />
                Select Agent
              </CardTitle>
              <CardDescription>
                Choose the agent from the search results for {phoneNumber}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {searchResults ? (
                  <div
                    key={searchResults._id}
                    onClick={() => handleUserSelect(searchResults)}
                    className='flex items-center gap-3 hover:bg-secondary/50 p-4 border rounded-lg transition-colors cursor-pointer'
                  >
                    <div className='flex justify-center items-center bg-primary rounded-full w-10 h-10 font-medium text-primary-foreground'>
                      {searchResults.firstName[0]}
                    </div>
                    <div className='flex-1'>
                      <div className='font-medium'>
                        {searchResults.firstName + ' ' + searchResults.lastName}
                      </div>
                      <div className='text-muted-foreground text-sm'>
                        {searchResults.phoneNumber}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='py-8 text-muted-foreground text-center'>
                    No agents found for this phone number
                  </div>
                )}
              </div>
              <Button
                variant='outline'
                onClick={() => setCurrentStep('phone')}
                className='mt-4 w-full'
              >
                <ArrowLeft className='mr-2 w-4 h-4' />
                Search Different Number
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Amount Input */}
        {currentStep === 'amount' && selectedUser && (
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <DollarSign className='w-5 h-5' />
                Enter Amount
              </CardTitle>
              <CardDescription>
                How much would you like to cash out to{' '}
                {selectedUser.firstName + ' ' + selectedUser.lastName}?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='bg-secondary/20 mb-4 p-3 rounded-lg'>
                <div className='flex items-center gap-3'>
                  <div className='flex justify-center items-center bg-primary rounded-full w-8 h-8 font-medium text-primary-foreground text-sm'>
                    {selectedUser.firstName[0]}
                  </div>
                  <div>
                    <div className='font-medium'>
                      {selectedUser.firstName + ' ' + selectedUser.lastName}
                    </div>
                    <div className='text-muted-foreground text-sm'>
                      {selectedUser.phoneNumber}
                    </div>
                  </div>
                </div>
              </div>

              <Form {...amountForm}>
                <form
                  onSubmit={amountForm.handleSubmit(handleAmountSubmit)}
                  className='space-y-4'
                >
                  <FormField
                    control={amountForm.control}
                    name='amount'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (BDT)</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='20.00'
                            min='20'
                            max='10000'
                            step='0.01'
                            value={
                              field.value === 0 ? '' : field.value.toString()
                            }
                            onChange={(e) => {
                              const value =
                                e.target.value === ''
                                  ? 0
                                  : Number.parseFloat(e.target.value);
                              field.onChange(isNaN(value) ? 0 : value);
                            }}
                            className='text-lg'
                          />
                        </FormControl>
                        <FormMessage />
                        <div className='text-muted-foreground text-xs'>
                          Minimum amount: TK 20.00 • Maximum amount: TK
                          10,000.00
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className='flex gap-2'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setCurrentStep('search')}
                      className='flex-1'
                    >
                      <ArrowLeft className='mr-2 w-4 h-4' />
                      Back
                    </Button>
                    <Button type='submit' className='flex-1'>
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 'confirm' && selectedUser && (
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Send className='w-5 h-5' />
                Confirm Transaction
              </CardTitle>
              <CardDescription>
                Please review the details before sending money
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='bg-secondary/20 p-4 rounded-lg'>
                  <h3 className='mb-3 font-medium'>Transaction Summary</h3>

                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Agent:</span>
                      <span className='font-medium'>
                        {selectedUser.firstName + ' ' + selectedUser.lastName}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Phone:</span>
                      <span>{selectedUser.phoneNumber}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Amount:</span>
                      <span className='font-medium text-lg'>
                        TK {amount.toFixed(2)}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>
                        Transaction Fee {`(0%)`} :
                      </span>
                      <span>TK {0}</span>
                    </div>
                    <div className='mt-2 pt-2 border-t'>
                      <div className='flex justify-between font-medium'>
                        <span>Total:</span>
                        <span className='text-lg'>TK {amount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    onClick={() => setCurrentStep('amount')}
                    className='flex-1'
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className='mr-2 w-4 h-4' />
                    Back
                  </Button>
                  <Button
                    onClick={handlecashOut}
                    className='flex-1'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Cash Out'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
