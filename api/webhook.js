export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, operation, status } = req.body;

  if (operation !== 'DEPOSIT' || status !== 'PAID') {
    return res.status(200).json({ ignored: true });
  }

  // Monta o input como JSON codificado na URL
  const input = encodeURIComponent(JSON.stringify({ valor: amount }));

  // Usa o endpoint correto da automação
  const pushcutUrl = `https://api.pushcut.io/sgLouSR6GpgRK2l7EA1OQ/automation/deposito-feito?input=${input}`;

  try {
    const response = await fetch(pushcutUrl);
    const data = await response.text();
    return res.status(200).json({ success: true, response: data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
