import React, { useState } from 'react';

function TicketmasterImportButton({ userId, onTasksImported }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleImport = async () => {
    if (!userId) {
      setError("You must be logged in.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch(`http://localhost:5000/api/ticketmaster?userId=${userId}`);
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      
      const data = await res.json();
      setMessage(`${data.createdTasks.length} Ticketmaster events imported as tasks.`);
      if (onTasksImported) {
        onTasksImported(data.createdTasks);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleImport} disabled={loading}>
        {loading ? "Importing..." : "Import Ticketmaster Events"}
      </button>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default TicketmasterImportButton;
