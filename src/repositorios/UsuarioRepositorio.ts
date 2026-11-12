import type { QueryError, RowDataPacket } from 'mysql2';
import { banco } from '../database';
import { Usuario } from '../entidades/Usuario';
import { ErroConflito } from '../erros/ErroConflito';

interface UsuarioBanco extends RowDataPacket {
    id: number;
    nome: string;
    email: string;
    senha_hash: string;
}

export class UsuarioRepositorio {
    async salvar(usuario: Usuario) {
        const { nome, email, senhaHash, cpf } = usuario.dadosParaBanco();

        try {
            await banco.execute(
                'INSERT INTO usuario (nome, email, senha_hash, cpf) VALUES (?, ?, ?, ?)',
                [nome, email, senhaHash, cpf],
            );
        } catch (erro) {
            if ((erro as QueryError).code === 'ER_DUP_ENTRY') throw new ErroConflito('Email já cadastrado');
            throw erro;
        }
    }

    async buscarPorEmail(email: string) {
        const [linhas] = await banco.execute<UsuarioBanco[]>(
            'SELECT id, nome, email, senha_hash FROM usuario WHERE email = ?',
            [email],
        );
        return linhas[0];
    }
}
