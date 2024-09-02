import mongoose from "mongoose";

const ServicioSchema = new mongoose.Schema(
    {
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    tipo: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true
    },
    detalles: {
        type: String,
        required: true,
        trim: true
    },
    date:{
        type:Date,
        default:Date.now
    }
},{ timestamps: true }
)

const servicio = mongoose.model('servicio', ServicioSchema)
export default servicio;