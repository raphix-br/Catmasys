(function () {
    const games = Array.isArray(window.GAMES) ? window.GAMES : [];
    const grid = document.getElementById("collection-grid");
    const count = document.getElementById("collection-count");
    const statusText = document.getElementById("collection-status");
    const search = document.getElementById("search");
    const genreFilter=document.getElementById("genre-filter"), yearFilter=document.getElementById("year-filter"), sortFilter=document.getElementById("sort-filter"), statusFilter=document.getElementById("status-filter"), editionButtons=document.querySelectorAll("#editions button");
    const filters = document.querySelectorAll("#collection-filters button");
    const STORAGE_KEY = "catmasys_minha_colecao_v1";

    let collection = {};
    try {
        collection = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch (_) {
        collection = {};
    }

    const statuses = {
        CIB: "CIB",
        BOXED: "Boxed",
        LOOSE: "Loose",
        INCOMPLETO: "Incompleto",
        NAO_POSSUO: "Não possuo"
    };

    function esc(s) {
        return String(s ?? "").replace(/[&<>"']/g, c => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        }[c]));
    }

    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
    }

    function getStatus(id) {
        return collection[id] || "NAO_POSSUO";
    }

    function fillFilters(){const gs=[...new Set(games.map(g=>String(g.genero||"").trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"pt-BR"));const ys=[...new Set(games.map(g=>String(g.year||"").trim()).filter(Boolean))].sort((a,b)=>Number(b)-Number(a));genreFilter.innerHTML='<option value="">GÊNERO</option>'+gs.map(x=>`<option>${esc(x)}</option>`).join("");yearFilter.innerHTML='<option value="">ANO</option>'+ys.map(x=>`<option>${esc(x)}</option>`).join("")}

    function render(list) {
        grid.innerHTML = list.map(g => {
            const status = getStatus(g.id);
            return `
                <article class="collection-card" data-id="${esc(g.id)}">
                    <a class="collection-cover-link" href="jogo.html?id=${encodeURIComponent(g.id)}">
                        <img class="thumb" src="${esc(g.thumb || g.image)}" alt="${esc(g.name)}" loading="lazy">
                    </a>
                    <div class="collection-name">${esc(g.name)}</div>
                    <div class="collection-id">${esc(g.id)}</div>
                    <select class="collection-status-select" aria-label="Status de ${esc(g.name)}">
                        ${Object.entries(statuses).map(([value,label]) =>
                            `<option value="${value}" ${status === value ? "selected" : ""}>${label}</option>`
                        ).join("")}
                    </select>
                </article>
            `;
        }).join("");

        grid.querySelectorAll(".collection-status-select").forEach(select => {
            select.addEventListener("change", function () {
                const id = this.closest(".collection-card").dataset.id;
                collection[id] = this.value;
                save();
                updateSummary();
                applyFilters();
            });
        });

        updateSummary();
    }

    function updateSummary() {
        const owned = games.filter(g => getStatus(g.id) !== "NAO_POSSUO").length;
        count.textContent = `${owned} de ${games.length} jogos`;

        const totals = Object.keys(statuses)
            .filter(s => s !== "NAO_POSSUO")
            .map(s => `${statuses[s]}: ${games.filter(g => getStatus(g.id) === s).length}`);

        statusText.textContent = totals.join("  •  ");
    }

    function applyFilters() {
        const q = search.value.trim().toLowerCase();
        const active = statusFilter.value || "TODOS";
        const genre=genreFilter.value, year=yearFilter.value, sort=sortFilter.value;
        const editions=[...editionButtons].filter(b=>b.classList.contains("active")).map(b=>b.dataset.edition);

        const list = games.filter(g => {
            const matchesSearch = !q || String(g.name).toLowerCase().includes(q);
            const matchesStatus = active === "TODOS" || getStatus(g.id) === active;
            const matchesGenre=!genre || String(g.genero||"").trim()===genre;
            const matchesYear=!year || String(g.year||"").trim()===year;
            const matchesEdition=!editions.length || editions.includes(String(g.edition||"").toUpperCase());
            return matchesSearch && matchesStatus && matchesGenre && matchesYear && matchesEdition;
        });

        if(sort==="az") list.sort((a,b)=>a.name.localeCompare(b.name,"pt-BR")); if(sort==="za") list.sort((a,b)=>b.name.localeCompare(a.name,"pt-BR")); render(list);
    }

    [search,genreFilter,yearFilter,sortFilter,statusFilter].forEach(el=>el.addEventListener(el===search?"input":"change",applyFilters)); editionButtons.forEach(b=>b.addEventListener("click",()=>{b.classList.toggle("active");applyFilters()}));

    filters.forEach(button => {
        button.addEventListener("click", function () {
            filters.forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            applyFilters();
        });
    });

    search.addEventListener("input", applyFilters);

    fillFilters();
    applyFilters();
})();
