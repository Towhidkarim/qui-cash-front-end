import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import {
  CheckCircle,
  Eye,
  EyeOff,
  Settings,
  User,
  Lock,
  Mail,
  Phone,
  Mountain,
} from 'lucide-react';
import {
  useGetMyUserInfoQuery,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
} from '@/redux/api/user.api';
import { toast } from 'sonner';
import { tourLocalStorageKey } from '@/lib/constants';

const userUpdateSchema = z.object({
  firstName: z
    .string()
    .regex(
      /^[a-zA-Z]{3,16}$/,
      'First Name must be 3-16 letters with no numbers or symbols'
    )
    .optional(),
  lastName: z
    .string()
    .regex(
      /^[a-zA-Z]{3,16}$/,
      'Last Name must be 3-16 letters with no numbers or symbols'
    )
    .optional(),
  email: z.email().optional(),
});

const passwordUpdateSchema = z
  .object({
    oldPassword: z.string().min(6, 'Password must be at least 6 characters'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type UserUpdateForm = z.infer<typeof userUpdateSchema>;
type PasswordUpdateForm = z.infer<typeof passwordUpdateSchema>;

export default function UserSettingsPage() {
  const { data: userData } = useGetMyUserInfoQuery(undefined);
  const [updateUser] = useUpdateUserInfoMutation();
  const [updatePassword] = useUpdateUserPasswordMutation();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);

  const userForm = useForm<UserUpdateForm>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      firstName: userData?.data?.firstName ?? '',
      lastName: userData?.data?.lastName ?? '',
      email: userData?.data?.email ?? '',
    },
  });

  const passwordForm = useForm<PasswordUpdateForm>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    userForm.setValue('email', userData?.data?.email);
    userForm.setValue('firstName', userData?.data?.firstName);
    userForm.setValue('lastName', userData?.data?.lastName);
  }, [userData?.data, userForm]);

  const onUserSubmit = async (data: UserUpdateForm) => {
    try {
      // Simulate API call
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!userData?.data) return;
      const { email, _id, firstName, lastName } = userData.data;
      const res = await updateUser({
        userId: _id,
        email: data.email ?? email,
        firstName: data.firstName ?? firstName,
        lastName: data.lastName ?? lastName,
      }).unwrap();
      console.log('User info updated:', res);
      toast.success('User Information Updated Succesfully!');
      setUserUpdateSuccess(true);
    } catch (error) {
      toast.success('Something went wrong in the server', {
        description: 'Failed to update user info',
      });
      console.error('Failed to update user info:', error);
    }
  };

  const onPasswordSubmit = async (data: PasswordUpdateForm) => {
    try {
      const res = await updatePassword({
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      }).unwrap();

      setPasswordUpdateSuccess(true);
      toast.success('Password Updated Succesfully!');
      console.log('Password Updated Succesfully!', res);
      passwordForm.reset();
    } catch (error) {
      console.error('Failed to update password:', error);
      toast.error('Incorrect Password!');
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 6)
      return { strength: 0, text: 'Too short', color: 'text-destructive' };
    if (password.length < 8)
      return { strength: 1, text: 'Weak', color: 'text-orange-500' };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password))
      return { strength: 2, text: 'Medium', color: 'text-yellow-500' };
    return { strength: 3, text: 'Strong', color: 'text-green-500' };
  };

  const newPassword = passwordForm.watch('newPassword');
  const passwordStrength = getPasswordStrength(newPassword || '');

  return (
    <div className='bg-background min-h-screen'>
      <div className='mx-auto px-4 py-8 max-w-4xl container'>
        {/* Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-2'>
            <Settings className='w-8 h-8 text-primary' />
            <h1 className='font-bold text-foreground text-3xl'>
              Account Settings
            </h1>
          </div>
          <p className='text-muted-foreground'>
            Manage your account information and security settings
          </p>
        </div>

        <div className='gap-8 grid md:grid-cols-1 lg:grid-cols-2'>
          {/* User Information Section */}
          <Card className='shadow-sm border-border'>
            <CardHeader className='pb-4'>
              <div className='flex items-center gap-2'>
                <User className='w-5 h-5 text-primary' />
                <CardTitle className='text-xl'>User Information</CardTitle>
              </div>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...userForm}>
                <form
                  onSubmit={userForm.handleSubmit(onUserSubmit)}
                  className='space-y-4'
                >
                  <FormField
                    control={userForm.control}
                    name='firstName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2'>
                          <User className='w-4 h-4' />
                          First Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter your first name'
                            {...field}
                            className='focus:border-primary focus:ring-primary'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={userForm.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2'>
                          <User className='w-4 h-4' />
                          Last Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Enter your last name'
                            {...field}
                            className='focus:border-primary focus:ring-primary'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormLabel className='flex items-center gap-2'>
                      <Phone className='w-4 h-4' />
                      Phone Number (Not Changable)
                    </FormLabel>
                    <Input
                      disabled
                      value={userData?.data?.phoneNumber}
                      className='mt-2 focus:border-primary focus:ring-primary'
                    />
                  </div>
                  <FormField
                    control={userForm.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='flex items-center gap-2'>
                          <Mail className='w-4 h-4' />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            placeholder='Enter your email address'
                            {...field}
                            className='focus:border-primary focus:ring-primary'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {userUpdateSuccess && (
                    <div className='flex items-center gap-2 bg-green-50 p-3 rounded-md text-green-600'>
                      <CheckCircle className='w-4 h-4' />
                      <span className='text-sm'>
                        User information updated successfully!
                      </span>
                    </div>
                  )}

                  <div className='flex gap-3 pt-2'>
                    <Button
                      type='submit'
                      className='bg-primary hover:bg-primary/90 text-primary-foreground'
                      disabled={userForm.formState.isSubmitting}
                    >
                      {userForm.formState.isSubmitting
                        ? 'Saving...'
                        : 'Save Changes'}
                    </Button>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => userForm.reset()}
                      className='hover:bg-accent border-border'
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Password Update Section */}
          <Card className='shadow-sm border-border'>
            <CardHeader className='pb-4'>
              <div className='flex items-center gap-2'>
                <Lock className='w-5 h-5 text-primary' />
                <CardTitle className='text-xl'>Update Password</CardTitle>
              </div>
              <CardDescription>
                Change your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form
                  onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                  className='space-y-4'
                >
                  <FormField
                    control={passwordForm.control}
                    name='oldPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              type={showOldPassword ? 'text' : 'password'}
                              placeholder='Enter your current password'
                              {...field}
                              className='pr-10 focus:border-primary focus:ring-primary'
                            />
                            <Button
                              type='button'
                              variant='ghost'
                              size='sm'
                              className='top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full'
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
                              }
                            >
                              {showOldPassword ? (
                                <EyeOff className='w-4 h-4 text-muted-foreground' />
                              ) : (
                                <Eye className='w-4 h-4 text-muted-foreground' />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name='newPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              type={showNewPassword ? 'text' : 'password'}
                              placeholder='Enter your new password'
                              {...field}
                              className='pr-10 focus:border-primary focus:ring-primary'
                            />
                            <Button
                              type='button'
                              variant='ghost'
                              size='sm'
                              className='top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full'
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? (
                                <EyeOff className='w-4 h-4 text-muted-foreground' />
                              ) : (
                                <Eye className='w-4 h-4 text-muted-foreground' />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        {newPassword && (
                          <div className='flex items-center gap-2 mt-1'>
                            <div className='flex-1 bg-muted rounded-full h-2'>
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${
                                  passwordStrength.strength === 1
                                    ? 'bg-orange-500 w-1/4'
                                    : passwordStrength.strength === 2
                                    ? 'bg-yellow-500 w-2/4'
                                    : passwordStrength.strength === 3
                                    ? 'bg-green-500 w-full'
                                    : 'bg-destructive w-1/4'
                                }`}
                              />
                            </div>
                            <span
                              className={`text-xs ${passwordStrength.color}`}
                            >
                              {passwordStrength.text}
                            </span>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={passwordForm.control}
                    name='confirmPassword'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <div className='relative'>
                            <Input
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder='Confirm your new password'
                              {...field}
                              className='pr-10 focus:border-primary focus:ring-primary'
                            />
                            <Button
                              type='button'
                              variant='ghost'
                              size='sm'
                              className='top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full'
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className='w-4 h-4 text-muted-foreground' />
                              ) : (
                                <Eye className='w-4 h-4 text-muted-foreground' />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {passwordUpdateSuccess && (
                    <div className='flex items-center gap-2 bg-green-50 p-3 rounded-md text-green-600'>
                      <CheckCircle className='w-4 h-4' />
                      <span className='text-sm'>
                        Password updated successfully!
                      </span>
                    </div>
                  )}

                  <div className='flex gap-3 pt-2'>
                    <Button
                      type='submit'
                      className='bg-primary hover:bg-primary/90 text-primary-foreground'
                      disabled={passwordForm.formState.isSubmitting}
                    >
                      {passwordForm.formState.isSubmitting
                        ? 'Updating...'
                        : 'Update Password'}
                    </Button>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => passwordForm.reset()}
                      className='hover:bg-accent border-border'
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        {/* Joyride Section  */}
        <Card className='mt-8'>
          <CardHeader>
            <h1 className='font-bold text-2xl'>
              <span>
                <Mountain className='inline-block mx-2 -translate-y-1' />
              </span>
              Guided Tour Settings
            </h1>
            <CardDescription>
              You can go through the initial guided tour again by resetting it
              and going back to the homepage
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-row justify-start items-center gap-4'>
            {/* <CheckCircle /> */}
            <Button
              className='w-44'
              onClick={() => {
                localStorage.setItem(tourLocalStorageKey, 'false');
                toast.success('Guide Reset Succesfully!', {
                  description: 'Go back to the homepage to revisit the guide',
                });
              }}
            >
              Reset Guided Tour{' '}
            </Button>
          </CardContent>
        </Card>
        {/* Security Tips */}
        <Card className='shadow-sm mt-8 border-border'>
          <CardHeader>
            <CardTitle className='text-lg'>Security Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='gap-3 grid text-muted-foreground text-sm'>
              <div className='flex items-start gap-2'>
                <CheckCircle className='flex-shrink-0 mt-0.5 w-4 h-4 text-green-500' />
                <span>
                  Use a strong password with at least 8 characters, including
                  uppercase, lowercase, and numbers
                </span>
              </div>
              <div className='flex items-start gap-2'>
                <CheckCircle className='flex-shrink-0 mt-0.5 w-4 h-4 text-green-500' />
                <span>
                  Never share your password with anyone or use the same password
                  for multiple accounts
                </span>
              </div>
              <div className='flex items-start gap-2'>
                <CheckCircle className='flex-shrink-0 mt-0.5 w-4 h-4 text-green-500' />
                <span>
                  Update your password regularly and immediately if you suspect
                  it has been compromised
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
