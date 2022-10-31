import React from 'react';
import { bool, string, instanceOf } from 'prop-types';

import {
  Container as MUIContainer,
  IconButton,
  TextField,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import styled, { keyframes } from 'styled-components';

import FlowerBucketSrc from '../../assets/img/flower-bucket.png';
import { useNavigate } from 'react-router-dom';

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
`;

const ProductCardWrapper = styled.div`
  flex: 0 0 calc(25% - 1rem);
  aspect-ratio: 351 / 506;
  padding: 1rem;
  background: linear-gradient(180deg, #efc8c8 0%, #f9ffff 100%);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const ProductImage = styled.img`
  display: inline-block;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const ProductText = styled.p`
  font-size: 1rem;
`;

const ProductPrice = styled.p`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const CurrencySymbol = styled.span`
  font-size: 0.5rem;
`;

const PriceInteger = styled.span`
  font-size: 1.2rem;
`;

const PriceCents = styled.span`
  font-size: 0.6rem;
`;

const article = {
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lorem nunc, sodales vel mi sed, vehicula pulvinar neque.',
  src: FlowerBucketSrc,
  price: 420.69,
};

const FourArticles = [article, article, article, article];

const articles = [
  ...FourArticles,
  ...FourArticles,
  ...FourArticles,
  ...FourArticles,
];

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const priceStrings = product.price.toFixed(2).split('.');

  return (
    <ProductCardWrapper onClick={() => navigate('/article/123')}>
      <ProductImage src={product.src} />
      <ProductText>{product.description}</ProductText>
      <ProductPrice>
        <CurrencySymbol>$</CurrencySymbol>
        <PriceInteger>{priceStrings.at(0)}</PriceInteger>
        <PriceCents>{priceStrings.at(-1)}</PriceCents>
      </ProductPrice>
    </ProductCardWrapper>
  );
};

ProductCard.propTypes = {
  product: instanceOf(Object).isRequired,
};

const Browse = ({ loading, query = 'Lorem Ipsum', products = articles }) => {
  return (
    <Container>
      <Main>
        <TextField
          variant='filled'
          label='Search'
          InputProps={{
            style: {
              padding: '0.5rem',
            },
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            ),
          }}
          margin='dense'
          fullWidth
        />
        <Title>Results for {query}</Title>
        <ProductCardContainer>
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </ProductCardContainer>
      </Main>
    </Container>
  );
};

Browse.propTypes = {
  loading: bool.isRequired,
  query: string.isRequired,
  products: instanceOf(Array).isRequired,
};

export default Browse;
