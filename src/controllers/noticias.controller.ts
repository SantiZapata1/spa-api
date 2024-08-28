import noticias from "../models/noticias"

export const crearNoticia = async (req , res ) => {
    try {
        const { titulo, contenido, imagen } = req.body
        const noticia = new noticias({ titulo, contenido, imagen })
        await noticia.save()
        return res.status(201).json({ message: 'Noticia creada correctamente' })
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear la noticia' })
    }
}

export const obtenerNoticias = async (req , res ) => {
    try {
        const noticiasList = await noticias.find()
        return res.status(200).json(noticiasList)
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las noticias' })
    }
}

export const eliminarNoticiaId = async (req , res ) => {
    try {
        const { id } = req.params
        await noticias.findByIdAndDelete(id)
        return res.status(200).json({ message: 'Noticia eliminada correctamente' })
    } catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la noticia' })
    }
}