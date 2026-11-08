export default async function handler(req, res) {
  const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/config?select=key&limit=1`, {
    headers: { apikey: process.env.SUPABASE_KEY }
  });
  return res.status(200).json({ ok: r.ok, status: r.status });
}
