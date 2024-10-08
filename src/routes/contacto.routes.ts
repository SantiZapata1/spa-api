
/* 
En este archivo, estamos definiendo las rutas del API. Al principio, importamos el método accion
del archivo crud.controllers.ts, que es el que se va a ejecutar cuando se haga la petición.

Luego, definimos un objeto router, que es el que vamos a usar para definir las rutas del API.
En este caso, estamos definiendo una ruta para el ping, que es una ruta de prueba que se usa
para verificar que el servidor está funcionando correctamente.

Distintos tipos de peticiones:
    - GET: se usa para obtener información del servidor
    - POST: se usa para enviar información al servidor
    - PUT: se usa para actualizar información en el servidor
    - DELETE: se usa para borrar información del servidor
    - PATCH: se usa para actualizar información parcialmente en el servidor
*/


// Llamamos a router para definir las rutas del api
import { Router } from 'express'
import { enviarMensajeContacto, getContactos, deleteContacto } from '../controllers/contacto.controller'

// Importar el middleware que requiere iniciar sesión
import { authAdmin, authRequired } from '../middlewares/validateToken'
// Definimos las rutas del api
const router:Router = Router()

// Ruta para enviar mensaje
router.post('/enviar-mensaje-contacto', enviarMensajeContacto)
// Ruta para obtener mensajes de contacto
router.get('/obtener-contactos', authAdmin, getContactos)
// Ruta para eliminar mensajes de contacto
router.delete('/eliminar-contacto/:id', authAdmin, deleteContacto)
// Exportamos las rutas del api
export default router