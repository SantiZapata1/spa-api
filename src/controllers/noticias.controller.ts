import noticias from "../models/noticias"
const formidable = require('formidable'); //Módulo para formularios
const fs = require('fs') //Módulo para guardar imagenes
import path from 'path'
export const crearNoticia = async (req , res ) => {
    const { titulo, contenido } = req.body

    try{
        const noticia = new noticias({ titulo, contenido })
        await noticia.save()
        return res.status(201).json({ message: 'Noticia creada correctamente' })
    }catch(error){
        return res.status(500).json({ message: 'Error al crear la noticia' })
    }

    // const form = new formidable.IncomingForm()
    // console.log(form)
    // form.parse(req, async (err, fields, files) => {
    //     try {
    //         // console.log(fields)
    //         if (err) {
    //         console.error("Error parsing the form: ", err);
    //         return res.status(500).send({ error: "Error procesando el formulario: " + err.message });
    //     }

    //     const file = files.image[0]


    //     if (file.originalFilename === "") { //Validación si no se sube archivos
    //         throw new Error("Agrega una imagen para continuar")
    //     }
    //     // if (!(file.mimetype === "image/jpeg" || file.mimetype === "image/png")) { //Formatos válidos
    //     //     throw new Error("Formato no válido, prueba con .png o .jpg")
    //     // }

    //     if (file.size > 50 * 1024 * 1024) { //Tamaño máximo de 50mb
    //         throw new Error("Ingrese un archivo de menos de 50mb")
    //     }

    //     let separado = file?.mimetype?.split("/");
    //     let formato = separado[1];
    
    //     // Guarda la noticia y a la imagen guardala con el id de esta noticia
    //     const noticia = new noticias({ titulo, contenido })
    //     // Guarda la imagen en la base de datos con el id de noticias
    //     let dirFile = path.join(__dirname, `../imagesFromDB/noticias/${noticia._id}.${formato}`) //crear la  ruta para guardar la imagen    
    //     fs.copyFile(file.filepath, dirFile, function (err) {
    //         if (err) throw err;
    //     }); //Copiar archivo desde la ruta original al servidor
        
    //     let nuevo = noticia._id + '.' + formato //Guardar nombre de la imagen para pasarlo a la base de datos
        
    //     noticia.imagen = nuevo //Guardar el nombre de la imagen en la base de datos

    //     await noticia.save()
    //     return res.status(201).json({ message: 'Noticia creada correctamente' })
    // } catch (error) {
    //     console.log(error)
    //     return res.status(500).json({ message: 'Error al crear la noticia' })
    // }
    // })

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