import servicio from "../models/servicio";
import { authAdmin } from "../middlewares/validateToken";
import { Router } from "express";

import { crearServicio, obtenerServicios, eliminarServicio, editarServicio } from "../controllers/servicio.controller";
const router = Router();

router.post("/crear-servicio", crearServicio)
router.get("/servicios", obtenerServicios)
router.delete("/eliminar-servicio/:id", eliminarServicio)
router.put("/editar-servicio/:id", editarServicio)

export default router