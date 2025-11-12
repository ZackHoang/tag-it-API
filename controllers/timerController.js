import { failResponse } from '../response/fail.js';
import { successResponse } from '../response/success.js';

export function getTotalTime(req, res) {
    const currentEpochTime = Date.now();
    const totalTime = currentEpochTime - req.session.startTime;
    req.session.totalTime = totalTime;
    const minutes = Math.floor(totalTime / 60000);
    const seconds = ((totalTime % 60000) / 1000).toFixed(0);
    const totalTimeFormat = `${minutes} minutes ${seconds} seconds`;
    if (totalTime) {
        res.json(successResponse({
            total_time: totalTimeFormat
        }));
    } else {
        res.json(failResponse({
            message: "start time could not be found"
        }));
    }
}
