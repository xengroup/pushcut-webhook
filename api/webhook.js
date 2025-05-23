export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, operation, status } = req.body;

  if (operation !== 'DEPOSIT' || status !== 'PAID') {
    return res.status(200).json({ ignored: true });
  }

  const pushcutUrl = process.env.PUSHCUT_URL;

  const payload = {
    input: {
      valor: `R$${amount}`
    }
  };

  try {
    const response = await fetch(pushcutUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.text();
    return res.status(200).json({ success: true, response: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
