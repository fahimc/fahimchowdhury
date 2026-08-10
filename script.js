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

const robotHero = document.querySelector('[data-robot-hero]');
const robotStage = robotHero?.querySelector('[data-robot-stage]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (robotHero && robotStage && !reducedMotion) {
  const current = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };
  let motionFrame;
  let touchReset;

  const renderRobot = () => {
    current.x += (target.x - current.x) * 0.14;
    current.y += (target.y - current.y) * 0.14;
    robotHero.style.setProperty('--head-x', `${current.x * 18}px`);
    robotHero.style.setProperty('--head-y', `${current.y * 10}px`);
    robotHero.style.setProperty('--head-ry', `${current.x * 9}deg`);
    robotHero.style.setProperty('--head-rx', `${current.y * -6}deg`);
    robotHero.style.setProperty('--head-rz', `${current.x * -1.5}deg`);
    robotHero.style.setProperty('--hero-glow-x', `${50 + current.x * 28}%`);
    robotHero.style.setProperty('--hero-glow-y', `${45 + current.y * 22}%`);
    if (Math.abs(target.x - current.x) > 0.002 || Math.abs(target.y - current.y) > 0.002) {
      motionFrame = requestAnimationFrame(renderRobot);
    } else {
      motionFrame = undefined;
    }
  };

  const queueRobot = () => {
    if (!motionFrame) motionFrame = requestAnimationFrame(renderRobot);
  };

  const lookAt = (clientX, clientY) => {
    const rect = robotHero.getBoundingClientRect();
    target.x = Math.max(-1, Math.min(1, ((clientX - rect.left) / rect.width - 0.5) * 2));
    target.y = Math.max(-1, Math.min(1, ((clientY - rect.top) / rect.height - 0.5) * 2));
    queueRobot();
  };

  const resetRobot = () => {
    target.x = 0;
    target.y = 0;
    queueRobot();
  };

  robotHero.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'touch') lookAt(event.clientX, event.clientY);
  }, { passive: true });
  robotHero.addEventListener('pointerleave', (event) => {
    if (event.pointerType !== 'touch') resetRobot();
  });
  robotHero.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    if (touch) lookAt(touch.clientX, touch.clientY);
  }, { passive: true });
  robotHero.addEventListener('touchend', () => {
    clearTimeout(touchReset);
    touchReset = setTimeout(resetRobot, 700);
  }, { passive: true });
  robotStage.addEventListener('keydown', (event) => {
    const movement = 0.25;
    if (event.key === 'ArrowLeft') target.x = Math.max(-1, target.x - movement);
    else if (event.key === 'ArrowRight') target.x = Math.min(1, target.x + movement);
    else if (event.key === 'ArrowUp') target.y = Math.max(-1, target.y - movement);
    else if (event.key === 'ArrowDown') target.y = Math.min(1, target.y + movement);
    else return;
    event.preventDefault();
    queueRobot();
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
