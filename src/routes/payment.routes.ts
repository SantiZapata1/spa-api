 import {Router} from 'express';
 import {createSession} from '../controllers/payment.controller';

 const router = Router();

 router.post("/create-checkout-session", createSession)

router.get("/success", (req, res) => res.redirect("/"));
router.get("/cancel", (req, res) => res.redirect("/"));


export default router;
