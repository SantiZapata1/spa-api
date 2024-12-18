import mongoose from 'mongoose'

const TurnoSchema = new mongoose.Schema({
    // Definición de la fecha del turno
    fecha: {
        type: Date,
        required: true,
        trim: true,

    },
    // Definición de la hora del turno
    hora: {
        type: String,
        required: true,
        trim: true
    },
    // Definición del cliente 
    cliente: {
        type: String,
        required: true,
        trim: true
    },
    servicio: {
        type: String,
        required: true,
        trim: true
    },
    monto_abonado: {
        type: Number,
        required: true,
        trim: true
    },
    // Definición de comentarios del turno
    comentarios: {
        type: String,
        required: false,
        trim: true
    },
    estado: {
        type: String,
        required: true,
        trim: true
    },
    pago_realizado: {
        type: Boolean,
        required: true,
        trim: true
    },
    profesional_asignado: {
        type: String,
        required: false,
        trim: true
    },
    creacion:{
        type:Date,
        default:Date.now
    }

},{ timestamps: true })

// Exportamos el modelo de Usuario
const turnos = mongoose.model('turnos', TurnoSchema)
export default turnos;