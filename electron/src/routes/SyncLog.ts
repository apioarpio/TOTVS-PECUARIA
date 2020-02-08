import * as express from 'express';
import createSyncLog from '../api/syncLog/createSyncLog';
import getSyncLog from '../api/syncLog/getSyncLog';

const router = express.Router();

router.get('/getLastSyncLog', getSyncLog);

router.post('/createSyncLog', createSyncLog);

export default router;
