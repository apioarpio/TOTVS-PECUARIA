import * as express from 'express';
import createArea from '../api/area/createArea';
import getArea from '../api/area/getArea';
import getAreaById from '../api/area/getAreaById';

const router = express.Router();

router.get('/', getArea);
router.get('/:idArea', getAreaById);

router.post('/', createArea);

export default router;
