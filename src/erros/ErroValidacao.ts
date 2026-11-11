import { ErroAplicacao } from './ErroAplicacao';

export class ErroValidacao extends ErroAplicacao {
    readonly status = 400;
}
