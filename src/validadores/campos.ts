import { ErroValidacao } from '../erros/ErroValidacao';
import { preenchido } from './preenchido';

export function texto(valor: unknown, campo: string, maximo: number) {
    if (!preenchido(valor)) throw new ErroValidacao(`Preencha o campo ${campo}`);

    const limpo = valor.trim();
    if (limpo.length > maximo) throw new ErroValidacao(`O campo ${campo} aceita até ${maximo} caracteres`);
    return limpo;
}
