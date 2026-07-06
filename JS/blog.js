(function () {
  const PAGE_SIZE = 18;
  const blogs = Array.isArray(window.GOVJOB_BLOGS) ? window.GOVJOB_BLOGS : [];
  const state = {
    category: "All",
    query: "",
    visible: PAGE_SIZE
  };

  const grid = document.getElementById("blogGrid");
  const searchInput = document.getElementById("blogSearch");
  const filters = document.getElementById("blogCategoryFilters");
  const count = document.getElementById("blogResultCount");
  const empty = document.getElementById("blogEmpty");
  const loadMore = document.getElementById("blogLoadMore");

  if (!grid || !searchInput || !filters || !count || !empty || !loadMore) return;

  let searchDebounceTimer = 0;
  let renderFrame = 0;

  const formatDate = (dateValue) => {
    const date = new Date(`${dateValue}T00:00:00`);
    if (Number.isNaN(date.getTime())) return dateValue;
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(date);
  };

  const escapeHtml = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));

  const getFilteredBlogs = () => {
    const query = state.query.trim().toLowerCase();
    return blogs.filter((blog) => {
      const matchesCategory = state.category === "All" || blog.category === state.category;
      const text = `${blog.title} ${blog.category} ${blog.excerpt}`.toLowerCase();
      return matchesCategory && (!query || text.includes(query));
    });
  };

  const createBlogCard = (blog) => {
    const article = document.createElement("article");
    article.className = "blog-card";
    const readMore = blog.url
      ? `<a class="btn btn-outline" href="${escapeHtml(blog.url)}">Read More</a>`
      : `<button class="btn btn-outline" type="button" data-blog-id="${escapeHtml(blog.id)}">Read More</button>`;

    article.innerHTML = `
      <div class="blog-card-thumb">
        <img src="${escapeHtml(blog.image)}" alt="${escapeHtml(blog.title)}" loading="lazy" decoding="async">
        <span class="blog-card-category">${escapeHtml(blog.category)}</span>
      </div>
      <div class="blog-card-body">
        <span class="blog-card-date">${escapeHtml(formatDate(blog.date))}</span>
        <h3>${escapeHtml(blog.title)}</h3>
        <p>${escapeHtml(blog.excerpt)}</p>
        ${readMore}
      </div>
    `;
    return article;
  };

  const render = () => {
    renderFrame = 0;
    const filtered = getFilteredBlogs();
    const visibleBlogs = filtered.slice(0, state.visible);

    grid.replaceChildren(...visibleBlogs.map(createBlogCard));
    empty.hidden = filtered.length > 0;
    loadMore.hidden = state.visible >= filtered.length;

    const shown = Math.min(state.visible, filtered.length);
    count.textContent = filtered.length
      ? `Showing ${shown} of ${filtered.length} articles`
      : "No articles match your filters";
  };

  const scheduleRender = () => {
    if (renderFrame) return;

    if ("requestAnimationFrame" in window) {
      renderFrame = window.requestAnimationFrame(render);
      return;
    }

    renderFrame = window.setTimeout(render, 0);
  };

  searchInput.addEventListener("input", () => {
    window.clearTimeout(searchDebounceTimer);
    searchDebounceTimer = window.setTimeout(() => {
      const nextQuery = searchInput.value;
      if (state.query === nextQuery && state.visible === PAGE_SIZE) return;

      state.query = nextQuery;
      state.visible = PAGE_SIZE;
      scheduleRender();
    }, 200);
  });

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;

    const nextCategory = button.dataset.category || "All";
    if (state.category === nextCategory && state.visible === PAGE_SIZE) return;

    state.category = nextCategory;
    state.visible = PAGE_SIZE;
    filters.querySelectorAll("[data-category]").forEach((filter) => {
      filter.classList.toggle("is-active", filter === button);
    });
    scheduleRender();
  });

  loadMore.addEventListener("click", () => {
    state.visible += PAGE_SIZE;
    scheduleRender();
  });

  grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-blog-id]");
    if (!button) return;
    button.blur();
  });

  render();
})();
