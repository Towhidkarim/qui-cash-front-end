import { Outlet, ScrollRestoration } from 'react-router';
import NavBar from './components/layout/navbar';
import { ThemeProvider } from './components/theme-provider';
import FooterSection from './components/layout/footer';

function App() {
  return (
    <main>
      <ThemeProvider>
        <NavBar />
        <ScrollRestoration />
        <Outlet />
        <FooterSection />
      </ThemeProvider>
    </main>
  );
}

export default App;
