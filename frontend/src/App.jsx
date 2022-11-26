import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';

import LoadingPage from './components/Common/LoadingPage';
import Routes from './components/routes/Routes';

const App = () => {
  return (
    <PayPalScriptProvider
      options={{
        'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
      }}
    >
      <LoadingPage />
      <Routes />
    </PayPalScriptProvider>
  );
};

export default App;
