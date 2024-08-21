import mongoose from "mongoose";

// atributos de un comentario
const commentSchema=new mongoose.Schema({

    servicio:{
        type: String,
        required:true
    },
    comentario:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

},{ timestamps: true })

export default mongoose.model("Comentario", commentSchema)