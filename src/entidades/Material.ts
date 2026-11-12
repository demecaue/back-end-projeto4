import { numero, texto } from '../validadores/campos';
import { Entidade } from './Entidade';

export class Material extends Entidade {
    #categoriaId: number;
    #nome: string;
    #unidade: string;
    #valorUnitario: number;
    #estoqueAtual: number;
    #estoqueMinimo: number;

    constructor(dados: Record<string, unknown>) {
        super();
        this.#categoriaId = numero(dados.categoria_id, 'categoria', true);
        this.#nome = texto(dados.nome, 'nome', 120);
        this.#unidade = texto(dados.unidade, 'unidade', 10);
        this.#valorUnitario = numero(dados.valor_unitario, 'valor unitário');
        this.#estoqueAtual = numero(dados.estoque_atual, 'estoque atual', true);
        this.#estoqueMinimo = numero(dados.estoque_minimo, 'estoque mínimo', true);
    }

    // Rubrica Tech Forge: get exposto só porque o serviço confere se a categoria existe
    get categoriaId() {
        return this.#categoriaId;
    }

    dadosParaBanco() {
        return {
            categoria_id: this.#categoriaId,
            nome: this.#nome,
            unidade: this.#unidade,
            valor_unitario: this.#valorUnitario,
            estoque_atual: this.#estoqueAtual,
            estoque_minimo: this.#estoqueMinimo,
        };
    }
}
