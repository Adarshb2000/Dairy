import * as dotenv from 'dotenv'
import { start } from './server'
// import prisma froms './db'

// const generateRandomMilkData = () => {
//   const data = []
//   let date = new Date()
//   date.setDate(5)
//   for (let i = 0; i < 12; i += 1) {
//     date.setMonth(i)
//     data.push({
//       lineNumber: 2,
//       milk: Math.round((Math.random() * 10 + Number.EPSILON) * 100) / 100 + 5,
//       date: new Date(date),
//     })
//   }
//   return data
// }

dotenv.config()
start(process.env.host, Number(process.env.port))
// prisma.animal
//   .deleteMany({})
//   .then(() =>
//     prisma.animal.create({
//       data: {
//         tag: 'C-137',
//         seller: 'someone',
//         purchaseDate: new Date(),
//         vehicleNumber: 3,
//         // pregnancies: {
//         //   create: {
//         //     stage: 'COPULATION',
//         //     copulation: {
//         //       create: {
//         //         bullNumber: 5,
//         //         worker: 'Somsaod',
//         //         date: new Date(),
//         //       },
//         //     },
//         //   },
//         // },
//         // milks: {
//         //   createMany: {
//         //     data: generateRandomMilkData(),
//         //   },
//         // },
//       },
//     })
//   )
//   .then(start)
