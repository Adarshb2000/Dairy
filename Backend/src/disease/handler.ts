import { Handler } from 'express'
import prisma from '../db'

export const getDiseases: Handler = async (req, res, next) => {
  try {
    const animal = await prisma.animal.findUnique({
      where: {
        tag: req.params.tag,
      },
      include: {
        diseases: {
          include: {
            vaccination: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })
    res.json({ data: animal.diseases })
  } catch (e) {
    next(e)
  }
}

export const getDisease: Handler = async (req, res, next) => {
  try {
    const disease = await prisma.disease.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        vaccination: true,
      },
    })
    res.json({
      data: disease,
    })
  } catch (e) {
    next(e)
  }
}

export const createDiseases: Handler = async (req, res, next) => {
  try {
    const disease = await prisma.disease.create({
      data: {
        animal: {
          connect: {
            tag: req.params.tag,
          },
        },
        vaccination: {
          create: req.body,
        },
      },
      include: {
        vaccination: true,
      },
    })
    res.status(201).json({ data: disease })
  } catch (e) {
    next(e)
  }
}

export const addVaccine: Handler = async (req, res, next) => {
  try {
    const disease = await prisma.disease.update({
      where: {
        id: req.params.id,
      },
      data: {
        vaccination: {
          create: req.body,
        },
      },
      include: {
        vaccination: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    })
    res.json({ data: disease.vaccination[0] })
  } catch (e) {
    next(e)
  }
}

export const editVaccine: Handler = async (req, res, next) => {
  try {
    const vaccine = await prisma.vaccination.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    })

    res.status(201).json({ data: vaccine })
  } catch (e) {
    next(e)
  }
}

export const deleteVaccine: Handler = async (req, res, next) => {
  try {
    const vaccine = await prisma.vaccination.delete({
      where: {
        id: req.params.id,
      },
      include: {
        disease: {
          include: {
            vaccination: true,
          },
        },
      },
    })

    if (vaccine.disease.vaccination.length === 1) {
      await prisma.disease.delete({
        where: {
          id: vaccine.diseaseId,
        },
      })
    }

    res.status(202).json({ data: vaccine })
  } catch (e) {
    next(e)
  }
}

export const deleteDisease: Handler = async (req, res, next) => {
  try {
    const disease = await prisma.disease.delete({
      where: {
        id: req.params.id,
      },
      include: {
        vaccination: true,
      },
    })
    res.status(202).json({ data: disease })
  } catch (e) {
    next(e)
  }
}
