import { Router } from 'express'
import { createMilk, deleteMilk, editMilk, getMilk, getMilks } from './handler'
import { param } from 'express-validator'

const router = Router({ mergeParams: true })

router.get('/', getMilks)
router.post('/', createMilk)

router
  .route('/:id')
  .all(param('id').exists().isString())
  .get(getMilk)
  .patch(editMilk)
  .delete(deleteMilk)

export default router
