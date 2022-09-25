const express=require('express');
const app=express();
const multer = require('multer');
const upload = multer();
const authMiddleware = require('../middleware/auth.middleware');
const productController = require('../controller/product.controller');

app.post('/api/product-create', authMiddleware, upload.any('images'), productController.productCreate);
app.get('/api/product-read/:id', authMiddleware, productController.productRead);
app.get('/api/product-readAll', authMiddleware, productController.productReadAll);
app.put('/api/product-update/:id', authMiddleware, upload.any('images'), productController.productUpdate);
app.delete('/api/product-delete/:id', authMiddleware, productController.productDelete);

app.get('/api/product-search', authMiddleware, productController.productSearch);

module.exports = app;
