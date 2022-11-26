import React from 'react';

import {
  Button,
  Grid,
  Paper,
  Table,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import styled from 'styled-components';

import { object } from 'prop-types';

const Main = styled.main``;

const FullPaper = styled(Paper)`
  width: 100%;
  padding: 1rem;
  background-image: linear-gradient(180deg, #efc8c8 0%, #f9ffff 100%);
`;

const Row = styled(TableRow)`
  margin-bottom: 1rem;
  background-color: #eeeeee55;
`;

const TableCellTop = styled(TableCell)`
  vertical-align: top !important;
`;

const RowImg = styled.img`
  height: 100px;
  aspect-ratio: 1 / 1;
  object-fit: contain;
  background-color: #eeeeee;
`;

const ProductPrice = styled.p`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
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

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  justify-content: flex-end;
`;

const Cart = ({ fetched, fetching, planner }) => {
  return (
    <Main>
      <Grid container maxWidth='md' marginX='auto' marginY={10}>
        <Typography
          variant='h3'
          variantMapping={{ h3: 'h1' }}
          textTransform='capitalize'
        >
          planner
        </Typography>
        <FullPaper>
          <Table>
            {fetched &&
              planner?.products?.map((item) => (
                <Row key={item._id}>
                  <TableCellTop>
                    <RowImg
                      src={`${process.env.REACT_APP_API}${item.media[0]}`}
                    />
                  </TableCellTop>
                  <TableCellTop>
                    <Typography variant='h6'> {item.name} </Typography>
                    <Typography variant='body2'>
                      {' '}
                      {item.description}{' '}
                    </Typography>
                  </TableCellTop>
                  <TableCellTop>
                    <ProductPrice>
                      <CurrencySymbol>$</CurrencySymbol>
                      <PriceInteger>
                        {item.price.toFixed(2).split('.').at(0)}
                      </PriceInteger>
                      <PriceCents>
                        {item.price.toFixed(2).split('.').at(-1)}
                      </PriceCents>
                    </ProductPrice>
                  </TableCellTop>
                </Row>
              ))}
          </Table>
        </FullPaper>
        <ButtonContainer>
          <Button variant='contained' color='darkblue' href='/payment/cart'>
            comprar
          </Button>
        </ButtonContainer>
      </Grid>
    </Main>
  );
};

Cart.propTypes = {
  planner: object.isRequired,
};

export default Cart;
