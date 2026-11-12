import { Material } from '../entidades/Material';
import { ErroValidacao } from '../erros/ErroValidacao';
import { CategoriaRepositorio } from '../repositorios/CategoriaRepositorio';
import { MaterialRepositorio, type MaterialBanco } from '../repositorios/MaterialRepositorio';
import { ServicoBase } from './ServicoBase';

export class MaterialServico extends ServicoBase<MaterialBanco> {
    constructor(repositorio: MaterialRepositorio, private readonly categorias: CategoriaRepositorio) {
        super(repositorio, 'Material não encontrado');
    }

    // Rubrica: relacionamento entre os recursos, o material precisa de uma categoria existente
    protected async criarEntidade(dados: Record<string, unknown>) {
        const material = new Material(dados);
        if (!(await this.categorias.buscarPorId(material.categoriaId))) throw new ErroValidacao('Categoria não encontrada');
        return material;
    }
}
