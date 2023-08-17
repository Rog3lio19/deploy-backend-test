import { Router } from 'express'
import { loginHandler } from '../controllers/login.controllers.js'

const router = Router()

router.post('/login', loginHandler)

export default router
