import express from 'express';
import getEntidades from '../api/entidade/getEntidades';
import saveEntidade from '../api/entidade/saveEntidade';

const router  = express.Router();


router.get('/', getEntidades);

router.post('/',saveEntidade);

export default router
