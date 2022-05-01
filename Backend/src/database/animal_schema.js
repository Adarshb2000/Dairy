import mongoose from 'mongoose'
import {
  diseaseSchema,
  informationSchema,
  milkSchema,
  pregSchema,
} from './database_schemas.js'

const animalSchema = new mongoose.Schema({
  tag: {
    type: Number,
    unique: true,
    required: true,
  },
  information: informationSchema,
  comments: [String],
  pregnancies: {
    type: [pregSchema],
    default: () => [],
  },
  deliveries: {
    type: Number,
    default: 0,
  },
  diseases: { type: [diseaseSchema], default: () => [] },
  milk: { type: [milkSchema], default: () => [] },
})

export default animalSchema
