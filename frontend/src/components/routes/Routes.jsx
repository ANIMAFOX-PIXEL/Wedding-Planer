import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import Login from '../../containers/Login/Login';
import SignupAction from '../../containers/Signup/Signup';
import Home from '../../containers/Home/Home';
import Browse from '../../containers/Browse/Browse';
import Article from '../../containers/Article/Article';
import Cart from '../../containers/Cart/Cart';
import Payment from '../../containers/Payment/Payment';
import Account from '../Account/Account';
import { BrowseProvider } from '../../hooks/browse';
import { PlannerProvider } from '../../hooks/planner';
import { PaymentProvider } from '../../hooks/payment';

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
          <Route exact path='/signup' element={<SignupAction />} />
        </Route>
        <Route exact path='/create-an-account' element={<PublicRoute />}>
          <Route exact path='/create-an-account' element={<Home />} />
        </Route>

        {/* Private Only Routes */}
        <Route exact path='/account' element={<PrivateRoute />}>
          <Route exact path='/account' element={<Account />} />
        </Route>
        <Route exact path='/planner' element={<PrivateRoute />}>
          <Route
            exact
            path='/planner'
            element={
              <PlannerProvider>
                <Cart />
              </PlannerProvider>
            }
          />
        </Route>
        <Route exact path='/payment' element={<PrivateRoute />}>
          <Route
            exact
            path='/payment'
            element={
              <PaymentProvider>
                <Payment />
              </PaymentProvider>
            }
          />
        </Route>
        <Route exact path='/payment/cart' element={<PrivateRoute />}>
          <Route
            exact
            path='/payment/cart'
            element={
              <PaymentProvider>
                <Payment />
              </PaymentProvider>
            }
          />
        </Route>

        {/* General Routes */}
        <Route exact path='/' element={<Home />} />
        <Route
          exact
          path='/browse'
          element={
            <BrowseProvider>
              <Browse />
            </BrowseProvider>
          }
        />
        <Route exact path='/article/:id' element={<Article />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
