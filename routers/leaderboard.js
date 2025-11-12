import { Router } from "express";
import { getAllScores } from "../controllers/leaderboardController.js";

const leaderboardRouter = Router();

leaderboardRouter.get("/", getAllScores);

export default leaderboardRouter;