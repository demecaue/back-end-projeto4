import type { RowDataPacket } from 'mysql2';
import type { Entidade } from '../entidades/Entidade';
import { ErroNaoEncontrado } from '../erros/ErroNaoEncontrado';
import type { RepositorioBase } from '../repositorios/RepositorioBase';

// Rubrica Tech Forge: aberto para extensão (O), cada CRUD só define como criar a própria entidade
export abstract class ServicoBase<T extends RowDataPacket> {
    constructor(
        protected readonly repositorio: RepositorioBase<T>,
        private readonly mensagemNaoEncontrado: string,
    ) {}

    protected abstract criarEntidade(dados: Record<string, unknown>): Entidade | Promise<Entidade>;

    listar(pagina: number, limite: number) {
        return this.repositorio.listar(pagina, limite);
    }

    async buscar(id: number) {
        const registro = Number.isInteger(id) && id > 0 ? await this.repositorio.buscarPorId(id) : undefined;
        if (!registro) throw new ErroNaoEncontrado(this.mensagemNaoEncontrado);
        return registro;
    }

    async criar(dados: Record<string, unknown>) {
        const entidade = await this.criarEntidade(dados);
        return this.buscar(await this.repositorio.criar(entidade.dadosParaBanco()));
    }

    // Rubrica: não editar recursos que não existem
    async atualizar(id: number, dados: Record<string, unknown>) {
        await this.buscar(id);
        const entidade = await this.criarEntidade(dados);
        await this.repositorio.atualizar(id, entidade.dadosParaBanco());
        return this.buscar(id);
    }

    // Rubrica: não deletar recursos que não existem
    async excluir(id: number) {
        await this.buscar(id);
        await this.repositorio.excluir(id);
    }
}
