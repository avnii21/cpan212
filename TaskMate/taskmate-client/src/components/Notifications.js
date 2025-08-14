import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51RvQScC963CaLfNOMk8ZY9DHR5ZheY59gE2wu2et6HhwlCzMyZXbtBmEeDVjvXyreVAdytBZwu8Z5eeqKs4aBhS700DE7OSERG');

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [payingFor, setPayingFor] = useState(null);
  const storedUser = JSON.parse(sessionStorage.getItem('user'));
  const userId = storedUser?.userId;

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:8000/api/notifications/${userId}`)
      .then(res => res.json())
      .then(setNotifications)
      .catch(console.error);
  }, [userId]);

  const markAsPaid = async (notificationId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/notifications/${notificationId}/paid`, {
      method: 'PATCH',
    });
    if (!response.ok) throw new Error('Failed to mark notification as paid');
    await response.json(); // just await, no need to assign

    // Remove paid notification from list
    setNotifications((prev) => prev.filter(n => n._id !== notificationId));
  } catch (error) {
    alert('Error marking notification as paid: ' + error.message);
  }
};


  if (!notifications.length) return <p>No new notifications</p>;

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map(notif => (
          <li key={notif._id}>
            {notif.message} <br />
            <small>{new Date(notif.notifyAt).toLocaleString()}</small> <br />
            <button onClick={() => setPayingFor(notif)}>Pay Now</button>
          </li>
        ))}
      </ul>

      {payingFor && (
        <Elements stripe={stripePromise}>
          <PaymentForm
            amount={payingFor.amount || 1000} // e.g. 1000 cents = $10
            onSuccess={() => {
              alert('Payment successful!');
              markAsPaid(payingFor._id);
              setPayingFor(null);
            }}
            onError={(err) => alert('Payment error: ' + err)}
          />
        </Elements>
      )}
    </div>
  );
}

export default Notifications;
