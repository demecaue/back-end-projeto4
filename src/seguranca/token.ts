import jwt from 'jsonwebtoken';
import { ErroNaoAutorizado } from '../erros/ErroNaoAutorizado';

const segredo = process.env.JWT_SECRET;
if (!segredo) throw new Error('Defina JWT_SECRET no .env');

export const gerarToken = (id: number) => jwt.sign({ id }, segredo, { expiresIn: '8h' });

export const verificarToken = (token: string) => {
    try {
        return (jwt.verify(token, segredo) as { id: number }).id;
    } catch {
        throw new ErroNaoAutorizado('Sessão inválida ou expirada, faça login novamente');
    }
};
