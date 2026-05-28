/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Toaster } from 'react-hot-toast';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      
      <Router />

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{

          // Define default options
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
            style: {
              background: 'green',
              color: '#fff',
            },
          },

          error: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
            style: {
              background: 'red',
              color: '#fff',
            },
          },

        }}
      />


    </ThemeProvider>
  );
}
