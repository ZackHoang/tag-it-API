import { successResponse } from '../response/success.js';
import prisma from '../prisma/prisma.js';
import { errorResponse } from '../response/error.js';
import { body, matchedData } from 'express-validator';

const validateUser = [body('name').trim()];

async function insertScore(req, res) {
    let { name } = matchedData(req);
    if (name === '') {
        name = undefined;
    }
    try {
        await prisma.user.create({
            data: {
                name: name,
                time: req.session.totalTime,
            },
        });
        res.json(successResponse(null));
    } catch {
        res.status(500).json(
            errorResponse('Oops! Something went wrong. Try again later.')
        );
    }
}

const postScore = [validateUser, insertScore];

export default postScore;
