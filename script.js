
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
