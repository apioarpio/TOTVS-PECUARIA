import express from 'express';
import createEstacao from '../api/contexto/createEstacao';
import addFazendaContexto from '../api/contexto/addFazendaContexto';
import setFazendaAtual from '../api/contexto/setFazendaAtual';
import getEstacaoFazenda from '../api/contexto/getEstacaoFazenda';

const router = express.Router();

router.get('/', getEstacaoFazenda);

router.post('/createEstacao', createEstacao);
router.post('/addFazenda', addFazendaContexto);
router.post('/setFazendaAtual', setFazendaAtual);

export default router;
