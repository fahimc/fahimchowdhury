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
