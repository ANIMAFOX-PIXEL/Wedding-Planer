import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Paper,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styled from 'styled-components';

import Carousel from 'nuka-carousel';
import { CreateProduct } from '../../actions/CreateProduct';
import { useNavigate } from 'react-router-dom';

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
  margin: 6rem auto;
  padding: 1rem;
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

const CarouselButton = styled(IconButton)`
  margin: 0.5rem !important;
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

const CarouselSpacer = styled.div`
  height: 80px;
`;

const UploadButton = styled(Button)`
  margin: 0 auto;
`;

const CarouselCard = ({ url, onClick }) => {
  return <Item onClick={onClick} style={{ backgroundImage: `url(${url})` }} />;
};

const placeholder =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png';

const Account = () => {
  const [
    { name, price, tags, description, images, imageURLs, imgIdx },
    setState,
  ] = useState({
    name: '',
    price: 0,
    tags: '',
    description: '',
    images: [],
    imageURLs: [],
    imgIdx: 0,
  });

  const navigate = useNavigate();

  const handleChange = (key, val) =>
    setState((prev) => ({ ...prev, [key]: val }));

  const setImgIdx = (idx) => handleChange('imgIdx', idx);

  const addProduct = async () => {
    if (!name || !price || !description || !images.length) {
      alert(
        'Llena los campos obligatorios: Nombre, Precio, Descripcion, Imagenes'
      );
      return;
    }

    const {
      err,
      data: { _id },
    } = await CreateProduct(name, price, tags, description, images);

    if (err) {
      console.error(err);
      return;
    }

    navigate(`/article/${_id}`);
  };

  return (
    <Main>
      <CustomPaper maxWidth='sm'>
        <Typography
          variant='h4'
          variantMapping={{ h3: 'h1' }}
          textTransform='capitalize'
          width='100%'
          marginBottom={2}
        >
          Agregar Articulo
        </Typography>
        <Grid container maxWidth='sm' spacing={2}>
          <Grid container item xs={12} minHeight={200} flexDirection='column'>
            <ImgContainer>
              <Img
                src={images.length !== 0 ? imageURLs[imgIdx] : placeholder}
              />
            </ImgContainer>
            <UploadButton color='rose' variant='contained' component='label'>
              Upload File
              <input
                type='file'
                hidden
                multiple
                accept='image/*'
                onChange={(e) => {
                  const images = [...e.target.files];
                  const imageURLs = images.map((image) =>
                    URL.createObjectURL(image)
                  );
                  handleChange('images', images);
                  handleChange('imageURLs', imageURLs);
                }}
              />
            </UploadButton>
            <Carousel
              slidesToShow={4}
              cellSpacing={12}
              renderCenterLeftControls={({
                previousDisabled,
                previousSlide,
              }) => (
                <CarouselButton
                  onClick={previousSlide}
                  disabled={previousDisabled}
                >
                  <KeyboardArrowLeft />
                </CarouselButton>
              )}
              renderCenterRightControls={({ nextDisabled, nextSlide }) => (
                <CarouselButton onClick={nextSlide} disabled={nextDisabled}>
                  <KeyboardArrowRight />
                </CarouselButton>
              )}
            >
              {!images.lenght && <CarouselSpacer />}
              {images.map((media, idx) => (
                <CarouselCard
                  key={idx}
                  url={imageURLs[idx]}
                  onClick={() => setImgIdx(idx)}
                />
              ))}
            </Carousel>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Nombre'
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Precio'
              type='number'
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={price}
              onChange={(e) => handleChange('price', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Etiquetas'
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange('tags', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Descripcion'
              fullWidth
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange('description', e.target.value)}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              color='rose'
              variant='contained'
              fullWidth
              onClick={addProduct}
            >
              Enviar
            </Button>
          </Grid>
        </Grid>
      </CustomPaper>
    </Main>
  );
};

export default Account;
