// js/form.js
// Form validation (client-side), localStorage draft save + mock submit

(function(){
  'use strict';
  const FORM_KEY = 'site:contact:draft';
  const form = document.getElementById('contact-form');
  if(!form) return;
  const status = document.getElementById('form-status');
  const saveBtn = document.getElementById('save-draft');
  const submitBtn = document.getElementById('submit-btn');

  // Restore draft
  try {
    const raw = localStorage.getItem(FORM_KEY);
    if(raw){
      const data = JSON.parse(raw);
      Object.entries(data).forEach(([k,v]) => {
        const el = form.querySelector(`[name="${k}"]`);
        if(el) el.value = v;
      });
      status && (status.textContent = 'Draft restored from your browser.');
    }
  } catch(e){ console.warn('restore error', e); }

  // Live validation ticks
  const validators = {
    name: v => v.trim().length >= 2,
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    message: v => v.trim().length >= 8
  };
  ['name','email','message'].forEach(name => {
    const el = form.querySelector(`[name="${name}"]`);
    if(!el) return;
    const tick = document.createElement('span'); tick.className='field-tick'; tick.style.marginLeft='8px';
    el.parentNode.appendChild(tick);
    el.addEventListener('input', () => {
      const ok = validators[name] ? validators[name](el.value) : el.value.trim().length>0;
      tick.textContent = ok ? '✓' : '';
      tick.style.color = ok ? '#7ef0c7' : '';
    });
  });

  // Save draft button
  saveBtn?.addEventListener('click', () => {
    const payload = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem(FORM_KEY, JSON.stringify(payload));
    status && (status.textContent = 'Draft saved locally.');
  });

  // Autosave lightly
  let dirty = false;
  form.addEventListener('input', () => dirty = true);
  setInterval(() => {
    if(!dirty) return;
    const payload = Object.fromEntries(new FormData(form).entries());
    localStorage.setItem(FORM_KEY, JSON.stringify(payload));
    dirty = false;
  }, 5000);

  function validate(){
    for(const field of ['name','email','message']){
      const el = form.querySelector(`[name="${field}"]`);
      if(!el) return {ok:false, msg:`Field ${field} missing`};
      if(!validators[field](el.value)) return {ok:false, msg:`Please complete ${field} correctly.`};
    }
    return {ok:true};
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status && (status.textContent = '');
    const v = validate();
    if(!v.ok){ status && (status.textContent = v.msg); status && (status.style.color = '#ff8b8b'); return; }
    submitBtn.disabled = true; submitBtn.textContent = 'Sending...';

    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      // MOCK: Replace URL with your endpoint
      await new Promise(r => setTimeout(r, 800)); // simulate
      // simulate success
      status && (status.textContent = 'Thanks — we got your message.');
      status && (status.style.color = '#7ef0c7');
      form.reset();
      localStorage.removeItem(FORM_KEY);
    } catch(err){
      console.error(err);
      status && (status.textContent = 'Network error. Saved as draft locally.');
      status && (status.style.color = '#ff8b8b');
      localStorage.setItem(FORM_KEY, JSON.stringify(payload));
    } finally {
      submitBtn.disabled = false; submitBtn.textContent = 'Send request';
    }
  });

})();
