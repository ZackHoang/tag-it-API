import { Router } from 'express';
import {
    checkCharacter,
    getAllGames,
    getGame,
    getTimer,
} from '../controllers/gamesController.js';

const gamesRouter = Router();

gamesRouter.get('/', getAllGames);
gamesRouter.get('/:id', [getGame, getTimer]);
gamesRouter.post('/:id/:name', checkCharacter);

export default gamesRouter;
