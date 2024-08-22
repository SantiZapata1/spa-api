// importamos el modelo de un comentario
import Comentario from "../models/comentario.model";
import Usuario from "../models/usuario";
// Obtener todos los comentarios
export const getComments = async (req, res) => {
    try {
      const comentarios = await Comentario.find();
      if (!comentarios.length) {
        return res.status(404).json({ message: "No hay comentarios aún" });
      }
      res.json(comentarios);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los comentarios", error });
    }
  };

// Obtener un comentario DEBE IR PARAMS O BODY?
export const getComment = async (req, res) => {
    try {
      const comentario = await Comentario.findById(req.params.id);
      if (!comentario) {
        return res.status(404).json({ message: "Comentario no encontrado" });
      }
      res.json(comentario);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el comentario", error });
    }
  };

export const getCommentFromUser = async (req, res) => {
    try {
      const usuario = await Usuario.findById(req.params.id).populate("comentarios");

      // Busca todos los Ids de los comentarios del usuario y los busca en la colección de comentarios
      const comentarios = await Comentario.find({ _id: { $in: usuario?.comentarios } });


      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.json(comentarios);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los comentarios del usuario", error });
    }
  };

// Crear un comentario
export const createComment = async (req, res) => {
    try {
      // Obtener servicio y comentario
      const { user_id, servicio, comentario } = req.body;
      console.log(req.body)
      // Crear un nuevo comentario
      const nuevoComentario = new Comentario({ servicio, comentario });
      // Guardar el comentario en la base de datos
      const comentarioGuardado = await nuevoComentario.save();

      // Convertir el id del comentario en texto
      const idComentario = comentarioGuardado._id.toString();
      // Agregar el comentario al usuario
      await Usuario.findByIdAndUpdate(user_id, { $push: { comentarios: idComentario } });
      res.status(201).json(comentarioGuardado);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Error al crear el comentario", error });
    }
  };
  

// Actualizar un comentario BODY O PARAMS?
export const updateComment = async (req, res) => {
    try {
      const comentario = await Comentario.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!comentario) {
        return res.status(404).json({ message: "Comentario no encontrado" });
      }
      res.json(comentario);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el comentario", error });
    }
  };


// Eliminar un comentario BODY O PARAMS?
export const deleteComment = async (req, res) => {
  try {
    const comentario = await Comentario.findByIdAndDelete(req.params.id);
    if (!comentario) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
    res.json({ message: "Comentario eliminado", comentario });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el comentario", error });
  }
};