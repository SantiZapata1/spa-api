import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '../config';
import turnos from '../models/turnos';
if (!STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key is not defined');
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

// Obtener url de la aplicación (localhost:3000) en una constante

const appUrl = process.env.URLApp || "http://localhost:4000";

export const createSession = async (req, res) => {
    try{

        const { nombreServicio, precio, idTurno } = req.body; 
        console.log(req.body)
        await turnos.findByIdAndUpdate(idTurno, { pago_realizado: true });
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        product_data: {
                            name: nombreServicio, 
                        description: "Descripción del servicio", 
                    },
                    currency: "ars",
                    unit_amount: precio * 100, 
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${appUrl}api/success/`,
        cancel_url: `${appUrl}api/cancel`,
    });
    
    
    res.json(session);
} catch(error){
    console.error(error);
    res.status(500).json({message: 'Error al crear la sesión de pago'});
}
}

// export const confirmPayment = async (req, res) => {
//     const { idTurno } = req.params;
//         // Actualizar el turno con el id recibido
//         await turnos.findByIdAndUpdate(idTurno, { pago_realizado: true });

//     res.redirect(process.env.corsOrigin);
// }