import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import Login from '../../containers/Login/Login';
import Signup from '../../containers/Signup/Signup';
import Home from '../../containers/Home/Home';
import Browse from '../../containers/Browse/Browse';
import Article from '../../containers/Article/Article';
import Cart from '../../containers/Cart/Cart';
import Payment from '../../containers/Payment/Payment';

const RoutesComponent = () => {
  const { fetched } = useAuth();

  if (!fetched) return <></>;

  return (
    <Router>
      <Routes>
        {/* Public Only Routes */}
        <Route exact path='/login' element={<PublicRoute />}>
          <Route exact path='/login' element={<Login />} />
        </Route>
        <Route exact path='/signup' element={<PublicRoute />}>
          <Route exact path='/signup' element={<Signup />} />
        </Route>
        <Route exact path='/create-an-account' element={<PublicRoute />}>
          <Route exact path='/create-an-account' element={<Home />} />
        </Route>

        {/* Private Only Routes */}
        <Route exact path='/profile' element={<PrivateRoute />}>
          <Route exact path='/profile' element={<Home />} />
        </Route>
        <Route exact path='/cart' element={<PrivateRoute />}>
          <Route exact path='/cart' element={<Cart />} />
        </Route>
        <Route exact path='/planner' element={<PrivateRoute />}>
          <Route exact path='/planner' element={<Cart />} />
        </Route>
        <Route exact path='/payment' element={<PrivateRoute />}>
          <Route exact path='/payment' element={<Payment />} />
        </Route>
        <Route exact path='/payment/cart' element={<PrivateRoute />}>
          <Route exact path='/payment/cart' element={<Payment />} />
        </Route>
        <Route exact path='/payment/planner' element={<PrivateRoute />}>
          <Route exact path='/payment/planner' element={<Payment />} />
        </Route>

        {/* General Routes */}
        <Route exact path='/' element={<Home />} />
        <Route exact path='/browse' element={<Browse />} />
        <Route exact path='/article/:id' element={<Article />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
