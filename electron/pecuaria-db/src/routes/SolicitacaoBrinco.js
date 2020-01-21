import express from 'express';
import createSolicitacaoBrinco from '../api/solicitacaoBrinco/createSolicitacaoBrinco';
import getSolicitacaoBrinco from '../api/solicitacaoBrinco/getSolicitacaoBrinco';

const router = express.Router();

router.post('/', createSolicitacaoBrinco);

router.get('/', getSolicitacaoBrinco);
// router.get('/:id');

export default router;
