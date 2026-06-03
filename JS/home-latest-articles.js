(function () {
  const container = document.getElementById('homeLatestArticles');
  if (!container) return;

  const articles = Array.isArray(window.GOVJOB_BLOGS) ? window.GOVJOB_BLOGS : [];

  const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.valueOf())) {
      return value || 'Unknown date';
    }
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const normalizeImagePath = (value) => {
    if (!value) return '';
    let path = String(value).trim();
    path = path.replace(/^(?:\.\.\/)+/, '');
    path = path.replace(/^\.\//, '');
    path = path.replace(/^HTML\/student-hub\//i, '');
    path = path.replace(/^\/+/, '');
    try {
      path = decodeURI(path);
    } catch (error) {
      console.warn('Failed to decode image path:', path, error);
    }
    return path;
  };

  const createCard = (article) => {
    console.log('Original Image Path:', article.image);
    const card = document.createElement('article');
    card.className = 'home-article-card';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'article-image-wrapper';

    if (article.image) {
      const cleanPath = normalizeImagePath(article.image);
      console.log('Normalized Image Path:', cleanPath);
      const img = document.createElement('img');
      img.className = 'article-card-img';
      img.src = cleanPath;
      img.alt = article.title || 'Article image';
      img.loading = 'lazy';
      imageWrapper.appendChild(img);
    } else {
      imageWrapper.classList.add('article-no-img-placeholder');
    }

    const content = document.createElement('div');
    content.className = 'home-article-card-content';
    content.innerHTML = `
      ${article.category ? `<span class="article-card-category">${article.category}</span>` : ''}
      <h3 class="article-card-title">${article.title || 'Untitled article'}</h3>
      <p class="article-card-meta">${formatDate(article.date)}${article.author ? ` · ${article.author}` : ''}</p>
      <p class="article-card-excerpt">${article.excerpt || article.summary || ''}</p>
      <a class="section-link" href="${article.url ? `HTML/student-hub/${article.url.split('/').pop()}` : 'HTML/student-hub.html'}">Read more <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
    `;

    card.appendChild(imageWrapper);
    card.appendChild(content);
    return card;
  };

  const renderEmpty = () => {
    container.innerHTML = '<div class="content-card"><strong>No articles available yet.</strong><span>Check back soon for the latest Student Hub updates.</span></div>';
    container.setAttribute('aria-busy', 'false');
  };

  if (!articles.length) {
    renderEmpty();
    return;
  }

  const latestArticles = [...articles]
    .filter((item) => item && item.title)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  if (!latestArticles.length) {
    renderEmpty();
    return;
  }

  container.innerHTML = '';
  latestArticles.forEach((entry) => container.appendChild(createCard(entry)));
  container.setAttribute('aria-busy', 'false');
})();
