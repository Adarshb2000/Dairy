import mongoose from 'mongoose'

export const informationSchema = new mongoose.Schema({
  seller: String,
  purchaseDate: Date,
  vehicleNumber: Number,
})

export const pregSchema = new mongoose.Schema({
  copulation: {
    date: Date,
    bullNumber: Number,
    worker: String,
  },
  examination: {
    date: Date,
    doctor: String,
    duration: Number,
    isPregnant: Boolean,
    reason: String,
  },
  lactation: {
    date: Date,
  },
  delivery: {
    number: Number,
    date: Date,
    gender: String,
  },
  completed: Boolean,
})

export const vaccinationSchema = new mongoose.Schema({
  vaccine: String,
  date: Date,
  doctor: String,
  cured: {
    type: Boolean,
    default: () => false,
  },
})

export const diseaseSchema = new mongoose.Schema({
  vaccination: [vaccinationSchema],
  cured: Boolean,
})

export const milkSchema = mongoose.Schema({
  milk: Number,
  date: Date,
  lineNumber: Number,
})
