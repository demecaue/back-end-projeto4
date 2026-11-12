import { texto } from '../validadores/campos';
import { Entidade } from './Entidade';

export class Categoria extends Entidade {
    #nome: string;

    constructor(dados: Record<string, unknown>) {
        super();
        this.#nome = texto(dados.nome, 'nome', 60);
    }

    dadosParaBanco() {
        return { nome: this.#nome };
    }
}
