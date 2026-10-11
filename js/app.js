(() => {
  const games = Array.isArray(window.GAMES) ? window.GAMES : [];
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const requestedTitle = params.get("title");
  const detail = document.getElementById("detail");
  if (!detail) return;

  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
  const normalize = value => String(value ?? "").trim().toLocaleLowerCase("pt-BR").replace(/\s+/g," ");
  const selectedGame = id ? games.find(g => String(g.id) === String(id)) : null;
  const title = requestedTitle || (selectedGame && selectedGame.name);
  const editions = title ? games.filter(g => normalize(g.name) === normalize(title)) : [];
  let active = selectedGame || editions[0] || null;

  if (!active) {
    detail.innerHTML = '<div class="detail-card"><div class="info"><h2>Jogo não encontrado</h2><a href="catalogo.html">Voltar ao catálogo</a></div></div>';
    return;
  }

  function render() {
    document.title = active.name + " — Catmasys";
    const titleEl = document.getElementById("title");
    if (titleEl) titleEl.textContent = active.name + " — Catmasys";
    const tags = editions.map(game => '<button type="button" class="edition-tag'+(String(game.id)===String(active.id)?' active':'')+'" data-id="'+esc(game.id)+'" aria-pressed="'+(String(game.id)===String(active.id))+'">'+esc(game.edition || "Edição")+'</button>').join("");
    detail.innerHTML = '<article class="detail-card game-detail-card">'+
      '<div class="game-cover-wrap"><img class="cover" src="'+esc(active.image || active.thumb)+'" alt="Capa de '+esc(active.name)+'" onerror="this.onerror=null;this.src=\''+esc(active.thumb || "")+'\';"></div>'+
      '<div class="info"><span class="detail-eyebrow">CATÁLOGO TEC TOY · MASTER SYSTEM</span><h2>'+esc(active.name)+'</h2>'+
      '<div class="info-row"><span class="label">Ano</span>'+esc(active.year || "Não informado")+'</div>'+
      '<div class="info-row"><span class="label">ID do registro</span>'+esc(active.id)+'</div>'+
      '<div class="info-row"><span class="label">Edição selecionada</span>'+esc(active.edition || "Não especificada")+'</div>'+
      '<div class="edition-selector"><span class="edition-selector-label">EDIÇÕES DISPONÍVEIS <small>'+editions.length+'</small></span><div class="edition-tags">'+tags+'</div></div>'+
      '<p class="detail-note">Selecione uma tag para consultar a capa e os dados de cada edição identificada no catálogo.</p>'+
      '<a class="primary-action detail-collection-link" href="minha_colecao.html">Organizar na minha coleção →</a></div></article>';
    detail.querySelectorAll(".edition-tag").forEach(button => button.addEventListener("click", () => {
      const next = editions.find(game => String(game.id) === String(button.dataset.id));
      if (!next) return;
      active = next;
      history.replaceState(null, "", "jogo.html?id="+encodeURIComponent(active.id));
      render();
    }));
  }
  render();
})();