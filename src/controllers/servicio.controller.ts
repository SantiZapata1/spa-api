import servicio from "../models/servicio";

// Crear un nuevo servicio
export const crearServicio = async (req, res) => {
    try {
        const { nombre, tipo, precio, detalles } = req.body;
        const nuevoServicio = new servicio({ nombre, tipo, precio, detalles });
        await nuevoServicio.save();

        res.status(200).json({ message: 'Servicio creado correctamente.' });

    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear el servicio.' });
    }
}

// Eliminar un servicio

export const eliminarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        await servicio.findByIdAndDelete(id);

        res.status(200).json({ message: 'Servicio eliminado correctamente.' });

    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al eliminar el servicio.' });
    }
}

// Obtener todos los servicios

export const obtenerServicios = async (req, res) => {
    try {
        const { tipo } = req.params
        const serviciosList = await servicio.find({ tipo });

        res.status(200).json(serviciosList);

    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener servicios.' });
    }
}

// Editar un servicio
export const editarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, tipo, precio, detalles } = req.body;
        await servicio.findByIdAndUpdate(id, { nombre, tipo, precio, detalles });
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al editar el servicio.' });
    }
}
