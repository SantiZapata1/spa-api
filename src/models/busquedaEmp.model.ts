import mongoose from "mongoose";

const busquedaEmpSchema=new mongoose.Schema({
    
        nombre:{
            type: String,
            required:true
        },
        apellido:{
            type: String,
            required:true
        },
        email:{
            type: String,
            required:true
        },
        telefono:{
            type: String,
            required:true
        },
        propuesta:{
            type: String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now
        }
    
    },{ timestamps: true })

    const busquedaEmp = mongoose.model('cv', busquedaEmpSchema)
export default busquedaEmp;