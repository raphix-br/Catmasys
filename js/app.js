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
    document.title = "Catmasys";
    const tags=[];
    const addTag=(label,value)=>{const v=String(value??"").trim();if(v)tags.push({label,value:v,text:label+": "+v});};
    addTag("Gênero",active.genero);
    addTag("Subgênero",active["sub-genero"]);
    addTag("Jogadores",active.players);
    String(active.peripherals||"").split(/[;,]/).map(v=>v.trim()).filter(Boolean).forEach(v=>addTag("Recurso",v.replace(/3D Glasses/ig,"Óculos 3D").replace(/Light Phaser/ig,"Pistola Light Phaser")));
    if(/^(true|sim|yes|1)$/i.test(String(active.fm||"").trim())) addTag("Som","FM");
    const battery=active.save_bateria||active.battery_save||active.bateria;
    if(/^(true|sim|yes|1)$/i.test(String(battery||"").trim())) addTag("Save","Bateria");
    addTag("Tamanho",active.tamanho);
    addTag("Desenvolvedor",active.desenvolvedor);
    addTag("Distribuidor",active.distribuidor);
    if(/^(true|sim|yes|1)$/i.test(String(active.exclusivo_br||"").trim())) addTag("Exclusivo","Brasil");
    const metadata=[
      ["Título original",active.titulo_original],["Código TecToy",active.codigo_tectoy],["Variante",active.variante],
      ["Gênero",active.genero],["Subgênero",active["sub-genero"]],["Jogadores",active.players],
      ["Periféricos",active.peripherals],["Som FM",/^(true|sim|yes|1)$/i.test(String(active.fm||"").trim())?"Sim":"Não informado"],
      ["Tamanho",active.tamanho],["Desenvolvedor",active.desenvolvedor],["Distribuidor",active.distribuidor],
      ["Exclusivo no Brasil",/^(true|sim|yes|1)$/i.test(String(active.exclusivo_br||"").trim())?"Sim":""],
      ["Observações",active.observacao]
    ].filter(row=>String(row[1]??"").trim()!=="");
    const editionTags = editions.map(game => '<button type="button" class="edition-tag'+(String(game.id)===String(active.id)?' active':'')+'" data-id="'+esc(game.id)+'" aria-pressed="'+(String(game.id)===String(active.id))+'">'+esc(game.edition || "Edição")+'</button>').join("");
    detail.innerHTML = '<article class="detail-card game-detail-card">'+
      '<div class="game-cover-wrap"><img class="cover" src="'+esc(active.image || active.thumb)+'" data-fallback="'+esc(active.thumb || "")+'" alt="Capa de '+esc(active.name)+'"></div>'+
      '<div class="info"><span class="detail-eyebrow">CATÁLOGO TEC TOY · MASTER SYSTEM</span><h2>'+esc(active.name)+'</h2>'+
      '<div class="info-row"><span class="label">Ano</span>'+esc(active.year || "Não informado")+'</div>'+
      '<div class="info-row"><span class="label">ID do registro</span>'+esc(active.id)+'</div>'+
      '<div class="info-row"><span class="label">Edição selecionada</span>'+esc(active.edition || "Não especificada")+'</div>'+
      '<section class="game-metadata-tags" aria-label="Características do jogo"><h3>CARACTERÍSTICAS</h3><div class="game-tags">'+(tags.length?tags.map(t=>'<span class="game-tag"><span class="game-tag-label">'+esc(t.label)+'</span> '+esc(t.value)+'</span>').join(""):'<span class="metadata-empty">Ainda não há características cadastradas para esta edição.</span>')+'</div></section>'+
      '<section class="metadata-table"><h3>DADOS DO CATÁLOGO</h3>'+metadata.map(row=>'<div class="info-row"><span class="label">'+esc(row[0])+'</span>'+esc(row[1])+'</div>').join("")+'</section>'+
      '<div class="edition-selector"><span class="edition-selector-label">EDIÇÕES DISPONÍVEIS <small>'+editions.length+'</small></span><div class="edition-tags">'+editionTags+'</div></div>'+
      '<p class="detail-note">As características são montadas a partir dos campos preenchidos no catálogo. Selecione outra edição para consultar seus dados.</p>'+
      '<a class="primary-action detail-collection-link" href="minha_colecao.html">Organizar na minha coleção →</a></div></article>';
    const cover = detail.querySelector(".cover");
    if (cover) cover.addEventListener("error", function () {
      const fallback = cover.dataset.fallback;
      if (fallback && cover.src !== fallback) cover.src = fallback;
    }, {once:true});
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