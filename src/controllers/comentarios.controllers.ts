import Comentario from "../models/comentarios.model";

export const getComments = async (req,res)=>{
    const comentarios = await Comentario.find()

    if(!comentarios){
        return res.status(404).json({message:"no hay comentarios aun"})
    }

    res.json(comentarios)

};

export const createComment = async (req,res)=>{
    const {servicio, comentario} = req.body;

    const nuevoComentario = new Comentario({
        servicio,
        comentario
    })

    const comentarioGuardado = await nuevoComentario.save()
    res.json(comentarioGuardado)

};
export const getComment = async (req,res)=>{

    const comentario = await Comentario.findById(req.body.id)

    if(!comentario){
        return res.status(404).json({message:"comment not found"})
    }
    res.json(comentario)


};
export const updateComment = async (req,res)=>{
    const comentario = await Comentario.findByIdAndUpdate(req.body.id, req.body, {new:true})

    if(!comentario){
        return res.status(404).json
    }
    res.json(comentario)

};
export const deleteComment = async (req,res)=>{
    const comentario = await Comentario.findByIdAndDelete(req.body.id)

    if(!comentario){
        return res.status(404).json({message:"comentario no encontrado"})
    }
    res.json(comentario)
};