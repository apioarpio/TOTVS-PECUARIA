import * as express from 'express';
import getAnimalBySisbov from '../api/animal/getAnimalBySisbov';
import getAnimais from '../api/animal/getAnimais';
import saveAnimal from '../api/animal/saveAnimal';

const router = express.Router();


router.get('/:id', getAnimalBySisbov);
router.get('/', getAnimais);

router.post('/', saveAnimal);

export default router
