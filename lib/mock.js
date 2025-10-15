const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

export async function signIn(email, password) {
  await delay(400);
  if (!email || !password) throw new Error("Credenciais inválidas");
  localStorage.setItem("email", email);
  const role = localStorage.getItem("role") || "aluno";
  return { email, role };
}

export async function signUp({ name, email, role = "aluno" }) {
  await delay(500);
  if (!name || !email) throw new Error("Dados inválidos");
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("role", role);
  return { email, role };
}

export async function recover(email) {
  await delay(500);
  if (!email) throw new Error("Informe um e-mail");
  return { ok: true };
}

export async function signOut() {
  localStorage.removeItem("email");
}