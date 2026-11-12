import { texto } from '../validadores/campos';
import { Entidade } from './Entidade';

export class Cliente extends Entidade {
    #nome: string;
    #cidade: string;

    constructor(dados: Record<string, unknown>) {
        super();
        this.#nome = texto(dados.nome, 'nome', 120);
        this.#cidade = texto(dados.cidade, 'cidade', 80);
    }

    dadosParaBanco() {
        return { nome: this.#nome, cidade: this.#cidade };
    }
}
