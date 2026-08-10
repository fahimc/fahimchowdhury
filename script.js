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
const robotSprites = robotHero ? [...robotHero.querySelectorAll('[data-robot-sprite]')] : [];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (robotHero && robotStage && robotSprites.length === 2 && !reducedMotion) {
  const positions = ['0%', '50%', '100%'];
  const keyboardLook = { x: 0, y: 0 };
  let activeSprite = 0;
  let currentFrame = '1:1';
  let pendingLook;
  let directionFrame;
  let touchReset;

  const axisFrame = (value) => {
    if (value < -0.3333) return 0;
    if (value < 0.3333) return 1;
    return 2;
  };

  const renderDirection = () => {
    directionFrame = undefined;
    if (!pendingLook) return;
    const { x, y } = pendingLook;
    const column = axisFrame(x);
    const row = axisFrame(y);
    const frameKey = `${column}:${row}`;
    robotHero.style.setProperty('--hero-glow-x', `${50 + x * 28}%`);
    robotHero.style.setProperty('--hero-glow-y', `${45 + y * 22}%`);
    if (frameKey === currentFrame) return;
    const nextSprite = activeSprite === 0 ? 1 : 0;
    robotSprites[nextSprite].style.setProperty('--frame-x', positions[column]);
    robotSprites[nextSprite].style.setProperty('--frame-y', positions[row]);
    robotSprites[nextSprite].classList.add('is-active');
    robotSprites[activeSprite].classList.remove('is-active');
    activeSprite = nextSprite;
    currentFrame = frameKey;
  };

  const queueDirection = (x, y) => {
    pendingLook = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    };
    if (!directionFrame) directionFrame = requestAnimationFrame(renderDirection);
  };

  const lookAt = (clientX, clientY) => {
    const rect = robotHero.getBoundingClientRect();
    queueDirection(
      ((clientX - rect.left) / rect.width - 0.5) * 2,
      ((clientY - rect.top) / rect.height - 0.5) * 2,
    );
  };

  robotHero.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'touch') lookAt(event.clientX, event.clientY);
  }, { passive: true });
  robotHero.addEventListener('pointerleave', (event) => {
    if (event.pointerType !== 'touch') queueDirection(0, 0);
  });
  robotHero.addEventListener('touchmove', (event) => {
    const touch = event.touches[0];
    if (touch) lookAt(touch.clientX, touch.clientY);
  }, { passive: true });
  robotHero.addEventListener('touchend', () => {
    clearTimeout(touchReset);
    touchReset = setTimeout(() => queueDirection(0, 0), 700);
  }, { passive: true });
  robotStage.addEventListener('keydown', (event) => {
    const movement = 0.34;
    if (event.key === 'ArrowLeft') keyboardLook.x -= movement;
    else if (event.key === 'ArrowRight') keyboardLook.x += movement;
    else if (event.key === 'ArrowUp') keyboardLook.y -= movement;
    else if (event.key === 'ArrowDown') keyboardLook.y += movement;
    else return;
    event.preventDefault();
    keyboardLook.x = Math.max(-1, Math.min(1, keyboardLook.x));
    keyboardLook.y = Math.max(-1, Math.min(1, keyboardLook.y));
    queueDirection(keyboardLook.x, keyboardLook.y);
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

const netlifyForms = document.querySelectorAll('form[data-async-form]');
netlifyForms.forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const status = form.querySelector('[data-form-status]');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton.innerHTML;
    const formData = new FormData(form);
    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    status.textContent = '';

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });
      if (!response.ok) throw new Error('Submission failed');
      const isNewsletter = form.getAttribute('name') === 'newsletter';
      status.textContent = isNewsletter
        ? "You're on the list. The next note will land in your inbox."
        : "Thanks — your message is with me. I'll be in touch soon.";
      status.dataset.state = 'success';
      form.reset();
    } catch {
      status.textContent = 'Something went wrong. Please email fahim.chowdhury1985@gmail.com.';
      status.dataset.state = 'error';
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalLabel;
    }
  });
});

const copyText = async (text) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const fallback = document.createElement('textarea');
  fallback.value = text;
  fallback.setAttribute('readonly', '');
  fallback.style.position = 'fixed';
  fallback.style.opacity = '0';
  document.body.appendChild(fallback);
  fallback.select();
  const copied = document.execCommand('copy');
  fallback.remove();
  if (!copied) throw new Error('Copy failed');
};

document.querySelectorAll('[data-copy-email]').forEach((button) => {
  button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('[data-copy-status]');
    try {
      await copyText(button.dataset.copyEmail);
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = `Copy this address: ${button.dataset.copyEmail}`;
    }
  });
});
