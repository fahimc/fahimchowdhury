const isWritingPage = /blog\.html|article-/.test(window.location.pathname);
if (isWritingPage) document.body.classList.add('light-page');

const savedTheme = localStorage.getItem('fahim-theme');
const defaultTheme = document.body.classList.contains('light-page') ? 'light' : 'dark';
document.body.dataset.theme = savedTheme || defaultTheme;

const header = document.querySelector('.site-header');
const headerButton = header?.querySelector('.button');
if (header && headerButton) {
  const toggle = document.createElement('button');
  toggle.className = 'theme-toggle';
  toggle.type = 'button';
  toggle.innerHTML = '<span class="theme-icon" aria-hidden="true"></span><span class="theme-label"></span>';
  header.insertBefore(toggle, headerButton);

  const updateThemeToggle = () => {
    const isLight = document.body.dataset.theme === 'light';
    toggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    toggle.querySelector('.theme-icon').textContent = isLight ? '☾' : '☼';
    toggle.querySelector('.theme-label').textContent = isLight ? 'Dark mode' : 'Light mode';
  };
  updateThemeToggle();
  toggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('fahim-theme', document.body.dataset.theme);
    updateThemeToggle();
  });
}

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

const form = document.querySelector('#subscribe-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = form.querySelector('.form-note');
    const input = form.querySelector('input');
    note.textContent = `You're on the list. Watch ${input.value} for the next note.`;
    input.value = '';
  });
}
