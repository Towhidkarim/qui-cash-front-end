import type { TResponse, TUserData } from '@/lib/types';
import { baseApi } from './base.api';

export const authApi = baseApi.injectEndpoints({
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
  }),
});

export const { useGetMyUserInfoQuery, useLazyGetUserInfoByPhoneNumberQuery } =
  authApi;
