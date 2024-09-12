// Librerías a importar
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
// Importamos las rutas
import router from './routes/turnos.routes';
import auth from './routes/auth.routes';
import comentarios from "./routes/comentarios.routes"
import contacto from "./routes/contacto.routes"
import noticias from "./routes/noticias.routes"
import servicio from './routes/servicio.routes';
import turnos from './routes/turnos.routes';
import cv from './routes/busquedaEmp.routes';

// Importamos configuraciones de MongoDB para conectar a la base de datos
import { connectDB } from './db' 

// Llamamos a express
const app = express();

// prueba para ver si funciona el servidor
app.get('/ping', (req, res) => {
  res.send('pong');
});


// Conectamos a la base de datos
connectDB().catch(err => console.error(`No se pudo conectar a MongoDB ❌: ${err}`))


const corsOrigin:string | undefined = process.env.corsOrigin


// Permite a la aplicación recibir datos en formato JSON
app.use(cors({
  origin: corsOrigin,
  optionsSuccessStatus: 200,
  credentials: true
}))

// app.use(cors()); 


// Middleware para ver las peticiones HTTP en la consola
app.use(morgan('dev'))
// Middleware para recibir datos en formato JSON
app.use(express.json())
// Middleware para manejo de cookies
app.use(cookieParser());

// Llama a las rutas
app.use('/api', router); // Llama a las rutas del API
app.use('/api', auth); // Llama a las rutas del API
app.use('/api', comentarios); // Llama a las rutas del API
app.use('/api', contacto) // Llama a las rutas del API
app.use('/api', noticias) // Llama a las rutas del API
app.use('/api', servicio)
app.use('/api', cv) // Llama a las rutas del API
app.use('/api', turnos) // Llama a las rutas del API 
// Imagenes
app.use('/api/images', express.static(path.join(__dirname, 'imagesFromDB')));



// Definimos el puerto en el que va a correr el servidor, ya sea el que definimos en las variables de entorno o el 4000
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Servidor funcionando en puerto ${port} ✅`)
  }).on('error', (err) => {
    console.error(`Eror al inciar el servidor: ${err}`)
  })