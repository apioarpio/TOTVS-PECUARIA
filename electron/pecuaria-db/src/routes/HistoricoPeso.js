import express from 'express';
import CreateHistoricoPeso from '../api/animal/createHistoricoPeso';

const router = express.Router();

router.post('/', CreateHistoricoPeso);

export default router
