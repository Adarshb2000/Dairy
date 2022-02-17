import mongoose from 'mongoose'

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
})

export const diseaseSchema = new mongoose.Schema({
  date: Date,
  doctor: String,
  vaccination: [vaccinationSchema],
  cured: Boolean,
})

export const milkSchema = mongoose.Schema({
  milk: Number,
  date: Date,
  lineNumber: Number,
})
