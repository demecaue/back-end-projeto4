import type { RowDataPacket } from 'mysql2';
import { RepositorioBase } from './RepositorioBase';

export interface ClienteBanco extends RowDataPacket {
    id: number;
    nome: string;
    cidade: string;
}

export class ClienteRepositorio extends RepositorioBase<ClienteBanco> {
    constructor() {
        super('cliente');
    }
}
