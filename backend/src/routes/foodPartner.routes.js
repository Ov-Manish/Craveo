import express from 'express';
import { Router } from 'express';
import { authUserMiddleware } from '../middlewares/auth.middleware.js';
import { getFoodPartnerById } from '../controllers/foodPartner.controller.js';

export const foodPartnerRoutes = Router();

foodPartnerRoutes.get('/:id',
    authUserMiddleware,
    getFoodPartnerById,
)