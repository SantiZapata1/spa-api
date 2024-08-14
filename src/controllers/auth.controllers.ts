import usuarios from '../models/usuario'
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
        
        const user = new usuarios({
            nombre,
            apellido,
            correo_electronico,
            nombre_de_usuario,
            pass,
            admin: false
        })

        const userSaved = await user.save()


    
    }catch(error){
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
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}
