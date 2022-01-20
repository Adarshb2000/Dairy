import mongoose from 'mongoose'
import {
  diseaseSchema,
  milkHistorySchema,
  pregSchema,
} from './database_schemas.js'

const buffaloSchema = new mongoose.Schema({
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

const Buffalos = mongoose.model('Buffalos', buffaloSchema)
Buffalos.createIndexes({ tag: 1 })

export default Buffalos
