// js/main.js
// Navbar, mobile menu, shrink-on-scroll, reveal on scroll, typing (fixed), skill bar animate

(function(){
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  // set footer years if present
  $$('[id^="year-"], #year-home, #year-about, #year-services, #year-gallery, #year-contact').forEach(el => el.textContent = new Date().getFullYear());

  // MOBILE NAV
  $$('button.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const nav = document.querySelector('.primary-nav');
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if(open) nav.querySelector('a')?.focus();
    });
  });

  // Also support the single "menu-toggle" id used on some pages
  const mbtn = document.getElementById('menu-toggle');
  const navlinks = document.getElementById('nav-links');
  if(mbtn && navlinks){
    mbtn.addEventListener('click', ()=> navlinks.classList.toggle('show'));
  }

  // SHRINK HEADER ON SCROLL
  const header = document.querySelector('.site-header');
  if(header){
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if(y > 60) header.classList.add('shrink'); else header.classList.remove('shrink');
    }, {passive:true});
  }

  // REVEAL ON SCROLL
  const reveals = document.querySelectorAll('.reveal');
  if(reveals.length){
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if(e.isIntersecting){ e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    }, {threshold:0.12});
    reveals.forEach(r => io.observe(r));
  }

  // TYPING (non-layout-shifting)
  // Elements with structure:
  // <div class="typing-wrap"><div class="typed"><span class="text"></span><span class="cursor">|</span></div></div>
  document.querySelectorAll('.typed').forEach(el => {
    const textEl = el.querySelector('.text');
    const strings = (el.dataset.strings) ? JSON.parse(el.dataset.strings) : [];
    if(!strings.length) return;
    let i = 0, ch = 0, forward = true;
    const delay = 40, pause = 950;
    function step(){
      const s = strings[i];
      if(forward){
        ch++;
        textEl.textContent = s.slice(0,ch);
        if(ch === s.length){ forward = false; setTimeout(step, pause); }
        else setTimeout(step, delay);
      } else {
        ch--;
        textEl.textContent = s.slice(0,ch);
        if(ch === 0){ forward = true; i = (i+1)%strings.length; setTimeout(step, 220); }
        else setTimeout(step, 24);
      }
    }
    step();
  });

  // SKILL BARS animate when visible
  const skillBars = document.querySelectorAll('.skill .bar > i');
  if(skillBars.length){
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if(e.isIntersecting){
          const bar = e.target;
          bar.style.width = bar.dataset.pct || '75%';
          obs.unobserve(bar);
        }
      });
    }, {threshold:0.2});
    skillBars.forEach(b => io.observe(b));
  }

})();
