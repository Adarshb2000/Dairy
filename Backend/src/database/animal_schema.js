import mongoose from 'mongoose'
import { diseaseSchema, milkSchema, pregSchema } from './database_schemas.js'

const animalSchema = new mongoose.Schema({
  tag: {
    type: Number,
    unique: true,
    required: true,
  },
  purchaseDate: Date,
  vehicleNumber: Number,
  seller: String,
  comments: [String],
  pregnancy: [pregSchema],
  disease: [diseaseSchema],
  milk: [milkSchema],
})

export default animalSchema
