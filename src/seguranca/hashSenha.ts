import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export const gerarHash = (senha: string) => {
    const salt = randomBytes(16).toString('hex');
    return `${salt}:${scryptSync(senha, salt, 64).toString('hex')}`;
};

export const senhaConfere = (senha: string, hashSalvo: string) => {
    const [salt, hash] = hashSalvo.split(':');
    return timingSafeEqual(scryptSync(senha, salt, 64), Buffer.from(hash, 'hex'));
};
