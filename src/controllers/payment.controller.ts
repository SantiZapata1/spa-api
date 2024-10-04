import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '../config';

if (!STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key is not defined');
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

export const createSession = async (req, res) => {
    const { nombreServicio, precio } = req.body; 

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
        success_url: 'http://localhost:4000/api/success',
        cancel_url: 'http://localhost:4000/api/cancel',
    });
    res.json(session);
}
