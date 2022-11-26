import React from 'react';
import { bool, func, string, instanceOf } from 'prop-types';

import SearchField from '../Common/SearchField';
import ProductCard from './ProductCard';

import styled, { keyframes } from 'styled-components';

import FlowerBucketSrc from '../../assets/img/flower-bucket.png';

//#region Styled
const scrollBackgroundAnim = keyframes`
  0% { background-position: 0 0; }
  100% { background-position: -200% 0; }
`;

const Container = styled.div`
  background: repeating-linear-gradient(
    to right,
    #efc8c8 0%,
    #f9ffff 50%,
    #efc8c8 100%
  );
  background-size: 200% auto;
  background-position: 0 100%;
  animation-name: ${scrollBackgroundAnim};
  animation-timing-function: linear;
  animation-duration: 8s;
  animation-iteration-count: infinite;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
  font-family: 'Inter';
  overflow: auto;
`;

const Title = styled.p`
  font-size: 2rem;
`;

const ProductCardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 auto;
  margin-bottom: 2rem;
  justify-content: space-between;
  gap: 1rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
//#endregion

const Browse = ({ fetching, handleMakeSearch, query, products }) => {
  return (
    <Container>
      <Main>
        <SearchField handleMakeSearch={handleMakeSearch} />
        {query && <Title>Results for {query}</Title>}
        <ProductCardContainer>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ProductCardContainer>
      </Main>
    </Container>
  );
};

//#region Mock
const article = {
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem nunc, sodales vel mi sed, vehicula pulvinar neque.',
  media: [FlowerBucketSrc],
  price: 420.69,
};

const FourArticles = [article, article, article, article];

const articles = [
  ...FourArticles,
  ...FourArticles,
  ...FourArticles,
  ...FourArticles,
];
//#endregion

Browse.propTypes = {
  loading: bool.isRequired,
  handleMakeSearch: func.isRequired,
  query: string,
  products: instanceOf(Array),
};

Browse.defaultProps = {
  query: '',
  products: articles,
};

export default Browse;
