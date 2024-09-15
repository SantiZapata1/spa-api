
import contacto from '../models/contacto';

// Enviar mensajes de contacto
export const enviarMensajeContacto = async (req, res) => {
    console.log("LLEGANDO")
    try {
        const { nombre, correo_electronico, mensaje } = req.body;

        const nuevoContacto = new contacto({ nombre, correo_electronico, mensaje });
        await nuevoContacto.save();

        res.status(200).json({ message: 'Mensaje enviado correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al enviar el mensaje.' });
    }
}

// Obtener los mensajes de contactos
export const getContactos = async (req,res ) => {
    try{
        const contactos = await contacto.find();
        res.status(200).json(contactos);
    }catch(error){
        console.log(error)
    }
}

// Eliminar mensaje de contacto
export const deleteContacto = async (req, res) => {
    try{ 
        const { id } = req.params

        await contacto.findByIdAndDelete(id)
    }catch(error){
        console.log(error)
    }
}