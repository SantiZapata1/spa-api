// importamos el modelo de un comentario
import Comentario from "../models/comentario.model";

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

// Crear un comentario
export const createComment = async (req, res) => {
    try {
      const { servicio, comentario } = req.body;
      const nuevoComentario = new Comentario({ servicio, comentario });
      const comentarioGuardado = await nuevoComentario.save();
      res.status(201).json(comentarioGuardado);
    } catch (error) {
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
