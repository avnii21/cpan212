import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function PaymentForm({ amount, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (!stripe || !elements) {
      const msg = 'Stripe.js has not loaded yet.';
      setErrorMsg(msg);
      onError(msg);
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      const msg = 'Card details not entered.';
      setErrorMsg(msg);
      onError(msg);
      setLoading(false);
      return;
    }

    try {
      // Call backend to create PaymentIntent
      const response = await fetch('http://localhost:8000/api/payments/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const { clientSecret, error } = await response.json();
      if (error) throw new Error(error);

      // Confirm card payment
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (paymentError) {
        setErrorMsg(paymentError.message);
        onError(paymentError.message);
        setLoading(false);
        cardElement.clear();
      } else if (paymentIntent.status === 'succeeded') {
        onSuccess();
        setLoading(false);
        cardElement.clear();
      }
    } catch (err) {
      setErrorMsg(err.message);
      onError(err.message);
      setLoading(false);
      cardElement.clear();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
      </button>
      {errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
    </form>
  );
}

export default PaymentForm;
