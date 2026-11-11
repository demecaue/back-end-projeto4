import { ErroAplicacao } from './ErroAplicacao';

export class ErroConflito extends ErroAplicacao {
    readonly status = 409;
}
