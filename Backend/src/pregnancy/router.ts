import { Router } from 'express'
import { body, param } from 'express-validator'
import validator from '../helpers/validator'
import {
  abortPregnancy,
  createPregnancy,
  deletePregnancy,
  editStage,
  getPregnancies,
  getPregnancy,
  unAbortPregnancy,
  updatePregnancy,
} from './handlers'
import { pregnancyStages } from '../config'

const router = Router({ mergeParams: true })

router.get('/', getPregnancies)

router.post(
  '/',
  body('stage').exists().isIn(pregnancyStages),
  validator,
  createPregnancy
)

router
  .route('/:id')
  .all(param('id').exists(), validator)
  .get(getPregnancy)
  .delete(deletePregnancy)
  .put(body('stage').exists().isIn(pregnancyStages), updatePregnancy)

router.patch('/abort/:id', abortPregnancy)
router.patch('/unabort/:id', unAbortPregnancy)

router
  .route('/:id')
  .all(body('stage').exists().isIn(pregnancyStages), validator)
  .patch(editStage)

export default router
