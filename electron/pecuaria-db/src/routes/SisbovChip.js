import express from 'express'
import CreateSisbovChip from '../api/sisbovChip/createSisbovChip'
import GetSisbovChip from '../api/sisbovChip/getSisbovChip'

const router = express.Router();

router.get('/', GetSisbovChip);

router.post('/', CreateSisbovChip);

export default router;
