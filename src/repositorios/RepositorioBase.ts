import type { QueryError, ResultSetHeader, RowDataPacket } from 'mysql2';
import { banco } from '../database';
import type { Valores } from '../entidades/Entidade';
import { ErroConflito } from '../erros/ErroConflito';

interface Total extends RowDataPacket {
    total: number;
}

// Rubrica Tech Forge: Generics, um repositório base tipado reaproveitado pelos 4 CRUDs
export abstract class RepositorioBase<T extends RowDataPacket> {
    constructor(protected readonly tabela: string) {}

    async listar(pagina: number, limite: number) {
        const [dados] = await banco.query<T[]>(
            `SELECT * FROM ${this.tabela} ORDER BY id LIMIT ? OFFSET ?`,
            [limite, (pagina - 1) * limite],
        );
        const [[{ total }]] = await banco.query<Total[]>(`SELECT COUNT(*) AS total FROM ${this.tabela}`);
        return { dados, pagina, total, totalPaginas: Math.ceil(total / limite) };
    }

    async buscarPorId(id: number) {
        const [linhas] = await banco.query<T[]>(`SELECT * FROM ${this.tabela} WHERE id = ?`, [id]);
        return linhas[0];
    }

    async criar(valores: Valores) {
        const [resultado] = await banco.query<ResultSetHeader>(`INSERT INTO ${this.tabela} SET ?`, [valores]);
        return resultado.insertId;
    }

    async atualizar(id: number, valores: Valores) {
        await banco.query(`UPDATE ${this.tabela} SET ? WHERE id = ?`, [valores, id]);
    }

    async excluir(id: number) {
        try {
            await banco.query(`DELETE FROM ${this.tabela} WHERE id = ?`, [id]);
        } catch (erro) {
            if ((erro as QueryError).code === 'ER_ROW_IS_REFERENCED_2') {
                throw new ErroConflito('Não é possível excluir, existem registros ligados a este');
            }
            throw erro;
        }
    }
}
