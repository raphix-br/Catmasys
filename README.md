# CATMASYS

Catálogo visual de jogos físicos Master System Tectoy Brasil.

## Controle de versão — REGRA OBRIGATÓRIA

Este projeto usa uma versão incremental no formato **Version 0.XXX**.

A versão atual está no arquivo `VERSION`.

O histórico detalhado está em `CHANGELOG.md`.

### Regra para qualquer modificação

Toda alteração relevante feita no projeto, por uma pessoa ou por uma IA, deve:

1. Ler primeiro `VERSION` e `CHANGELOG.md`.
2. Incrementar o número da versão antes de concluir a alteração.
3. Atualizar o arquivo `VERSION`.
4. Registrar no `CHANGELOG.md` exatamente o que foi alterado, quais arquivos foram modificados e, quando relevante, o motivo.
5. Usar a versão no início da mensagem do commit, no formato:
   `Version 0.XXX — descrição objetiva`.
6. Nunca reutilizar uma versão já existente.
7. Não apagar ou reescrever o histórico anterior sem autorização explícita.
8. Se uma alteração for desfeita, registrar uma nova versão explicando o rollback; não apagar a versão anterior do histórico.

### Pontos de retorno

O número da versão é o identificador humano do estado do projeto. Quando alguém disser, por exemplo, “voltar para Version 0.007”, deve localizar no histórico o commit correspondente e usar esse ponto como referência.

Para marcos importantes, recomenda-se futuramente criar uma Git tag/release com o mesmo número.

## Regra de arquitetura das skins

As skins são exclusivamente visuais.

O CSS/JS específico de uma skin **não deve alterar a estrutura ou o layout-base da aplicação**, incluindo altura/posição estrutural do header, dimensões/posição da sidebar, margens estruturais do conteúdo ou outras regras globais.

O layout compartilhado deve permanecer no CSS base.

Uma nova skin deve modificar somente aparência, cores, fundos, efeitos e elementos visuais próprios da skin, salvo decisão explícita registrada no CHANGELOG.

Isso é importante para que uma nova skin nunca quebre o Grid/default ou outras skins existentes.

## Orientação para pessoas e IAs

Antes de modificar o Catmasys:

- leia este arquivo;
- leia `VERSION`;
- leia `CHANGELOG.md`;
- identifique o CSS base antes de modificar uma skin;
- preserve funcionalidades e layout existentes que não façam parte da alteração solicitada;
- registre a alteração na nova versão.

**Não considere apenas o código atual como especificação. O histórico de versões também faz parte da especificação do projeto.**
