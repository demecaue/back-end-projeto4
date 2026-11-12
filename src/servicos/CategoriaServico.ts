import { Categoria } from '../entidades/Categoria';
import { CategoriaRepositorio, type CategoriaBanco } from '../repositorios/CategoriaRepositorio';
import { ServicoBase } from './ServicoBase';

export class CategoriaServico extends ServicoBase<CategoriaBanco> {
    constructor(repositorio: CategoriaRepositorio) {
        super(repositorio, 'Categoria não encontrada');
    }

    protected criarEntidade(dados: Record<string, unknown>) {
        return new Categoria(dados);
    }
}
