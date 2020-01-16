import express from 'express';
import createArea from '../api/area/createArea';
import getArea from '../api/area/getArea';

const router = express.Router();

router.get('/', getArea);

router.post('/', createArea);

export default router;
