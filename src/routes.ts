import { createBrowserRouter } from 'react-router';
import App from './App';
import HomePage from './pages/homepage/homepage';
import FeaturesPage from './pages/featurespage';
import PricingPage from './pages/homepage/pricingpage';
import AboutPage from './pages/aboutpage';
import FAQPage from './pages/faqpage';
import LoginPage from './pages/loginpage';
import SignUpPage from './pages/signuppage';
import { UserDashboard } from './pages/dashboard/user/user.dashboard';
import { withAuth } from './lib/withAuth';
import UserHomeDashboard from './pages/dashboard/user/home.user.dashboard';
import TransactionHistoryUser from './pages/dashboard/user/history.user.dashboard';
import SendMoneyPage from './pages/dashboard/user/send-money.user';
import CashOutPage from './pages/dashboard/user/cash-out.user';

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      { Component: HomePage, index: true },
      { path: 'features', Component: FeaturesPage },
      { path: 'pricing', Component: PricingPage },
      { path: 'about', Component: AboutPage },
      { path: 'faq', Component: FAQPage },
    ],
  },
  {
    path: '/signin',
    Component: LoginPage,
  },
  {
    path: '/signup',
    Component: SignUpPage,
  },
  {
    path: '/dashboard/user',
    Component: withAuth(UserDashboard, ['user', 'admin']),
    children: [
      { Component: UserHomeDashboard, index: true },
      { path: 'history', Component: TransactionHistoryUser },
      { path: 'send-money', Component: SendMoneyPage },
      { path: 'cash-out', Component: CashOutPage },
    ],
  },
]);
