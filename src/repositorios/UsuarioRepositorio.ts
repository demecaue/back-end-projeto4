import type { QueryError, RowDataPacket } from 'mysql2';
import { banco } from '../database';
import { Usuario } from '../entidades/Usuario';
import { ErroConflito } from '../erros/ErroConflito';

interface UsuarioBanco extends RowDataPacket {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    senha_hash: string;
}

const colunas = 'id, nome, email, cpf, senha_hash';

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

    async atualizar(id: number, usuario: Usuario) {
        const { nome, senhaHash, cpf } = usuario.dadosParaBanco();
        await banco.execute(
            'UPDATE usuario SET nome = ?, senha_hash = ?, cpf = ? WHERE id = ?',
            [nome, senhaHash, cpf, id],
        );
    }

    async buscarPorEmail(email: string) {
        const [linhas] = await banco.execute<UsuarioBanco[]>(`SELECT ${colunas} FROM usuario WHERE email = ?`, [email]);
        return linhas[0];
    }

    async buscarPorId(id: number) {
        const [linhas] = await banco.execute<UsuarioBanco[]>(`SELECT ${colunas} FROM usuario WHERE id = ?`, [id]);
        return linhas[0];
    }
}
