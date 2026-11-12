import type { RowDataPacket } from 'mysql2';
import type { StatusObra } from '../entidades/Obra';
import { RepositorioBase } from './RepositorioBase';

export interface ObraBanco extends RowDataPacket {
    id: number;
    cliente_id: number;
    cliente: string;
    titulo: string;
    status: StatusObra;
    data_inicio: string;
}

export class ObraRepositorio extends RepositorioBase<ObraBanco> {
    constructor() {
        super('obra');
    }

    // Rubrica Tech Forge: polimorfismo por sobrescrita, a obra já vem com o nome do cliente
    protected selecao() {
        return 'SELECT obra.*, cliente.nome AS cliente FROM obra JOIN cliente ON cliente.id = obra.cliente_id';
    }
}
