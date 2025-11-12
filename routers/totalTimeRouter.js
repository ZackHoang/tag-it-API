import { Router } from 'express';
import { getTotalTime } from '../controllers/timerController.js';

const totalTimeRouter = Router();

totalTimeRouter.get('/', getTotalTime);

export default totalTimeRouter;
