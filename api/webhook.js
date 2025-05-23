export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, operation, status } = req.body;

  if (operation !== 'DEPOSIT' || status !== 'PAID') {
    return res.status(200).json({ success: false, message: 'Not a deposit or not paid' });
  }

  const input = encodeURIComponent(amount);
  const pushcutUrl = `https://api.pushcut.io/sgLouSR6GpgRK2l7EA1OQ/notifications/deposito-feito?input=${input}`;

  try {
    const response = await fetch(pushcutUrl);
    const data = await response.text();
    return res.status(200).json({ success: true, pushcut: data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
