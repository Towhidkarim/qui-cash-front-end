import React from 'react';
import { ThemeProvider } from './theme-provider';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Toaster } from './ui/sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Toaster />
        {children}
      </ThemeProvider>
      ;
    </Provider>
  );
}
