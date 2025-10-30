import { Router } from 'express';
import {
    checkCharacter,
    getAllGames,
    getGame,
} from '../controllers/gamesController.js';

const gamesRouter = Router();

gamesRouter.get('/', getAllGames);
gamesRouter.get('/:id', getGame);
gamesRouter.post('/:id/:name', checkCharacter);

export default gamesRouter;
