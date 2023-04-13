import express from 'express';
import { getMessages, createMessage, findMessagesByDate, lastMessage } from '../controllers/message';

const router = express.Router();

router.get('/', getMessages);
router.get('/last', lastMessage);
router.get('/date', findMessagesByDate);
router.post('/', createMessage);

export default router;