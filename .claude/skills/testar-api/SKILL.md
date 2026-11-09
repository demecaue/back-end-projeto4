---
name: testar-api
description: Sobe a API e testa as rotas com curl, incluindo os casos de erro. Use depois de qualquer mudança no back-end.
---

# Testar a API

1. Rode `npx tsc --noEmit`. Se falhar, corrija antes de continuar.
2. Suba a API com `npm run dev` em segundo plano e espere a porta 3000 responder.
3. Teste o caso válido e pelo menos um caso de erro de cada regra. Confira o status e o corpo da resposta.
4. Rotas autenticadas recebem o token no cabeçalho `Authorization: Bearer <token>`.
5. Ao terminar, encerre o processo da API.

Cadastro de usuário com dados válidos:

```bash
curl -X POST localhost:3000/usuarios -H "Content-Type: application/json" \
  -d '{"nome":"Ana Lima","email":"ana@dw.com","senha":"Abcd123!","cpf":"529.982.247-25"}'
```

Informe ao usuário cada caso testado e o status recebido.
