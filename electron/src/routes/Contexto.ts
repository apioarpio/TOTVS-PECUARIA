import * as express from 'express';
import createEstacao from '../api/contexto/createEstacao';
import addFazendaContexto from '../api/contexto/addFazendaContexto';
import setFazendaAtual from '../api/contexto/setFazendaAtual';
import getEstacaoFazenda from '../api/contexto/getEstacaoFazenda';
import getEstacao from '../api/contexto/getEstacao';
import getFazendaAtual from '../api/contexto/getFazendaAtual';

const router = express.Router();

router.get('/', getEstacaoFazenda);
router.get('/estacao', getEstacao);
router.get('/fazendaAtual', getFazendaAtual);

router.post('/createEstacao', createEstacao);
router.post('/addFazenda', addFazendaContexto);
router.post('/setFazendaAtual', setFazendaAtual);

export default router;
