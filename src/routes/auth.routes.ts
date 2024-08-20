import { Router } from 'express'
import { authRequired, authAdmin } from '../middlewares/validateToken'
import { register, login, logout, verifyToken } from '../controllers/auth.controllers' 
import usuarios from '../models/usuario'
import path from 'path';

// Uso de Router de express
const router:Router = Router()

// Rutas para autenticación de usuario
router.post('/register', register) // Registro de usuario
router.post('/login', login) // Inicio de sesión
router.post('/logout', logout) // Cierre de sesión

router.get('/profile', authRequired, async (req, res) => {//esta funcion puede ser una aparte para mejor legibilidad
    const user = await usuarios.findById(req.user.id)
    res.json(user)
    
})
router.get('/verify', verifyToken) // Verificación de token


export default router