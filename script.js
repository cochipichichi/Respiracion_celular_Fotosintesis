
const $ = (s, x=document)=>x.querySelector(s);
let theme = localStorage.getItem('theme')||'dark';
function applyTheme(){document.documentElement.style.setProperty('--bg', theme==='light'?'#f7fafc':'#0b1220');document.documentElement.style.setProperty('--fg', theme==='light'?'#0b1220':'#e6eefc');}
applyTheme();
$('#btn-theme')?.addEventListener('click',()=>{theme=(theme==='dark'?'light':'dark');localStorage.setItem('theme',theme);applyTheme();});
let baseSize = Number(localStorage.getItem('font')||16);
function setSize(){document.documentElement.style.fontSize=baseSize+'px'}
setSize();
$('#btn-plus')?.addEventListener('click',()=>{baseSize=Math.min(baseSize+1,22);localStorage.setItem('font',baseSize);setSize()});
$('#btn-minus')?.addEventListener('click',()=>{baseSize=Math.max(baseSize-1,12);localStorage.setItem('font',baseSize);setSize()});
$('#btn-tts')?.addEventListener('click',()=>{const sel=String(window.getSelection());const t=sel||document.querySelector('#hero')?.innerText||'Biología 1° Medio OA7';if('speechSynthesis'in window){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='es-CL';speechSynthesis.speak(u);}else alert('Narrador no disponible');});
function toCSV(rows){return rows.map(r=>r.map(x=>`"${String(x).replaceAll('"','""')}"`).join(',')).join('\n')}
window.downloadCSV=(name, rows)=>{const blob=new Blob([toCSV(rows)],{type:'text/csv;charset=utf-8;'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);}
window.gradeQuiz=()=>{const f=document.querySelector('form.quiz');const data=new FormData(f);let ok=0,total=0;document.querySelectorAll('[data-correct]').forEach(x=>{total++;const key=x.getAttribute('name');const correct=x.dataset.correct;const val=data.get(key);if(val===correct) ok++;});const pct=Math.round(ok*100/total);document.querySelector('#quizResult').textContent=`✅ ${ok}/{total} ({pct}%)`.replace('{total}',total).replace('{pct}',pct);};
if('serviceWorker' in navigator){navigator.serviceWorker.register('./sw.js');}


function openDocenteAccess() {
  const email = prompt("Ingresa tu correo institucional o registrado:");
  if (!email) return;
  const pass = prompt("Ingresa la clave de acceso:");
  if (!pass) return;
  const allowed = ["franciscoandresp@gmail.com", "belen.acpe@gmail.com", "cochipichichi@gmail.com", "neotechedulab@gmail.com", "franciscopinto@liceosannicolas.cl", "belenacuna@liceosannicolas.cl"];
  const okMail = allowed.includes(email.trim());
  const okPass = pass.trim() === "NeoTechEduLAb";
  if (okMail && okPass) {
    const box = document.getElementById("docente-links");
    if (box) box.classList.remove("hidden");
    alert("Acceso concedido ✅");
  } else {
    alert("Acceso denegado. Contacta a coordinación PEVE.");
  }
}


const DOCENTE_ALLOWED = ["franciscoandresp@gmail.com", "belen.acpe@gmail.com", "cochipichichi@gmail.com", "neotechedulab@gmail.com", "franciscopinto@liceosannicolas.cl", "belenacuna@liceosannicolas.cl"];
const DOCENTE_PASS = "NeoTechEduLAb";

function openDocenteAccess() {
  const modal = document.getElementById("docente-modal");
  if (modal) modal.classList.remove("hidden");
  const emailInput = document.getElementById("docente-email");
  if (emailInput) emailInput.focus();
}

function closeDocenteModal() {
  const modal = document.getElementById("docente-modal");
  if (modal) modal.classList.add("hidden");
}

function submitDocenteAccess(e) {
  e.preventDefault();
  const email = document.getElementById("docente-email").value.trim();
  const pass = document.getElementById("docente-pass").value.trim();
  const okMail = DOCENTE_ALLOWED.includes(email);
  const okPass = pass === DOCENTE_PASS;
  if (okMail && okPass) {
    const links = document.getElementById("docente-links");
    if (links) links.classList.remove("hidden");
    closeDocenteModal();
    alert("Acceso concedido ✅");
  } else {
    alert("Acceso denegado. Verifica correo y clave.");
  }
}


// dynamic version load
fetch('./version.json')
  .then(r => r.json())
  .then(data => {
    const span = document.getElementById('modal-version');
    if (span && data.version && data.year) {
      span.textContent = data.version + ' — ' + data.year;
    }
  })
  .catch(() => {});


function unlockDocenteLinksUI() {
  const prot = document.querySelectorAll('.protected-link');
  prot.forEach(el => {
    el.classList.remove('disabled-link');
    el.classList.remove('hidden-protected');
  });
}


const DOCENTE_ALLOWED = ["franciscoandresp@gmail.com", "belen.acpe@gmail.com", "cochipichichi@gmail.com", "neotechedulab@gmail.com", "franciscopinto@liceosannicolas.cl", "belenacuna@liceosannicolas.cl"];
const DOCENTE_PASS = "NeoTechEduLAb";

function openDocenteAccess() {
  const modal = document.getElementById("docente-modal");
  if (modal) modal.classList.remove("hidden");
  const emailInput = document.getElementById("docente-email");
  if (emailInput) emailInput.focus();
}

function closeDocenteModal() {
  const modal = document.getElementById("docente-modal");
  if (modal) modal.classList.add("hidden");
}

function unlockDocenteLinksUI() {
  const prot = document.querySelectorAll('.protected-link');
  prot.forEach(el => {
    el.classList.remove('hidden-protected');
  });
  const box = document.getElementById('docente-links');
  if (box) box.classList.remove('hidden');
}

function submitDocenteAccess(e) {
  e.preventDefault();
  const email = document.getElementById("docente-email").value.trim();
  const pass = document.getElementById("docente-pass").value.trim();
  const okMail = DOCENTE_ALLOWED.includes(email);
  const okPass = pass === DOCENTE_PASS;
  if (okMail && okPass) {
    unlockDocenteLinksUI();
    closeDocenteModal();
    alert("Acceso concedido ✅");
  } else {
    alert("Acceso denegado. Verifica correo y clave.");
  }
}

// dynamic version load
fetch('./version.json')
  .then(r => r.json())
  .then(data => {
    const span = document.getElementById('modal-version');
    if (span && data.version && data.year) {
      span.textContent = data.version + ' — ' + data.year;
    }
  })
  .catch(() => {});
