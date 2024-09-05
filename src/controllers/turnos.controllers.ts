
/* Este es el formato básico para un controlador en Express, tiene que tener
    un método que recibe un request y un response, y que devuelve una respuesta
    al cliente.
    En request van a venir todos los datos que el cliente envía al servidor, como 
    parámetros, headers, body, etc.

    params son los parámetros que se envían en la URL, por ejemplo, si la URL es
    /ping/:id, el parámetro id va a estar en req.params.id

    mientras que en body van a venir los datos que se envían en el cuerpo de la
    petición, por ejemplo, si se envía un formulario, los datos del formulario
    van a estar en req.body 

    En response se envía la respuesta al cliente, puede ser un string, un objeto,
    un archivo, etc. En este caso, estamos enviando un string con el texto 'pong'
    al cliente.
*/

import turnos from '../models/turnos' // Importamos el modelo de turnos

export const solicitarTurno = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try {
        const { fecha, hora, cliente, servicio, comentarios } = req.body; // Obtenemos los datos del cuerpo de la petición
        const nuevoTurno = new turnos({ fecha, hora, cliente, servicio, comentarios }); // Creamos un nuevo turno con los datos recibidos
        await nuevoTurno.save(); // Guardamos el nuevo turno en la base de datos

        res.status(200).json({ message: 'Turno solicitado correctamente.' }); // Enviamos un mensaje de éxito al cliente

    } catch (error) { // Si hay un error, lo capturamos
        res.status(500).json({ message: 'Hubo un error al solicitar turno.' }); // Enviamos un mensaje de error al cliente
    }
}

export const eliminarTurno = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try {
        const { id } = req.params; // Obtenemos el id del turno a eliminar
        await turnos.findByIdAndDelete(id); // Buscamos y eliminamos el turno en la base de datos

        res.status(200).json({ message: 'Turno eliminado correctamente.' }); // Enviamos un mensaje de éxito al cliente

    } catch (error) { // Si hay un error, lo capturamos
        res.status(500).json({ message: 'Hubo un error al eliminar turno.' }); // Enviamos un mensaje de error al cliente
    }
}

export const obtenerTurnos = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try {
        const turnosList = await turnos.find(); // Buscamos todos los turnos en la base de datos
        res.status(200).json(turnosList); // Enviamos la lista de turnos al cliente

    } catch (error) { // Si hay un error, lo capturamos
        res.status(500).json({ message: 'Hubo un error al obtener turnos.' }); // Enviamos un mensaje de error al cliente
    }
}

export const obtenerTurnoPorFechas = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try {
        const { fechaInicio, fechaFin } = req.params; // Obtenemos las fechas de inicio y fin de la búsqueda
        const turnosList = await turnos.find({ fecha: { $gte: fechaInicio, $lte: fechaFin } }); // Buscamos los turnos en la base de datos en base al rango de fechas

        res.status(200).json(turnosList); // Enviamos la lista de turnos al cliente

    } catch (error) { // Si hay un error, lo capturamos
        res.status(500).json({ message: 'Hubo un error al obtener turnos por fechas.' }); // Enviamos un mensaje de error al cliente
    }
}

export const editarTurno = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try {
        const { id } = req.params; // Obtenemos el id del turno a editar
        const { fecha, hora, clienteID, servicio, comentarios } = req.body; // Obtenemos los datos del cuerpo de la petición
        await turnos.findByIdAndUpdate(id, { fecha, hora, clienteID, servicio, comentarios }); // Buscamos y actualizamos el turno en la base de datos

        res.status(200).json({ message: 'Turno editado correctamente.' }); // Enviamos un mensaje de éxito al cliente

    } catch (error) { // Si hay un error, lo capturamos
        res.status(500).json({ message: 'Hubo un error al editar turno.' }); // Enviamos un mensaje de error al cliente
    }
}
