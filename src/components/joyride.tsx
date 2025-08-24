import { tourLocalStorageKey } from '@/lib/constants';
import Joyride from 'react-joyride';

const steps = [
  {
    target: '#nav-url-items',
    content: 'You can click here from anywhere to return to our base site',
  },

  {
    target: '#hero',
    content: 'Welcome to QuiCash!!',
  },
  {
    target: '#logo',
    content: 'You can click here from anywhere to return to our base site',
  },
  {
    target: '#theme-section',
    content:
      'Here you can choose your preferred theme, navigate to your dashboard according to your respective role, and log out',
  },
  {
    target: '#cta',
    content: 'You can go to the sign up page from here',
  },
  {
    target: 'footer',
    content: 'Footer section with necessary information',
  },
  {
    target: '#quick-links',
    content: 'Quick Links Here that you can choose to visit anywhere',
  },
];

export default function JoyRide() {
  const valueFromLocalStorage = localStorage.getItem(tourLocalStorageKey);
  const runTour =
    !valueFromLocalStorage || valueFromLocalStorage === 'false' ? true : false;
  console.log(runTour);
  return (
    <>
      {/* <Button onClick={() => setRunTour(true)}>Start Tour</Button> */}
      <Joyride
        continuous
        showProgress
        showSkipButton
        run={runTour}
        steps={steps}
        callback={() => localStorage.setItem(tourLocalStorageKey, 'true')}
        styles={{ overlay: { zIndex: 100 } }}
      />
      ;
    </>
  );
}
