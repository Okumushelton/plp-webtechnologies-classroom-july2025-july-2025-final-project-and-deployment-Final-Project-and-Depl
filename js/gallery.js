// js/gallery.js
// Lightbox with prev/next, keyboard, touch swipe + filter support (if present)

(function(){
  'use strict';
  const gallery = document.getElementById('gallery-grid') || document.querySelector('.gallery-grid');
  if(!gallery) return;

  // Collect all gallery items (static snapshot)
  let items = Array.from(gallery.querySelectorAll('.gallery-item'));
  let visible = items.filter(i => i.style.display !== 'none');
  let idx = -1;

  // create lightbox markup (if not present)
  let lb = document.getElementById('site-lightbox');
  if(!lb){
    lb = document.createElement('div'); lb.id='site-lightbox'; lb.className='lightbox';
    lb.innerHTML = `
      <button class="lb-close" id="lb-close" aria-label="Close">×</button>
      <div class="lb-prev" id="lb-prev" tabindex="0" aria-hidden="false">‹</div>
      <div class="lb-next" id="lb-next" tabindex="0" aria-hidden="false">›</div>
      <div class="lb-stage" id="lb-stage" role="dialog" aria-modal="true"></div>
    `;
    document.body.appendChild(lb);
  }
  const stage = document.getElementById('lb-stage');
  const closeBtn = document.getElementById('lb-close');
  const prevBtn = document.getElementById('lb-prev');
  const nextBtn = document.getElementById('lb-next');

  function refreshVisible(){ items = Array.from(gallery.querySelectorAll('.gallery-item')); visible = items.filter(i => i.style.display !== 'none'); }

  function openAt(index){
    refreshVisible();
    if(!visible.length) return;
    idx = (index + visible.length) % visible.length;
    const img = visible[idx].querySelector('img');
    stage.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    lb.classList.add('show');
    lb.style.visibility = 'visible';
    lb.style.opacity = '1';
    closeBtn.focus();
  }

  function close(){
    lb.classList.remove('show');
    lb.style.visibility = 'hidden';
    lb.style.opacity = '0';
    stage.innerHTML = '';
    idx = -1;
  }

  function showNext(step){
    if(idx < 0) return;
    idx = (idx + step + visible.length) % visible.length;
    const img = visible[idx].querySelector('img');
    stage.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
  }

  // Attach click handlers to items
  items.forEach((fig) => {
    fig.addEventListener('click', () => {
      refreshVisible();
      const index = visible.indexOf(fig);
      openAt(index);
    });
    fig.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fig.click(); }
    });
  });

  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', () => showNext(-1));
  nextBtn?.addEventListener('click', () => showNext(1));
  lb.addEventListener('click', (e) => { if(e.target === lb) close(); });

  document.addEventListener('keydown', (e) => {
    if(lb.classList.contains('show')){
      if(e.key === 'Escape') close();
      if(e.key === 'ArrowLeft') showNext(-1);
      if(e.key === 'ArrowRight') showNext(1);
    }
  });

  // Touch swipe
  let startX = 0;
  stage.addEventListener('touchstart', e => { startX = e.touches[0].clientX; });
  stage.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if(endX - startX > 40) showNext(-1);
    else if(startX - endX > 40) showNext(1);
  });

  // FILTER buttons (optional): if .filter buttons exist, wire them
  const filters = document.querySelectorAll('.filter');
  if(filters.length){
    filters.forEach(btn => btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(it => it.style.display = (cat === 'all' || it.dataset.category === cat) ? '' : 'none');
      refreshVisible();
    }));
  }

})();
