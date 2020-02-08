import * as express from 'express';
import GetHistoricoLote from '../api/historico-lote/getHistoricoLote';
import CreateHistoricoLote from '../api/historico-lote/createHistoricoLote';

const router = express.Router();

router.get('/:idAnimal', GetHistoricoLote);

router.post('/', CreateHistoricoLote);

export default router
