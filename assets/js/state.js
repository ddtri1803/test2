(function () {
  const body = document.body;
  const stateLabel = document.querySelector('[data-current-state]');
  const progress = document.querySelectorAll('[data-step]');
  const visibilityBlocks = document.querySelectorAll('[data-visible-states]');

  const stepMap = {
    'pre-diagnosis': 1,
    diagnosed: 2,
    'active-treatment': 4,
  };

  function applyState(state) {
    body.setAttribute('data-state', state);
    if (stateLabel) stateLabel.textContent = state;

    const activeStep = stepMap[state] || 1;
    progress.forEach((el) => {
      const step = Number(el.getAttribute('data-step'));
      const dot = el.querySelector('[data-dot]');
      if (!dot) return;
      if (step <= activeStep) {
        dot.classList.remove('bg-slate-200', 'text-slate-500');
        dot.classList.add('bg-slate-800', 'text-white');
      } else {
        dot.classList.remove('bg-slate-800', 'text-white');
        dot.classList.add('bg-slate-200', 'text-slate-500');
      }
    });

    visibilityBlocks.forEach((block) => {
      const states = (block.getAttribute('data-visible-states') || '').split('|');
      block.classList.toggle('hidden', !states.includes(state));
    });
  }

  document.querySelectorAll('[data-set-state]').forEach((btn) => {
    btn.addEventListener('click', function () {
      applyState(this.getAttribute('data-set-state'));
    });
  });

  applyState(body.getAttribute('data-state') || 'pre-diagnosis');
})();
