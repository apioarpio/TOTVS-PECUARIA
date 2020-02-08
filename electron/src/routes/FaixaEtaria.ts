import * as express from 'express';
import createFaixaEtaria from '../api/faixaEtaria/createFaixaEtaria';
import getFaixaEtaria from '../api/faixaEtaria/getFaixaEtaria';
import getFaixaEtariaById from '../api/faixaEtaria/getFaixaEtariaById';

const router = express.Router();

router.get('/', getFaixaEtaria);
router.get('/:id', getFaixaEtariaById);

router.post('/', createFaixaEtaria);

export default router;
