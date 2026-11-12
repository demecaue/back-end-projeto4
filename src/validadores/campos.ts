import { ErroValidacao } from '../erros/ErroValidacao';
import { preenchido } from './preenchido';

export function texto(valor: unknown, campo: string, maximo: number) {
    if (!preenchido(valor)) throw new ErroValidacao(`Preencha o campo ${campo}`);

    const limpo = valor.trim();
    if (limpo.length > maximo) throw new ErroValidacao(`O campo ${campo} aceita até ${maximo} caracteres`);
    return limpo;
}

export function numero(valor: unknown, campo: string, inteiro = false) {
    if (typeof valor !== 'number' && !preenchido(valor)) throw new ErroValidacao(`Preencha o campo ${campo}`);

    const convertido = Number(valor);
    if (!Number.isFinite(convertido) || convertido < 0) throw new ErroValidacao(`O campo ${campo} precisa ser um número positivo`);
    if (inteiro && !Number.isInteger(convertido)) throw new ErroValidacao(`O campo ${campo} aceita só números inteiros`);
    return convertido;
}

export function opcao<T extends string>(valor: unknown, campo: string, opcoes: readonly T[]) {
    const escolhida = opcoes.find((item) => item === valor);
    if (!escolhida) throw new ErroValidacao(`O campo ${campo} aceita: ${opcoes.join(', ')}`);
    return escolhida;
}

export function data(valor: unknown, campo: string) {
    if (!preenchido(valor)) throw new ErroValidacao(`Preencha o campo ${campo}`);

    const limpa = valor.trim();
    const convertida = new Date(`${limpa}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(limpa) || Number.isNaN(convertida.getTime()) || convertida.toISOString().slice(0, 10) !== limpa) {
        throw new ErroValidacao(`O campo ${campo} precisa ser uma data válida no formato AAAA-MM-DD`);
    }
    return limpa;
}
