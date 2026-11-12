---
name: crud-recurso
description: Cria o CRUD completo de um recurso do estoque, como categoria, material, cliente ou obra. Use ao criar ou completar um CRUD.
---

# CRUD de recurso

Siga o CRUD de categoria como modelo. As pastas estão no `AGENTS.md`.

1. **Entidade:** estende `Entidade`, guarda os campos em `#campo` e valida no construtor com os validadores de `src/validadores`. Implementa `dadosParaBanco()` com os nomes das colunas.
2. **Repositório:** estende `RepositorioBase<Tipo>` passando o nome da tabela. A interface do tipo estende `RowDataPacket`.
3. **Serviço:** estende `ServicoBase<Tipo>` e implementa `criarEntidade`. Se o recurso pertence a outro, confira ali se o registro relacionado existe.
4. **Rotas:** registre no `app.ts` com `app.use('/recursos', criarRotasCrud(servico))`. Isso já gera:
   - `GET /recursos?pagina=1&limite=10` respondendo `{ dados, pagina, total, totalPaginas }`.
   - `GET /recursos/:id`
   - `POST /recursos` respondendo `201`.
   - `PUT /recursos/:id`
   - `DELETE /recursos/:id` respondendo `204`.
   Todas passam pelo middleware de autenticação.
5. Erros respondem `{ mensagem }`: `400` para dado inválido, `401` sem token, `404` para recurso inexistente e `409` ao excluir registro que outro usa.

Teste cada rota com a skill `testar-api`, incluindo os casos de erro.
