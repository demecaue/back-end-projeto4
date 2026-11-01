import { randomBytes, scryptSync } from 'node:crypto';

export class Usuario {
    private readonly senhaHash: string;

    constructor(
        private readonly nome: string,
        private readonly email: string,
        senha: string,
        private readonly cpf: string,
    ) {
        const salt = randomBytes(16).toString('hex');
        this.senhaHash = `${salt}:${scryptSync(senha, salt, 64).toString('hex')}`;
    }

    toJSON() {
        return { nome: this.nome, email: this.email, cpf: this.cpf };
    }
}
