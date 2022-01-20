import mongoose from 'mongoose'

export const connect = async () => {
  await mongoose
    .connect('mongodb://localhost:27017/dairy')
    .then(() => {
      console.log('connected')
    })
    .catch(console.log)
}
