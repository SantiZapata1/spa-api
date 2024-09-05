import { Router } from 'express'
import { crearNoticia, obtenerNoticias, eliminarNoticiaId, editarNoticiaId } from '../controllers/noticias.controller'
import { authAdmin } from '../middlewares/validateToken'
const router:Router = Router()

// Crear noticias (Admin)
router.post('/crear-noticia', authAdmin,  crearNoticia)
// Obtener noticias (Público)
router.get('/obtener-noticias', obtenerNoticias)
// Eliminar noticia por ID (Admin)
router.delete('/eliminar-noticia/:id',  authAdmin, eliminarNoticiaId)
// Editar noticia por ID (Admin)
router.put('/editar-noticia/:id',  authAdmin, editarNoticiaId)

export default router