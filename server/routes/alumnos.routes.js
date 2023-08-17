import { Router } from 'express'
import {
  actualizarAlumno,
  crearAlumno,
  obtenerAlumnos,
  obtenerAlumno,
  subirArchivo
} from '../controllers/alumnos.controllers.js'

const router = Router()

router.get('/alumnos', obtenerAlumnos)
router.get('/alumnos/:id', obtenerAlumno)
router.post('/alumnos', crearAlumno)
router.put('/alumnos/:id', actualizarAlumno)
router.post('/alumnos/archivos/:id', subirArchivo)

export default router
