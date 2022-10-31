import React from 'react';

import BrowseComponent from '../../components/Browse/Browse';
import Footer from '../../components/Common/Footer';
import Navigation from '../../components/Navigation/Navigation';

const Browse = () => {
  return (
    <>
      <Navigation />
      <BrowseComponent />
      <Footer />
    </>
  );
};

export default Browse;
