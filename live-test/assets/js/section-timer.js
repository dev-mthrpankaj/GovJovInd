(function () {
  window.LiveTestTimer = {
    format: function (seconds) {
      seconds = Math.max(0, Number(seconds) || 0);
      var minutes = Math.floor(seconds / 60);
      var secs = seconds % 60;
      return String(minutes).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    },
    start: function (sectionSeconds, totalSeconds, onSectionEnd, onTotalEnd) {
      var sectionRemaining = Math.max(0, Number(sectionSeconds) || 0);
      var totalRemaining = Math.max(0, Number(totalSeconds) || 0);
      var sectionNode = document.getElementById('sectionTimer');
      var totalNode = document.getElementById('totalTimer');

      function paint() {
        if (sectionNode) sectionNode.textContent = window.LiveTestTimer.format(sectionRemaining);
        if (totalNode) totalNode.textContent = window.LiveTestTimer.format(totalRemaining);
      }

      paint();
      var intervalId = window.setInterval(function () {
        sectionRemaining -= 1;
        totalRemaining -= 1;
        paint();

        if (totalRemaining <= 0) {
          window.clearInterval(intervalId);
          onTotalEnd();
          return;
        }

        if (sectionRemaining <= 0) {
          window.clearInterval(intervalId);
          onSectionEnd();
        }
      }, 1000);
      return intervalId;
    }
  };
}());
