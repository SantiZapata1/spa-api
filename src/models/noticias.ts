import mongoose from "mongoose";

const NoticiasSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    contenido: {
        type: String,
        required: true,
        trim: true
    },
    imagen: {
        type: String,
        required: false,
        trim: true
    }
})

const noticias = mongoose.model('noticias', NoticiasSchema)
export default noticias;