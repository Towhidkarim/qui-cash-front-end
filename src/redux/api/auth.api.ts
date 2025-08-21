import type { TResponse, TUserData, TWallet } from '@/lib/types';
import { baseApi } from './base.api';

type TSignInCredentials = {
  phoneNumber: string;
  password: string;
};

type TSignUpCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

type TSignInResponse = {
  accessToken: string;
  refreshToken: string;
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<TResponse<TSignInResponse>, TSignInCredentials>({
      query: (credentials) => ({
        url: '/auth/sign-in',
        method: 'POST',
        data: credentials,
      }),
    }),
    signUp: build.mutation<
      TResponse<{ newUser: TUserData; newWallet: TWallet }>,
      TSignUpCredentials
    >({
      query: (userInfo) => ({
        url: '/auth/sign-up',
        method: 'POST',
        data: userInfo,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
