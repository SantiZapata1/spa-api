
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
export const accion = async (req, res) => { // Definimos la función que se va a ejecutar cuando se haga la petición
    try {
        res.send('pong') // Enviamos la respuesta al cliente
    } catch (error) { // Si hay un error, lo capturamos
        res.status(500).json({ message: 'Hubo un error al realizar el ping.' }); // Enviamos un mensaje de error al cliente
    }
}
