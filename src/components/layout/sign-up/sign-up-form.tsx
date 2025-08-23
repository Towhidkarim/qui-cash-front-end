import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useSignUpMutation } from '@/redux/api/auth.api';
// import { PhoneInput } from '@/components/ui/phone-input'

// import { registerFormSchema } from '@/lib/validation-schemas'

const formSchema = z.object({
  name: z.string().min(3),
  lastName: z.string().min(3),
  email: z.email(),
  phoneNumber: z.string().min(11).max(11),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  role: z.enum(['user', 'agent']),
});

export default function SignUpForm() {
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      role: 'user',
    },
  });

  async function onSubmit({
    name,
    email,
    lastName,
    password,
    phoneNumber,
    confirmPassword,
    role,
  }: z.infer<typeof formSchema>) {
    if (password !== confirmPassword) {
      form.setError(
        'confirmPassword',
        {
          type: 'manual',
          message: "Passwords don't match!",
        },
        { shouldFocus: true }
      );
      return;
    }

    try {
      const response = await signUp({
        email,
        password,
        phoneNumber,
        firstName: name,
        lastName,
        role,
      }).unwrap();
      if (response.statusCode === 200) {
        toast.success('Signed Up Succesfully! Proceeding to Sign In');
        navigate('/signin');
      }
    } catch {
      toast.error('User Already exists');
    }
  }

  return (
    <div className='flex justify-center items-center px-4 w-full h-full min-h-[60vh]'>
      <div className='shadow-none mx-auto'>
        <h1 className='my-4 font-bold text-3xl text-center'>Sign Up</h1>
        <h4 className='text-muted-foreground text-sm'>
          Create a new account by filling out the form below.
        </h4>
        <br />
        <div className=''>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='gap-4 grid'>
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='gap-2 grid'>
                      <FormLabel htmlFor=''>First Name</FormLabel>
                      <FormControl>
                        <Input id='name' placeholder='John' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lastName'
                  render={({ field }) => (
                    <FormItem className='gap-2 grid'>
                      <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                      <FormControl>
                        <Input id='lastName' placeholder='Doe' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='gap-2 grid'>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <FormControl>
                        <Input
                          id='email'
                          placeholder='johndoe@mail.com'
                          type='email'
                          autoComplete='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem className='gap-2 grid'>
                      <FormLabel htmlFor='email'>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          id='phoneNumber'
                          placeholder='017xxxxxxxx'
                          type='tel'
                          autoComplete='tel'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role Field */}
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => (
                    <FormItem className='gap-2 grid'>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select your role' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='user'>User</SelectItem>
                          <SelectItem value='agent'>Agent</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='gap-2 grid'>
                      <FormLabel htmlFor='password'>Password</FormLabel>
                      <FormControl>
                        <Input
                          id='password'
                          type='password'
                          placeholder='******'
                          autoComplete='new-password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem className='gap-2 grid'>
                      <FormLabel htmlFor='confirmPassword'>
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          id='confirmPassword'
                          type='password'
                          placeholder='******'
                          autoComplete='new-password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={isLoading} type='submit' className='w-full'>
                  {isLoading && <Loader2 className='animate-spin' />}
                  Sign Up
                </Button>
              </div>
            </form>
          </Form>
          <div className='mt-4 text-sm text-center'>
            Already have an account?{' '}
            <Link to='/signin' className='underline'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
