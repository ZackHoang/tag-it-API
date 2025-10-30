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

export async function getGame(req, res) {
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
        }
        res.json(successResponse(game));
    } catch {
        res.status(500).json(
            errorResponse('Oops! Something went wrong. Try again later.')
        );
    }
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
            req.body.x * (game.width / req.body.browser_image_width);
        const yNormalized =
            req.body.y * (game.height / req.body.browser_image_height);
        if (
            (xNormalized >= character.top_left.x ||
                xNormalized <= character.bottom_right.x) &&
            (yNormalized >= character.top_left.y ||
                yNormalized <= character.bottom_right.y)
        ) {
            res.json(
                successResponse({
                    message: 'You found them!',
                })
            );
        } else {
            res.json(
                failResponse({
                    message: 'Try again!',
                })
            );
        }
    } catch {
        res.status(500).json(
            errorResponse('Oops! Something went wrong. Try again later.')
        );
    }
}
