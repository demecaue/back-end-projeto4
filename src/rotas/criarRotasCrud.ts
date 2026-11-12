import { Router } from 'express';
import type { RowDataPacket } from 'mysql2';
import { autenticar } from '../middlewares/autenticar';
import type { ServicoBase } from '../servicos/ServicoBase';

export function criarRotasCrud<T extends RowDataPacket>(servico: ServicoBase<T>) {
    const rotas = Router();

    // Rubrica: todas as rotas dos CRUDs são autenticadas
    rotas.use(autenticar);

    // Rubrica: paginação das listagens
    rotas.get('/', async (req, res) => {
        const pagina = Math.max(1, Number(req.query.pagina) || 1);
        const limite = Math.min(50, Math.max(1, Number(req.query.limite) || 10));
        res.json(await servico.listar(pagina, limite));
    });

    rotas.get('/:id', async (req, res) => {
        res.json(await servico.buscar(Number(req.params.id)));
    });

    rotas.post('/', async (req, res) => {
        res.status(201).json(await servico.criar(req.body ?? {}));
    });

    rotas.put('/:id', async (req, res) => {
        res.json(await servico.atualizar(Number(req.params.id), req.body ?? {}));
    });

    rotas.delete('/:id', async (req, res) => {
        await servico.excluir(Number(req.params.id));
        res.status(204).end();
    });

    return rotas;
}
