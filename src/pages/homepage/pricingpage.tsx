import { Check } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COMISSIONS } from '@/lib/constants';

export default function PricingPage() {
  return (
    <section className='my-10'>
      <div className='mx-auto my-4 px-4 py-2 border border-primary/50 rounded-2xl w-56 font-medium text-center'>
        Our Transaction Rates
      </div>
      <div className='bg-background px-4 py-10 min-h-screen'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-12 text-center'>
            <h1 className='mb-4 font-bold text-foreground text-4xl'>
              Transparent Rate Structure
            </h1>
            <p className='mx-auto max-w-2xl text-muted-foreground text-lg'>
              Simple, competitive rates designed to grow with your business. No
              hidden fees, no surprises - just transparent pricing you can
              trust.
            </p>
          </div>

          <div className='gap-8 grid md:grid-cols-2 mx-auto max-w-3xl'>
            <Card className='relative hover:shadow-lg border-2 transition-shadow duration-300'>
              <CardHeader className='pb-4 text-center'>
                <CardTitle className='font-semibold text-card-foreground text-xl'>
                  Personal Transactions
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  Perfect for individual users
                </CardDescription>
              </CardHeader>
              <CardContent className='text-center'>
                <div className='mb-6'>
                  <span className='font-bold text-primary text-5xl'>
                    {COMISSIONS.sendMoney * 100}
                  </span>
                  <span className='font-semibold text-primary text-2xl'>%</span>
                  <p className='mt-2 text-muted-foreground text-sm'>
                    per transaction
                  </p>
                </div>

                <div className='space-y-3 mb-8'>
                  <div className='flex justify-center items-center gap-2'>
                    <Check className='w-4 h-4 text-primary' />
                    <span className='text-card-foreground text-sm'>
                      Instant processing
                    </span>
                  </div>
                  <div className='flex justify-center items-center gap-2'>
                    <Check className='w-4 h-4 text-primary' />
                    <span className='text-card-foreground text-sm'>
                      24/7 support
                    </span>
                  </div>
                  <div className='flex justify-center items-center gap-2'>
                    <Check className='w-4 h-4 text-primary' />
                    <span className='text-card-foreground text-sm'>
                      Secure transactions
                    </span>
                  </div>
                </div>

                <Button variant='outline' className='w-full'>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Agent Transactions Card */}
            <Card className='relative hover:shadow-lg border-2 border-primary transition-shadow duration-300'>
              <div className='-top-3 left-1/2 absolute -translate-x-1/2 transform'>
                <span className='bg-primary px-4 py-1 rounded-full font-medium text-primary-foreground text-sm'>
                  For Agents
                </span>
              </div>
              <CardHeader className='pt-8 pb-4 text-center'>
                <CardTitle className='font-semibold text-card-foreground text-xl'>
                  Agent Transactions
                </CardTitle>
                <CardDescription className='text-muted-foreground'>
                  Ideal for real estate professionals
                </CardDescription>
              </CardHeader>
              <CardContent className='text-center'>
                <div className='mb-6'>
                  <span className='font-bold text-primary text-5xl'>
                    {COMISSIONS.cashOut * 100}
                  </span>
                  <span className='font-semibold text-primary text-2xl'>%</span>
                  <p className='mt-2 text-muted-foreground text-sm'>
                    commission rate
                  </p>
                </div>

                <div className='space-y-3 mb-8'>
                  <div className='flex justify-center items-center gap-2'>
                    <Check className='w-4 h-4 text-primary' />
                    <span className='text-card-foreground text-sm'>
                      Priority processing
                    </span>
                  </div>
                  <div className='flex justify-center items-center gap-2'>
                    <Check className='w-4 h-4 text-primary' />
                    <span className='text-card-foreground text-sm'>
                      Dedicated support
                    </span>
                  </div>
                  <div className='flex justify-center items-center gap-2'>
                    <Check className='w-4 h-4 text-primary' />
                    <span className='text-card-foreground text-sm'>
                      Advanced analytics
                    </span>
                  </div>
                  <div className='flex justify-center items-center gap-2'>
                    <Check className='w-4 h-4 text-primary' />
                    <span className='text-card-foreground text-sm'>
                      Commission tracking
                    </span>
                  </div>
                </div>

                <Button className='w-full'>Start Now</Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div className='mt-12 text-center'>
            <p className='mb-4 text-muted-foreground'>
              All rates are calculated on successful transactions only. No setup
              fees or monthly charges.
            </p>
            <div className='flex justify-center items-center gap-2 text-muted-foreground text-sm'>
              <Check className='w-4 h-4 text-primary' />
              <span>No hidden fees</span>
              <span className='mx-2'>•</span>
              <Check className='w-4 h-4 text-primary' />
              <span>Cancel anytime</span>
              <span className='mx-2'>•</span>
              <Check className='w-4 h-4 text-primary' />
              <span>Enterprise solutions available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
