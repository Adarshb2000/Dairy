import { Handler } from 'express'
import prisma from '../db'

export const getPregnancies: Handler = async (req, res, next) => {
  try {
    const pregnancies = await prisma.pregnancy.findMany({
      where: {
        tag: {
          equals: req.params.tag,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        copulation: true,
        examination: true,
        lactation: true,
        delivery: true,
      },
    })
    res.json({
      data: pregnancies,
    })
  } catch (e) {
    next(e)
  }
}

export const getPregnancy: Handler = async (req, res, next) => {
  try {
    const pregnancy = await prisma.pregnancy.findUnique({
      where: {
        id: req.params.id,
      },
    })
    res.json({
      data: pregnancy,
    })
  } catch (e) {
    next(e)
  }
}

export const createPregnancy: Handler = async (req, res, next) => {
  try {
    const { stage, ...rest } = req.body
    const data = {}

    data[stage.toLowerCase()] = { create: rest }
    const pregnancy = await prisma.pregnancy.create({
      data: {
        stage: stage,
        completed: stage === 'DELIVERY',
        ...data,
        animal: {
          connect: {
            tag: req.params.tag,
          },
        },
      },
      include: {
        copulation: true,
        examination: true,
        lactation: true,
        delivery: true,
      },
    })
    res.json({ data: pregnancy })
  } catch (e) {
    next(e)
  }
}

export const abortPregnancy: Handler = async (req, res, next) => {
  try {
    const pregnancy = await prisma.pregnancy.update({
      where: {
        id: req.params.id,
      },
      data: {
        completed: true,
      },
    })
    res.json({ data: pregnancy })
  } catch (e) {
    next(e)
  }
}

export const unAbortPregnancy: Handler = async (req, res, next) => {
  try {
    const pregnancy = await prisma.pregnancy.update({
      where: {
        id: req.params.id,
      },
      data: {
        completed: false,
      },
    })
    res.json({ data: pregnancy })
  } catch (e) {
    next(e)
  }
}

export const updatePregnancy: Handler = async (req, res, next) => {
  try {
    const { stage, ...rest } = req.body

    const data = {}
    data[stage.toLowerCase()] = {
      create: rest,
    }
    data['completed'] =
      (stage === 'EXAMINATION' && rest.isPregnant === false) ||
      stage === 'DELIVERY'

    const pregnancy = await prisma.pregnancy.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...data,
        stage: stage,
      },
      include: {
        copulation: true,
        examination: true,
        lactation: true,
        delivery: true,
      },
    })
    res.status(201).json(pregnancy)
  } catch (e) {
    next(e)
  }
}

export const editStage: Handler = async (req, res, next) => {
  try {
    const { stage, ...rest } = req.body
    const data = {}
    data[stage.toLowerCase()] = { update: rest }
    if (
      req.params.stage === 'EXAMINATION' &&
      req.body.isPregnant !== undefined
    ) {
      data['completed'] = !rest.isPregnant
    }

    const pregnancy = await prisma.pregnancy.update({
      where: {
        id: req.params.id,
      },
      data: data,
      include: {
        copulation: true,
        examination: true,
        lactation: true,
        delivery: true,
      },
    })

    res.status(201).json({ data: pregnancy })
  } catch (e) {
    next(e)
  }
}

export const deletePregnancy: Handler = async (req, res, next) => {
  try {
    const pregnancy = await prisma.pregnancy.delete({
      where: {
        id: req.params.id,
      },
      include: {
        copulation: true,
        examination: true,
        lactation: true,
        delivery: true,
      },
    })

    res.status(202).json({ data: pregnancy })
  } catch (e) {
    next(e)
  }
}
