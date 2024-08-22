import { Router } from 'express'

// se importan los controladores
import { 
    getComment, 
    getComments, 
    createComment, 
    deleteComment, 
    updateComment,
    getCommentFromUser
} from '../controllers/comentarios.controllers';

const router:Router = Router()

// ruta para obtener todos los ocmentarios
router.get("/comentarios", getComments);

// rutas para obtener un comentario
router.get(`/comentario/:id`, getComment);

// Ruta para obtener los comentarios de un usuario
router.get('/comentarios-usuario/:id', getCommentFromUser);

// ruta para crear un ocmentario
router.post("/comentarios", createComment);

// ruta para eliminar un comentario
router.delete(`/comentarios/:id`, deleteComment);

// ruta para editar un comentario
router.put(`/comentarios/:id`, updateComment);


export default router;