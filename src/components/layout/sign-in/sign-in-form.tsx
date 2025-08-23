'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// import { toast } from 'sonner';
import { useRef } from 'react';
// import { Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useSignInMutation } from '@/redux/api/auth.api';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'form'>) {
  const phoneRef = useRef('');
  const passwordRef = useRef('');

  const navigate = useNavigate();

  const [signIn, { isLoading }] = useSignInMutation();

  const formOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn({
        phoneNumber: phoneRef.current,
        password: passwordRef.current,
      }).unwrap();
      console.log('Login successful:', result);
      if (result.data && result.statusCode === 200) {
        const accessToken = result.data?.accessToken;
        if (accessToken) localStorage.setItem('access_token', accessToken);
        toast.success('Signed In Succesfully!');
        if (['user', 'admin'].includes(result.data.userInfo.role))
          navigate('/dashboard/user');
      } else toast.error('Invalid Credential!');
    } catch {
      // console.error('Login failed:', err);
      toast.error('Invalid Credential!');
    }
  };
  return (
    <form
      onSubmit={formOnSubmit}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='font-bold text-2xl'>Login to your account</h1>
        <p className='text-muted-foreground text-sm text-balance'>
          Enter your email below to login to your account
        </p>
      </div>
      <div className='gap-6 grid'>
        <div className='gap-3 grid'>
          <Label htmlFor='email'>Phone Number</Label>
          <Input
            id='phone'
            type='tel'
            onChange={(e) => (phoneRef.current = e.target.value)}
            placeholder='017xxxxxxxx'
            required
          />
        </div>
        <div className='gap-3 grid'>
          <div className='flex items-center'>
            <Label htmlFor='password'>Password</Label>
            <a
              href='#'
              className='ml-auto text-sm hover:underline underline-offset-4'
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id='password'
            type='password'
            minLength={6}
            onChange={(e) => (passwordRef.current = e.target.value)}
            placeholder='******'
            required
          />
        </div>
        <Button disabled={isLoading} type='submit' className='w-full'>
          {isLoading && <Loader2 className='animate-spin' />}
          Login
        </Button>
        <div className='after:top-1/2 after:z-0 after:absolute relative after:inset-0 after:flex after:items-center after:border-t after:border-border text-sm text-center'>
          <span className='z-10 relative bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>
      <div className='text-sm text-center'>
        Don&apos;t have an account?{' '}
        <Link to='/signup' className='underline underline-offset-4'>
          Sign up
        </Link>
      </div>
    </form>
  );
}
