// Librerías a importar
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

// Importamos las rutas
import router from './routes/crud.routes';
import auth from './routes/auth.routes';
// Importamos configuraciones de MongoDB para conectar a la base de datos
import { connectDB } from './db' 

// Llamamos a express
const app = express();

// Conectamos a la base de datos
connectDB().catch(err => console.error(`No se pudo conectar a MongoDB ❌: ${err}`))


const corsOrigin:string | undefined = process.env.corsOrigin
console.log(corsOrigin)
// Permite a la aplicación recibir datos en formato JSON
app.use(cors({
  origin: corsOrigin,
  credentials: true
}))

// Middleware para ver las peticiones HTTP en la consola
app.use(morgan('dev'))
app.use(express.json())

// Llama a las rutas
app.use('/api', router); // Llama a las rutas del API
app.use('/api', auth); // Llama a las rutas del API

// Definimos el puerto en el que va a correr el servidor, ya sea el que definimos en las variables de entorno o el 4000
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Servidor funcionando en puerto ${port} ✅`)
  }).on('error', (err) => {
    console.error(`Eror al inciar el servidor: ${err}`)
  })