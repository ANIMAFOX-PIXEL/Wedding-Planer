import React from 'react';
import { Grid, TextField, Paper, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { bool } from 'prop-types';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  background-image: linear-gradient(180deg, #efc8c8 0%, #f9ffff 100%);
`;

const CustomPaper = styled(Paper)`
  box-sizing: border-box;
  display: inline-block;
  margin: 8rem auto;
`;

const Payment = ({ fetched, total }) => {
  if (!fetched) return <> Cargando... </>;

  return (
    <Main>
      <CustomPaper maxWidth='sm'>
        <Grid
          container
          width='100vw'
          maxWidth='sm'
          marginX='auto'
          padding={2}
          alignItems='stretch'
          flexDirection='column'
          gap={3}
          boxSizing='border-box'
        >
          <Typography
            variant='h4'
            variantMapping={{ h3: 'h1' }}
            textTransform='capitalize'
            width='100%'
          >
            Pago - Total: {total}
          </Typography>
          <PayPalButtons
            fundingSource={undefined}
            createOrder={(data, actions) => {
              return actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        value: total,
                      },
                    },
                  ],
                })
                .then((orderId) => {
                  // Your code here after create the order
                  return orderId;
                });
            }}
            onApprove={function (data, actions) {
              return actions.order.capture().then(function () {
                // Your code here after capture the order
              });
            }}
          />
        </Grid>
      </CustomPaper>
    </Main>
  );
};

export default Payment;
