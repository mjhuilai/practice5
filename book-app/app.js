// app.js —— 图书收藏：可增删改查并本地保存的管理应用
const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#book-title');
const authorInput = document.querySelector('#book-author');
const scoreInput = document.querySelector('#book-score');
const tip = document.querySelector('#tip');
const list = document.querySelector('#book-list');

let books = [];

const render = () => {
  list.innerHTML = '';
  if (books.length === 0) {
    const li = document.createElement('li');
    li.textContent = '暂无图书';
    list.appendChild(li);
    return;
  }
  books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `《${book.title}》 作者：${book.author} 评分：${book.score}`;
    list.appendChild(li);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (title === '') {
    tip.textContent = '书名不能为空';
    return;
  }
  books.push({
    title: title,
    author: authorInput.value.trim(),
    score: scoreInput.value
  });
  tip.textContent = '';
  form.reset();
  render();
});

render();
