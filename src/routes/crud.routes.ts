
// Llamamos a router para definir las rutas del api
import { Router } from 'express'
// import { accion } from '../controllers/crud.controller'

const accion = (req, res) =>  {
    res.send('pong')
}

const router:Router = Router()

router.get('/ping',  accion)


export default router