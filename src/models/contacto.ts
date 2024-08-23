import mongoose from 'mongoose'

const ContactoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    correo_electronico: {
        type: String,
        required: true,
        trim: true
    },
    mensaje: {
        type: String,
        required: true,
        trim: true
    }
})

const contacto = mongoose.model('contacto', ContactoSchema)
export default contacto;