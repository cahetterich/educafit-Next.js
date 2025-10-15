// app/api/auth/recover/route.js
import { db } from '../../../../lib/mockDb'

export async function POST(req) {
  const { email } = await req.json();
  const user = db.users.find(u => u.email === email);
  // sempre responde 200 (prática comum), mas marcamos estado no mock
  if (user) db.tokens.set(email, 'recover_' + Math.random().toString(36).slice(2));
  return Response.json({ ok: true });
}
