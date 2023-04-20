import express from "express";
import {
  getQueues,
  getQueueById,
  updateQueueById,
  createQueue,
  lastQueue,
  isWaiting,
  countIsWaiting,
  nextQueue,
} from "../controllers/queue.js";

const router = express.Router();

/**
 * @openapi
 * /api/queues:
 *   get:
 *     tags:
 *       - Queues
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

router.get("/", getQueues);
router.get("/last", lastQueue);
router.get("/next", nextQueue);
router.get("/isWaiting", isWaiting);
router.get("/countIsWaiting", countIsWaiting);
router.get("/:queueId", getQueueById);
router.post("/", createQueue);
router.put("/:queueId", updateQueueById);

export default router;
