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

// Ruta para obtener todos los comentarios
router.get("/comentarios", getComments);

// Rutas para obtener un comentario
router.get(`/comentario/:id`, getComment);

// Ruta para obtener los comentarios de un usuario
router.get('/comentarios-usuario/:id', getCommentFromUser);

// Ruta para crear un comentario
router.post("/comentarios", createComment);

// Ruta para eliminar un comentario
router.delete(`/comentarios/:id`, deleteComment);

// ruta para editar un comentario
router.put(`/comentarios/:id`, updateComment);


export default router;