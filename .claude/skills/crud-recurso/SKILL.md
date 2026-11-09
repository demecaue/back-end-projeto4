---
name: crud-recurso
description: Cria o CRUD completo de um recurso do estoque, como categoria, material, cliente ou obra. Use ao criar ou completar um CRUD.
---

# CRUD de recurso

Crie cada parte na pasta indicada no `AGENTS.md`:

1. **Entidade:** classe com campos privados (`#campo`) e validação nos `set`. Exponha `get` só quando houver regra ou transformação.
2. **Repositório:** consultas SQL do recurso. A listagem usa `LIMIT` e `OFFSET`.
3. **Serviço:** regras de negócio. Antes de editar ou excluir, busque o registro e lance um erro de recurso inexistente se ele não existir. Se o recurso pertence a outro, confira se o registro relacionado existe.
4. **Rotas**, todas com o middleware de autenticação:
   - `GET /recurso?pagina=1&limite=10` responde `{ dados, pagina, total }`.
   - `GET /recurso/:id`
   - `POST /recurso` responde `201`.
   - `PUT /recurso/:id`
   - `DELETE /recurso/:id` responde `204`.
5. Erros respondem `{ mensagem }`: `400` para dado inválido, `401` sem token e `404` para recurso inexistente.

Teste cada rota com a skill `testar-api`, incluindo os casos de erro.
