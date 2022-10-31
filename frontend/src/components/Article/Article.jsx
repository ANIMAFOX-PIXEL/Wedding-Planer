import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Carousel from 'nuka-carousel';

// development
import { LoremIpsum } from 'lorem-ipsum';

import { Button, IconButton, Paper, Typography } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import { func, bool, instanceOf } from 'prop-types';

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
`;

const InfoBox = styled.div`
  flex: 2 0 0;
  padding: 1rem 2rem;
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

const sampleArray = [
  'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRWvuLqWKwvMBNPxutyxnLJsdULDOQxu9mN8lVuBXiVyQ_RB4qTswOYpKhERrxZDSJ17w8Ia4ZBcI9ozAxey9ksfEiKmOruYo2vZhFxX2_QSmNAfOSlyv-W&usqp=CAE',
  'https://d44ri6pmeripj.cloudfront.net/morilee/wp-content/uploads/2022/04/05172544/product_img_2461_gallery_img_1-scaled.jpg',
  'https://cdn0.hitched.co.uk/cat/wedding-dresses/elysee-atelier/louvre--mt15_2x_525140.jpg',
  'https://images.squarespace-cdn.com/content/v1/5b0da1194eddece4753dcc6a/1615913750074-UR6PMGO0OWLF4OLMYUVH/martina-liana.jpg',
  'https://images.squarespace-cdn.com/content/v1/55f95900e4b00c68109110c7/1625615301247-63A9Z4PK6ISFQBEAT464/blanche_homepage_2021.jpg?format=2500w',
];

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const CarouselCard = ({ url, onClick }) => {
  return <Item onClick={onClick} style={{ backgroundImage: `url(${url})` }} />;
};

const Article = ({
  fetchedArticle,
  fetchingArticle,
  article,
  // handleChange,
}) => {
  const [{ curImgIdx }, setState] = useState({
    curImgIdx: 0,
  });

  // navigation to other routes
  const navigate = useNavigate();

  const handleChange = (key, value) =>
    setState((prevState) => ({ ...prevState, [key]: value }));

  return (
    <ArticleInfo>
      <ArticleContainer>
        <HorizontalBox>
          <MediaBox>
            <ImgContainer>
              <Img src={sampleArray[curImgIdx]} />
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
              {sampleArray.map((url, idx) => (
                <CarouselCard
                  key={idx}
                  url={url}
                  onClick={() => handleChange('curImgIdx', idx)}
                />
              ))}
            </Carousel>
          </MediaBox>
          <InfoBox>
            <ArticleName>Vestido de boda bonito</ArticleName>
            <Typography variant='body1'>
              {lorem.generateParagraphs(1)}
            </Typography>
            <ul>
              <li>
                <Typography variant='body2'>
                  {lorem.generateSentences(2)}
                </Typography>
              </li>
              <li>
                <Typography variant='body2'>
                  {lorem.generateSentences(2)}
                </Typography>
              </li>
              <li>
                <Typography variant='body2'>
                  {lorem.generateSentences(2)}
                </Typography>
              </li>
              <li>
                <Typography variant='body2'>
                  {lorem.generateSentences(2)}
                </Typography>
              </li>
            </ul>
          </InfoBox>
          <BuyBox>
            <BuyContainer>
              <Typography variant='body2'>
                <PriceSuperscript>MXN</PriceSuperscript>
                <PriceUnit>40000</PriceUnit>
                <PriceSuperscript>00</PriceSuperscript>
              </Typography>

              <BuyNowButton
                variant='outlined'
                color='rose'
                fullWidth
                onClick={() => {
                  const params = new URLSearchParams();
                  params.append(
                    'addValue',
                    // if there is no article.id grab the last part of the url as an id
                    article?.id || window.location.href.split('/').pop()
                  );
                  navigate(`/cart?${params.toString()}`);
                }}
              >
                agregar a carrito
              </BuyNowButton>
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
                onClick={() => {
                  const params = new URLSearchParams();
                  params.append(
                    'addValue',
                    // if there is no article.id grab the last part of the url as an id
                    article?.id || window.location.href.split('/').pop()
                  );
                  navigate(`/planner?${params.toString()}`);
                }}
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
  handleChange: func.isRequired,
};

Article.defaultProps = {
  article: null,
};

export default Article;
