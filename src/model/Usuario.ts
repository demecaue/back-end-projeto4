import { randomBytes, scryptSync } from 'node:crypto';
import { cpfValido } from '../validators/cpf';
import { emailValido } from '../validators/email';
import { nivelSenha } from '../validators/senha';
import { ErroValidacao } from './ErroValidacao';

export class Usuario {
    #nome: string;
    #email = '';
    #cpf = '';
    #senhaHash = '';

    constructor(nome: string, email: string, senha: string, cpf: string) {
        this.#nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;
    }

    get email() {
        return this.#email;
    }

    set email(valor: string) {
        if (!emailValido(valor)) throw new ErroValidacao('Email inválido');
        this.#email = valor.toLowerCase();
    }

    get cpf() {
        return this.#cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    private set cpf(valor: string) {
        if (!cpfValido(valor)) throw new ErroValidacao('CPF inválido');
        this.#cpf = valor.replace(/\D/g, '');
    }

    set senha(valor: string) {
        if (nivelSenha(valor) === 'fraca') {
            throw new ErroValidacao('Senha fraca: use 8 caracteres e 3 tipos entre minúscula, maiúscula, número e símbolo');
        }
        const salt = randomBytes(16).toString('hex');
        this.#senhaHash = `${salt}:${scryptSync(valor, salt, 64).toString('hex')}`;
    }

    toJSON() {
        return { nome: this.#nome, email: this.email, cpf: this.cpf };
    }
}
