import type { TResponse, TTRansaction } from '@/lib/types';
import { baseApi } from './base.api';

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyTransactions: build.query<TResponse<TTRansaction[]>, undefined>({
      query: () => ({
        url: '/transaction/me',
        method: 'GET',
      }),
      providesTags: ['TRANSACTION'],
    }),
    sendMoney: build.mutation<
      TResponse<TTRansaction>,
      { recipientPhoneNumber: string; amount: number }
    >({
      query: (data) => ({
        url: '/transaction/send-money',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['TRANSACTION', 'WALLET'],
    }),
    cashOut: build.mutation<
      TResponse<TTRansaction>,
      { recipientPhoneNumber: string; amount: number }
    >({
      query: (data) => ({
        url: '/transaction/cash-out',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['TRANSACTION', 'WALLET'],
    }),
    cashIn: build.mutation<
      TResponse<TTRansaction>,
      { recipientPhoneNumber: string; amount: number }
    >({
      query: (data) => ({
        url: '/transaction/cash-in',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['TRANSACTION', 'WALLET'],
    }),
  }),
});

export const {
  useGetMyTransactionsQuery,
  useSendMoneyMutation,
  useCashOutMutation,
  useCashInMutation,
} = transactionApi;
