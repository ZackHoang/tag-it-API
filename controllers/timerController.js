import { successResponse } from '../response/success.js';

export function getTimer(req, res) {
    const currentEpochTime = Date.now();
    req.session.startTime = currentEpochTime;
    res.json(successResponse(null));
}
