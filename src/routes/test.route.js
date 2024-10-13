import { Router } from 'express';

import testController from '../controllers/test.controller.js';

const router = Router();

router.get('/', testController.get);
router.post('/', testController.create);
router.put('/:id', testController.update);
router.delete('/:id', testController.remove);

export default router;
