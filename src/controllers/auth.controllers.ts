import usuarios from '../models/usuario'
import { createAccessToken } from '../libs/jwt'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'
import path from 'path'
const fs = require('fs') //Módulo para guardar imagenes


//Registro de usuarios
//recibe los datos de un nuevo usuario desde el formulario
export const register = async (req, res) => {
    try {
        const { nombre, apellido, correo_electronico, nombre_de_usuario, pass } = req.body

        //primero buscamos si ese usuario ya existe
        const existentUser = await usuarios.findOne({ nombre_de_usuario: nombre_de_usuario })
        if (existentUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' })
        }

        //si no existe, lo creamos y guardamos
        const user = new usuarios({
            nombre,
            apellido,
            correo_electronico,
            nombre_de_usuario,
            pass,
            admin: false
        })


        const userSaved = await user.save()

        const token = await createAccessToken({ id: userSaved._id })
        res.cookie('token', token)

        res.json(userSaved)

    } catch (error) {
        console.log(error)
    }
}
 

//Login de usuarios
export const login = async (req, res) => {

    const {  nombre_de_usuario, pass } = req.body
    // Busca el usuario en la base de datos
    const usuarioEncontrado = await usuarios.findOne({ nombre_de_usuario: nombre_de_usuario })
    // Verifica si existe el usuario
    if (!usuarioEncontrado) {
        return res.status(400).json({ message: 'Usuario no encontrado' })
    }
    // Utiliza el método compare de bcrypt para comparar la contraseña ingresada con la contraseña almacenada en la base de datos    
    const isPassMatched = await bcrypt.compare(pass, usuarioEncontrado.pass)

    // Si la contraseña no coincide, devuelve un mensaje de error
    if (!isPassMatched) return res.status(400).json({ message: 'Contraseña incorrecta' })

    // Genera un token de acceso con el método createAccessToken y guarda el id
    const token = await createAccessToken({ id: usuarioEncontrado._id })

    // Guarda el token en una cookie
    res.cookie('token', token, {
        /* Esto debe estar activado en producción */
        // domain: '.gonzaloebel.tech',
        // secure: process.env.NODE_ENV === 'production',
        // httpOnly: true,
        // sameSite: 'none', // Permite el envío entre sitios
        maxAge: 24 * 60 * 60 * 1000
    });

    //Envio al frontend de los datos del usuario registrado
    res.json({
        id: usuarioEncontrado._id,
        nombre_de_usuario: usuarioEncontrado.nombre_de_usuario,
        nombre: usuarioEncontrado.nombre,
        apellido: usuarioEncontrado.apellido,
        telefono: usuarioEncontrado.telefono,
        admin: usuarioEncontrado.admin,
        createdAt: usuarioEncontrado.createdAt

    })

}

//Logout 
export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

// Verify

export const verifyToken = async (req, res) => {
    // Obtiene el token de la cookie
    const { token } = req.cookies

    // Si no hay token, devuelve un mensaje de error
    if (!token) {
        return res.status(401).json({ message: 'No hay token' })
    }

    // Verifica el token con el método verify de jwt
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        // Si hay un error, devuelve un mensaje de error
        if (err) return res.status(401).json({ message: "No autorizado" })
        // Busca el usuario en la base de datos
        const userFound = await usuarios.findById(user.id)
        // Si no encuentra el usuario, devuelve un mensaje de error
        if (!userFound) return res.status(401).json({ message: "No autorizado" })
        // Devuelve los datos del usuario
        return res.json({
            id: userFound._id,
            nombre_de_usuario: userFound.nombre_de_usuario,
            nombre: userFound.nombre,
            apellido: userFound.apellido,
            telefono: userFound.telefono,
            createdAt: userFound.createdAt
        })
    })
}
