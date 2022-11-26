import React, { useEffect } from 'react';

import BrowseComponent from '../../components/Browse/Browse';
import Footer from '../../components/Common/Footer';
import { withRouteParams } from '../../components/hoc/withRouteParams';
import Navigation from '../../components/Navigation/Navigation';
import { useBrowse } from '../../hooks/browse';

const Browse = ({ searchParams }) => {
  const { fetched, fetching, articles, err, lastQuery, browse } = useBrowse();

  // fetch on component mount
  useEffect(() => {
    browse(searchParams.query || lastQuery);
  }, []);

  const handleMakeSearch = (query) => browse(query);

  return (
    <>
      <Navigation />
      <BrowseComponent
        fetching={fetching}
        handleMakeSearch={handleMakeSearch}
        products={articles || null}
      />
      <Footer />
    </>
  );
};

export default withRouteParams(Browse);
