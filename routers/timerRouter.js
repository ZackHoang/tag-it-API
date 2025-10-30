import { Router } from 'express';
import { getTimer } from '../controllers/timerController.js';

const timerRouter = Router();

timerRouter.get('/', getTimer);

export default timerRouter;
