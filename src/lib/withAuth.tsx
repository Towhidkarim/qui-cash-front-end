import { useGetMyUserInfoQuery } from '@/redux/api/user.api';
import { type TRoles } from './types';
import { type ComponentType } from 'react';
import { Navigate } from 'react-router';

export const withAuth = (Component: ComponentType, requiredRole: TRoles[]) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetMyUserInfoQuery(undefined);
    if (!isLoading && !data?.data?.email) {
      return <Navigate to='/signin' />;
    }

    if (
      data?.data?.role &&
      !isLoading &&
      !requiredRole.includes(data?.data?.role)
    ) {
      console.log(data);
      return <Navigate to='/' />;
    }

    return <Component />;
  };
};
