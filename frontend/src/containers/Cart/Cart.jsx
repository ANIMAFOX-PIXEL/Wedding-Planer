import React from 'react';

import CartComponent from '../../components/Cart/Cart';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Common/Footer';

import { usePlanner } from '../../hooks/planner';

const Cart = () => {
  const { fetched, fetching, planner } = usePlanner();

  return (
    <>
      <Navigation />
      <CartComponent fetched={fetched} fetching={fetching} planner={planner} />
      <Footer />
    </>
  );
};

export default Cart;
