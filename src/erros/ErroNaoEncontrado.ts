import { ErroAplicacao } from './ErroAplicacao';

export class ErroNaoEncontrado extends ErroAplicacao {
    readonly status = 404;
}
