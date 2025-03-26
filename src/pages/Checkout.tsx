import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ShoppingBag } from 'lucide-react';
import PaymentForm from '../components/PaymentForm';
import OrderSummary from '../components/OrderSummary';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (amount: number) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ amount: amount * 100 }), // Convert to cents
      });

      const { clientSecret } = await response.json();
      const stripe = await stripePromise;

      if (!stripe) throw new Error('Stripe failed to load');

      const { error } = await stripe.confirmPayment({
        elements: document.querySelector('#payment-form'),
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
      });

      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">TechStore Checkout</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <OrderSummary onPayment={handlePayment} />
              <Elements stripe={stripePromise}>
                <PaymentForm loading={loading} />
              </Elements>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;