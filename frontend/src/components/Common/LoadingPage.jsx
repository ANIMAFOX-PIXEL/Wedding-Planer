import React from 'react';
import { Grid, LinearProgress } from '@mui/material';
import styled from 'styled-components';
import { useAuth } from '../../hooks/auth';

const GradientGrid = styled(Grid)`
  background-image: linear-gradient(180deg, #efc8c8 0%, #f9ffff 100%);
`;

const Title = styled.h1`
  font-family: 'Parisienne';
  font-style: normal;
  font-weight: 400;
  font-size: 8rem;
  line-height: 174px;
  color: #f9ffff;
  text-transform: capitalize;
  text-shadow: 0px 6px 8px #806941;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Initializing = styled.h1`
  font-weight: 400;
  color: #806941;
  text-transform: capitalize;
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const FixedProgress = styled(LinearProgress)`
  position: absolute !important;
  bottom: 0;
  width: 100vw;
  height: 0.5rem !important;
`;

const LoadingPage = () => {
  const { fetched } = useAuth();

  if (fetched) return <></>;

  return (
    <GradientGrid
      container
      height='100vh'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      marginX='auto'
    >
      <Title>Wedding Wish</Title>
      <Initializing>inicializando...</Initializing>
      <FixedProgress color='darkblue' />
    </GradientGrid>
  );
};

export default LoadingPage;
