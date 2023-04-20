import express from "express";
import {
  getMessages,
  createMessage,
  findMessagesByDate,
  lastMessage,
} from "../controllers/message";

const router = express.Router();

/**
 * @openapi
 * /api/messages:
 *   get:
 *     tags:
 *       - Messages
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

router.get("/", getMessages);
router.get("/last", lastMessage);
router.get("/date", findMessagesByDate);
router.post("/", createMessage);

export default router;
