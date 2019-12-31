import express from 'express';
import getMovimentacaoAnimal from '../api/movimentacaoAnimal/getMovimentacaoAnimal';
import createMovimentacaoAnimal from '../api/movimentacaoAnimal/createMovimentacaoAnimal';

const router = express.Router();

router.get('/:id', getMovimentacaoAnimal);

router.post('/', createMovimentacaoAnimal);

export default router;
