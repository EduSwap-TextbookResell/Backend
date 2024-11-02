import { Router } from 'express';

import userController from '../controllers/userController.js';
import requireJwtAuth from '../middlewares/requireJwtAuth.js';

const router = Router();

router.get('/', requireJwtAuth, userController.get);
router.get('/:username', requireJwtAuth, userController.getOne);
router.put('/:id', requireJwtAuth, userController.update);
router.delete('/:id', requireJwtAuth, userController.remove);

export default router;
