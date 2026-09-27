(function(){
    const body=document.body;
    const rail=document.querySelector('.future-modes');
    if(!rail) return;
    const btn=rail.querySelector('.mode-placeholder');
    if(!btn) return;

    btn.disabled=false;
    btn.classList.remove('mode-placeholder');
    btn.classList.add('skin-toggle');
    btn.title='Trocar skin';
    btn.setAttribute('aria-label','Trocar skin');
    btn.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="7"/></svg>';

    const key='catmasys-skin';
    let skin=localStorage.getItem(key)||'default';

    function scene(){
        if(document.querySelector('.space-harrier-floor')) return;

        const stars=document.createElement('div');
        stars.className='space-harrier-stars';

        const floor=document.createElement('div');
        floor.className='space-harrier-floor';

        const horizon=document.createElement('div');
        horizon.className='space-harrier-horizon';

        /* Pixel art: céu preto com estrelas em pequenos cruzamentos azuis,
           reproduzindo a estética da tela de referência. */
        const starSvg=document.createElementNS('http://www.w3.org/2000/svg','svg');
        starSvg.setAttribute('viewBox','0 0 1024 768');
        starSvg.setAttribute('preserveAspectRatio','none');
        starSvg.setAttribute('aria-hidden','true');
        starSvg.className='space-harrier-star-pixels';

        const starsPos=[
          [26,17],[78,42],[143,106],[154,49],[250,9],[270,74],[335,8],
          [473,10],[590,10],[698,18],[750,41],[909,74],[975,137],
          [144,137],[238,166],[333,139],[486,137],[667,91],[846,88],
          [898,143],[70,72],[252,41],[348,140],[668,139],[752,137],
          [909,43],[973,73],[140,106],[235,104]
        ];
        starsPos.forEach(([x,y])=>{
          const g=document.createElementNS('http://www.w3.org/2000/svg','g');
          g.setAttribute('shape-rendering','crispEdges');
          const c=document.createElementNS('http://www.w3.org/2000/svg','rect');
          c.setAttribute('x',x); c.setAttribute('y',y); c.setAttribute('width','3'); c.setAttribute('height','3');
          c.setAttribute('fill','#00aeea');
          g.appendChild(c);
          if((x+y)%3===0){
            const h=document.createElementNS('http://www.w3.org/2000/svg','rect');
            h.setAttribute('x',x-3); h.setAttribute('y',y+1); h.setAttribute('width','9'); h.setAttribute('height','1');
            h.setAttribute('fill','#00aeea');
            const v=document.createElementNS('http://www.w3.org/2000/svg','rect');
            v.setAttribute('x',x+1); v.setAttribute('y',y-3); v.setAttribute('width','1'); v.setAttribute('height','9');
            v.setAttribute('fill','#00aeea');
            g.append(h,v);
          }
          starSvg.appendChild(g);
        });
        stars.appendChild(starSvg);

        /* Pixel-art checkerboard: horizonte fixo + faixas trapezoidais */
        const floorSvg=document.createElementNS('http://www.w3.org/2000/svg','svg');
        floorSvg.setAttribute('viewBox','0 0 1024 200');
        floorSvg.setAttribute('preserveAspectRatio','none');
        floorSvg.setAttribute('aria-hidden','true');
        floorSvg.className='space-harrier-floor-pixels';

        const ns='http://www.w3.org/2000/svg';
        const rect=(x,y,w,h,fill)=>{const e=document.createElementNS(ns,'rect');e.setAttribute('x',x);e.setAttribute('y',y);e.setAttribute('width',w);e.setAttribute('height',h);e.setAttribute('fill',fill);floorSvg.appendChild(e);};
        const poly=(pts,fill)=>{const e=document.createElementNS(ns,'polygon');e.setAttribute('points',pts);e.setAttribute('fill',fill);floorSvg.appendChild(e);};

        rect(0,0,1024,200,'#006400');
        rect(0,0,1024,9,'#007d00');

        const rows=[0,12,27,47,72,104,143,200];
        const widths=[28,72,132,215,330,480,690,1024];
        for(let r=0;r<rows.length-1;r++){
          const y1=rows[r],y2=rows[r+1],w1=widths[r],w2=widths[r+1];
          const left1=(1024-w1)/2,left2=(1024-w2)/2;
          const cols=6;
          for(let col=0;col<cols;col++){
            if((col+r)%2===0){
              const a1=left1+w1*col/cols,b1=left1+w1*(col+1)/cols;
              const a2=left2+w2*col/cols,b2=left2+w2*(col+1)/cols;
              poly(`${a1},${y1} ${b1},${y1} ${b2},${y2} ${a2},${y2}`,'#00b900');
            }
          }
        }
        /* Linhas horizontais pixeladas atravessando a pista */
        rows.slice(1,-1).forEach(y=>rect(0,y,1024,2,'#005900'));
        floor.appendChild(floorSvg);

        const badge=document.createElement('div');
        badge.className='space-harrier-skin-badge';
        badge.textContent='SPACE HARRIER';
        body.append(stars,floor,horizon,badge);
    }
    function apply(){
        body.classList.toggle('space-harrier-skin',skin==='space-harrier');
        if(skin==='space-harrier') scene();
        btn.setAttribute('aria-pressed',String(skin==='space-harrier'));
        btn.title=skin==='space-harrier'?'Skin atual: Space Harrier — clique para voltar':'Trocar skin: Space Harrier';
    }
    function parallax(){
        /* Desativado por enquanto: céu e chão ficam totalmente estáticos. */
        body.style.setProperty('--sh-scroll','0px');
        body.style.setProperty('--sh-floor','0px');
    }
    btn.addEventListener('click',()=>{
        skin=skin==='space-harrier'?'default':'space-harrier';
        localStorage.setItem(key,skin);
        apply();
        parallax();
    });
    apply();
    parallax();
})();