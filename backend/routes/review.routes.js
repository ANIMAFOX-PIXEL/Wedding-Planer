const express=require('express');
const app=express();
const authMiddleware = require('../middleware/auth.middleware');
const reviewController = require('../controller/review.controller');

app.post('/api/review-create', authMiddleware, reviewController.reviewCreateOrUpdate);
app.get('/api/review-product/:id', authMiddleware, reviewController.reviewFromProduct);
app.delete('/api/review-delete/:id', authMiddleware, reviewController.reviewDelete);

module.exports = app;
