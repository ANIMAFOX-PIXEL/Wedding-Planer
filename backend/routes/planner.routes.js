const express=require('express');
const app=express();
const authMiddleware = require('../middleware/auth.middleware');
const plannerController = require('../controller/planner.controller');

app.post('/api/planner-create', authMiddleware, plannerController.plannerCreate);
app.get('/api/planner-read/:id', authMiddleware, plannerController.plannerRead);
app.put('/api/planner-add/:id', authMiddleware, plannerController.plannerAddProduct);
app.put('/api/planner-remove/:id', authMiddleware, plannerController.plannerRemoveProduct);
app.put('/api/planner-reschedule/:id', authMiddleware, plannerController.plannerReschedule);
app.put('/api/planner-buy/:id', authMiddleware, plannerController.plannerBuy);
app.delete('/api/planner-delete/:id', authMiddleware, plannerController.plannerDelete);

module.exports = app;
