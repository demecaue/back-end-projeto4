import { data, numero, opcao, texto } from '../validadores/campos';
import { Entidade } from './Entidade';

export const statusObra = ['EM_ANDAMENTO', 'CONCLUIDA', 'PARALISADA'] as const;

// Rubrica Tech Forge: tipo derivado da lista de status, sem repetir os valores
export type StatusObra = (typeof statusObra)[number];

export class Obra extends Entidade {
    #clienteId: number;
    #titulo: string;
    #status: StatusObra;
    #dataInicio: string;

    constructor(dados: Record<string, unknown>) {
        super();
        this.#clienteId = numero(dados.cliente_id, 'cliente', true);
        this.#titulo = texto(dados.titulo, 'título', 140);
        this.#status = opcao(dados.status, 'status', statusObra);
        this.#dataInicio = data(dados.data_inicio, 'data de início');
    }

    // Rubrica Tech Forge: get exposto só porque o serviço confere se o cliente existe
    get clienteId() {
        return this.#clienteId;
    }

    dadosParaBanco() {
        return {
            cliente_id: this.#clienteId,
            titulo: this.#titulo,
            status: this.#status,
            data_inicio: this.#dataInicio,
        };
    }
}
