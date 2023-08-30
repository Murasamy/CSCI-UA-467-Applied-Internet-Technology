import { Router } from 'express';
import Game from '../models/gameRecord.mjs';
import sanitize from 'mongo-sanitize';
const router = new Router();

router.get('/gameRecords', async (req, res) => {
    try {
        const gameRecords = await Game.find().sort('-createdAt');
        res.json(gameRecords);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// POST a new game record
router.post('/gameRecords', async (req, res) => {
    try {
        const { userInitials, computerScore, userScore } = req.body;
        const sanitizedInitials = sanitize(userInitials);
        const newGameRecord = new Game({
            userInitials: sanitizedInitials,
            computerScore,
            userScore
        });
        await newGameRecord.save();
        res.json(newGameRecord);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

export default router;
