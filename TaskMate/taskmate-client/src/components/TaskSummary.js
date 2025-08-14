import React, { useState } from 'react';
import { getSummary } from '../services/aiService';

function TaskSummary({ description }) {
  const [summary, setSummary] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSummary(description);
      setSummary(data.summary);
      setTimeline(data.timeline);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 return (
  <div style={{ marginTop: '12px' }}>
    <button onClick={handleGetSummary} disabled={loading || summary !== null}>
      {loading ? 'Loading...' : summary ? 'Summary Loaded' : 'Get AI Summary'}
    </button>

    {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}

    {summary && (
      <p style={{ marginTop: '12px' }}>
        <strong>Summary:</strong> {summary}
      </p>
    )}

    {timeline.length > 0 && (
      <>
        <p style={{ marginTop: '12px' }}><strong>Timeline:</strong></p>
        <ul>
          {timeline.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </>
    )}
  </div>
);

}

export default TaskSummary;
