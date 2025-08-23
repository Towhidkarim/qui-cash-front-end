import type { TResponse, TUserData } from '@/lib/types';
import { baseApi } from './base.api';

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyUserInfo: build.query<TResponse<TUserData>, undefined>({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      }),
      providesTags: ['USER'],
    }),
    getUserInfoByPhoneNumber: build.query<TResponse<TUserData | null>, string>({
      query: (phoneNumber: string) => ({
        url: `/user/phone-number/${phoneNumber}`,
        method: 'GET',
      }),
    }),
    updateUserInfo: build.mutation<
      TResponse<TUserData | null>,
      {
        userId: string;
        firstName: string;
        lastName: string;
        email: string;
      }
    >({
      query: (data) => ({
        url: `/user/update/${data.userId}`,
        method: 'PATCH',
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        },
      }),
      invalidatesTags: ['USER'],
    }),
    updateUserPassword: build.mutation<
      TResponse<TUserData | null>,
      {
        oldPassword: string;
        newPassword: string;
      }
    >({
      query: (data) => ({
        url: `/user/change-password`,
        method: 'PATCH',
        data,
      }),
      invalidatesTags: ['USER'],
    }),
  }),
});

export const {
  useGetMyUserInfoQuery,
  useLazyGetUserInfoByPhoneNumberQuery,
  useUpdateUserInfoMutation,
  useUpdateUserPasswordMutation,
} = userApi;
