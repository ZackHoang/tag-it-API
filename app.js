import 'dotenv/config';
import express from 'express';
import timerRouter from './routers/timerRouter.js';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import prisma from './prisma/prisma.js';
import gamesRouter from './routers/gamesRouter.js';
import { failResponse } from './response/fail.js';
import cors from 'cors';
import scoreRouter from './routers/scoreRouter.js';

const app = express();
const PORT = parseInt(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: false,
        },
        name: 'tag-it',
        store: new PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000, //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    })
);
// app.use(async (req, res, next) => {
//     console.log(req.session);
//     console.log(req.session.id);
//     next();
// });
app.use('/time', timerRouter);
app.use('/games', gamesRouter);
app.use('/score', scoreRouter);
app.use('/{*splat}', (req, res) => {
    res.status(404).json(failResponse({ message: 'Not Found' }));
});

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`);
});
