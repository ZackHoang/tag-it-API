import { Router } from 'express';
import postScore from '../controllers/scoreController.js';

const scoreRouter = Router();

scoreRouter.post('/', postScore);

export default scoreRouter;
