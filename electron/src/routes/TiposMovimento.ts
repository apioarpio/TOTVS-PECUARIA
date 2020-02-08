import * as express from 'express';
import CreateTM from '../api/tiposMovimento/createTM';
import GetTM from '../api/tiposMovimento/getTM';
import GetTMById from '../api/tiposMovimento/getTMById';

const router = express.Router();

router.get('/', GetTM);
router.get('/:id', GetTMById);

router.post('/', CreateTM);

export default router
