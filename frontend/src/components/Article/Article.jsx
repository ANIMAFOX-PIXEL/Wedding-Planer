import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Carousel from 'nuka-carousel';

import { Button, IconButton, Paper, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import { number, func, bool, instanceOf } from 'prop-types';

const ArticleInfo = styled.section`
  display: inline-block;
  width: 100%;
  background-image: linear-gradient(180deg, #efc8c8 0%, #f9ffff 100%);
`;

const ArticleContainer = styled(Paper)`
  margin: 3rem;
  overflow-y: visible;
`;

const HorizontalBox = styled.div`
  display: flex;
  padding: 2rem;
  flex-flow: row nowrap;
  @media (max-width: 1555px) {
    flex-flow: column nowrap;
  }
`;

const InfoBox = styled.div`
  flex: 2 0 0;
  padding: 1rem 2rem;
  @media (max-width: 1555px) {
    flex: column;
    order: 1;
  }
`;

const ArticleName = styled.h1`
  font-size: 3rem;
  margin-top: 0;
  border-bottom: 2px solid black;
`;

const MediaBox = styled.div`
  flex: 3 0 0;
  position: relative;
  display: inline-block;
  width: 100%;
  /* height: calc(100vh - 16rem); */
`;

const ImgContainer = styled.div`
  display: inline-block;
  width: 100%;
  height: clamp(300px, 30vw, 1000px);
  padding: 6px;
`;

const Img = styled.img`
  display: inline-block;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: contain;
  background-color: #eeeeee;
`;

const Item = styled.div`
  text-align: center;
  font-size: 2rem;
  line-height: 120px;
  height: 120px;
  border-radius: 10px;
  background-color: #eeeeee;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 768px) {
    height: 60px;
  }
`;

const CarrouselButton = styled(IconButton)`
  margin: 0.5rem !important;
`;

const BuyBox = styled.div`
  flex: 1 0 0;
  position: relative;
`;

const BuyContainer = styled(Paper)`
  padding: 1rem;
`;

const PriceSuperscript = styled.span`
  position: relative;
  font-size: 0.7rem;
  top: -0.5rem;
`;

const PriceUnit = styled.span`
  font-size: 1.5rem;
`;

const BuyBoxButton = styled(Button)`
  margin: 6px 0 !important;
`;

const BuyNowButton = styled(BuyBoxButton)`
  filter: saturate(500%);
`;

const CarouselCard = ({ url, onClick }) => {
  return <Item onClick={onClick} style={{ backgroundImage: `url(${url})` }} />;
};

const Article = ({
  fetchedArticle,
  fetchingArticle,
  article,
  imgIndex,
  setImgIndex,
  handleRedirectToPlanner,
}) => {
  // navigation to other routes
  const navigate = useNavigate();

  if (!fetchedArticle || fetchingArticle) return <></>;

  return (
    <ArticleInfo>
      <ArticleContainer>
        <HorizontalBox>
          <MediaBox>
            <ImgContainer>
              <Img
                src={
                  article.media[0]
                    ? `${process.env.REACT_APP_API}${article.media[imgIndex]}`
                    : 'https://cdn0.hitched.co.uk/cat/wedding-dresses/elysee-atelier/louvre--mt15_2x_525140.jpg'
                }
              />
            </ImgContainer>
            <Carousel
              slidesToShow={4}
              cellSpacing={12}
              renderCenterLeftControls={({
                previousDisabled,
                previousSlide,
              }) => (
                <CarrouselButton
                  onClick={previousSlide}
                  disabled={previousDisabled}
                >
                  <KeyboardArrowLeft />
                </CarrouselButton>
              )}
              renderCenterRightControls={({ nextDisabled, nextSlide }) => (
                <CarrouselButton onClick={nextSlide} disabled={nextDisabled}>
                  <KeyboardArrowRight />
                </CarrouselButton>
              )}
            >
              {article.media.map((media, idx) => (
                <CarouselCard
                  key={media.split('/').at(-1)}
                  url={`${process.env.REACT_APP_API}${media}`}
                  onClick={() => setImgIndex(idx)}
                />
              ))}
            </Carousel>
          </MediaBox>
          <InfoBox>
            <ArticleName>{article.name}</ArticleName>
            <Typography variant='body1'>{article.description}</Typography>
          </InfoBox>
          <BuyBox>
            <BuyContainer>
              <Typography variant='body2'>
                <PriceSuperscript>MXN</PriceSuperscript>
                <PriceUnit>
                  {article.price.toFixed(2).split('.').at(0)}
                </PriceUnit>
                <PriceSuperscript>
                  {article.price.toFixed(2).split('.').at(-1)}
                </PriceSuperscript>
              </Typography>
              {/* <BuyNowButton
                variant='outlined'
                color='rose'
                fullWidth
                onClick={() => {
                  const params = new URLSearchParams();
                  params.append(
                    'product',
                    // if there is no article.id grab the last part of the url as an id
                    article?.id || window.location.href.split('/').pop()
                  );
                  navigate(`/cart?${params.toString()}`);
                }}
              >
                agregar a carrito
              </BuyNowButton> */}
              <BuyBoxButton
                variant='contained'
                color='rose'
                fullWidth
                onClick={() => {
                  const params = new URLSearchParams();
                  params.append(
                    'article',
                    // if there is no article.id grab the last part of the url as an id
                    article?.id || window.location.href.split('/').pop()
                  );
                  navigate(`/payment?${params.toString()}`);
                }}
              >
                comprar ahora
              </BuyBoxButton>
              <BuyBoxButton
                variant='contained'
                color='darkblue'
                fullWidth
                onClick={handleRedirectToPlanner}
              >
                agregar a planner
              </BuyBoxButton>
            </BuyContainer>
          </BuyBox>
        </HorizontalBox>
      </ArticleContainer>
    </ArticleInfo>
  );
};

Article.propTypes = {
  fetchedArticle: bool.isRequired,
  fetchingArticle: bool.isRequired,
  article: instanceOf(Object),
  imgIndex: number.isRequired,
  setImgIndex: func.isRequired,
  handleRedirectToPlanner: func.isRequired,
};

Article.defaultProps = {
  article: null,
};

export default Article;
