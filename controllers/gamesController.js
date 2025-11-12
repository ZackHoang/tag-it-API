import prisma from '../prisma/prisma.js';
import { errorResponse } from '../response/error.js';
import { failResponse } from '../response/fail.js';
import { successResponse } from '../response/success.js';

export async function getAllGames(req, res) {
    try {
        const games = await prisma.game.findMany({
            omit: {
                characters: true,
                width: true,
                height: true,
            },
        });
        res.json(successResponse(games));
    } catch {
        res.status(500).json(
            errorResponse('Oops! Something went wrong. Try again later.')
        );
    }
}

export async function getGame(req, res, next) {
    try {
        const game = await prisma.game.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            omit: {
                width: true,
                height: true,
                source: true,
            },
        });
        for (const character of game.characters) {
            delete character.top_left;
            delete character.bottom_right;
            character.found = false;
        }
        req.session.charactersFound = game.characters;
        res.json(successResponse(game));
        next();
    } catch {
        res.status(500).json(
            errorResponse('Oops! Something went wrong. Try again later.')
        );
    }
}

export function getTimer(req, res) {
    const currentEpochTime = Date.now();
    req.session.startTime = currentEpochTime;
    // console.log("/games/:id session object", req.session);
    // console.log("/games/:id session id", req.session.id);
    res.end();
}

export async function checkCharacter(req, res) {
    try {
        const game = await prisma.game.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });
        const character = game.characters.find((character) => {
            return character.name === req.params.name;
        });
        const xNormalized =
            Math.floor(req.body.x * (game.width / req.body.browser_image_width));
        const yNormalized =
            Math.floor(req.body.y * (game.height / req.body.browser_image_height));
        if (
            (xNormalized >= character.top_left.x &&
                xNormalized <= character.bottom_right.x) &&
            (yNormalized >= character.top_left.y &&
                yNormalized <= character.bottom_right.y)
        ) {
            let charFoundAlready = false;
            req.session.charactersFound.forEach((char) => {
                if (char.name === character.name) {
                    if (char.found === true) {
                        charFoundAlready = true;
                    } else {
                        char.found = true;
                    }
                }
            });
            const allCharFound = req.session.charactersFound.every((char) => char.found === true);
            let response = null;
            if (allCharFound === true) {
                response = successResponse({
                    message: 'You have found everyone'
                })
            } else if (charFoundAlready === true) {
                response = failResponse({
                    message: `You already found ${character.name}`
                })
            } else {
                response = successResponse({
                    message: `You found ${character.name}`
                })
            }
            res.json(response);
        } else {
            res.json(
                failResponse({
                    message: 'Try again!',
                })
            );
        }
        // console.log("/games/:id/:name session object", req.session);
        // console.log("/games/:id/:name session id", req.session.id);
    } catch (e) {
        console.error(e);
        res.status(500).json(
            errorResponse('Oops! Something went wrong. Try again later.')
        );
    }
}
