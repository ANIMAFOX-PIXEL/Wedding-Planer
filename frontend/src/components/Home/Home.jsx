import React from 'react';
import { bool, func } from 'prop-types';

import styled from 'styled-components';

import RosesSrc from '../../assets/img/roses.png';
import RingsSrc from '../../assets/img/rings.png';

import MultiColorRosesSrc from '../../assets/img/multicolor-roses.png';
import CentroSrc from '../../assets/img/centro.png';
import DressSrc from '../../assets/img/dress.png';

const WhiteBgContainer = styled.div`
  background-color: #f9ffff;
`;

const Main = styled.main`
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
`;

const bottomMargin = 586;
const bottomMarginSm = 570;

const Banner = styled.header`
  position: relative;
  display: flex;
  width: 100%;
  height: 1440px;
  padding-bottom: ${bottomMargin}px;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(180deg, #efc8c8 0%, #f9ffff 100%);
  @media (max-width: 768px) {
    height: 766px;
    padding-bottom: ${bottomMarginSm}px;
  }
`;

const Title = styled.h1`
  font-family: 'Parisienne';
  font-style: normal;
  font-weight: 400;
  font-size: 8rem;
  line-height: 174px;
  color: #f9ffff;
  text-shadow: 0px 6px 8px #806941;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Roses = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
  scale: 0.7;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Rings = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: ${bottomMargin}px;
  transform-origin: 100% 100%;
  scale: 0.8;
  @media (max-width: 768px) {
    display: none;
    margin-bottom: ${bottomMarginSm}px;
  }
`;

const PageContent = styled.div`
  position: relative;
  margin-top: -${bottomMargin}px;
  @media (max-width: 768px) {
    margin-top: -${bottomMarginSm}px;
  }
`;

const Subtitle = styled.h2`
  margin: 2rem auto;
  font-family: 'Parisienne';
  font-style: normal;
  font-weight: 400;
  font-size: 4rem;
  line-height: 87px;
  text-align: center;
  color: #806941;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin: 2rem 0;
  gap: 2rem;
  padding: 0 2rem;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem 1rem;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 2rem;
  height: 42.5rem;
  flex: 1 0 0;
  background-color: #eeeeee;
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const CardImgContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
    180deg,
    ${(props) => props.gradientColor} 0%,
    #f9ffff 100%
  );
  @media (max-width: 768px) {
    width: unset;
    height: 120px;
    aspect-ratio: 1 / 1;
  }
`;

const CardImg = styled.img`
  position: absolute;
  display: inline-block;
  height: 100%;
`;

const CardText = styled.p`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 2rem;
  @media (max-width: 768px) {
    text-align: left;
    font-size: 1rem;
  }
`;

const Card = ({ src, content, gradientColor }) => {
  return (
    <CardWrapper>
      <CardImgContainer gradientColor={gradientColor}>
        <CardImg src={src} />
      </CardImgContainer>
      <CardText>{content}</CardText>
    </CardWrapper>
  );
};

export const Home = ({ showScrollTop, handleScrollTop }) => {
  return (
    <WhiteBgContainer maxWidth={false}>
      <Main>
        <Banner>
          <Title>Wedding Wish</Title>
          <Roses src={RosesSrc} />
          <Rings src={RingsSrc} />
        </Banner>
        <PageContent>
          <Subtitle>Where weddings come to life</Subtitle>
          <CardContainer>
            <Card
              src={MultiColorRosesSrc}
              gradientColor='#EFC8C8'
              content='Busca las flores que haran tu dia perfecto, perfecto!'
            />
            <Card
              src={CentroSrc}
              gradientColor='#C8EFED'
              content='Haz sentir a tus invitados bienvenidos con los cientos de centros de mesa que tenemos para ti!'
            />
            <Card
              src={DressSrc}
              gradientColor='#EEC8EF'
              content='No batalles para encontrar tu vestido perfecto, aqui lo tenemos!'
            />
          </CardContainer>
        </PageContent>
      </Main>
    </WhiteBgContainer>
  );
};

Home.propTypes = {
  showScrollTop: bool.isRequired,
  handleScrollTop: func.isRequired,
};

export default Home;
