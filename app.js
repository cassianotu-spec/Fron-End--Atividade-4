const app = document.getElementById('app');

function navigate(page) {
  switch (page) {
    case 'home':
      renderHome();
      break;
    case 'add':
      renderAddForm();
      break;
    case 'list':
      renderList();
      break;
  }
}

function renderHome() {
  app.innerHTML = `<h1>Bem-vindo à To-Do SPA</h1><p>Use o menu acima para navegar.</p>`;
}

function renderAddForm() {
  app.innerHTML = `
    <h2>Adicionar Tarefa</h2>
    <form id="taskForm">
      <input type="text" id="title" placeholder="Título da tarefa" aria-label="Título da tarefa" />
      <textarea id="desc" placeholder="Descrição" aria-label="Descrição da tarefa"></textarea>
      <input type="date" id="date" aria-label="Data da tarefa" />
      <button type="submit">Salvar</button>
      <div id="formError" class="error"></div>
    </form>
  `;

  document.getElementById('taskForm').addEventListener('submit', validateForm);
}

function validateForm(e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const desc = document.getElementById('desc').value.trim();
  const date = document.getElementById('date').value;
  const errorDiv = document.getElementById('formError');

  if (!title || !desc || !date) {
    errorDiv.textContent = 'Todos os campos são obrigatórios.';
    return;
  }

  const task = { title, desc, date };
  saveTask(task);
  navigate('list');
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderList() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  if (tasks.length === 0) {
    app.innerHTML = `<h2>Lista de Tarefas</h2><p>Nenhuma tarefa cadastrada.</p>`;
    return;
  }

  const template = task => `
    <div class="task" tabindex="0">
      <h3>${task.title}</h3>
      <p>${task.desc}</p>
      <small>Prazo: ${task.date}</small>
    </div>
  `;

  app.innerHTML = `<h2>Lista de Tarefas</h2>` + tasks.map(template).join('');
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

navigate('home');