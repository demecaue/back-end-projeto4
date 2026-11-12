import { ErroAplicacao } from './ErroAplicacao';

export class ErroProibido extends ErroAplicacao {
    readonly status = 403;
}
