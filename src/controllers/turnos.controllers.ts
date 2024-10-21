
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
import usuarios from '../models/usuario' // Importamos el modelo de usuarios
export const solicitarTurno = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try {
        const { fecha, hora, cliente, servicio, comentarios, idUsuario,precio } = req.body; // Obtenemos los datos del cuerpo de la petición
        const nuevoTurno = new turnos({ fecha, hora, cliente, servicio, comentarios, monto_abonado: precio, estado: "Asignación" }); // Creamos un nuevo turno con los datos recibidos
        await nuevoTurno.save(); // Guardamos el nuevo turno en la base de datos
        await usuarios.findByIdAndUpdate(idUsuario, { $push: { turnos: nuevoTurno._id } }); // Buscamos y actualizamos el usuario en la base de datos
        
        res.status(200).json({ message: 'Turno solicitado correctamente.' }); // Enviamos un mensaje de éxito al cliente

    } catch (error) { // Si hay un error, lo capturamos
        res.status(500).json({ message: 'Hubo un error al solicitar turno.' }); // Enviamos un mensaje de error al cliente
    }
}

export const asignarTurnoAProfesional = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try{
        const { id: idTurno, idProfesional } = req.params; // Obtenemos los datos del cuerpo de la petición
        console.log("LLEGÓ")
        console.log(req.params)

        await turnos.findByIdAndUpdate(idTurno, { estado: "Asignado", profesional_asignado: idProfesional }); // Buscamos y actualizamos el turno en la base de datos
        res.status(200).json({ message: 'Turno asignado correctamente.' }); // Enviamos un mensaje de éxito al cliente


    }catch(error){
        console.log("error asignando turno", error);
    }

}

export const obtenerMisTurnosAsignados = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try{
        const { idProfesional } = req.params; // Obtenemos los datos del cuerpo de la petición
        const turnosList = await turnos.find({ profesional_asignado: idProfesional }); // Buscamos los turnos en la base de datos
        res.status(200).json(turnosList); // Enviamos la lista de turnos al cliente

    }catch(error){
        console.log("error obteniendo turnos asignados", error);
    }

}


export const eliminarTurno = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try {
        const { id } = req.params; // Obtenemos el id del turno a eliminar
        await turnos.findByIdAndDelete(id); // Buscamos y eliminamos el turno en la base de datos
        // Elimina también del array turnos de la BD en usuarios
        await usuarios.updateMany({ $pull: { turnos: id } }); // Buscamos y actualizamos el usuario en la base de datos
        
        res.status(200).json({ message: 'Turno eliminado correctamente.' }); // Enviamos un mensaje de éxito al cliente

    } catch (error) { // Si hay un error, lo capturamos
        res.status(500).json({ message: 'Hubo un error al eliminar turno.' }); // Enviamos un mensaje de error al cliente
    }
}

export const obtenerTurnos = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try {
        // Busca los turnos del más reciente al más antiguo
        const turnosList = await turnos.find().sort({ fecha: -1 }); // Buscamos los turnos en la base de datos
        res.status(200).json(turnosList); // Enviamos la lista de turnos al cliente

    } catch (error) { // Si hay un error, lo capturamos
        res.status(500).json({ message: 'Hubo un error al obtener turnos.' }); // Enviamos un mensaje de error al cliente
    }
}

export const getTurnosDeUsuario = async (req, res) => {
    
    try{

        
    }catch(error){
        console.log("error obteniendo turnos de usuario", error);
    }

};

export const obtenerTurnoPorFechas = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try {
        const { desde, hasta } = req.params; // Obtenemos las fechas de inicio y fin de la búsqueda

        // Convertir las fechas a objetos Date
        const desdeDate = new Date(desde)
        const hastaDate = new Date(hasta);

        // Imprimir las fechas convertidas
        
        if (isNaN(desdeDate.getTime()) || isNaN(hastaDate.getTime())) {
            return res.status(400).json({ message: "Fechas inválidas" });
        }
        
        // Asegurarse de que las fechas incluyan la hora correcta
        desdeDate.setUTCHours(0, 0, 0, 0);
        hastaDate.setUTCHours(23, 59, 59, 999);
        
        const turnosList = await turnos.find({ fecha: { $gte: desdeDate, $lte: hastaDate } }); // Buscamos los turnos en la base de datos en base al rango de fechas
        console.log(turnosList);
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


export const obtenerTurnosUsuario = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try {
        const { id } = req.params; // Obtenemos el id del usuario
        const usuario = await usuarios.findById(id); // Buscamos el usuario en la base de datos
        const turnosList = await turnos.find({ _id: { $in: usuario?.turnos } }); // Buscamos los turnos en la base de datos que pertenecen al usuario
        res.status(200).json(turnosList); // Enviamos la lista de turnos al cliente

    } catch (error) { // Si hay un error, lo capturamos
        res.status(500).json({ message: 'Hubo un error al obtener turnos del usuario.' }); // Enviamos un mensaje de error al cliente
    }
}

export const generarEstadisticasTurnos = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try{
        const { desde, hasta } = req.params; // Obtenemos las fechas de inicio y fin de la búsqueda

        // Primero busca los turnos en el rango de fechas
        const turnosList = await turnos.find({ fecha: { $gte: desde, $lte: hasta } }); // Buscamos los turnos en la base de datos en base al rango de fechas

        // Ahora agrupame los turnos por servicio y su precio, es decir, tendría que quedar algo así como si hay 3 masajes a 500 -< {nombre: "Masaje" , precio: "1500", cantidad_solicitada: 3}
        const estadisticas = turnosList.reduce((acc, turno) => {
            // Si el servicio no existe en el acumulador, lo inicializamos
            if (!acc[turno.servicio]) {
                acc[turno.servicio] = { 
                    nombre: turno.servicio, 
                    precio: turno.monto_abonado, 
                    cantidad: 1,
                    total: turno.monto_abonado // Inicializa con el precio del primer turno
                };
            } else {
                // Si ya existe, aumentamos la cantidad y el total
                acc[turno.servicio].cantidad++;
                acc[turno.servicio].total += turno.monto_abonado;
            }
            
            // Mantenemos un objeto de "Total" en el acumulador
            if (!acc["Total"]) {
                acc["Total"] = { 
                    nombre: "Total", 
                    cantidad: 0, 
                    precio: 0 
                };
            }
            // Sumar al total general la cantidad y precio de cada servicio
            acc["Total"].cantidad++;
            acc["Total"].precio += turno.monto_abonado;
        
            return acc;
        }, {});
        

        
        console.log(estadisticas)

        res.status(200).json(Object.values(estadisticas)); // Enviamos la lista de turnos al cliente


    }catch(error){
        console.log("Error generando estadisticas de turnos", error);
    }

}