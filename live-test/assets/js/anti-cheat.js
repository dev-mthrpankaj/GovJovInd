(function () {
  var shell = document.querySelector('.exam-shell');
  if (!shell) return;
  if (!/\/attempt\.php(?:$|\?)/.test(window.location.pathname + window.location.search)) return;

  var lastLogged = {};
  var switchTimer = null;
  var switchStartedAt = 0;
  var switchCooldownMs = 5000;
  var switchDelayMs = 2000;
  var warningBox = document.getElementById('antiCheatWarning');
  var warningText = document.getElementById('antiCheatWarningText');
  var warningCount = document.getElementById('antiCheatWarningCount');

  function showWarning(data) {
    if (!warningBox) return;
    if (warningText) {
      warningText.textContent = data.message || 'Warning: Switching tabs/apps during the live test can remove your leaderboard eligibility.';
    }
    if (warningCount) {
      warningCount.textContent = 'Warning count: ' + (data.warning_count || 0) + ' | Status: ' + (data.eligibility_status || 'warning');
    }
    warningBox.hidden = false;
    window.setTimeout(function () {
      warningBox.hidden = true;
    }, 6500);
  }

  function logEvent(type, source, metadata, useBeacon, cooldownMs) {
    var now = Date.now();
    var cooldown = cooldownMs || 5000;
    if (lastLogged[type] && now - lastLogged[type] < cooldown) {
      return;
    }
    lastLogged[type] = now;

    var body = new URLSearchParams();
    body.set('attempt_id', shell.dataset.attemptId);
    body.set('rid', shell.dataset.registrationId);
    body.set('attempt_token', shell.dataset.token);
    body.set('violation_type', type);
    body.set('event_source', source);
    body.set('client_timestamp', new Date().toISOString());
    body.set('metadata', JSON.stringify(metadata || {}));

    if (useBeacon && navigator.sendBeacon) {
      navigator.sendBeacon('log-violation.php', body);
      return;
    }

    fetch('log-violation.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      keepalive: true
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      if (data.ok) showWarning(data);
    }).catch(function () {});
  }

  function clearSwitchTimer() {
    if (switchTimer) {
      window.clearTimeout(switchTimer);
      switchTimer = null;
    }
    switchStartedAt = 0;
  }

  function scheduleSwitchCheck(source) {
    if (switchTimer) return;
    switchStartedAt = Date.now();
    switchTimer = window.setTimeout(function () {
      switchTimer = null;
      var stillHidden = document.hidden;
      var stillBlurred = !document.hasFocus();
      if (!stillHidden && !stillBlurred) {
        switchStartedAt = 0;
        return;
      }

      logEvent(
        stillHidden ? 'tab_switch' : 'app_switch',
        source,
        {
          visibilityState: document.visibilityState,
          focused: document.hasFocus(),
          hidden_for_ms: Date.now() - switchStartedAt
        },
        false,
        switchCooldownMs
      );
      switchStartedAt = 0;
    }, switchDelayMs);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      scheduleSwitchCheck('visibilitychange');
    } else {
      clearSwitchTimer();
    }
  });

  window.addEventListener('blur', function () {
    scheduleSwitchCheck('window.blur');
  });

  window.addEventListener('focus', clearSwitchTimer);

  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
      logEvent('fullscreen_exit', 'fullscreenchange', {});
    }
  });

  history.pushState({ liveTest: true }, '', window.location.href);
  window.addEventListener('popstate', function () {
    logEvent('browser_back', 'popstate', {});
    history.pushState({ liveTest: true }, '', window.location.href);
  });

  document.addEventListener('copy', function () {
    logEvent('copy_attempt', 'copy', {});
  });

  document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    logEvent('right_click', 'contextmenu', {});
  });

  window.addEventListener('beforeunload', function () {
    if (window.LiveTestAllowNavigation) {
      return;
    }
    logEvent('reload', 'beforeunload', { href: window.location.href }, true, 30000);
  });
}());
