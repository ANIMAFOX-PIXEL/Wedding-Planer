import React, { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import HomeComponent from '../../components/Home/Home';
import Footer from '../../components/Common/Footer';

const Home = () => {
  const [{ showScrollTop, lastScroll }, setState] = useState({
    showScrollTop: false,
    lastScroll: 0,
  });

  useEffect(() => {
    if (Math.abs(window.scrollY - lastScroll)) {
      setState((x) => ({
        ...x,
        showScrollTop: window.scrollY <= 300,
        lastScroll: window.scrollY,
      }));
    }
  }, [window.scrollY]);

  const handleScrollTop = () => {};

  return (
    <>
      <Navigation />
      <HomeComponent
        showScrollTop={showScrollTop}
        handleScrollTop={handleScrollTop}
      />
      <Footer />
    </>
  );
};

export default Home;
