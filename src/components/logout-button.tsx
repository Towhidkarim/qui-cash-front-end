import { Button } from './ui/button';
import { useAppDispatch } from '@/redux/hook';
import { userApi } from '@/redux/api/user.api';
import { useNavigate } from 'react-router';
import { authApi } from '@/redux/api/auth.api';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

export default function LogOutButton({
  variant,
  className,
}: {
  variant?: 'default' | 'ghost' | 'outline';
  className?: string;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogOut = async () => {
    dispatch(authApi.util.resetApiState());
    dispatch(userApi.util.resetApiState());
    localStorage.setItem('access_token', '');
    setOpen(false);
    navigate('/');
  };
  return (
    // <Button
    //   variant={variant ?? 'default'}
    //   className={className ?? ''}
    //   onClick={handleLogOut}
    // >
    //   Log Out
    // </Button>

    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger asChild>
        <Button>Log Out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be logged out of your account and will have to sign in
            again to continue
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          <Button
            variant={variant ?? 'default'}
            className={className ?? ''}
            onClick={handleLogOut}
          >
            Log Out
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
