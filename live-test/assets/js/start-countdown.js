(function () {
  var card = document.querySelector('[data-start-countdown]');
  var output = document.getElementById('startCountdown');
  if (!card || !output) return;

  var remaining = parseInt(card.dataset.startCountdown || '0', 10);
  var redirectUrl = card.dataset.redirectUrl || 'attempt.php';

  function format(seconds) {
    seconds = Math.max(0, seconds);
    var minutes = Math.floor(seconds / 60);
    var secs = seconds % 60;
    return String(minutes).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  }

  function tick() {
    output.textContent = format(remaining);
    if (remaining <= 0) {
      window.location.href = redirectUrl;
      return;
    }
    remaining -= 1;
    window.setTimeout(tick, 1000);
  }

  tick();
}());
