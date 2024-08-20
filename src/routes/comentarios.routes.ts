import { Router } from 'express'
import { getComment, getComments, createComment, deleteComment, updateComment } from '../controllers/comentarios.controllers';

const router:Router = Router()

router.get("/comentarios", getComments);
router.get(`/comentario/:id`, getComment);
router.post("/comentarios", createComment);
router.delete(`/comentarios/:id`, deleteComment);
router.put(`/comentarios/:id`, updateComment);

export default router;