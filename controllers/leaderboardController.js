import prisma from "../prisma/prisma.js";
import { errorResponse } from "../response/error.js";
import { successResponse } from "../response/success.js";

export async function getAllScores(req, res) {
    try {
        const scores = await prisma.user.findMany({
            omit: {
                id: true
            }
        });
        for (const score of scores) {
            const minutes = Math.floor(score.time / 60000);
            const seconds = ((score.time % 60000) / 1000).toFixed(0);
            score.time = `${minutes} minutes ${seconds} seconds`;
        }
        res.json(successResponse(scores));
    } catch {
        res.json(errorResponse("Oops! Something went wrong! Try again later."))
    }
}