import type { NextFunction, Request, Response } from 'express';
import { ErroNaoAutorizado } from '../erros/ErroNaoAutorizado';
import { verificarToken } from '../seguranca/token';

// Rubrica: rota autenticada, só passa com token JWT válido
export function autenticar(req: Request, _res: Response, next: NextFunction) {
    const [tipo, token] = req.headers.authorization?.split(' ') ?? [];
    if (tipo !== 'Bearer' || !token) throw new ErroNaoAutorizado('Faça login para continuar');

    req.usuarioId = verificarToken(token);
    next();
}
