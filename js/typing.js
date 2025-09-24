// js/typing.js
// small typing loop for hero headline: element with .typed and data-strings='["a","b"]'
(function(){
  'use strict';
  const els = document.querySelectorAll('.typed');
  els.forEach(el => {
    const span = el.querySelector('span') || el;
    const raw = el.dataset.strings || '[]';
    let strings;
    try { strings = JSON.parse(raw);} catch { strings = []; }
    if(!strings.length) return;
    let i=0,ch=0,dir=1;
    const write = () => {
      const s = strings[i];
      ch += dir;
      span.textContent = s.slice(0, ch);
      if(dir===1 && ch===s.length){ dir=-1; setTimeout(write, 1000); }
      else if(dir===-1 && ch===0){ dir=1; i=(i+1)%strings.length; setTimeout(write, 200); }
      else setTimeout(write, dir===1 ? 45 : 25);
    };
    write();
  });
})();
