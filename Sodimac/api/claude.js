const MODELOS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { prompt } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ error: 'Falta el prompt' });
    }
    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'API key no configurada' });
    }

    let ultimoError = 'Error Groq API';

    for (const model of MODELOS) {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model,
          temperature: 0.3,
          max_completion_tokens: 2000,
          reasoning_effort: 'low',
          messages: [{ role: 'user', content: prompt }]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        ultimoError = `${model}: ${data.error?.message || 'Error Groq API'}`;
        continue; // prueba con el siguiente modelo
      }

      const texto = (data.choices?.[0]?.message?.content || '').trim();
      if (texto) return res.status(200).json({ texto });

      ultimoError = `${model}: respuesta vacía`;
    }

    return res.status(500).json({ error: ultimoError });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
