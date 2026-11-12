import { ErroAplicacao } from './ErroAplicacao';

export class ErroNaoAutorizado extends ErroAplicacao {
    readonly status = 401;
}
