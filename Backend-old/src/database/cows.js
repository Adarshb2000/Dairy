import mongoose from 'mongoose'
import animalSchema from './animal_schema.js'

const Cows = mongoose.model('Cows', animalSchema)
Cows.createIndexes({ tag: 1 })

export default Cows
