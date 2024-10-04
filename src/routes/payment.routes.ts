 import {Router} from 'express';
 import {createSession} from '../controllers/payment.controller';

 const router = Router();

 const rutaFront = process.env.corsOrigin

 router.post("/create-checkout-session", createSession)

router.get("/success", (req, res) => res.redirect(rutaFront));
router.get("/cancel", (req, res) => res.redirect(rutaFront));


export default router;
