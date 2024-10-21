// Importar jwt desde la librería jsonwebtoken
import jwt from 'jsonwebtoken'
// Importar la clave secreta desde el archivo config.ts
import { TOKEN_SECRET } from '../config'
// Importar el modelo de usuarios
import usuarios from '../models/usuario'

// Crear una función que valide el token
export const authRequired = (req, res, next) => {
    // Extraer el token de las cookies
    const { token } = req.cookies
    // Si no hay token, devolver un mensaje de error
    if (!token) return res.status(401).json({ message: "No token, authorization invalid" })
    // Verificar el token con la clave secreta
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" })
        req.user = user
        next()
    })
}

// Crear una función que valide si el usuario es admin
export const authAdmin = async (req, res, next) => {
    authRequired(req, res, async () => {
        try {
            //Busca al usuario en la BD
            const usuario = await usuarios.findById(req.user.id)
            //Verifica si el usuario es admin
            const isAdmin = usuario?.rol == "Administrador";
            //Si no es admin, devuelve el siguiente mensaje
            if (!isAdmin ) return res.status(403).json({ message: "You are not an admin" })
            //Si lo es, continúa a la página solicitada
            next()
        } catch (err) {
            console.log(err)
        }
    })
}

export const authProfesional = async (req, res, next) => {
    authRequired(req, res, async () => {
        try {
            //Busca al usuario en la BD
            const usuario = await usuarios.findById(req.user.id)
            //Verifica si el usuario es admin
            const isProfesional = usuario?.rol == "Profesional" || usuario?.rol == "Administrador";
            //Si no es admin, devuelve el siguiente mensaje
            if (!isProfesional ) return res.status(403).json({ message: "You are not a profesional" })
            //Si lo es, continúa a la página solicitada
            next()
        } catch (err) {
            console.log(err)
        }
    })
}
