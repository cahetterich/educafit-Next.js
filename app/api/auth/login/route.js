// app/api/auth/login/route.js
import { db } from '@/lib/mockDb';

export async function POST(req) {
  const { email, pass } = await req.json();
  const user = db.users.find(u => u.email === email && u.pass === pass);
  if (!user) {
    return new Response(JSON.stringify({ error: 'invalid_credentials' }), { status: 401 });
  }
  const token = Math.random().toString(36).slice(2);
  db.tokens.set(email, token);
  return Response.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
}
