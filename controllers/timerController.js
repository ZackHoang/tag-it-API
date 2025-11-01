import { successResponse } from '../response/success.js';

export function getTimer(req, res) {
    const currentEpochTime = Date.now();
    req.session.startTime = currentEpochTime;
    console.log(req.session);
    console.log(req.session.id);
    res.json(successResponse(null));
}
