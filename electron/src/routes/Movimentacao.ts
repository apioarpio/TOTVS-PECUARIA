import * as express from 'express';
import createMovimentacao from '../api/movimentacao/createMovimentacao'
import getMovimentacao from '../api/movimentacao/getMovimentacao'

const router = express.Router();

    router.get('/', getMovimentacao);
    router.get('/:id', getMovimentacao);

    router.post('/', createMovimentacao);

export default router;
