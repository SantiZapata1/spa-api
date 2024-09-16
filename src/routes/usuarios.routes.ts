import { Router } from 'express';

// se importan los controladores

import { getAdmins, setAdmin, removeAdmin } from '../controllers/usuarios.controllers';
import { authAdmin } from '../middlewares/validateToken';
const router:Router = Router();

router.get("/admins",authAdmin, getAdmins)
router.put("/set-admin/:nombre_de_usuario", authAdmin, setAdmin)
router.put("/remove-admin/:id", authAdmin, removeAdmin)

export default router;