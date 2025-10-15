export const storage = {
  async get(key){ try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch { return null } },
  async set(key, val){ localStorage.setItem(key, JSON.stringify(val)); },
  async del(key){ localStorage.removeItem(key); },
  async mset(pairs){ for (const [k,v] of pairs) localStorage.setItem(k, JSON.stringify(v)); },
};