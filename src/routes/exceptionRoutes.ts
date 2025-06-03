import { Router } from 'express';
import {
  getAllExceptions,
  getExceptionsByLocation,
  createException,
  updateException,
  deleteException,
} from '../controllers/exceptionController';

const router = Router();

router.get('/', getAllExceptions);
router.get('/:locationId', getExceptionsByLocation);
router.post('/', createException);
router.put('/:id', updateException);
router.delete('/:id', deleteException);

export default router;

