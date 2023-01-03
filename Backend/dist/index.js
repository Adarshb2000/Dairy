"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var dotenv = __importStar(require("dotenv"));
var server_1 = require("./server");
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
dotenv.config();
(0, server_1.start)(process.env.host, Number(process.env.port));
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
//# sourceMappingURL=index.js.map