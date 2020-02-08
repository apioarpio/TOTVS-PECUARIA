import * as express from 'express';
import CreateHistoricoArea from '../api/historico-area/createHistoricoArea';
import GetHistoricoAreaAnimal from '../api/historico-area/getHistoricoAreaAnimal';

const router = express.Router();

router.get('/:idAnimal', GetHistoricoAreaAnimal);

router.post('/', CreateHistoricoArea);

export default router;
