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

        /* Céu pixelado inspirado diretamente na referência:
           estrelas pequenas + estrelas maiores em cruz, em azul e branco. */
        const starSvg=document.createElementNS('http://www.w3.org/2000/svg','svg');
        starSvg.setAttribute('viewBox','0 0 1024 768');
        starSvg.setAttribute('preserveAspectRatio','none');
        starSvg.setAttribute('aria-hidden','true');
        starSvg.className='space-harrier-star-pixels';

        const ns='http://www.w3.org/2000/svg';
        const rect=(parent,x,y,w,h,fill)=>{
            const e=document.createElementNS(ns,'rect');
            e.setAttribute('x',x);e.setAttribute('y',y);
            e.setAttribute('width',w);e.setAttribute('height',h);
            e.setAttribute('fill',fill);parent.appendChild(e);
        };

        const small=[
          [26,17],[154,49],[250,9],[335,8],[473,10],[590,10],[698,18],
          [750,41],[909,74],[975,137],[144,137],[238,166],[333,139],
          [486,137],[667,91],[846,88],[898,143],[70,72],[252,41],
          [348,140],[668,139],[752,137],[909,43],[973,73],[140,106],
          [235,104],[430,52],[543,80],[812,34],[52,183],[188,202]
        ];
        small.forEach(([x,y],i)=>{
            rect(starSvg,x,y,2,2,i%4===0?'#7de8ff':'#00aeea');
        });

        const big=[
          [78,42,'#00aeea'],[270,74,'#ffffff'],[335,8,'#ffffff'],
          [750,41,'#ffffff'],[143,106,'#00aeea'],[698,18,'#ffffff'],
          [590,10,'#00aeea'],[486,137,'#ffffff'],[909,143,'#00aeea']
        ];
        big.forEach(([x,y,color],i)=>{
            const s=i%3===0?3:2;
            rect(starSvg,x,y,s,s,color);
            rect(starSvg,x-(i%2?2:3),y+Math.floor(s/2),s+(i%2?4:6),1,color);
            rect(starSvg,x+Math.floor(s/2),y-(i%2?2:3),1,s+(i%2?4:6),color);
        });
        stars.appendChild(starSvg);

        /* Chão Space Harrier: tabuleiro xadrez verde em perspectiva.
           A faixa superior é estreita e cada coluna se abre até a borda inferior. */
        const floorSvg=document.createElementNS(ns,'svg');
        floorSvg.setAttribute('viewBox','0 0 1024 440');
        floorSvg.setAttribute('preserveAspectRatio','none');
        floorSvg.setAttribute('aria-hidden','true');
        floorSvg.className='space-harrier-floor-pixels';

        rect(floorSvg,0,0,1024,440,'#168f24');

        const rows=[0,7,16,28,43,63,89,122,163,214,278,352,440];
        const bottomX=[];
        const columns=16;
        const cell=110;
        for(let i=0;i<=columns;i++) bottomX.push(512+(i-columns/2)*cell);

        /* No horizonte as colunas ficam comprimidas no centro.
           Embaixo elas abrem para fora da tela, criando a perspectiva. */
        const topX=bottomX.map(x=>512+(x-512)*0.035);

        for(let row=0;row<rows.length-1;row++){
            const y1=rows[row], y2=rows[row+1];
            const t1=y1/440, t2=y2/440;

            for(let col=0;col<columns;col++){
                const a1=topX[col]*(1-t1)+bottomX[col]*t1;
                const b1=topX[col+1]*(1-t1)+bottomX[col+1]*t1;
                const a2=topX[col]*(1-t2)+bottomX[col]*t2;
                const b2=topX[col+1]*(1-t2)+bottomX[col+1]*t2;

                const poly=document.createElementNS(ns,'polygon');
                poly.setAttribute('points',
                    a1+','+y1+' '+b1+','+y1+' '+b2+','+y2+' '+a2+','+y2
                );
                poly.setAttribute('fill',
                    (row+col)%2===0 ? '#39bd45' : '#087c1c'
                );
                floorSvg.appendChild(poly);
            }
        }

        /* Linhas horizontais e divisões verticais, em pixel art. */
        rows.slice(1).forEach((y,i)=>{
            rect(floorSvg,0,y,1024,i<3?2:3,'#045f14');
        });
        for(let col=1;col<columns;col++){
            const xTop=topX[col];
            const xBottom=bottomX[col];
            const poly=document.createElementNS(ns,'polygon');
            poly.setAttribute('points',
                (512+(xTop-512)*0.0)+',0 '+xTop+',0 '+xBottom+',440 '+(512+(xBottom-512)*0.0)+',440'
            );
            poly.setAttribute('fill','none');
            poly.setAttribute('stroke','#075f16');
            poly.setAttribute('stroke-width','1');
            floorSvg.appendChild(poly);
        }

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