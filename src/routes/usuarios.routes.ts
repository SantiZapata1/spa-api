import { Router } from 'express';

// se importan los controladores

import { getAdmins, setAdmin, removeAdmin, setEmpleado, setUser, buscarUsuario } from '../controllers/usuarios.controllers';
import { authAdmin } from '../middlewares/validateToken';
const router:Router = Router();

router.get("/admins",authAdmin, getAdmins)
router.put("/remove-admin/:id", authAdmin, removeAdmin)
router.put("/set-admin/:nombre_de_usuario", authAdmin, setAdmin)
router.put("/set-empleado/:nombre_de_usuario", authAdmin, setEmpleado)
router.put("/set-user/:nombre_de_usuario", authAdmin ,setUser)
router.get("/buscar-usuario/:nombre_de_usuario/:rol", authAdmin, buscarUsuario)
export default router;