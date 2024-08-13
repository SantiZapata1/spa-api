import { Router } from 'express'
import { authRequired, authAdmin } from '../middlewares/validateToken'
import { register, login, logout } from '../controllers/auth.controllers'
import path from 'path';
// Uso de Router de express
const router:Router = Router()
// Rutas para autenticación de usuario
router.post('/register', register) // Registro de usuario
router.post('/login', login) // Inicio de sesión
router.post('/logout', logout) // Cierre de sesión

export default router