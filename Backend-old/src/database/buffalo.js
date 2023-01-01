import mongoose from 'mongoose'
import animalSchema from './animal_schema.js'

const Buffalos = mongoose.model('Buffalos', animalSchema)
Buffalos.createIndexes({ tag: 1 })

export default Buffalos
