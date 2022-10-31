import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  FormControl,
  Paper,
  TextField,
  Button,
  Typography,
} from '@mui/material';

import styled from 'styled-components';

import { func } from 'prop-types';

const Main = styled.main`
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-image: linear-gradient(180deg, #efc8c8 0%, #f9ffff 100%);
`;

const Title = styled(Typography)`
  color: #f9ffff;
  text-shadow: 0px 6px 8px #806941;
`;

const HighlightSpan = styled.span`
  color: #d4fff8;
`;

const PaddedPaper = styled(Paper)`
  display: flex;
  padding: 2rem 1rem;
  flex-flow: column nowrap;
  gap: 3rem;
`;

const SubmitButton = styled(Button)`
  background-color: #efc8c8 !important;
`;

const Login = ({ handleChange, handleLogin }) => {
  return (
    <Main>
      <Container maxWidth='sm'>
        <Title variant='h4'>
          Unete a <HighlightSpan>Wedding Wish</HighlightSpan>!
        </Title>
        <PaddedPaper onKeyDown={(e) => e.key === 'Enter' && handleLogin()}>
          <FormControl fullWidth>
            <TextField
              label='Tu correo'
              InputLabelProps={{
                shrink: true,
              }}
              variant='standard'
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label='Tu password'
              InputLabelProps={{
                shrink: true,
              }}
              type='password'
              variant='standard'
              onChange={(e) => handleChange('pass', e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label='Confirma tu password'
              InputLabelProps={{
                shrink: true,
              }}
              type='password'
              variant='standard'
              onChange={(e) => handleChange('pass2', e.target.value)}
            />
          </FormControl>
          <SubmitButton variant='contained' onClick={handleLogin}>
            Crear Cuenta
          </SubmitButton>

          <Typography variant='body2' textAlign='center'>
            Ya tienes cuenta? ingresa <Link to='/login'>aqui</Link>
          </Typography>
        </PaddedPaper>
      </Container>
    </Main>
  );
};

Login.propTypes = {
  handleChange: func.isRequired,
  handleLogin: func.isRequired,
};

export default Login;
