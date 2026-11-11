import { Usuario } from '../entidades/Usuario';
import { ErroValidacao } from '../erros/ErroValidacao';
import { UsuarioRepositorio } from '../repositorios/UsuarioRepositorio';
import { preenchido } from '../validadores/preenchido';

// Rubrica Tech Forge: responsabilidade única, o serviço aplica as regras e o repositório só acessa o banco
export class UsuarioServico {
    constructor(private readonly repositorio: UsuarioRepositorio) {}

    async cadastrar(dados: Record<string, unknown>) {
        const { nome, email, senha, cpf } = dados;

        // Rubrica: cadastro com os campos obrigatórios nome, email, senha e CPF
        if (!preenchido(nome) || !preenchido(email) || !preenchido(senha) || !preenchido(cpf)) {
            throw new ErroValidacao('Nome, email, senha e CPF são obrigatórios');
        }

        const usuario = new Usuario(nome, email, senha, cpf);
        await this.repositorio.salvar(usuario);
        return usuario;
    }
}
