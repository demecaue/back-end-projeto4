import type { RowDataPacket } from 'mysql2';
import { RepositorioBase } from './RepositorioBase';

export interface MaterialBanco extends RowDataPacket {
    id: number;
    categoria_id: number;
    categoria: string;
    nome: string;
    unidade: string;
    valor_unitario: number;
    estoque_atual: number;
    estoque_minimo: number;
}

export class MaterialRepositorio extends RepositorioBase<MaterialBanco> {
    constructor() {
        super('material');
    }

    // Rubrica Tech Forge: polimorfismo por sobrescrita, o material já vem com o nome da categoria
    protected selecao() {
        return 'SELECT material.*, categoria.nome AS categoria FROM material JOIN categoria ON categoria.id = material.categoria_id';
    }
}
