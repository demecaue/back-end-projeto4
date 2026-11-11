import { randomBytes, scryptSync } from 'node:crypto';
import { ErroValidacao } from '../erros/ErroValidacao';
import { cpfValido } from '../validadores/cpf';
import { emailValido } from '../validadores/email';
import { nivelSenha } from '../validadores/senha';

export class Usuario {
    // Rubrica Tech Forge: proteção do estado com campos privados nativos
    #nome: string;
    #email = '';
    #cpf = '';
    #senhaHash = '';

    // Rubrica Tech Forge: construtor limpo, só inicializa as propriedades
    constructor(nome: string, email: string, senha: string, cpf: string) {
        this.#nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;
    }

    get email() {
        return this.#email;
    }

    // Rubrica: aplica a validação de email no cadastro
    // Rubrica Tech Forge: set com validação e transformação
    set email(valor: string) {
        if (!emailValido(valor)) throw new ErroValidacao('Email inválido');
        this.#email = valor.toLowerCase();
    }

    // Rubrica Tech Forge: get com transformação, devolve o CPF formatado
    get cpf() {
        return this.#cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    // Rubrica: aplica a validação de CPF no cadastro
    // Rubrica Tech Forge: set privado, CPF não muda por código de fora da classe
    private set cpf(valor: string) {
        if (!cpfValido(valor)) throw new ErroValidacao('CPF inválido');
        this.#cpf = valor.replace(/\D/g, '');
    }

    // Rubrica: aplica a validação de nível de senha no cadastro
    // Rubrica Tech Forge: set com validação e sem get, a senha nunca é exposta
    set senha(valor: string) {
        if (nivelSenha(valor) === 'fraca') {
            throw new ErroValidacao('Senha fraca: use 8 caracteres e 3 tipos entre minúscula, maiúscula, número e símbolo');
        }
        const salt = randomBytes(16).toString('hex');
        this.#senhaHash = `${salt}:${scryptSync(valor, salt, 64).toString('hex')}`;
    }

    // Rubrica: senha criptografada no banco, só o hash sai da classe para ser salvo
    dadosParaBanco() {
        return { nome: this.#nome, email: this.#email, senhaHash: this.#senhaHash, cpf: this.#cpf };
    }

    // Rubrica Tech Forge: expõe só os dados necessários na resposta da API
    toJSON() {
        return { nome: this.#nome, email: this.email, cpf: this.cpf };
    }
}
