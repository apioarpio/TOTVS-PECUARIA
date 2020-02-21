import * as express from 'express';
import getAnimalBySisbov from '../api/animal/getAnimalBySisbov';
import getAnimais from '../api/animal/getAnimais';
import saveAnimal from '../api/animal/saveAnimal';
import getIndicadoresAnimal from '../api/animal/getIndicadoresAnimal';

const router = express.Router();

router.get('/indicadores', getIndicadoresAnimal);
router.get('/', getAnimais);

router.get('/:id', getAnimalBySisbov);

router.post('/', saveAnimal);

export default router
