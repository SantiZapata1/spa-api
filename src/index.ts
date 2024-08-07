// Creame la configuración base de express
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import router from './routes/crud.routes';
import { connectDB } from './db' // Configuraciones de MongoDB para conectar a la base de datos

const app = express();

// Llama a las rutas
connectDB().catch(err => console.error(`No se pudo conectar a MongoDB ❌: ${err}`))
app.use('/api', router);
// Escucha al puerto 3000 y dame un mensaje de que el servidor está corriendo
app.set('port',  3000);
app.listen(app.get('port'), () => {
    console.log('Servidor escuchadno en puerto', app.get('port'));
});


