import React from 'react';

import CartComponent from '../../components/Cart/Cart';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Common/Footer';

const Cart = () => {
  const planner = window.location.href.includes('/planner');

  return (
    <>
      <Navigation />
      <CartComponent planner={planner} />
      <Footer />
    </>
  );
};

export default Cart;
