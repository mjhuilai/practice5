// app.js —— 图书收藏：可增删改查并本地保存的管理应用
const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const scoreInput = document.querySelector('#book-score');
const searchInput = document.querySelector('#search-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book-list');
const submitBtn = document.querySelector('#submit-btn');

let books = [];
let editingId = null; // 当前正在编辑的图书id

const render = () => {
  list.innerHTML = '';
  const keyword = searchInput.value.trim();   // 查询：按书名或作者过滤
  const shown = books.filter(b =>
    b.title.includes(keyword) || b.author.includes(keyword)
  );
  if (shown.length === 0) {
    const li = document.createElement('li');
    li.textContent = '没有符合条件的图书';
    list.appendChild(li);
    return;
  }
  shown.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `《${book.title}》 作者：${book.author} 评分：${book.score}`;
    const editBtn = document.createElement('button');
    editBtn.textContent = '编辑';
    editBtn.className = 'btn';
    editBtn.addEventListener('click', () => startEdit(book));
    const delBtn = document.createElement('button');
    delBtn.textContent = '删除';
    delBtn.className = 'btn';
    delBtn.addEventListener('click', () => removeBook(book.id));
    li.appendChild(editBtn);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
};

const cancelEdit = () => {
  editingId = null;
  submitBtn.textContent = '添加';
  form.reset();
};

const removeBook = (id) => {
  books = books.filter(b => b.id !== id);
  if (editingId === id) cancelEdit();
  render();
};

const startEdit = (book) => {
  editingId = book.id;
  titleInput.value = book.title;
  authorInput.value = book.author;
  scoreInput.value = book.score;
  submitBtn.textContent = '保存修改';
  tip.textContent = '';
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (title === '') {
    tip.textContent = '书名不能为空';
    return;
  }
  if (editingId !== null) {
    const book = books.find(b => b.id === editingId);
    book.title = title;
    book.author = authorInput.value.trim();
    book.score = scoreInput.value;
    cancelEdit();
  } else {
    books.push({
      id: Date.now(),
      title: title,
      author: authorInput.value.trim(),
      score: scoreInput.value
    });
  }
  tip.textContent = '';
  form.reset();
  render();
});

searchInput.addEventListener('input', render);

render();
