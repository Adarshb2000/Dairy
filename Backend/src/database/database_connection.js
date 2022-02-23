import mongoose from 'mongoose'
import { host } from '../config.js'

export const connect = async () => {
  await mongoose
    .connect(`mongodb://${host}:27017/dairy`)
    .then(() => {
      console.log('connected')
    })
    .catch(console.log)
}
