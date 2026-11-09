import type { QueryError } from 'mysql2';
import { banco } from '../database';
import { ErroValidacao } from '../model/ErroValidacao';
import { Usuario } from '../model/Usuario';

export class UsuarioRepositorio {
    async salvar(usuario: Usuario) {
        const { nome, email, senhaHash, cpf } = usuario.dadosParaBanco();

        try {
            await banco.execute(
                'INSERT INTO usuario (nome, email, senha_hash, cpf) VALUES (?, ?, ?, ?)',
                [nome, email, senhaHash, cpf],
            );
        } catch (erro) {
            if ((erro as QueryError).code === 'ER_DUP_ENTRY') throw new ErroValidacao('Email já cadastrado');
            throw erro;
        }
    }
}
