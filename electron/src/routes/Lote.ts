import * as express from 'express';
import getAllLote from '../api/lote/getAllLote'
import getLoteById from '../api/lote/getLoteById'
import createLote from '../api/lote/createLote'

const router = express.Router();

router.get('/', getAllLote);
router.get('/:id', getLoteById);

router.post('/', createLote);

export default router;
