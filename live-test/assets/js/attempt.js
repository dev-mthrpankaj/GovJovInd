(function () {
  var shell = document.querySelector('.exam-shell');
  if (!shell) return;

  var cards = Array.prototype.slice.call(document.querySelectorAll('.question-card'));
  var paletteButtons = Array.prototype.slice.call(document.querySelectorAll('.palette-btn'));
  var currentIndex = 0;
  var questionStartedAt = Date.now();
  var saveStatus = document.getElementById('saveStatus');
  var submitModal = document.getElementById('submitModal');
  var imageModal = document.getElementById('imageModal');
  var zoomImage = document.getElementById('zoomImage');
  var isSubmitting = false;
  var sectionAnsweredInitial = parseInt(shell.dataset.sectionAnsweredInitial || '0', 10);
  var overallAnsweredInitial = parseInt(shell.dataset.overallAnsweredInitial || '0', 10);
  var overallTotal = parseInt(shell.dataset.overallTotal || String(paletteButtons.length), 10);
  var languageRule = shell.dataset.languageRule || 'both';
  var languageStorageKey = 'liveTestLanguageMode:' + shell.dataset.attemptId + ':' + shell.dataset.registrationId;

  function activeCard() {
    return cards[currentIndex] || null;
  }

  function elapsedForQuestion() {
    var elapsed = Math.max(0, Math.round((Date.now() - questionStartedAt) / 1000));
    questionStartedAt = Date.now();
    return elapsed;
  }

  function setSaveStatus(text) {
    if (saveStatus) saveStatus.textContent = text;
  }

  function selectedOption(card) {
    var selected = card ? card.querySelector('.option-card.is-selected') : null;
    return selected ? selected.dataset.option : '';
  }

  function statusFor(card, action) {
    var option = selectedOption(card);
    if (action === 'mark_review') return option ? 'answered_marked_review' : 'marked_review';
    if (action === 'clear') return 'not_answered';
    return option ? 'answered' : 'not_answered';
  }

  function paintPalette(questionId, status) {
    var btn = document.querySelector('.palette-btn[data-question-id="' + questionId + '"]');
    if (!btn) return;
    btn.className = btn.className.replace(/\bstatus-[a-z_-]+\b/g, '').trim();
    btn.classList.add('status-' + status);
    updateProgress();
  }

  function updateProgress() {
    var node = document.getElementById('sectionProgress');
    var answered = document.querySelectorAll('.palette-btn.status-answered, .palette-btn.status-answered_marked_review').length;
    var answeredMarked = document.querySelectorAll('.palette-btn.status-answered_marked_review').length;
    var marked = document.querySelectorAll('.palette-btn.status-marked_review').length;
    var unanswered = document.querySelectorAll('.palette-btn.status-not_visited, .palette-btn.status-not_answered').length;
    var overallAnswered = Math.max(0, overallAnsweredInitial - sectionAnsweredInitial + answered);
    if (node) node.textContent = answered + '/' + paletteButtons.length + ' answered';
    var answeredSummary = document.getElementById('answeredSummary');
    var overallAnsweredSummary = document.getElementById('overallAnsweredSummary');
    var mobileSectionAnsweredSummary = document.getElementById('mobileSectionAnsweredSummary');
    var mobileOverallAnsweredSummary = document.getElementById('mobileOverallAnsweredSummary');
    var answeredCount = document.getElementById('paletteAnsweredCount');
    var unansweredCount = document.getElementById('paletteUnansweredCount');
    var markedCount = document.getElementById('paletteMarkedCount');
    var answeredMarkedCount = document.getElementById('paletteAnsweredMarkedCount');
    if (answeredSummary) answeredSummary.textContent = answered;
    if (overallAnsweredSummary) overallAnsweredSummary.textContent = Math.min(overallAnswered, overallTotal);
    if (mobileSectionAnsweredSummary) mobileSectionAnsweredSummary.textContent = answered;
    if (mobileOverallAnsweredSummary) mobileOverallAnsweredSummary.textContent = Math.min(overallAnswered, overallTotal);
    if (answeredCount) answeredCount.textContent = answered;
    if (unansweredCount) unansweredCount.textContent = unanswered;
    if (markedCount) markedCount.textContent = marked;
    if (answeredMarkedCount) answeredMarkedCount.textContent = answeredMarked;
  }

  function updatePreviousState() {
    var prev = document.getElementById('prevBtn');
    if (!prev) return;
    var isFirst = currentIndex <= 0;
    prev.hidden = isFirst;
    prev.disabled = isFirst;
    prev.classList.toggle('is-hidden', isFirst);
    prev.setAttribute('aria-hidden', isFirst ? 'true' : 'false');
  }

  function applyLanguageMode(mode) {
    var normalized = mode;
    if (languageRule === 'hindi') normalized = 'hi';
    if (languageRule === 'english') normalized = 'en';
    if (!['hi', 'en', 'both'].includes(normalized)) normalized = 'both';

    shell.dataset.languageMode = normalized;
    document.querySelectorAll('[data-lang]').forEach(function (node) {
      node.hidden = normalized !== 'both' && node.dataset.lang !== normalized;
    });
    document.querySelectorAll('.language-mode-select').forEach(function (select) {
      select.value = normalized;
    });
    try {
      window.sessionStorage.setItem(languageStorageKey, normalized);
    } catch (error) {}
  }

  function initLanguageMode() {
    if (languageRule !== 'both') {
      applyLanguageMode(languageRule === 'hindi' ? 'hi' : 'en');
      return;
    }

    var stored = '';
    try {
      stored = window.sessionStorage.getItem(languageStorageKey) || '';
    } catch (error) {}
    applyLanguageMode(stored || 'both');

    document.querySelectorAll('.language-mode-select').forEach(function (select) {
      select.addEventListener('change', function () {
        applyLanguageMode(select.value);
      });
    });
  }

  function showQuestion(index) {
    if (index < 0 || index >= cards.length) return;
    cards.forEach(function (card) { card.classList.remove('is-active'); });
    paletteButtons.forEach(function (btn) { btn.classList.remove('is-current'); });
    currentIndex = index;
    cards[currentIndex].classList.add('is-active');
    if (paletteButtons[currentIndex]) paletteButtons[currentIndex].classList.add('is-current');
    questionStartedAt = Date.now();
    updatePreviousState();
    applyLanguageMode(shell.dataset.languageMode || (languageRule === 'both' ? 'both' : languageRule));
    autosave('visit');
  }

  function request(action) {
    var card = activeCard();
    if (!card) return Promise.resolve({ ok: false });
    var body = new URLSearchParams();
    body.set('attempt_id', shell.dataset.attemptId);
    body.set('rid', shell.dataset.registrationId);
    body.set('attempt_token', shell.dataset.token);
    body.set('csrf_token', shell.dataset.csrf);
    body.set('question_id', card.dataset.questionId);
    body.set('answer_action', action);
    body.set('selected_option', selectedOption(card));
    body.set('time_spent_seconds', String(elapsedForQuestion()));

    setSaveStatus('Saving...');
    return fetch('autosave.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.ok) {
        paintPalette(data.question_id, data.answer_status);
        setSaveStatus('Saved');
      } else {
        setSaveStatus(data.message || 'Save failed');
        if (data.ended) submit('auto');
      }
      return data;
    }).catch(function () {
      setSaveStatus('Save failed');
      return { ok: false };
    });
  }

  function autosave(action) {
    return request(action || 'save');
  }

  function submit(mode) {
    if (isSubmitting) return;
    isSubmitting = true;
    var body = new URLSearchParams();
    body.set('attempt_id', shell.dataset.attemptId);
    body.set('rid', shell.dataset.registrationId);
    body.set('attempt_token', shell.dataset.token);
    body.set('csrf_token', shell.dataset.csrf);
    body.set('submit_mode', mode || 'manual');

    fetch('submit.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      window.LiveTestAllowNavigation = true;
      window.location.href = data.redirect || 'submit.php?submitted=1';
    }).catch(function () {
      window.LiveTestAllowNavigation = true;
      window.location.href = 'submit.php?submitted=1';
    });
  }

  cards.forEach(function (card) {
    card.querySelectorAll('.option-card').forEach(function (option) {
      option.addEventListener('click', function () {
        card.querySelectorAll('.option-card').forEach(function (item) {
          item.classList.remove('is-selected');
        });
        option.classList.add('is-selected');
        autosave('save');
      });
    });
  });

  paletteButtons.forEach(function (btn, index) {
    btn.addEventListener('click', function () { showQuestion(index); });
  });

  document.getElementById('prevBtn')?.addEventListener('click', function () {
    autosave('save').then(function () { showQuestion(currentIndex - 1); });
  });

  document.getElementById('nextBtn')?.addEventListener('click', function () {
    autosave('save').then(function () {
      if (currentIndex < cards.length - 1) showQuestion(currentIndex + 1);
    });
  });

  document.getElementById('clearBtn')?.addEventListener('click', function () {
    var card = activeCard();
    if (!card) return;
    card.querySelectorAll('.option-card').forEach(function (item) {
      item.classList.remove('is-selected');
    });
    autosave('clear');
  });

  document.getElementById('reviewBtn')?.addEventListener('click', function () {
    var card = activeCard();
    if (!card) return;
    paintPalette(card.dataset.questionId, statusFor(card, 'mark_review'));
    autosave('mark_review');
  });

  document.getElementById('submitBtn')?.addEventListener('click', function () {
    if (submitModal) submitModal.hidden = false;
  });

  document.getElementById('topSubmitBtn')?.addEventListener('click', function () {
    if (submitModal) submitModal.hidden = false;
  });

  document.getElementById('paletteSubmitBtn')?.addEventListener('click', function () {
    if (submitModal) submitModal.hidden = false;
  });

  document.getElementById('cancelSubmitBtn')?.addEventListener('click', function () {
    if (submitModal) submitModal.hidden = true;
  });

  document.getElementById('confirmSubmitBtn')?.addEventListener('click', function () {
    autosave('save').then(function () { submit('manual'); });
  });

  document.getElementById('paletteToggle')?.addEventListener('click', function () {
    document.querySelector('.palette-panel')?.classList.toggle('is-open');
  });

  document.getElementById('paletteCloseBtn')?.addEventListener('click', function () {
    document.querySelector('.palette-panel')?.classList.remove('is-open');
  });

  paletteButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelector('.palette-panel')?.classList.remove('is-open');
    });
  });

  document.querySelectorAll('.image-zoom').forEach(function (button) {
    button.addEventListener('click', function () {
      if (!imageModal || !zoomImage) return;
      zoomImage.src = button.dataset.imageSrc;
      zoomImage.alt = button.dataset.imageAlt || 'Question image';
      imageModal.hidden = false;
    });
  });

  document.getElementById('closeImageModal')?.addEventListener('click', function () {
    if (imageModal) imageModal.hidden = true;
  });

  if (window.LiveTestTimer) {
    window.LiveTestTimer.start(
      shell.dataset.sectionRemaining,
      shell.dataset.totalRemaining,
      function () {
        window.LiveTestAllowNavigation = true;
        window.location.reload();
      },
      function () {
        autosave('save').then(function () { submit('auto'); });
      }
    );
  }

  initLanguageMode();
  showQuestion(0);
  updateProgress();
}());
