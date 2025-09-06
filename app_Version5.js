// FRASES INSPIRADORAS RANDOM
const frases = [
  "Lo imposible simplemente tarda un poco más.",
  "Si puedes soñarlo, puedes programarlo.",
  "La diversidad impulsa la innovación.",
  "Cada persona es un pilar del cambio.",
  "Un hub, infinitas posibilidades.",
  "La tecnología es nuestro superpoder.",
  "¡Hoy puede ser el día que cambie todo!",
  "La creatividad es contagiosa, pásala.",
  "¿Y si el siguiente mensaje es el mejor?",
  "No hay límites, solo nuevos comienzos.",
  "El caos es solo otra forma de arte.",
  "No eres un usuario, eres protagonista."
];
function setFraseGenial() {
  const idx = Math.floor(Math.random() * frases.length);
  document.getElementById('frase-genial').textContent = frases[idx];
}
setFraseGenial();
setInterval(setFraseGenial, 9000);

// MODO OSCURO
document.getElementById('darkToggle').onclick = function() {
  document.body.classList.toggle('dark-mode');
  this.textContent = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
};

// TAB NAVIGACIÓN
document.querySelectorAll('.navlink').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelectorAll('.navlink').forEach(l=>l.classList.remove('active'));
    link.classList.add('active');
    document.querySelectorAll('.section').forEach(s=>s.classList.remove('active-section'));
    let tab = link.dataset.tab;
    if(tab) document.getElementById('tab-'+tab).classList.add('active-section');
    window.scrollTo(0,0);
    document.querySelectorAll('.com-detail').forEach(function(el){el.style.display='none';});
    if(link.id === "randomBtn") randomSorpresa();
  });
});

// RANDOM (sección sorpresa)
function randomSorpresa() {
  const secciones = ["home","labores","team","plans","contact","proyectos","chat"];
  const idx = Math.floor(Math.random() * secciones.length);
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active-section'));
  document.getElementById('tab-' + secciones[idx]).classList.add('active-section');
  notiPop("¡Te ha tocado la sección: " + secciones[idx.toUpperCase()] + "!");
  if(secciones[idx]==="chat" || Math.random() > 0.97) showEasterEgg();
}

// NOTIFICACIONES
function notiPop(msg) {
  const pop = document.getElementById('notiPop');
  pop.textContent = msg;
  pop.style.display = 'block';
  setTimeout(()=>{pop.style.display='none';}, 2500);
}

// EASTER EGG
function showEasterEgg() {
  const egg = document.getElementById('easterEgg');
  egg.innerHTML = "<b>¡Has encontrado un Easter Egg!</b><br>🎉<br>¿Sabías que TIH es 100% inclusivo?<br><span style='font-size:1.3em;'>🤯</span>";
  egg.style.display = 'block';
  setTimeout(()=>{ egg.style.display='none'; }, 3300);
  document.getElementById('stat-easter').textContent = "🎉";
}

// PILARES y COMUNIDADES (si usas el bloque original)
document.querySelectorAll('.tab-btn.tabpilar').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab-btn.tabpilar').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tabpilarsec').forEach(s=>s.style.display='none');
    document.getElementById(btn.dataset.pilartab).style.display = "";
    document.querySelectorAll('.com-detail').forEach(el=>el.style.display='none');
  });
});
document.querySelectorAll('.p-card[data-pillardet]').forEach(card => {
  card.onclick = function(){
    document.querySelectorAll('.card-details').forEach(d=>d.style.display='none');
    document.getElementById('detail-' + card.dataset.pillardet).style.display='block';
    window.scrollTo({top: card.offsetTop+210,behavior:"smooth"});
  };
});
document.getElementById('btn-nueva-ficha').onclick = function(){
  document.getElementById('ficha-nueva').style.display='block';
  window.scrollTo({top:document.getElementById('ficha-nueva').offsetTop-80,behavior:'smooth'});
};
document.getElementById('buscador').onkeyup = function() { buscarFichas(); };

// ----------- GESTIÓN DE COLABORADORES (LocalStorage) --------------
function cargarFichasIniciales() {
  let fichas = [
    {
      nombre: "Ana Torres",
      email: "ana@tih.social",
      desc: "Mentora y Gaming inclusivo",
      links: "https://linkedin.com/in/anatorres",
      tarifa: "30€/h"
    },
    {
      nombre: "Lucas Pérez",
      email: "lucas@tih.social",
      desc: "CTO, Open Source",
      links: "https://twitter.com/lucasperez",
      tarifa: "40€/h"
    }
  ];
  if (!localStorage.getItem('fichas')) {
    localStorage.setItem('fichas', JSON.stringify(fichas));
  }
}
function mostrarFichas() {
  const cont = document.getElementById('team-personas');
  cont.innerHTML = '';
  let fichas = JSON.parse(localStorage.getItem('fichas') || "[]");
  fichas.forEach(f => {
    const div = document.createElement('div');
    div.className = "team-card bg-green";
    div.setAttribute('data-busq', `${f.nombre} ${f.email} ${f.desc} ${f.links}`);
    div.style.animation = "fadein 0.9s";
    div.innerHTML = `
      <img src="https://i.imgur.com/YOyQ6uR.png">
      <div><b>${f.nombre}</b></div>
      <div>${f.desc}</div>
      <div>Tarifa: ${f.tarifa ? f.tarifa : ''}</div>
      <div class="socials-row">
        <a href="mailto:${f.email}">Email</a>
        ${f.links ? `<a href="${f.links}" target="_blank">Portfolio</a>` : ""}
        <button class="btn btn-soft" onclick="notiPop('¡Has saludado a ${f.nombre}!')">👋 Saludar</button>
      </div>
    `;
    cont.appendChild(div);
  });
  document.getElementById('stat-personas').textContent = fichas.length;
}
function buscarFichas() {
  var txt = document.getElementById('buscador').value.toLowerCase();
  document.querySelectorAll('#team-personas .team-card').forEach(function(card){
    card.style.display = card.getAttribute('data-busq').toLowerCase().includes(txt) ? '' : 'none';
  });
}
document.getElementById('ficha-nueva').onsubmit=function(e){
  e.preventDefault();
  const nombre = this['ficha-nombre'].value;
  const email = this['ficha-email'].value;
  const desc = this['ficha-desc'].value;
  const links = this['ficha-links'].value;
  const tarifa = this['ficha-tarifa'].value;
  let fichas = JSON.parse(localStorage.getItem('fichas') || "[]");
  fichas.push({nombre,email,desc,links,tarifa});
  localStorage.setItem('fichas', JSON.stringify(fichas));
  notiPop("¡Registro recibido! Pronto publicamos tu ficha.");
  this.reset();
  this.style.display='none';
  mostrarFichas();
  buscarFichas();
};

// --------- PROYECTOS ---------
function cargarProyectosIniciales() {
  let proyectos = [
    {
      nombre: "Inclusión Digital",
      desc: "Plataforma para reducir la brecha digital.",
      link: "https://inclusion.tih.social"
    },
    {
      nombre: "Liga eSports Diversa",
      desc: "Competencias y mentoring inclusivos.",
      link: ""
    }
  ];
  if (!localStorage.getItem('proyectos')) {
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
  }
}
function mostrarProyectos() {
  const cont = document.getElementById('proyectos-row');
  cont.innerHTML = '';
  let proyectos = JSON.parse(localStorage.getItem('proyectos') || "[]");
  proyectos.forEach(p => {
    const div = document.createElement('div');
    div.className = "p-card bg-blue border-blue";
    div.innerHTML = `
      <div class="p-card-title">${p.nombre}</div>
      <div>${p.desc}</div>
      ${p.link ? `<a href="${p.link}" class="btn btn-soft" target="_blank">Ver +</a>` : ""}
    `;
    cont.appendChild(div);
  });
  document.getElementById('stat-proyectos').textContent = proyectos.length;
}
document.getElementById('proyecto-nuevo').onsubmit = function(e){
  e.preventDefault();
  const nombre = this['proy-nombre'].value;
  const desc = this['proy-desc'].value;
  const link = this['proy-link'].value;
  let proyectos = JSON.parse(localStorage.getItem('proyectos') || "[]");
  proyectos.push({nombre,desc,link});
  localStorage.setItem('proyectos', JSON.stringify(proyectos));
  notiPop("¡Proyecto propuesto! Será revisado y publicado.");
  this.reset();
  mostrarProyectos();
};

// --------- CHAT COMUNITARIO LOCAL ---------
function cargarChat() {
  if (!localStorage.getItem('chatMsgs')) localStorage.setItem('chatMsgs','[]');
  mostrarChat();
}
function mostrarChat() {
  let msgs = JSON.parse(localStorage.getItem('chatMsgs') || "[]");
  const wall = document.getElementById('chat-wall');
  wall.innerHTML = '';
  msgs.slice(-25).forEach(m=>{
    const div = document.createElement('div');
    div.className = 'chat-msg-block';
    div.innerHTML = `<span class='chat-msg-nombre'>${m.nombre}:</span> ${m.msg}`;
    wall.appendChild(div);
  });
  document.getElementById('stat-mensajes').textContent = msgs.length;
}
document.getElementById('chat-form').onsubmit = function(e){
  e.preventDefault();
  const nombre = this['chat-nombre'].value;
  const msg = this['chat-msg'].value;
  let msgs = JSON.parse(localStorage.getItem('chatMsgs') || "[]");
  msgs.push({nombre,msg});
  localStorage.setItem('chatMsgs', JSON.stringify(msgs));
  mostrarChat();
  notiPop("¡Mensaje enviado al muro!");
  this.reset();
};

// Formulario de contacto (solo alert por ahora)
function contactarPersona(e) {
  e.preventDefault();
  notiPop('Mensaje enviado con éxito.');
  e.target.reset();
  return false;
}

// -------- INICIO ---------
cargarFichasIniciales();
mostrarFichas();
cargarProyectosIniciales();
mostrarProyectos();
cargarChat();