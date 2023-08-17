import { prisma } from '../db.js'

export const crearFamiliar = async (req, res) => {
  try {
    const existFam = await prisma.familiares.findFirst({
      where: {
        key: req.body.key
      }
    })

    if (existFam === null) {
      const createFam = await prisma.familiares.create({
        data: req.body
      })
      return res.json(createFam)
    }

    if (existFam !== null) {
      const updateFam = await prisma.familiares.update({
        where: {
          key: req.body.key
        },
        data: req.body
      })
      return res.json(updateFam)
    }
  } catch (error) {
    console.log('Ocurrio un error', error)
  }
}

export const obtenerFamiliares = async (req, res) => {
  try {
    const familiaresObtenidos = await prisma.alumnos.findMany({
      where: {
        id_alumno: req.body.id_alumno
      }
    })

    if (familiaresObtenidos.length === 0)
      return res.json({ existen: false, mensaje: 'No existen familiares aun' })

    res.json({ existen: true, mensaje: familiaresObtenidos })
  } catch (e) {
    res.json({ error: 'Ocurrio un error', e })
  }
}

export const eliminarFamiliar = async (req, res) => {
  try {
    const existFam = await prisma.familiares.findFirst({
      where: {
        key: req.params.id
      }
    })

    if (existFam !== null) {
      const deleteFam = await prisma.familiares.delete({
        where: {
          key: req.params.id
        }
      })
      return res.json(deleteFam)
    }
  } catch (error) {
    console.log(error)
  }
}

//Pendiente
export const obtenerFamiliar = async (req, res) => {
  try {
    const familiaresObtenidos = await prisma.familiares.findMany({
      where: {
        id_alumno: parseInt(req.params.id)
      }
    })

    if (familiaresObtenidos.length === 0)
      return res.json({ existen: false, mensaje: 'No existen familiares aun' })

    res.json({ existen: true, mensaje: familiaresObtenidos })
  } catch (error) {}
}

//Pendiente
export const actualizarFamiliar = async (req, res) => {
  try {
    const updateFam = await prisma.familiares.update({
      where: {
        key: key
      },
      data: req.body
    })

    if (updateFam !== null) {
      const createFam = await prisma.familiares.create({
        data: req.body
      })
      res.json(createFam)
    }

    res.json(updateFam)
  } catch (error) {
    console.log(error)
  }
}
