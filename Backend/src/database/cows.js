import mongoose from 'mongoose'
import {
  diseaseSchema,
  milkHistorySchema,
  pregSchema,
} from './database_schemas.js'

const cowSchema = new mongoose.Schema({
  tag: {
    type: Number,
    unique: true,
    required: true,
  },
  dateBought: Date,
  vehicleNumber: Number,
  seller: String,
  comments: [String],
  pregnancy: [pregSchema],
  disease: [diseaseSchema],
  milkHistory: [milkHistorySchema],
})

const Cows = mongoose.model('Cows', cowSchema)
Cows.createIndexes({ tag: 1 })

export default Cows
