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
        if (!req.session.charactersFound) {
            req.session.charactersFound = game.characters;
        }
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
    console.log(req.session);
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
            const charFound = false;
            console.log(req.session);
            req.session.charactersFound.forEach((char) => {
                if (char.name === character.name) {
                    if (char.found === true) {
                        charFound = true;
                    } else {
                        char.found = true;
                    }
                }
            });
            if (charFound === true) {
                res.json(failResponse({
                    message: `You already found ${character.name}!`
                }))
            } else {
                res.json(
                    successResponse({
                        message: `You found ${character.name}!`,
                    })
                );
            }
        } else {
            res.json(
                failResponse({
                    message: 'Try again!',
                })
            );
        }
    } catch (e) {
        console.log(e);
        res.status(500).json(
            errorResponse('Oops! Something went wrong. Try again later.')
        );
    }
}
