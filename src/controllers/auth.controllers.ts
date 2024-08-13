import usuarios from '../models/usuario'
import { createAccessToken } from '../libs/jwt'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config'
import path from 'path'
const fs = require('fs') //Módulo para guardar imagenes


//Registro de usuarios
export const register = async (req, res) => {

}


//Login de usuarios
export const login = async (req, res) => {


}

//Logout 
export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}
