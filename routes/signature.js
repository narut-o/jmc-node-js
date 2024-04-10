import express from 'express'
import { signature } from '../controllers/signature.js';


const router = express.Router();

router.get('/get-signature',signature)

export default router;