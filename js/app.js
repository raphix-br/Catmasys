(() => {
  const games = Array.isArray(window.GAMES) ? window.GAMES : [];
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  const grid = document.getElementById('grid');
  if (grid) {
    const count = document.getElementById('count');
    const search = document.getElementById('search');

    function render(list) {
      grid.innerHTML = list.map(g => `
        <a class="card" href="jogo.html?id=${encodeURIComponent(g.id)}">
          <img class="thumb" src="${g.image}" alt="${esc(g.name)}" loading="lazy">
          <div class="name">${esc(g.name)}</div>
          <div class="id">BDJogos ${esc(g.id)}</div>
        </a>`).join('');
      count.textContent = `${list.length} jogos`;
    }

    function filter() {
      const q = search.value.trim().toLowerCase();
      render(q ? games.filter(g => g.name.toLowerCase().includes(q)) : games);
    }

    search.addEventListener('input', filter);
    render(games);
  }

  const detail = document.getElementById('detail');
  if (detail) {
    const g = games.find(x => String(x.id) === String(id));

    if (!g) {
      detail.innerHTML = `
        <div class="detail-card">
          <div class="info">
            <h2>Jogo não encontrado</h2>
            <a href="index.html">Voltar ao catálogo</a>
          </div>
        </div>`;
    } else {
      document.title = `${g.name} — Catmasys`;
      const titleEl = document.getElementById('title');
      if (titleEl) titleEl.textContent = g.name;

      detail.innerHTML = `
        <article class="detail-card">
          <img class="cover" src="${g.image}" alt="${esc(g.name)}">
          <div class="info">
            <h2>${esc(g.name)}</h2>
            <div class="info-row"><span class="label">ID BDJogos</span>${esc(g.id)}</div>
            <div class="info-row"><span class="label">Catálogo</span>Master System</div>
            <p style="margin-top:24px;color:#666">Os demais campos serão adicionados nas próximas etapas.</p>
          </div>
        </article>`;
    }
  }
})();
