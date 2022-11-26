import React from 'react';
import Footer from '../../components/Common/Footer';
import Navigation from '../../components/Navigation/Navigation';

import PaymentComponent from '../../components/Payment/Payment';
import { usePayment } from '../../hooks/payment';

const Payment = () => {
  const { fetched, fetching, total } = usePayment();

  return (
    <>
      <Navigation />
      <PaymentComponent fetched={fetched} fetching={fetching} total={total} />
      <Footer />
    </>
  );
};

export default Payment;
