(function () {
const games=Array.isArray(window.GAMES)?window.GAMES:[];
const grid=document.getElementById("grid"),count=document.getElementById("count"),search=document.getElementById("search");
const genre=document.getElementById("genre-filter"),year=document.getElementById("year-filter"),sort=document.getElementById("sort-filter");
const editions=document.querySelectorAll("#editions button");
const modes=document.querySelectorAll(".view-mode");
let viewMode="thumbs";
let timelineIndex=0;
let timelinePosition=0;
let timelineList=[];
let timelineZoom=1;
let timelineDrag=null;

const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

const yearPalette=[
    {bg:"#a9c51c",fg:"#111111"},
    {bg:"#e63b25",fg:"#ffffff"},
    {bg:"#eea31a",fg:"#111111"},
    {bg:"#18a8c7",fg:"#ffffff"},
    {bg:"#9b2388",fg:"#ffffff"}
];

function fill(){let gs=[...new Set(games.map(g=>String(g.genero||"").trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"pt-BR")),ys=[...new Set(games.map(g=>String(g.year||"").trim()).filter(Boolean))].sort((a,b)=>Number(b)-Number(a));genre.innerHTML='<option value="">GÊNERO</option>'+gs.map(x=>'<option>'+esc(x)+'</option>').join("");year.innerHTML='<option value="">ANO</option>'+ys.map(x=>'<option>'+esc(x)+'</option>').join("")}

function cards(list){return list.map(g=>'<a class="card" href="jogo.html?id='+encodeURIComponent(g.id)+'"><img class="thumb" src="'+esc(g.thumb||g.image)+'" alt="'+esc(g.name)+'" loading="lazy"><div class="name">'+esc(g.name)+'</div></a>').join("")}

function renderThumbs(list){grid.innerHTML='<div class="thumbs-grid">'+cards(list)+'</div>'}

function renderGroups(list,key,label){
    let groups={};
    list.forEach(g=>{
        let k=String(g[key]||"Sem "+label.toLowerCase()).trim()||"Sem "+label.toLowerCase();
        (groups[k]??=[]).push(g);
    });

    let keys=Object.keys(groups).sort((a,b)=>viewMode==="year"?((Number(b)||0)-(Number(a)||0)):a.localeCompare(b,"pt-BR"));

    grid.innerHTML=keys.map((k,index)=>{
        let palette=yearPalette[index%yearPalette.length];
        let colorAttrs=' style="--cm-year-color:'+palette.bg+';--cm-year-text:'+palette.fg+'"';
        return '<section class="view-section" data-view-key="'+(viewMode==="year"?"year":"genre")+'"'+colorAttrs+'><div class="view-title">'+esc(k)+'</div><div class="thumbs-grid">'+cards(groups[k])+'</div></section>';
    }).join("");
}

function renderTimeline(list){
    timelineList=[...list].sort((a,b)=>(Number(a.year)||0)-(Number(b.year)||0)||String(a.name||"").localeCompare(String(b.name||""),"pt-BR"));
    if(!timelineList.length){grid.innerHTML='<div class="timeline-empty">Nenhum jogo encontrado.</div>';return;}
    timelineIndex=Math.max(0,Math.min(timelineIndex,timelineList.length-1));
    timelinePosition=timelineIndex;
    const groups=[];
    let lastYear=null;
    timelineList.forEach((g,i)=>{
        const y=String(g.year||"Sem ano");
        if(y!==lastYear){
            groups.push('<div class="timeline-marker" data-year="'+esc(y)+'"><span>'+esc(y)+'</span></div>');
            lastYear=y;
        }
        groups.push('<a class="timeline-card'+(i===timelineIndex?" selected":"")+'" data-index="'+i+'" href="jogo.html?id='+encodeURIComponent(g.id)+'"><img class="thumb" src="'+esc(g.thumb||g.image)+'" alt="'+esc(g.name)+'" loading="lazy"><div class="name">'+esc(g.name)+'</div></a>');
    });
    grid.innerHTML='<div class="timeline-wrap"><div class="timeline-track"></div><div class="timeline-row">'+groups.join("")+'</div><div class="timeline-hint">ARRASTE PARA NAVEGAR · SCROLL PARA ZOOM</div></div>';
    updateTimeline(false);
}

function updateTimeline(animate=true){
    const wrap=grid.querySelector(".timeline-wrap"),row=grid.querySelector(".timeline-row");
    if(!wrap||!row||!timelineList.length)return;
    row.style.setProperty("--timeline-zoom",String(timelineZoom));

    const cards=[...row.querySelectorAll(".timeline-card")];
    if(!cards.length)return;

    const selectedIndex=Math.max(0,Math.min(Math.round(timelinePosition),timelineList.length-1));
    cards.forEach((card,i)=>{
        const d=i-timelinePosition;
        const ad=Math.abs(d);
        card.classList.toggle("selected",i===selectedIndex);
        card.style.setProperty("--timeline-distance",String(d));
        card.style.zIndex=String(100-Math.round(ad));
        card.setAttribute("aria-current",i===selectedIndex?"true":"false");
    });

    const lo=Math.max(0,Math.min(Math.floor(timelinePosition),cards.length-1));
    const hi=Math.max(0,Math.min(lo+1,cards.length-1));
    const t=Math.max(0,Math.min(1,timelinePosition-lo));
    const loCenter=cards[lo].offsetLeft+cards[lo].offsetWidth/2;
    const hiCenter=cards[hi].offsetLeft+cards[hi].offsetWidth/2;
    const center=loCenter+(hiCenter-loCenter)*t;
    const target=wrap.clientWidth/2;

    row.style.transition=animate?"transform .18s cubic-bezier(.22,.7,.2,1)":"none";
    row.style.transform="translate3d("+(target-center)+"px,0,0)";
}

function setTimelineIndex(index,animate=true){
    if(!timelineList.length)return;
    timelineIndex=Math.max(0,Math.min(Math.round(index),timelineList.length-1));
    timelinePosition=timelineIndex;
    updateTimeline(animate);
}

function render(list){if(viewMode==="thumbs")renderThumbs(list);else if(viewMode==="year")renderGroups(list,"year","ano");else if(viewMode==="genre")renderGroups(list,"genero","gênero");else renderTimeline(list)}
function render(list){if(viewMode==="thumbs")renderThumbs(list);else if(viewMode==="year")renderGroups(list,"year","ano");else if(viewMode==="genre")renderGroups(list,"genero","gênero");else renderTimeline(list)}

function apply(){let q=search.value.trim().toLowerCase(),gs=[...editions].filter(b=>b.classList.contains("active")).map(b=>b.dataset.edition);let list=games.filter(g=>(!q||String(g.name).toLowerCase().includes(q))&&(!genre.value||String(g.genero||"").trim()===genre.value)&&(!year.value||String(g.year||"").trim()===year.value)&&(!gs.length||gs.includes(String(g.edition||"").toUpperCase())));if(sort.value==="az")list.sort((a,b)=>a.name.localeCompare(b.name,"pt-BR"));if(sort.value==="za")list.sort((a,b)=>b.name.localeCompare(a.name,"pt-BR"));render(list);count.textContent=list.length+" jogos"}

modes.forEach(b=>b.addEventListener("click",()=>{if(b.disabled)return;modes.forEach(x=>x.classList.remove("active"));b.classList.add("active");viewMode=b.dataset.view;apply()}));

document.addEventListener("keydown",e=>{
    if(viewMode!=="timeline")return;
    if(e.key==="ArrowRight"){e.preventDefault();setTimelineIndex(timelineIndex+1);}
    if(e.key==="ArrowLeft"){e.preventDefault();setTimelineIndex(timelineIndex-1);}
});

grid.addEventListener("wheel",e=>{
    if(viewMode!=="timeline")return;
    e.preventDefault();
    timelineZoom=Math.max(.58,Math.min(1.65,timelineZoom+(e.deltaY>0?-0.10:0.10)));
    updateTimeline(false);
},{passive:false});

grid.addEventListener("pointerdown",e=>{
    if(viewMode!=="timeline"||e.button!==0)return;
    const wrap=e.target.closest(".timeline-wrap");
    if(!wrap)return;
    timelineDrag={x:e.clientX,base:timelinePosition,moved:false};
    wrap.classList.add("dragging");
    wrap.setPointerCapture?.(e.pointerId);
});

grid.addEventListener("pointermove",e=>{
    if(!timelineDrag||viewMode!=="timeline")return;
    const dx=e.clientX-timelineDrag.x;
    if(Math.abs(dx)>5)timelineDrag.moved=true;
    const step=Math.max(75,125*timelineZoom);
    timelinePosition=Math.max(0,Math.min(timelineList.length-1,timelineDrag.base-dx/step));
    timelineIndex=Math.round(timelinePosition);
    updateTimeline(false);
});

grid.addEventListener("pointerup",e=>{
    if(!timelineDrag)return;
    const wrap=e.target.closest(".timeline-wrap");
    if(wrap)wrap.classList.remove("dragging");
    const moved=timelineDrag.moved;
    timelineDrag=null;
    if(viewMode==="timeline")setTimelineIndex(Math.round(timelinePosition),true);
    if(moved)e.preventDefault();
});

grid.addEventListener("pointercancel",()=>{
    if(!timelineDrag)return;
    timelineDrag=null;
    grid.querySelector(".timeline-wrap")?.classList.remove("dragging");
});

grid.addEventListener("click",e=>{
    if(viewMode!=="timeline")return;
    const card=e.target.closest(".timeline-card");
    if(!card)return;
    const i=Number(card.dataset.index);
    if(i!==timelineIndex){e.preventDefault();setTimelineIndex(i);}
});

[search,genre,year,sort].forEach(x=>x.addEventListener(x===search?"input":"change",apply));
editions.forEach(b=>b.addEventListener("click",()=>{b.classList.toggle("active");apply()}));
fill();apply();addEventListener("resize",apply);
})();