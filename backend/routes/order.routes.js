const express=require('express');
const app=express();
const authMiddleware = require('../middleware/auth.middleware');
const orderController = require('../controller/order.controller');

app.post('/api/order-create', authMiddleware, orderController.orderCreate);
app.get('/api/order-read/:id', authMiddleware, orderController.orderRead);
app.get('/api/order-readAll', authMiddleware, orderController.orderReadAll);
app.get('/api/order-fromUser', authMiddleware, orderController.orderFromUser);

module.exports = app;
