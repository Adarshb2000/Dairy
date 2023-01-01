import { Router } from 'express'
import { param } from 'express-validator'
import {
  addVaccine,
  createDiseases,
  deleteDisease,
  deleteVaccine,
  editVaccine,
  getDiseases,
} from './handler'

const router = Router({ mergeParams: true })

router.get('/', getDiseases) // Get All diseases
router.post('/', createDiseases) // Create disease

router
  .route('/:id')
  .all(param('id').exists().isString())
  .put(addVaccine) // Add vaccine to disease
  .delete(deleteDisease) // Delete entire Disease!

router
  .route('/vaccine/:id')
  .all(param('id').exists().isString())
  .patch(editVaccine) // Edit vaccine
  .delete(deleteVaccine) // delete vaccine

export default router
