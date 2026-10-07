// Before/after compare slider
document.querySelectorAll('.compare').forEach(function(c){
  var range = c.querySelector('input[type=range]');
  var clip = c.querySelector('.after-clip');
  var handle = c.querySelector('.handle');
  if(!range) return;
  function update(){
    var v = range.value;
    clip.style.width = v + '%';
    handle.style.left = v + '%';
  }
  range.value = 55;
  range.addEventListener('input', update);
  update();
});

// Tabs
document.querySelectorAll('.tabs').forEach(function(tabgroup){
  var tabs = tabgroup.querySelectorAll('.tab');
  tabs.forEach(function(t){
    t.addEventListener('click', function(){
      tabs.forEach(function(x){x.classList.remove('active')});
      t.classList.add('active');
      var target = t.getAttribute('data-target');
      if(!target) return;
      var panels = document.querySelectorAll('[data-panel]');
      panels.forEach(function(p){ p.style.display = (p.getAttribute('data-panel')===target) ? '' : 'none'; });
    });
  });
});

// Mission type card select
document.querySelectorAll('.type-card').forEach(function(card){
  card.addEventListener('click', function(){
    var group = card.closest('.grid');
    group.querySelectorAll('.type-card').forEach(function(c){c.classList.remove('selected')});
    card.classList.add('selected');
  });
});

/* ---------- Shared modal / popup engine ---------- */
function ensureModalRoot(){
  if(document.getElementById('modalRoot')) return;
  var d = document.createElement('div');
  d.id = 'modalRoot'; d.className = 'modal-overlay';
  d.innerHTML = '<div class="modal-box" id="modalBox"></div>';
  d.addEventListener('click', function(e){ if(e.target === d) closeModal(); });
  document.body.appendChild(d);
  var t = document.createElement('div');
  t.id = 'toastBox'; t.className = 'toast';
  document.body.appendChild(t);
}
function openModal(html, wide){
  ensureModalRoot();
  var box = document.getElementById('modalBox');
  box.className = 'modal-box' + (wide ? ' wide' : '');
  box.innerHTML = '<button class="modal-close" onclick="closeModal()">✕</button>' + html;
  document.getElementById('modalRoot').classList.add('show');
}
function closeModal(){
  var r = document.getElementById('modalRoot');
  if(r) r.classList.remove('show');
}
function showToast(msg){
  ensureModalRoot();
  var t = document.getElementById('toastBox');
  t.textContent = msg; t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 2600);
}
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });
// Tabs inside a modal (independent of the page-level .tabs system)
function modalTab(btn, key){
  var box = btn.closest('.modal-box');
  box.querySelectorAll('.mtab').forEach(function(b){ b.classList.remove('active'); });
  btn.classList.add('active');
  box.querySelectorAll('.mpanel').forEach(function(p){ p.style.display = (p.getAttribute('data-mpanel') === key) ? '' : 'none'; });
}
