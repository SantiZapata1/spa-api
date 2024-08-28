import servicio from "../models/servicio";
import { authAdmin } from "../middlewares/validateToken";
import { Router } from "express";

import { crearServicio, obtenerServicios, eliminarServicio, editarServicio } from "../controllers/servicio.controller";
const router = Router();

router.post("/crear-servicio", authAdmin, crearServicio)
router.get("/servicios", obtenerServicios)
router.delete("/eliminar-servicio/:id", authAdmin, eliminarServicio)
router.put("/editar-servicio/:id", authAdmin, editarServicio)