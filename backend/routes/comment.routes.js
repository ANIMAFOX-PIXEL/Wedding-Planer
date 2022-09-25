const express=require('express');
const app=express();
const authMiddleware = require('../middleware/auth.middleware');
const commentController = require('../controller/comment.controller');

app.post('/api/comment-create', authMiddleware, commentController.commentCreate );

app.get('/api/comment-read/:id', authMiddleware, commentController.commentRead );
app.get('/api/comment-product/:id', authMiddleware, commentController.commentFromProduct );
app.get('/api/comment-user/:id', authMiddleware, commentController.commentFromUser );

app.put('/api/comment-update/:id', authMiddleware, commentController.commentUpdate );
app.delete('/api/comment-delete/:id', authMiddleware, commentController.commentDelete );

module.exports = app;
