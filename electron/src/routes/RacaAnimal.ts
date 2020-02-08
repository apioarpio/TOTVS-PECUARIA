import * as express from 'express';
import createRacaAnimal from '../api/racaAnimal/createRacaAnimal';
import getRacaAnimal from '../api/racaAnimal/getRacaAnimal';

const router = express.Router();

router.get('/', getRacaAnimal);
router.get('/:id', getRacaAnimal);

router.post('/', createRacaAnimal);

export default router;
