import { Handler } from 'express'
import prisma from '../db'

// Comments doesn't work

export const getAllAnimals: Handler = async (req, res) => {
  const animals = await prisma.animal.findMany()
  res.json({
    data: animals,
  })
}

export const getAnimal: Handler = async (req, res, next) => {
  try {
    const animal = await prisma.animal.findUniqueOrThrow({
      where: {
        tag: req.params.tag,
      },
      include: {
        comments: {
          select: {
            comment: true,
          },
        },
        diseases: {
          orderBy: {
            updatedAt: 'desc',
          },
          include: {
            vaccination: {
              orderBy: {
                date: 'asc',
              },
            },
          },
        },
        pregnancies: {
          orderBy: {
            updatedAt: 'desc',
          },
          include: {
            copulation: true,
            delivery: true,
            examination: true,
            lactation: true,
          },
        },
        milks: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    })
    res.json({ data: animal })
  } catch (e) {
    next(e)
  }
}

export const createAnimal: Handler = async (req, res, next) => {
  try {
    const { comments, ...rest } = req.body
    const animal = await prisma.animal.create({
      data: rest,
    })
    if (comments) {
      await prisma.comment.createMany({
        data: comments.map((comment: string) => {
          return { tag: animal.tag, comment }
        }),
      })
    }
    return res.status(201).json({
      data: animal,
    })
  } catch (e) {
    next(e)
  }
}

export const editAnimal: Handler = async (req, res, next) => {
  try {
    const { comments, ...rest } = req.body
    if (comments)
      await prisma.comment.updateMany({
        where: {
          id: {
            in: comments.map((e) => e.id),
          },
        },
        data: {
          comment: {
            set: comments.map((e) => e.comment),
          },
        },
      })
    const animal = await prisma.animal.update({
      where: {
        tag: req.params.tag,
      },
      data: rest,
      include: {
        comments: {
          select: {
            comment: true,
          },
        },
        diseases: {
          orderBy: {
            updatedAt: 'desc',
          },
          include: {
            vaccination: {
              orderBy: {
                date: 'asc',
              },
            },
          },
        },
        pregnancies: {
          orderBy: {
            updatedAt: 'desc',
          },
          include: {
            copulation: true,
            delivery: true,
            examination: true,
            lactation: true,
          },
        },
        milks: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    })

    res.status(201).json({
      data: animal,
    })
  } catch (e) {
    next(e)
  }
}

export const deleteAnimal: Handler = async (req, res, next) => {
  try {
    const animal = await prisma.animal.delete({
      where: {
        tag: req.params.tag,
      },
      include: {
        comments: {
          select: {
            comment: true,
          },
        },
        diseases: {
          orderBy: {
            updatedAt: 'desc',
          },
          include: {
            vaccination: {
              orderBy: {
                date: 'asc',
              },
            },
          },
        },
        pregnancies: {
          orderBy: {
            updatedAt: 'desc',
          },
          include: {
            copulation: true,
            delivery: true,
            examination: true,
            lactation: true,
          },
        },
        milks: {
          orderBy: {
            date: 'desc',
          },
        },
      },
    })
    res.status(208).json({
      data: animal,
    })
  } catch (e) {
    next(e)
  }
}
