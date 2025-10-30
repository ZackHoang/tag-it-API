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
    const currentEpochTime = Date.now();
    const totalTime = currentEpochTime - req.session.startTime;
    console.log(totalTime);
    try {
        const minutes = Math.floor(totalTime / 60000);
        const seconds = ((totalTime % 60000) / 1000).toFixed(0);
        await prisma.user.create({
            data: {
                name: name,
                time: totalTime,
            },
        });
        res.json(
            successResponse({
                time: `${minutes} minutes ${seconds} seconds`,
            })
        );
    } catch {
        res.status(500).json(
            errorResponse('Oops! Something went wrong. Try again later.')
        );
    }
}

const postScore = [validateUser, insertScore];

export default postScore;
