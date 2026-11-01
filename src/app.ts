import express from 'express';
import { Usuario } from './model/Usuario';
import { cpfValido } from './validators/cpf';
import { emailValido } from './validators/email';
import { nivelSenha } from './validators/senha';

const app = express();
const usuarios: Usuario[] = [];

app.use(express.json());

app.post('/usuarios', (req, res) => {
    const { nome, email, senha, cpf } = req.body ?? {};
    const preenchidos = [nome, email, senha, cpf].every((campo) => typeof campo === 'string' && campo.trim());

    if (!preenchidos) {
        res.status(400).json({ mensagem: 'Nome, email, senha e CPF são obrigatórios' });
        return;
    }

    if (!emailValido(email)) {
        res.status(400).json({ mensagem: 'Email inválido' });
        return;
    }

    if (!cpfValido(cpf)) {
        res.status(400).json({ mensagem: 'CPF inválido' });
        return;
    }

    if (nivelSenha(senha) === 'fraca') {
        res.status(400).json({ mensagem: 'Senha fraca: use 8 caracteres e 3 tipos entre minúscula, maiúscula, número e símbolo' });
        return;
    }

    const usuario = new Usuario(nome, email, senha, cpf);
    usuarios.push(usuario);
    res.status(201).json(usuario);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
