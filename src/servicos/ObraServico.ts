import { Obra } from '../entidades/Obra';
import { ErroValidacao } from '../erros/ErroValidacao';
import { ClienteRepositorio } from '../repositorios/ClienteRepositorio';
import { ObraRepositorio, type ObraBanco } from '../repositorios/ObraRepositorio';
import { ServicoBase } from './ServicoBase';

export class ObraServico extends ServicoBase<ObraBanco> {
    constructor(repositorio: ObraRepositorio, private readonly clientes: ClienteRepositorio) {
        super(repositorio, 'Obra não encontrada');
    }

    // Rubrica: relacionamento entre os recursos, a obra precisa de um cliente existente
    protected async criarEntidade(dados: Record<string, unknown>) {
        const obra = new Obra(dados);
        if (!(await this.clientes.buscarPorId(obra.clienteId))) throw new ErroValidacao('Cliente não encontrado');
        return obra;
    }
}
