(function () {
const games=Array.isArray(window.GAMES)?window.GAMES:[];
const grid=document.getElementById("grid"),count=document.getElementById("count"),search=document.getElementById("search");
const genre=document.getElementById("genre-filter"),year=document.getElementById("year-filter"),sort=document.getElementById("sort-filter");
const editions=document.querySelectorAll("#editions button");
const modes=document.querySelectorAll(".view-mode");
let viewMode="thumbs";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function fill(){let gs=[...new Set(games.map(g=>String(g.genero||"").trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"pt-BR")),ys=[...new Set(games.map(g=>String(g.year||"").trim()).filter(Boolean))].sort((a,b)=>Number(b)-Number(a));genre.innerHTML='<option value="">GÊNERO</option>'+gs.map(x=>'<option>'+esc(x)+'</option>').join("");year.innerHTML='<option value="">ANO</option>'+ys.map(x=>'<option>'+esc(x)+'</option>').join("")}
function cards(list){return list.map(g=>'<a class="card" href="jogo.html?id='+encodeURIComponent(g.id)+'"><img class="thumb" src="'+esc(g.thumb||g.image)+'" alt="'+esc(g.name)+'" loading="lazy"><div class="name">'+esc(g.name)+'</div></a>').join("")}
function renderThumbs(list){grid.innerHTML='<div class="thumbs-grid">'+cards(list)+'</div>'}
function renderGroups(list,key,label){let groups={};list.forEach(g=>{let k=String(g[key]||"Sem "+label.toLowerCase()).trim()||"Sem "+label.toLowerCase();(groups[k]??=[]).push(g)});let keys=Object.keys(groups).sort((a,b)=>viewMode==="year"?((Number(b)||0)-(Number(a)||0)):a.localeCompare(b,"pt-BR"));grid.innerHTML=keys.map(k=>'<section class="view-section"><div class="view-title">'+esc(k)+'</div><div class="thumbs-grid">'+cards(groups[k])+'</div></section>').join("")}
function render(list){if(viewMode==="thumbs")renderThumbs(list);else if(viewMode==="year")renderGroups(list,"year","ano");else renderGroups(list,"genero","gênero");count.textContent=list.length+" jogos"}
function apply(){let q=search.value.trim().toLowerCase(),gs=[...editions].filter(b=>b.classList.contains("active")).map(b=>b.dataset.edition);let list=games.filter(g=>(!q||String(g.name).toLowerCase().includes(q))&&(!genre.value||String(g.genero||"").trim()===genre.value)&&(!year.value||String(g.year||"").trim()===year.value)&&(!gs.length||gs.includes(String(g.edition||"").toUpperCase())));if(sort.value==="az")list.sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));if(sort.value==="za")list.sort((a,b)=>b.name.localeCompare(a.name,"pt-BR"));render(list)}
modes.forEach(b=>b.addEventListener("click",()=>{modes.forEach(x=>x.classList.remove("active"));b.classList.add("active");viewMode=b.dataset.view;apply()}));
[search,genre,year,sort].forEach(x=>x.addEventListener(x===search?"input":"change",apply));
editions.forEach(b=>b.addEventListener("click",()=>{b.classList.toggle("active");apply()}));
fill();apply();addEventListener("resize",apply);
})();