import { Handler } from 'express'
import prisma from '../db'

export const getMilks: Handler = async (req, res, next) => {
  try {
    const animal = await prisma.animal.findUnique({
      where: {
        tag: req.params.tag,
      },
      include: {
        milks: {
          orderBy: { date: 'asc' },
        },
      },
    })

    res.json({ data: animal.milks })
  } catch (e) {
    next(e)
  }
}

export const getMilk: Handler = async (req, res, next) => {
  try {
    const milk = await prisma.milk.findUnique({
      where: {
        id: req.params.id,
      },
    })

    res.json(milk)
  } catch (e) {
    next(e)
  }
}

export const createMilk: Handler = async (req, res, next) => {
  try {
    const milk = await prisma.milk.create({
      data: {
        ...req.body,
        animal: {
          connect: {
            tag: req.params.tag,
          },
        },
      },
    })
    res.status(201).json({ data: milk })
  } catch (e) {
    next(e)
  }
}
export const editMilk: Handler = async (req, res, next) => {
  try {
    const milk = await prisma.milk.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    })
    res.json({ data: milk })
  } catch (e) {
    next(e)
  }
}

export const deleteMilk: Handler = async (req, res, next) => {
  try {
    const milk = await prisma.milk.delete({
      where: {
        id: req.params.id,
      },
    })
    res.status(208).json({ data: milk })
  } catch (e) {
    next(e)
  }
}
