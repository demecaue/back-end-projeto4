import type { RowDataPacket } from 'mysql2';
import { RepositorioBase } from './RepositorioBase';

export interface CategoriaBanco extends RowDataPacket {
    id: number;
    nome: string;
}

export class CategoriaRepositorio extends RepositorioBase<CategoriaBanco> {
    constructor() {
        super('categoria');
    }
}
