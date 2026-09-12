// app.js
const form = document.querySelector('#add-form');
const input = document.querySelector('#task-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#task-list');
const filters = document.querySelector('.filters');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');   // 首次访问无存档时得到空数组而不是null
const save = () => localStorage.setItem('tasks', JSON.stringify(tasks));
let currentFilter = 'all'; // all / active / done

const render = () => {
  list.innerHTML = '';
  const shown = tasks.filter(t =>
    currentFilter === 'all' ? true :
    currentFilter === 'active' ? !t.done : t.done
  );
  if (shown.length === 0) {
    const li = document.createElement('li');
    li.textContent = '没有符合条件的任务';
    list.appendChild(li);
    return;
  }
  shown.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.done) li.classList.add('done');
    li.addEventListener('click', () => {
      task.done = !task.done;   // 切换状态：改的是数组里的对象
      save();
      render();
    });
    const del = document.createElement('span');
    del.textContent = '删除';
    del.className = 'del';
    del.addEventListener('click', (e) => {
      e.stopPropagation();   // 避免同时触发切换完成
      tasks.splice(tasks.indexOf(task), 1);
      save();
      render();
    });
    li.appendChild(del);
    list.appendChild(li);
  });
};

filters.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  currentFilter = e.target.dataset.filter;   // data-filter属性
  render();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === '') {
    tip.textContent = '任务名不能为空';
    return;
  }
  tasks.push({ text: text, done: false });
  save();
  tip.textContent = '';
  input.value = '';
  render();
});

render();
