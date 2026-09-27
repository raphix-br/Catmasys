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
        if(!body.classList.contains('space-harrier-skin')) return;
        if(!document.querySelector('.space-harrier-horizon')){
            const h=document.createElement('div'); h.className='space-harrier-horizon';
            const s=document.createElement('div'); s.className='space-harrier-stars';
            const b=document.createElement('div'); b.className='space-harrier-skin-badge'; b.textContent='SPACE HARRIER';
            body.append(h,s,b);
        }
    }
    function apply(){
        body.classList.toggle('space-harrier-skin',skin==='space-harrier');
        if(skin==='space-harrier') scene();
        btn.setAttribute('aria-pressed',String(skin==='space-harrier'));
        btn.title=skin==='space-harrier'?'Skin atual: Space Harrier — clique para voltar':'Trocar skin: Space Harrier';
    }
    function parallax(){
        const y=window.scrollY||0;
        body.style.setProperty('--sh-scroll',y+'px');
        body.style.setProperty('--sh-floor',Math.max(0,y-120)+'px');
    }
    btn.addEventListener('click',()=>{
        skin=skin==='space-harrier'?'default':'space-harrier';
        localStorage.setItem(key,skin);
        apply();
        parallax();
    });
    window.addEventListener('scroll',parallax,{passive:true});
    apply(); parallax();
})();