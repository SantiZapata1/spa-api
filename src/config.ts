import {config} from 'dotenv'

config()

// Configuración de la aplicación
export const TOKEN_SECRET:string = 'secretkey'

//Clave para pagar
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
