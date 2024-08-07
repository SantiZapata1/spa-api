// Crea un modelo de usuario que tenga nombre, email y contraseña usando mongoose

import { Schema, model, Document } from 'mongoose'

// Interfaz para tratar respuesta como documento
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

// Modelo de usuario
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export default model<IUser>('User', userSchema)
