import express from 'express';
import Stripe from 'stripe';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

router.post('/create', authMiddleware, async (req, res) => {
  try {
    const { amount, currency = 'usd' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: 'Error creating payment intent' });
  }
});

router.get('/status/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    res.json({ status: paymentIntent.status });
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving payment status' });
  }
});

export const paymentRoutes = router;