import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQuery(),
  //   baseQuery: fetchBaseQuery({
  //     baseUrl: config.baseUrl,
  //     credentials: "include",
  //   }),
  tagTypes: ['USER', 'TRANSACTION', 'WALLET', 'ALL_USERS', 'ALL_TRANSACTIONS'],
  endpoints: () => ({}),
});
