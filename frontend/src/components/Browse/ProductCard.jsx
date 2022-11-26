import React from 'react';
import { instanceOf } from 'prop-types';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import FlowerBucketSrc from '../../assets/img/flower-bucket.png';

const Anchor = styled(Link)`
  all: unset;

  &:hover {
    color: orange;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const ProductCardWrapper = styled.div`
  flex: 0 0 calc(25% - 1rem);
  aspect-ratio: 351 / 506;
  padding: 1rem;
  background: linear-gradient(180deg, #efc8c8 0%, #f9ffff 100%);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.25);
  @media (max-width: 768px) {
    flex: 0 0 calc(50% - 0.5rem);
  }
  @media (max-width: 400px) {
    flex: 0 0 100%;
  }
`;

const ProductImage = styled.img`
  display: inline-block;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const ProductTitle = styled.p`
  font-size: 1rem;
  font-weight: bold;
  text-transform: lowercase;
  &::first-letter {
    font-size: 1.4rem;
    text-transform: uppercase;
  }
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

const ProductCard = ({ product }) => {
  const [units, cents] = product.price.toFixed(2).split('.');
  const [src] = product.media;
  return (
    <ProductCardWrapper>
      <ProductImage
        src={src ? `${process.env.REACT_APP_API}${src}` : FlowerBucketSrc}
      />
      <Anchor to={`/article/${product._id}`}>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductText>{product.description}</ProductText>
      </Anchor>
      <ProductPrice>
        <CurrencySymbol>$</CurrencySymbol>
        <PriceInteger>{units}</PriceInteger>
        <PriceCents>{cents}</PriceCents>
      </ProductPrice>
    </ProductCardWrapper>
  );
};

ProductCard.propTypes = {
  product: instanceOf(Object).isRequired,
};

export default ProductCard;
