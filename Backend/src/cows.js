import mongoose from 'mongoose'

export const pregSchema = new mongoose.Schema({
  uthiDate: Date,
  bullNumber: Number,
  test: {
    date: Date,
    doctor: String,
    time: Number,
    reason: String,
  },
  lactationDate: Date,
  delivery: {
    date: Date,
    calf: String,
  },
})

export const vaccinationSchema = new mongoose.Schema({
  vaccine: String,
  vaccinationDate: Date,
  doctor: String,
})

export const diseaseSchema = new mongoose.Schema({
  testDate: Date,
  doctor: String,
  vaccination: [vaccinationSchema],
  cured: Boolean,
})

export const milkHistorySchema = mongoose.Schema({
  milk: Number,
  milkDate: Date,
  lineNumber: Number,
})

export const cowSchema = new mongoose.Schema({
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
  milkHistory: [milkHistorySchema],
})

export const Cows = mongoose.model('Cows', cowSchema)
Cows.createIndexes({ tag: 1 })
