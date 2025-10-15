// lib/mockDb.js
export const db = {
  users: [
    { id: 1, name: 'Professor Demo', email: 'prof@escola.com', role: 'teacher', pass: '123456' },
    { id: 2, name: 'Aluno Demo', email: 'aluno@escola.com', role: 'student', pass: '123456' },
  ],
  tokens: new Map(), // email -> token (só pra demo)
};
