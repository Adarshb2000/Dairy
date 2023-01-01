import { Router } from 'express'
import { body, param } from 'express-validator'
import {
  createAnimal,
  deleteAnimal,
  editAnimal,
  getAllAnimals,
  getAnimal,
} from './handler'
import validator from '../helpers/validator'

const router = Router()

router.get('/', getAllAnimals)
router.post(
  '/',
  body(['tag'])
    .exists()
    .bail()
    .matches(/[B|C]-\d+$/),
  body(['seller', 'purchaseDate', 'vehicleNumber']).optional(),
  body('comments').optional().isArray(),
  validator,
  createAnimal
)
// Vehicle Number if exists check

router
  .route('/:tag')
  .all(
    param('tag')
      .exists()
      .matches(/[B|C]-\d+$/),
    validator
  )
  .get(getAnimal)
  .patch(editAnimal)
  .delete(deleteAnimal)

export default router
