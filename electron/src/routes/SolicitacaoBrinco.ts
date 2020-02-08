import * as express from 'express';
import createSolicitacaoBrinco from '../api/solicitacaoBrinco/createSolicitacaoBrinco';
import getSolicitacaoBrinco from '../api/solicitacaoBrinco/getSolicitacaoBrinco';
import validaSisbov from '../api/solicitacaoBrinco/validaSisbov';

const router = express.Router();

router.post('/', createSolicitacaoBrinco);

router.get('/', getSolicitacaoBrinco);
router.get('/validaSisbov/:sisbov', validaSisbov);
// router.get('/:id');

export default router;
