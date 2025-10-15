// app/api/users/route.js
import { db } from '@/lib/mockDb';

export async function GET() {
  // demo: não retorna senha
  return Response.json(db.users.map(({ pass, ...u }) => u));
}

export async function POST(req) {
  const { name, email, pass, role } = await req.json();
  if (!name || !email || !pass) {
    return new Response(JSON.stringify({ error: 'missing_fields' }), { status: 400 });
  }
  if (db.users.some(u => u.email === email)) {
    return new Response(JSON.stringify({ error: 'email_in_use' }), { status: 409 });
  }
  const id = db.users.at(-1)?.id + 1 || 1;
  const user = { id, name, email, pass, role: role || 'student' };
  db.users.push(user);
  const { pass: _, ...safe } = user;
  return new Response(JSON.stringify(safe), { status: 201 });
}
