const isWritingPage = /blog\.html|article-/.test(window.location.pathname);
if (isWritingPage) document.body.classList.add('light-page');

const themeStorageKey = isWritingPage ? 'fahim-writing-theme' : 'fahim-theme';
const savedTheme = localStorage.getItem(themeStorageKey);
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
    localStorage.setItem(themeStorageKey, document.body.dataset.theme);
    updateThemeToggle();
  });
}

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

const revealTargets = document.querySelectorAll('.section, .work-item, .writing-card, .post-row, .architecture-stage, .reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealTargets.forEach((el) => el.classList.add('reveal-ready'));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((el) => revealObserver.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

const parallax = document.querySelector('[data-parallax]');
if (parallax && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  parallax.addEventListener('pointermove', (event) => {
    const rect = parallax.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    parallax.style.setProperty('--tilt-x', `${-y}deg`);
    parallax.style.setProperty('--tilt-y', `${x}deg`);
  });
  parallax.addEventListener('pointerleave', () => {
    parallax.style.setProperty('--tilt-x', '0deg');
    parallax.style.setProperty('--tilt-y', '0deg');
  });
}

const progress = document.querySelector('.scroll-progress');
if (progress) {
  let progressFrame;
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0;
    progress.style.setProperty('--scroll-progress', `${percentage}%`);
    progressFrame = undefined;
  };
  window.addEventListener('scroll', () => {
    if (!progressFrame) progressFrame = requestAnimationFrame(updateProgress);
  }, { passive: true });
  updateProgress();
}

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
