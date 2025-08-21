import { createBrowserRouter } from 'react-router';
import App from './App';
import HomePage from './pages/homepage/homepage';
import FeaturesPage from './pages/featurespage';
import PricingPage from './pages/homepage/pricingpage';
import AboutPage from './pages/aboutpage';
import FAQPage from './pages/faqpage';
import LoginPage from './pages/loginpage';
import SignUpPage from './pages/signuppage';

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
]);
