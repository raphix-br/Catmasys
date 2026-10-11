# Assets do Catmasys

Organização sugerida para imagens e elementos visuais:

- `assets/flags/`: bandeiras dos catálogos regionais (SVG preferencial).
- `assets/ui/`: ícones próprios da interface.
- `assets/backgrounds/`: fundos e texturas da aplicação.
- `CAPAS_MASTER_SYSTEM/`: capas originais dos jogos; manter a pasta atual e os nomes existentes.
- `thumbs/`: miniaturas usadas na grade; manter a pasta atual e os nomes existentes.

Para adicionar novas bandeiras, envie os arquivos para `assets/flags/` e use caminhos relativos, por exemplo `assets/flags/br.svg`. Prefira SVG para bandeiras e ícones simples, WebP para capas/miniaturas e AVIF/WebP para fundos fotográficos comprimidos.

Não mova nem renomeie as capas atuais sem atualizar também os caminhos em `js/games_br.js`.
