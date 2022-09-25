const express=require('express');
const app=express();
const authMiddleware = require('../middleware/auth.middleware');
const userController = require('../controller/user.controller');

// CRUD
app.post    ('/api/user-create' , userController.userCreate);
app.get     ('/api/user-read/:id'   , authMiddleware, userController.userRead);
app.get     ('/api/user-readAll', authMiddleware, userController.userReadAll);
app.put     ('/api/user-update/:id' , authMiddleware, userController.userUpdate);
app.delete  ('/api/user-delete/:id' , authMiddleware, userController.userDelete);
// Search
app.get     ('/api/user-search', authMiddleware, userController.userSearch);
// Auth
app.post    ('/api/login', userController.login);

module.exports = app;
