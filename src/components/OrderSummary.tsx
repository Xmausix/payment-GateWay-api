import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface OrderSummaryProps {
  onPayment: (amount: number) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ onPayment }) => {
  const orderDetails = {
    items: [
      { 
        id: 1, 
        name: 'Premium Headphones', 
        price: 299.99, 
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80'
      },
      { 
        id: 2, 
        name: 'Wireless Speaker', 
        price: 199.99, 
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80'
      },
    ],
    shipping: 15.99,
    tax: 42.50,
  };

  const subtotal = orderDetails.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + orderDetails.shipping + orderDetails.tax;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        Order Summary
      </h2>
      <div className="space-y-4">
        {orderDetails.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 border-b pb-4">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <div className="flex justify-between items-center mt-1">
                <span className="text-gray-600">Qty: {item.quantity}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="space-y-2 pt-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>${orderDetails.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>${orderDetails.tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t mt-4 pt-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => onPayment(total)}
        className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors font-medium"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default OrderSummary;