//importacion del modelo usuario
import usuarios from '../models/usuario'
//funcion para crear un tooken para mantener la sesion logueada
import { createAccessToken } from '../libs/jwt'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'
import path from 'path'
const fs = require('fs') //Módulo para guardar imagenes


//Registro de usuarios
export const register = async (req, res) => {
    try{ 
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
        console.log("usuario registrado correctamente");

        const token = await createAccessToken({ id: userSaved._id })
        res.cookie('token', token)

        res.json(userSaved)

    } catch (error) {
        console.log(error)
    }
}


//Login de usuarios
export const login = async (req, res) => {

    const { nombre, apellido, correo_electronico, nombre_de_usuario, pass } = req.body
        
    const user = await usuarios.findOne({correo_electronico: correo_electronico})
    res.json(user)
    
}

//Logout 
export const logout = async (req, res) => {
    // se elimina el token
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
