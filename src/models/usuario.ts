// importamos bcrypt para encriptar la contraseña
import bcrypt from 'bcrypt'
// Importamos mongoose para el modelado de la base de datos
import mongoose from 'mongoose'
// Importamos serializeUser de passport
import { serializeUser } from 'passport'

// Creamos el esquema de Usuario en la base de datos
const UsuarioSchema = new mongoose.Schema({
    // Definición del nombre de usuario
    nombre_de_usuario: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    correo_electronico: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    // Definición del nombre del usuario
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    // Definición del apellido del usuario
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    // Definición del telefono del usuario
    telefono: {
        type: Number,
        length: 10,
        required: false,
        trim: true
    },
    // Definición de la contraseña del usuario
    pass: {
        type: String,
        required: true,
        trim: true
    },
    // Es admin? 
    admin: {
        type: Boolean,
        default: false,
        required: true
    },
    comentarios: {
        type: [String], // Array de IDs de comentarios (Modelo de comentario)
        required: false,
        trim: true,
    },
    turnos: {
        type: [String],  // Array de IDs de turnos (Modelo de turno)
        required: false,
        trim: true,
    }

},
    {
        // Definición de los timestamps
        timestamps: true
    })

// Función para encriptar la contraseña
UsuarioSchema.pre('save', async function (next) {
    const user = this
    if (!user.isModified('pass')) return next

    // Encriptamos la contraseña
    try {
        // Generamos un salt
        const salt = await bcrypt.genSalt(10)
        // Hasheamos la contraseña
        const hashed = await bcrypt.hash(user.pass, salt)
        // Reemplazamos la contraseña por la encriptada
        user.pass = hashed
        // Continuamos
        next()
    }
    catch (error) {
        // Logueamos el error
        console.log(error)
        // Continuamos
        next()
    }
})

// Función para comparar la contraseña
UsuarioSchema.methods.comparePass = async function (canditePass) {
    return await bcrypt.compare(canditePass, this.pass)
}

// Exportamos el modelo de Usuario
const usuarios = mongoose.model('usuarios', UsuarioSchema)
export default usuarios;