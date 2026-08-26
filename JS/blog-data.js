// File-based Student Hub data entry layer.
// Existing articles are preserved in blog-data.generated.js; manual/current entries are added here.
(function () {
  function loadGeneratedBlogs() {
    try {
      var currentSrc = document.currentScript && document.currentScript.src
        ? document.currentScript.src
        : new URL('../JS/blog-data.js', window.location.href).href;
      var generatedUrl = new URL('blog-data.generated.js', currentSrc).href;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', generatedUrl, false);
      xhr.send(null);
      if (xhr.status >= 200 && xhr.status < 300) {
        var source = xhr.responseText || '';
        var match = source.match(/window\.GOVJOB_BLOGS\s*=\s*(\[[\s\S]*\])\s*;\s*\}\)\(\);?\s*$/);
        if (match && match[1]) return Function('return (' + match[1] + ')')();
      }
    } catch (error) {
      console.error('Unable to load generated blog data:', error);
    }
    return [];
  }

  var blogs = loadGeneratedBlogs();
  var entry = {
    id: "iocl-computer-science-preparation-2026",
    title: "IOCL Computer Science Preparation 2026: CBT Strategy, Technical Syllabus & 6-Month Study Plan",
    category: "Career Guidance",
    date: "2026-08-26",
    image: "../Assets/Home%20Page/Government%20Job%20Banner.webp",
    url: "student-hub/iocl-computer-science-preparation-2026.html",
    excerpt: "IOCL Computer Science & IT preparation guide covering DSA, DBMS, OS, Networks, TOC, Compiler, COA, aptitude, CBT strategy, mocks and a practical six-month roadmap."
  };

  if (!blogs.some(function (blog) { return blog && blog.id === entry.id; })) blogs.unshift(entry);
  window.GOVJOB_BLOGS = blogs;
})();
