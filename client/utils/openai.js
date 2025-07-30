export async function generateText(prompt) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/ai/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(
      error.message.includes('Failed to fetch') 
        ? "Connection error. Please check your network."
        : error.message
    );
  }
}