import { Usuario } from '../entidades/Usuario';
import { ErroNaoEncontrado } from '../erros/ErroNaoEncontrado';
import { ErroProibido } from '../erros/ErroProibido';
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

    async buscar(id: number, idLogado: number) {
        // Rubrica: só pode editar o próprio usuário
        if (id !== idLogado) throw new ErroProibido('Você só pode acessar o próprio usuário');

        const usuario = await this.repositorio.buscarPorId(id);
        if (!usuario) throw new ErroNaoEncontrado('Usuário não encontrado');

        return { id: usuario.id, nome: usuario.nome, email: usuario.email, cpf: usuario.cpf };
    }

    async editar(id: number, idLogado: number, dados: Record<string, unknown>) {
        const atual = await this.buscar(id, idLogado);
        const { nome, email, senha, cpf } = dados;

        // Rubrica: não permitir que o usuário altere o email
        if (email !== undefined) throw new ErroValidacao('O email não pode ser alterado');

        // Rubrica: garantir que todos os campos são obrigatórios na edição
        if (!preenchido(nome) || !preenchido(senha) || !preenchido(cpf)) {
            throw new ErroValidacao('Nome, senha e CPF são obrigatórios');
        }

        // Rubrica: validação de CPF e de nível de senha na edição, feitas pela entidade
        const usuario = new Usuario(nome, atual.email, senha, cpf);
        await this.repositorio.atualizar(id, usuario);
        return usuario;
    }
}
