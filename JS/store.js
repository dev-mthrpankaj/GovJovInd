(function () {
  "use strict";

  const STORE_API_BASE = "https://test.govjobupdates.com/live-test/store-api";
  const CART_STORAGE_KEY = "gjuStoreCart";
  const LEGACY_CART_STORAGE_KEY = "gjuPhysicalStoreCart";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const state = {
    products: [],
    categories: [],
    category: "",
    search: "",
    sort: "featured",
    loading: true
  };

  const CATEGORY_ICONS = {
    "running-shoes": "fa-shoe-prints",
    "running-wear": "fa-shirt",
    "running-essentials": "fa-stopwatch",
    "support-recovery": "fa-heart-pulse",
    "training-equipment": "fa-dumbbell",
    "ground-essentials": "fa-bottle-water"
  };

  function clean(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
  }

  function money(paise) {
    const amount = Math.max(0, Number(paise || 0)) / 100;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2
    }).format(amount);
  }

  function categoryIcon(category) {
    const slug = clean(category.slug).toLowerCase();
    if (CATEGORY_ICONS[slug]) return CATEGORY_ICONS[slug];
    const name = clean(category.name).toLowerCase();
    if (name.includes("shoe")) return "fa-shoe-prints";
    if (name.includes("wear") || name.includes("cloth")) return "fa-shirt";
    if (name.includes("support") || name.includes("recovery")) return "fa-heart-pulse";
    if (name.includes("training") || name.includes("equipment")) return "fa-dumbbell";
    if (name.includes("ground")) return "fa-bottle-water";
    if (name.includes("book")) return "fa-book-open";
    if (name.includes("study") || name.includes("stationery")) return "fa-pen-ruler";
    if (name.includes("exam")) return "fa-clipboard-check";
    return "fa-box-open";
  }

  function categorySubtitle(category) {
    const name = clean(category.name).toLowerCase();
    if (name.includes("shoe")) return "Practice & running";
    if (name.includes("wear")) return "T-shirts, shorts & lowers";
    if (name.includes("support") || name.includes("recovery")) return "Support for training";
    if (name.includes("training")) return "Ground practice gear";
    if (name.includes("ground")) return "Daily field essentials";
    if (name.includes("essential")) return "Useful everyday essentials";
    if (name.includes("book")) return "Books & preparation material";
    if (name.includes("study") || name.includes("stationery")) return "Study & stationery essentials";
    if (name.includes("exam")) return "Useful exam-day products";
    return "Explore products";
  }

  function readCartCount() {
    try {
      let raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) {
        const legacy = localStorage.getItem(LEGACY_CART_STORAGE_KEY);
        if (legacy) {
          raw = legacy;
          localStorage.setItem(CART_STORAGE_KEY, legacy);
        }
      }
      const cart = JSON.parse(raw || "[]");
      if (!Array.isArray(cart)) return 0;
      return cart.reduce((sum, item) => sum + Math.max(0, Number(item?.quantity || 0)), 0);
    } catch {
      return 0;
    }
  }

  function updateCartCount() {
    const count = readCartCount();
    const badge = $("#pasCartCount");
    if (!badge) return;
    badge.textContent = count > 99 ? "99+" : String(count);
    badge.setAttribute("aria-label", `${count} cart item${count === 1 ? "" : "s"}`);
  }

  function renderCategories() {
    const grid = $("#pasCategoryGrid");
    const mobile = $("#pasMobileFilters");
    if (!grid || !mobile) return;

    if (!state.categories.length) {
      grid.innerHTML = '<div class="pas-empty-state" style="grid-column:1/-1;min-height:150px"><p>No active store categories yet.</p></div>';
      mobile.innerHTML = "";
      return;
    }

    grid.innerHTML = state.categories.map((category) => {
      const slug = clean(category.slug);
      const active = state.category === slug ? " is-active" : "";
      return `
        <button class="pas-category-card${active}" type="button" data-category="${escapeHtml(slug)}" aria-pressed="${state.category === slug ? "true" : "false"}">
          <span class="pas-category-icon"><i class="fas ${categoryIcon(category)}" aria-hidden="true"></i></span>
          <strong>${escapeHtml(category.name || "Category")}</strong>
          <span>${escapeHtml(categorySubtitle(category))}</span>
        </button>`;
    }).join("");

    mobile.innerHTML = [
      `<button type="button" data-category="" class="${state.category === "" ? "is-active" : ""}">All</button>`,
      ...state.categories.map((category) => `<button type="button" data-category="${escapeHtml(category.slug)}" class="${state.category === category.slug ? "is-active" : ""}">${escapeHtml(category.name)}</button>`)
    ].join("");

    $$('[data-category]').forEach((button) => button.addEventListener("click", () => {
      setCategory(button.dataset.category || "");
    }));
  }

  function productPrice(product) {
    const min = Number(product.min_price_paise);
    const max = Number(product.max_price_paise);
    if (!Number.isFinite(min) || min <= 0) return "Price unavailable";
    if (Number.isFinite(max) && max > min) return `${money(min)}–${money(max)}`;
    return money(min);
  }

  function filteredProducts() {
    const query = state.search.toLowerCase();
    let products = state.products.filter((product) => {
      if (state.category && clean(product.category?.slug) !== state.category) return false;
      if (!query) return true;
      const haystack = [product.title, product.short_description, product.category?.name, product.brand?.name].map(clean).join(" ").toLowerCase();
      return haystack.includes(query);
    });

    products = [...products].sort((a, b) => {
      if (state.sort === "price-asc") return Number(a.min_price_paise || Infinity) - Number(b.min_price_paise || Infinity);
      if (state.sort === "price-desc") return Number(b.min_price_paise || 0) - Number(a.min_price_paise || 0);
      if (state.sort === "name") return clean(a.title).localeCompare(clean(b.title), "en");
      return Number(Boolean(b.is_featured)) - Number(Boolean(a.is_featured));
    });
    return products;
  }

  function renderProducts() {
    const grid = $("#pasProductGrid");
    const empty = $("#pasEmptyState");
    const label = $("#pasResultsLabel");
    const activeFilter = $("#pasActiveFilter");
    const clearActions = $$('[data-clear-filters]');
    if (!grid || !empty) return;

    const products = filteredProducts();
    grid.hidden = products.length === 0;
    empty.hidden = products.length !== 0;

    if (label) {
      const suffix = state.category ? ` in ${state.categories.find((c) => c.slug === state.category)?.name || "selected category"}` : "";
      label.textContent = `${products.length} product${products.length === 1 ? "" : "s"}${suffix}`;
    }

    if (activeFilter) {
      if (state.category) {
        const categoryName = state.categories.find((c) => c.slug === state.category)?.name || state.category;
        activeFilter.innerHTML = `<i class="fas fa-filter" aria-hidden="true"></i> ${escapeHtml(categoryName)}`;
        activeFilter.hidden = false;
      } else {
        activeFilter.hidden = true;
      }
    }

    clearActions.forEach((button) => { button.hidden = !(state.category || state.search); });

    grid.innerHTML = products.map((product) => {
      const stock = Math.max(0, Number(product.available_qty || 0));
      const stockClass = stock === 0 ? "is-out" : stock <= 3 ? "is-low" : "";
      const stockText = stock === 0 ? "Out of stock" : stock <= 3 ? `Only ${stock} left` : "In stock";
      const image = clean(product.image);
      const brand = clean(product.brand?.name);
      const category = clean(product.category?.name);
      const productUrl = `store-product.html?slug=${encodeURIComponent(clean(product.slug))}`;
      return `
        <article class="pas-product-card">
          <a class="pas-product-image-wrap" href="${productUrl}" aria-label="View ${escapeHtml(product.title)}">
            ${image ? `<img class="pas-product-image" src="${escapeHtml(image)}" alt="${escapeHtml(product.title)}" loading="lazy" decoding="async">` : '<span class="pas-product-placeholder"><i class="fas fa-shoe-prints" aria-hidden="true"></i></span>'}
            <span class="pas-product-badges">
              ${product.is_featured ? '<span class="pas-badge featured">Featured</span>' : ""}
              ${stock === 0 ? '<span class="pas-badge out">Sold Out</span>' : stock <= 3 ? '<span class="pas-badge low">Low Stock</span>' : ""}
            </span>
          </a>
          <div class="pas-product-body">
            <div class="pas-product-meta"><span>${escapeHtml(brand || "GovJobUpdates Store")}</span>${brand && category ? '<i class="fas fa-circle" aria-hidden="true"></i>' : ""}<span>${escapeHtml(category)}</span></div>
            <a class="pas-product-title" href="${productUrl}">${escapeHtml(product.title || "Store Product")}</a>
            <p class="pas-product-desc">${escapeHtml(product.short_description || "A practical product selected for GovJobUpdates Store.")}</p>
            <div class="pas-product-price-row">
              <div class="pas-price">${escapeHtml(productPrice(product))}${Number(product.max_price_paise) > Number(product.min_price_paise) ? "<small> by variant</small>" : ""}</div>
              <span class="pas-stock-text ${stockClass}">${stockText}</span>
            </div>
            <a class="pas-product-action ${stock === 0 ? "is-disabled" : ""}" href="${stock === 0 ? "#" : productUrl}" ${stock === 0 ? 'aria-disabled="true" tabindex="-1"' : ""}><i class="fas ${stock === 0 ? "fa-ban" : "fa-eye"}" aria-hidden="true"></i> ${stock === 0 ? "Unavailable" : "View Product"}</a>
          </div>
        </article>`;
    }).join("");
  }

  function setCategory(slug) {
    state.category = clean(slug);
    renderCategories();
    renderProducts();
    $("#shopProducts")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function clearFilters() {
    state.category = "";
    state.search = "";
    const input = $("#pasProductSearch");
    if (input) input.value = "";
    const clear = $("#pasSearchClear");
    if (clear) clear.hidden = true;
    renderCategories();
    renderProducts();
  }

  async function loadProducts() {
    state.loading = true;
    $("#pasLoadingState")?.removeAttribute("hidden");
    $("#pasProductGrid")?.setAttribute("hidden", "");
    $("#pasErrorState")?.setAttribute("hidden", "");
    $("#pasEmptyState")?.setAttribute("hidden", "");

    try {
      const response = await fetch(`${STORE_API_BASE}/products.php?limit=60`, {
        method: "GET",
        mode: "cors",
        cache: "no-store",
        credentials: "omit",
        headers: { "X-Requested-With": "XMLHttpRequest" }
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success || !Array.isArray(result.products)) {
        throw new Error(result?.message || "Store products could not be loaded.");
      }
      state.products = result.products;
      state.categories = Array.isArray(result.categories) ? result.categories : [];
      renderCategories();
      renderProducts();
      $("#pasLoadingState")?.setAttribute("hidden", "");
      if (state.products.length) $("#pasProductGrid")?.removeAttribute("hidden");
    } catch (error) {
      $("#pasLoadingState")?.setAttribute("hidden", "");
      $("#pasProductGrid")?.setAttribute("hidden", "");
      $("#pasErrorState")?.removeAttribute("hidden");
      const label = $("#pasResultsLabel");
      if (label) label.textContent = "Live catalogue unavailable";
      console.error("GovJobUpdates Store:", error);
    } finally {
      state.loading = false;
    }
  }

  function bindControls() {
    const search = $("#pasProductSearch");
    const clearSearch = $("#pasSearchClear");
    search?.addEventListener("input", () => {
      state.search = clean(search.value);
      if (clearSearch) clearSearch.hidden = !state.search;
      renderProducts();
    });
    clearSearch?.addEventListener("click", () => {
      state.search = "";
      search.value = "";
      clearSearch.hidden = true;
      search.focus();
      renderProducts();
    });

    $("#pasProductSort")?.addEventListener("change", (event) => {
      state.sort = event.target.value;
      renderProducts();
    });

    $("#pasFilterButton")?.addEventListener("click", (event) => {
      const filters = $("#pasMobileFilters");
      if (!filters) return;
      const opening = filters.hidden;
      filters.hidden = !opening;
      event.currentTarget.setAttribute("aria-expanded", opening ? "true" : "false");
    });

    $$('[data-clear-filters]').forEach((button) => button.addEventListener("click", clearFilters));
    $$('[data-focus-search]').forEach((button) => button.addEventListener("click", () => {
      $("#shopProducts")?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => $("#pasProductSearch")?.focus(), 450);
    }));
    $("#pasRetryButton")?.addEventListener("click", loadProducts);
    window.addEventListener("storage", (event) => {
      if (event.key === CART_STORAGE_KEY || event.key === LEGACY_CART_STORAGE_KEY) updateCartCount();
    });
  }

  function init() {
    updateCartCount();
    bindControls();
    loadProducts();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
