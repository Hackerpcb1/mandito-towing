// ===== TABLE DATA =====
const sampleData = [
  {id:'MT-001',client:'José Hernández',phone:'787-555-0101',vehicle:'Toyota Corolla 2019',plate:'ABC-123',problem:'Batería muerta',status:'Completado',unit:'Mandito-01',location:'San Juan, PR',date:'2024-03-15'},
  {id:'MT-002',client:'María López',phone:'787-555-0202',vehicle:'Honda Civic 2021',plate:'XYZ-456',problem:'Goma pinchada',status:'En camino',unit:'Mandito-03',location:'Bayamón, PR',date:'2024-03-15'},
  {id:'MT-003',client:'Carlos Reyes',phone:'787-555-0303',vehicle:'Ford F-150 2020',plate:'DEF-789',problem:'Vehículo averiado',status:'Asignado',unit:'Mandito-02',location:'Caguas, PR',date:'2024-03-15'},
  {id:'MT-004',client:'Ana Martínez',phone:'787-555-0404',vehicle:'Jeep Cherokee 2018',plate:'GHI-321',problem:'Llaves dentro',status:'Completado',unit:'Mandito-04',location:'Ponce, PR',date:'2024-03-14'},
  {id:'MT-005',client:'Pedro Santos',phone:'787-555-0505',vehicle:'Nissan Altima 2022',plate:'JKL-654',problem:'Sin gasolina',status:'Pendiente',unit:'—',location:'Carolina, PR',date:'2024-03-15'},
  {id:'MT-006',client:'Laura García',phone:'787-555-0606',vehicle:'Hyundai Elantra 2020',plate:'MNO-987',problem:'Choque',status:'En camino',unit:'Mandito-05',location:'Mayagüez, PR',date:'2024-03-15'},
  {id:'MT-007',client:'Roberto Cruz',phone:'787-555-0707',vehicle:'Kia Sportage 2021',plate:'PQR-147',problem:'Auto no enciende',status:'Completado',unit:'Mandito-01',location:'Arecibo, PR',date:'2024-03-14'},
];

const statusColors = {
  'Completado':'tag-green','En camino':'tag-yellow','Asignado':'tag-blue','Pendiente':'tag-red'
};

function renderTable(data, tbodyId){
  const tbody = document.getElementById(tbodyId);
  tbody.innerHTML = data.map(r => `
    <tr>
      <td style="color:var(--yellow);font-weight:600">${r.id}</td>
      <td>${r.client}</td>
      <td>${r.vehicle}</td>
      <td style="font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:0.05em">${r.plate}</td>
      <td>${r.problem}</td>
      <td>${r.location}</td>
      <td><span class="tag ${statusColors[r.status]||'tag-blue'}">${r.status}</span></td>
      <td style="color:var(--gray)">${r.unit}</td>
      <td style="display:flex;gap:6px">
        <button class="action-btn" onclick="viewCase('${r.id}')">Ver</button>
        <button class="action-btn" onclick="editCase('${r.id}')">Editar</button>
        <button class="action-btn del" onclick="deleteCase('${r.id}',this)">✕</button>
      </td>
    </tr>
  `).join('');
}

function renderAdminTable(data){
  const tbody = document.getElementById('adminTableBody');
  tbody.innerHTML = data.map(r => `
    <tr>
      <td style="color:var(--yellow);font-weight:600;white-space:nowrap">${r.id}</td>
      <td>${r.client}</td>
      <td style="color:var(--gray)">${r.phone}</td>
      <td>${r.vehicle}<br><span style="font-size:12px;color:var(--gray)">🪪 ${r.plate}</span></td>
      <td>${r.problem}</td>
      <td><span class="tag ${statusColors[r.status]||'tag-blue'}">${r.status}</span></td>
      <td style="color:var(--gray)">${r.unit}</td>
      <td style="color:var(--gray);font-size:13px;white-space:nowrap">${r.date}</td>
      <td style="display:flex;gap:6px;flex-wrap:wrap">
        <button class="action-btn" onclick="updateStatus('${r.id}')">Estado</button>
        <button class="action-btn" onclick="assignUnit('${r.id}')">Asignar</button>
        <button class="action-btn del" onclick="deleteCase('${r.id}',this)">✕</button>
      </td>
    </tr>
  `).join('');
}

renderTable(sampleData, 'tableBody');
renderAdminTable(sampleData);

function filterTable(){
  const q = document.getElementById('tableSearch').value.toLowerCase();
  const s = document.getElementById('statusFilter').value;
  const filtered = sampleData.filter(r =>
    (!q || r.client.toLowerCase().includes(q) || r.plate.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)) &&
    (!s || r.status === s)
  );
  renderTable(filtered, 'tableBody');
}

function filterAdminTable(){
  const q = document.getElementById('adminSearch').value.toLowerCase();
  const filtered = sampleData.filter(r =>
    !q || r.client.toLowerCase().includes(q) || r.plate.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
  );
  renderAdminTable(filtered);
}

// ===== VEHICLE SEARCH =====
const vehicleDB = [
  {plate:'ABC-123',vehicle:'Toyota Corolla 2019',owner:'José Hernández',status:'Entregado',location:'San Juan – Taller ABC',date:'15/03/2024',obs:'Vehículo entregado al cliente'},
  {plate:'XYZ-456',vehicle:'Honda Civic 2021',owner:'María López',status:'En proceso',location:'PR-22 km 14 → San Juan',date:'15/03/2024',obs:'Grúa en camino'},
  {plate:'DEF-789',vehicle:'Ford F-150 2020',owner:'Carlos Reyes',status:'Localizado',location:'Caguas – Km 5',date:'15/03/2024',obs:'Vehículo localizado, grúa asignada'},
  {plate:'GHI-321',vehicle:'Jeep Cherokee 2018',owner:'Ana Martínez',status:'Entregado',location:'Ponce – Taller Express',date:'14/03/2024',obs:'Entregado sin novedad'},
];

const vstatus = {'Entregado':'tag-green','En proceso':'tag-yellow','Localizado':'tag-blue','Remolcado':'tag-red'};

function searchVehicle(){
  const q1 = document.getElementById('vSearch1').value.toLowerCase();
  const q2 = document.getElementById('vSearch2').value.toLowerCase();
  const q3 = document.getElementById('vSearch3').value.toLowerCase();
  const q4 = document.getElementById('vSearch4').value.toLowerCase();
  const q = q1 || q2 || q3 || q4;
  const results = vehicleDB.filter(v =>
    v.plate.toLowerCase().includes(q) ||
    v.vehicle.toLowerCase().includes(q) ||
    v.owner.toLowerCase().includes(q)
  );
  const el = document.getElementById('vehicleResults');
  if(!q){el.innerHTML='';return;}
  if(!results.length){
    el.innerHTML=`<div style="text-align:center;padding:40px;color:var(--gray)">
      <div style="font-size:40px;margin-bottom:12px">🔍</div>
      <div style="font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:700">Sin resultados</div>
      <div style="margin-top:8px">No encontramos vehículos con esa búsqueda. Llama al 787-218-2648.</div>
    </div>`;
    return;
  }
  el.innerHTML = results.map(v=>`
    <div class="vehicle-card">
      <div class="vehicle-info">
        <div class="vehicle-icon">🚗</div>
        <div>
          <div class="vehicle-name">${v.vehicle}</div>
          <div class="vehicle-plate">🪪 ${v.plate} · ${v.owner}</div>
        </div>
      </div>
      <div class="vehicle-details">
        <div class="vehicle-detail"><strong>📍 ${v.location}</strong>Ubicación actual</div>
        <div class="vehicle-detail"><strong>📅 ${v.date}</strong>Fecha servicio</div>
        <div class="vehicle-detail"><strong>${v.obs}</strong>Observaciones</div>
      </div>
      <span class="tag ${vstatus[v.status]||'tag-blue'}" style="font-size:13px;padding:6px 14px">${v.status}</span>
    </div>
  `).join('');
}

// Enter key search
['vSearch1','vSearch2','vSearch3','vSearch4'].forEach(id=>{
  document.getElementById(id).addEventListener('keydown',e=>{ if(e.key==='Enter') searchVehicle(); });
});

// ===== TRACKING =====
function trackService(){
  const val = document.getElementById('trackInput').value.trim();
  if(!val){alert('Ingresa un número de caso o tablilla');return;}
  document.getElementById('trackResult').style.display='block';
  let t = 12;
  const etaEl = document.getElementById('etaTime');
  const interval = setInterval(()=>{
    t = Math.max(1,t-1);
    etaEl.textContent = t;
    if(t<=1) clearInterval(interval);
  },3000);
}

// ===== FORM =====
function submitForm(e){
  e.preventDefault();
  const caseId = 'MT-' + String(Math.floor(Math.random()*9000)+1000);
  document.getElementById('caseNum').textContent = caseId;
  document.getElementById('successMsg').style.display='block';
  document.getElementById('serviceForm').reset();
  document.getElementById('successMsg').scrollIntoView({behavior:'smooth',block:'center'});
  sampleData.unshift({
    id:caseId,client:'Nuevo Cliente',phone:'---',vehicle:'---',plate:'---',
    problem:'Solicitud web',status:'Pendiente',unit:'—',location:'Pendiente',date:new Date().toLocaleDateString('es-PR')
  });
  renderTable(sampleData,'tableBody');
  renderAdminTable(sampleData);
}

function submitQuickForm(e){
  e.preventDefault();
  e.target.reset();
  document.getElementById('quickFormSuccess').style.display='block';
  setTimeout(()=>document.getElementById('quickFormSuccess').style.display='none',5000);
}

// ===== ADMIN =====
function toggleAdmin(){
  const el = document.getElementById('admin');
  el.style.display = el.style.display==='none'||el.style.display==='' ? 'block' : 'none';
  if(el.style.display==='block') el.scrollIntoView({behavior:'smooth'});
}
function switchTab(btn, filter){
  document.querySelectorAll('.admin-tab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if(filter==='all') renderAdminTable(sampleData);
  else if(filter==='pending') renderAdminTable(sampleData.filter(r=>r.status==='Pendiente'));
  else if(filter==='active') renderAdminTable(sampleData.filter(r=>r.status==='En camino'||r.status==='Asignado'));
  else if(filter==='done') renderAdminTable(sampleData.filter(r=>r.status==='Completado'));
  else renderAdminTable(sampleData);
}
function viewCase(id){ alert(`📋 Caso ${id}\n\nVer detalles completos del servicio.\nLlama al 787-218-2648 para info adicional.`); }
function editCase(id){ alert(`✏️ Editar caso ${id}\n\nFuncionalidad disponible en versión completa con backend.`); }
function deleteCase(id, btn){ if(confirm(`¿Eliminar el caso ${id}?`)) btn.closest('tr').style.opacity='0.3'; }
function addNewService(){ alert('➕ Agregar nuevo servicio\n\nFuncionalidad disponible con integración de base de datos.'); }
function exportData(){ alert('📥 Exportar datos\n\nFuncionalidad disponible con integración backend.'); }
function updateStatus(id){ 
  const s = prompt(`Actualizar estado del caso ${id}:\n1. Pendiente\n2. Asignado\n3. En camino\n4. Completado\n\nEscribe el nuevo estado:`);
  if(s) alert(`✅ Estado actualizado a: ${s}`);
}
function assignUnit(id){
  const u = prompt(`Asignar unidad al caso ${id}:\nUnidades disponibles: Mandito-01, Mandito-02, Mandito-03, Mandito-04\n\nEscribe la unidad:`);
  if(u) alert(`✅ Unidad ${u} asignada al caso ${id}`);
}

// ===== MOBILE MENU =====
function toggleMenu(){
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  menu.classList.toggle('open');
  hamburger.classList.toggle('active');
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
    document.getElementById('hamburger').classList.remove('active');
  });
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:0.1});
document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));

// ===== LIVE COUNTER ANIMATION =====
function animateCounter(el, target){
  let current = 0;
  const step = target / 60;
  const timer = setInterval(()=>{
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if(current >= target) clearInterval(timer);
  }, 30);
}

// ===== STICKY NAV HIGHLIGHT =====
window.addEventListener('scroll',()=>{
  const nav = document.getElementById('nav');
  nav.style.background = window.scrollY > 50 ? 'rgba(10,10,11,0.98)' : 'rgba(10,10,11,0.92)';
});

// Init
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));
});
