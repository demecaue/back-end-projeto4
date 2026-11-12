import { ErroNaoAutorizado } from '../erros/ErroNaoAutorizado';
import { ErroValidacao } from '../erros/ErroValidacao';
import { UsuarioRepositorio } from '../repositorios/UsuarioRepositorio';
import { senhaConfere } from '../seguranca/hashSenha';
import { gerarToken } from '../seguranca/token';
import { emailValido } from '../validadores/email';
import { preenchido } from '../validadores/preenchido';

export class AutenticacaoServico {
    constructor(private readonly repositorio: UsuarioRepositorio) {}

    // Rubrica: login com e-mail e senha
    async login(dados: Record<string, unknown>) {
        const { email, senha } = dados;

        if (!preenchido(email) || !preenchido(senha)) throw new ErroValidacao('Email e senha são obrigatórios');

        // Rubrica: validação de e-mail (regex)
        if (!emailValido(email)) throw new ErroValidacao('Email inválido');

        const usuario = await this.repositorio.buscarPorEmail(email.toLowerCase());

        // Rubrica: logar apenas usuário existente
        if (!usuario || !senhaConfere(senha, usuario.senha_hash)) {
            throw new ErroNaoAutorizado('Email ou senha incorretos');
        }

        // Rubrica: retorno JWT
        return { token: gerarToken(usuario.id), usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } };
    }
}
