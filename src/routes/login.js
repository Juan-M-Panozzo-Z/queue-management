import express from "express";
import { register, login, logout } from "../controllers/login";

const router = express.Router();

router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'src/public' });
});

router.get('/register', (req, res) => {
  res.sendFile('register.html', { root: 'src/public' });
});

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);

export default router;