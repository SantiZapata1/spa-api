
import contacto from '../models/contacto';

export const enviarMensajeContacto = async (req, res) => {
    try {
        const { nombre, correo_electronico, mensaje } = req.body;

        const nuevoContacto = new contacto({ nombre, correo_electronico, mensaje });
        await nuevoContacto.save();

        res.status(200).json({ message: 'Mensaje enviado correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al enviar el mensaje.' });
    }
}
