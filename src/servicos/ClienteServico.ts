import { Cliente } from '../entidades/Cliente';
import { ClienteRepositorio, type ClienteBanco } from '../repositorios/ClienteRepositorio';
import { ServicoBase } from './ServicoBase';

export class ClienteServico extends ServicoBase<ClienteBanco> {
    constructor(repositorio: ClienteRepositorio) {
        super(repositorio, 'Cliente não encontrado');
    }

    protected criarEntidade(dados: Record<string, unknown>) {
        return new Cliente(dados);
    }
}
