import { Router } from 'express';

import { 
    crearCV,
    eliminarCV,
    buscarCV } from '../controllers/busquedaEmp.controllers';

const router = Router();

router.post('/crear-cv', crearCV);
router.get('/buscar-cv', buscarCV);
router.delete('/eliminar-cv/:id', eliminarCV);

export default router;