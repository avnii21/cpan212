// src/services/aiService.js
export async function getSummary(description) {
  const response = await fetch('http://localhost:8000/api/ai/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error || 'Failed to get AI summary');
  }

  return response.json();
}
