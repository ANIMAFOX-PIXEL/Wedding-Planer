const express=require('express');
const app=express();
const authMiddleware = require('../middleware/auth.middleware');
const mediaController = require('../controller/media.controller');

app.get('/api/media-read/:id', authMiddleware, mediaController.imageRead)

module.exports = app;
