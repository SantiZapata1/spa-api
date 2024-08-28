import { Router } from 'express'
import { crearNoticia, obtenerNoticias, eliminarNoticiaId } from '../controllers/noticias.controller'
import { authAdmin } from '../middlewares/validateToken'
const router:Router = Router()

// Crear noticias (Admin)
router.post('/crear-noticia', authAdmin,  crearNoticia)
// Obtener noticias (Público)
router.get('/obtener-noticias', obtenerNoticias)
// Eliminar noticia por ID (Admin)
router.delete('/eliminar-noticia/:id',  authAdmin, eliminarNoticiaId)


export default router