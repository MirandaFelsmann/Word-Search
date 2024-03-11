import express from 'express';
import * as ctrl from '../controllers/gameController.js';

const router = express.Router();

router.get('/', ctrl.createCrossword);

export default router;