import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import { ErroAplicacao } from './erros/ErroAplicacao';
import { autenticar } from './middlewares/autenticar';
import { UsuarioRepositorio } from './repositorios/UsuarioRepositorio';
import { AutenticacaoServico } from './servicos/AutenticacaoServico';
import { UsuarioServico } from './servicos/UsuarioServico';

const app = express();
const usuarioRepositorio = new UsuarioRepositorio();
const usuarioServico = new UsuarioServico(usuarioRepositorio);
const autenticacaoServico = new AutenticacaoServico(usuarioRepositorio);
const porta = Number(process.env.PORT ?? 3000);

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/usuarios', async (req, res) => {
    const usuario = await usuarioServico.cadastrar(req.body ?? {});
    res.status(201).json(usuario);
});

app.post('/login', async (req, res) => {
    res.json(await autenticacaoServico.login(req.body ?? {}));
});

app.get('/usuarios/:id', autenticar, async (req, res) => {
    res.json(await usuarioServico.buscar(Number(req.params.id), req.usuarioId));
});

// Rubrica: edição de usuário em rota autenticada
app.put('/usuarios/:id', autenticar, async (req, res) => {
    res.json(await usuarioServico.editar(Number(req.params.id), req.usuarioId, req.body ?? {}));
});

// Rubrica Tech Forge: tratamento central das exceções customizadas
app.use((erro: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (erro instanceof ErroAplicacao) {
        res.status(erro.status).json({ mensagem: erro.message });
        return;
    }

    if (erro instanceof SyntaxError) {
        res.status(400).json({ mensagem: 'JSON inválido' });
        return;
    }

    console.error(erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
});

app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
