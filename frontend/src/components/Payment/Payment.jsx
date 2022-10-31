import React from 'react';
import { Grid, TextField, Paper, Button, Typography } from '@mui/material';
import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(180deg, #efc8c8 0%, #f9ffff 100%);
`;

const CustomPaper = styled(Paper)`
  display: inline-block;
  padding: 1rem;
  margin: 8rem auto;
`;

const Payment = () => {
  return (
    <Main>
      <CustomPaper maxWidth='sm'>
        <Grid container maxWidth='sm' marginX='auto' spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant='h4'
              variantMapping={{ h3: 'h1' }}
              textTransform='capitalize'
            >
              Pago
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Numero de tarjeta'
              placeholder='1234 1234 1234 1234'
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='Fecha de expiracion'
              placeholder='MM / YY'
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label='CVC'
              placeholder='CVC'
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' color='darkblue' fullWidth>
              Pagar
            </Button>
          </Grid>
        </Grid>
      </CustomPaper>
    </Main>
  );
};

export default Payment;
