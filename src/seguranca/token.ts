import jwt from 'jsonwebtoken';

const segredo = process.env.JWT_SECRET;
if (!segredo) throw new Error('Defina JWT_SECRET no .env');

export const gerarToken = (id: number) => jwt.sign({ id }, segredo, { expiresIn: '8h' });
