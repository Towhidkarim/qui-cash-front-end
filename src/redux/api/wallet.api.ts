import type { TResponse, TWallet } from '@/lib/types';
import { baseApi } from './base.api';

export const walletApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyWallet: build.query<TResponse<TWallet>, undefined>({
      query: () => ({
        url: '/wallet/me',
        method: 'GET',
      }),
      providesTags: ['WALLET'],
    }),
  }),
});

export const { useGetMyWalletQuery } = walletApi;
