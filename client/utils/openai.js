export async function generateText(prompt) {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    return data.result;
  } catch (err) {
    console.error('OpenAI request failed:', err);
    return null;
  }
}
