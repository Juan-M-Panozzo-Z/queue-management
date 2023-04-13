import express from 'express';
import {getQueues, getQueueById, updateQueueById, createQueue, lastQueue, isWaiting, nextQueue} from '../controllers/queue.js';

const router = express.Router();

router.get('/', getQueues);
router.get('/last', lastQueue);
router.get('/next', nextQueue);
router.get('/isWaiting', isWaiting);
router.get('/:queueId', getQueueById);
router.post('/', createQueue);
router.put('/:queueId', updateQueueById);


export default router;