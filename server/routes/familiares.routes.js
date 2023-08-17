import { Router } from 'express'
import {
  actualizarFamiliar,
  crearFamiliar,
  obtenerFamiliares,
  obtenerFamiliar,
  eliminarFamiliar
} from '../controllers/familiares.controllers.js'

const router = Router()

router.get('/familiares', obtenerFamiliares)
router.get('/familiares/:id', obtenerFamiliar)
router.post('/familiares', crearFamiliar)
router.put('/familiares/:id', actualizarFamiliar)
router.delete('/familiares/:id', eliminarFamiliar)

export default router
