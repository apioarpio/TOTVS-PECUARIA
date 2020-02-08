import * as express from 'express'
import getEntidades from '../api/entidade/getEntidades';
import getEntidadeById from '../api/entidade/getEntidadeById';
import saveEntidade from '../api/entidade/saveEntidade';

const router = express.Router();

router.get('/', getEntidades);
router.get('/', getEntidades);
router.get('/:id', getEntidadeById);

router.post('/', saveEntidade);

export default router
