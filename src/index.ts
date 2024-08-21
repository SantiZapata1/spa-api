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

console.log("Cors origin: ",corsOrigin)

// Permite a la aplicación recibir datos en formato JSON
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3000/'],//cualquiera de las dos url funcionan
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

// Definimos el puerto en el que va a correr el servidor, ya sea el que definimos en las variables de entorno o el 4000
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Servidor funcionando en puerto ${port} ✅`)
  }).on('error', (err) => {
    console.error(`Eror al inciar el servidor: ${err}`)
  })