import React from 'react';
import Footer from '../../components/Common/Footer';
import Navigation from '../../components/Navigation/Navigation';

import PaymentComponent from '../../components/Payment/Payment';

const Payment = () => {
  return (
    <>
      <Navigation />
      <PaymentComponent />
      <Footer />
    </>
  );
};

export default Payment;
