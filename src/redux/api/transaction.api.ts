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
      invalidatesTags: ['TRANSACTION', 'WALLET', 'ALL_TRANSACTIONS'],
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
      invalidatesTags: ['TRANSACTION', 'WALLET', 'ALL_TRANSACTIONS'],
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
      invalidatesTags: ['TRANSACTION', 'WALLET', 'ALL_TRANSACTIONS'],
    }),
    getAllTransactions: build.query<TResponse<TTRansaction[]>, undefined>({
      query: (data) => ({
        url: '/transaction/get-all',
        method: 'GET',
        data,
      }),
      providesTags: ['ALL_TRANSACTIONS'],
    }),
    addMoneyAdmin: build.mutation<
      TResponse<TTRansaction>,
      {
        recipientPhoneNumber: string;
        amount: number;
      }
    >({
      query: (data) => ({
        url: '/transaction/add-money-admin',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['TRANSACTION', 'ALL_TRANSACTIONS'],
    }),
  }),
});

export const {
  useGetMyTransactionsQuery,
  useSendMoneyMutation,
  useCashOutMutation,
  useCashInMutation,
  useGetAllTransactionsQuery,
  useAddMoneyAdminMutation,
} = transactionApi;
