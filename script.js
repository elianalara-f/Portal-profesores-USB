document.addEventListener('DOMContentLoaded', () => {
  // Datos simulados de materias
  const coursesData = [
    { id: 1, name: 'Proyecto Integrador Web', room: 'Lab Fisica', day: 'Lunes', time: '08:00 - 10:00', syllabus: 'Maquetación HTML5, CSS3, Flexbox/Grid y JavaScript ES6 con despliegue en GitHub Pages.' },
    { id: 2, name: 'Diseño de Interfaz (UI)', room: 'Sala 7', day: 'Miércoles', time: '10:00 - 12:00', syllabus: 'Principios UI, Wireframing, Sistemas de diseño, Guías de Estilos y prototipado en Figma.' },
    { id: 3, name: 'Programación Web', room: 'Sala 3', day: 'Viernes', time: '14:00 - 16:00', syllabus: 'Manipulación del DOM, eventos de usuario, almacenamiento en localStorage y consumo de APIs.' }
  ];

  // autenticacion (index.html)
  const loginCard = document.getElementById('loginCard');
  const registerCard = document.getElementById('registerCard');

  if (loginCard) {
    document.getElementById('toRegister').addEventListener('click', (e) => {
      e.preventDefault();
      loginCard.classList.add('hidden');
      registerCard.classList.remove('hidden');
    });

    document.getElementById('toLogin').addEventListener('click', (e) => {
      e.preventDefault();
      registerCard.classList.add('hidden');
      loginCard.classList.remove('hidden');
    });

    document.getElementById('registerForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const user = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        faculty: document.getElementById('regFaculty').value,
        pass: document.getElementById('regPassword').value
      };
      localStorage.setItem('user_' + user.email, JSON.stringify(user));
      alert('Registro completado. Por favor inicia sesión.');
      registerCard.classList.add('hidden');
      loginCard.classList.remove('hidden');
    });

    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const pass = document.getElementById('loginPassword').value;
      const user = JSON.parse(localStorage.getItem('user_' + email));

      if (user && user.pass === pass) {
        localStorage.setItem('sessionUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
      } else {
        alert('Correo o contraseña incorrectos.');
      }
    });
  }

  // --- DASHBOARD (dashboard.html) ---
  if (window.location.pathname.includes('dashboard.html')) {
    const sessionUser = JSON.parse(localStorage.getItem('sessionUser'));
    if (!sessionUser) {
      window.location.href = 'index.html';
      return;
    }

    // Datos de Perfil
    document.getElementById('profName').textContent = sessionUser.name;
    document.getElementById('profEmail').textContent = sessionUser.email;
    document.getElementById('profFaculty').textContent = sessionUser.faculty;

    // Renderizar Tabla
    const scheduleBody = document.getElementById('scheduleBody');
    coursesData.forEach(c => {
      scheduleBody.innerHTML += `<tr><td>${c.day}</td><td>${c.time}</td><td>${c.name}</td><td>${c.room}</td></tr>`;
    });

    // Renderizar Tarjetas
    const coursesGrid = document.getElementById('coursesGrid');
    coursesData.forEach(c => {
      coursesGrid.innerHTML += `
        <div class="course-card">
          <div>
            <h4>${c.name}</h4>
            <p style="font-size: 0.85rem; color: var(--color-text-muted);">Aula: ${c.room}</p>
          </div>
          <button class="btn-orange" style="margin-top: 1rem;" onclick="showSyllabus('${c.name}', '${c.room}', '${c.syllabus}')">Ver Syllabus</button>
        </div>
      `;
    });

    // Hamburguesa
    document.getElementById('hamburgerBtn').addEventListener('click', () => {
      document.getElementById('navMenu').classList.toggle('active');
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('sessionUser');
      window.location.href = 'index.html';
    });
  }
});

// Modal Global
function showSyllabus(title, room, syllabusText) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalRoom').textContent = room;
  document.getElementById('modalSyllabusText').textContent = syllabusText;
  document.getElementById('syllabusModal').classList.remove('hidden');
}

document.getElementById('closeModal')?.addEventListener('click', () => {
  document.getElementById('syllabusModal').classList.add('hidden');
});