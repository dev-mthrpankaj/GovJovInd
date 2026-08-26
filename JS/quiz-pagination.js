/* =========================================================================
   GovJobUpdates — Quiz Set Pagination
   Purely additive: does not modify quizzes.js or its state. It watches the
   #quizSetList grid that quizzes.js renders into, and whenever the cards
   inside it change (new subject, search, etc.) it slices them into pages
   of 9 and injects a pager (numbers + prev/next) right below the grid.
   Load this AFTER quizzes.js.
   ========================================================================= */
(function () {
    "use strict";

    const PAGE_SIZE = 9;

    /*
       Responsive quiz-media sizing + authoritative multiline rendering.
       The multiline rules intentionally use !important because this file is
       loaded last and must protect author-entered line breaks from later
       theme/layout overrides. This keeps Admin Preview and the live attempt
       screen visually consistent for Assertion/Reason, passages and lists.
    */
    function installResponsiveMediaStyles() {
        if (document.getElementById("gju-quiz-media-responsive-styles")) return;

        const style = document.createElement("style");
        style.id = "gju-quiz-media-responsive-styles";
        style.textContent = `
            /* Preserve question/explanation/option line breaks exactly as authored. */
            #questionText,
            .quiz-page .question-title,
            .quiz-page .option-label,
            .quiz-page .review-question-title,
            .quiz-page .review-answer,
            .quiz-page .review-explanation p {
                white-space: pre-wrap !important;
                overflow-wrap: anywhere;
                word-break: normal;
            }

            .quiz-media-question-image .quiz-media-frame,
            .quiz-media-review-question-image .quiz-media-frame,
            .quiz-media-explanation-image .quiz-media-frame {
                width: min(100%, 680px);
                max-width: 680px;
                margin-inline: auto;
            }

            .quiz-media-question-image img,
            .quiz-media-review-question-image img,
            .quiz-media-explanation-image img {
                width: auto;
                max-width: 100%;
                height: auto;
                max-height: min(56vh, 560px);
                margin-inline: auto;
                object-fit: contain;
            }

            @media (min-width: 1120px) {
                .quiz-media-question-image .quiz-media-frame,
                .quiz-media-review-question-image .quiz-media-frame,
                .quiz-media-explanation-image .quiz-media-frame {
                    width: min(100%, 640px);
                    max-width: 640px;
                }

                .quiz-media-question-image img,
                .quiz-media-review-question-image img,
                .quiz-media-explanation-image img {
                    max-height: min(54vh, 520px);
                }
            }

            @media (max-width: 767px) {
                .quiz-media-question-image .quiz-media-frame,
                .quiz-media-review-question-image .quiz-media-frame,
                .quiz-media-explanation-image .quiz-media-frame {
                    width: 100%;
                    max-width: 100%;
                    margin-inline: 0;
                    padding: 5px;
                }

                .quiz-media-question-image img,
                .quiz-media-review-question-image img,
                .quiz-media-explanation-image img {
                    width: 100%;
                    max-width: 100%;
                    max-height: none;
                }
            }

            @media (max-width: 425px) {
                .quiz-media-question-image .quiz-media-frame,
                .quiz-media-review-question-image .quiz-media-frame,
                .quiz-media-explanation-image .quiz-media-frame {
                    padding: 4px;
                    border-radius: 7px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function init() {
        installResponsiveMediaStyles();

        const list = document.getElementById("quizSetList");
        if (!list) return;

        let currentPage = 1;
        let pagerEl = null;

        function getCards() {
            return Array.prototype.slice.call(list.children).filter(function (el) {
                return el.classList.contains("quiz-set-card");
            });
        }

        function ensurePager() {
            if (pagerEl) return pagerEl;
            pagerEl = document.createElement("nav");
            pagerEl.className = "quiz-pager";
            pagerEl.setAttribute("aria-label", "Quiz set pages");
            list.insertAdjacentElement("afterend", pagerEl);
            return pagerEl;
        }

        function removePager() {
            if (pagerEl) {
                pagerEl.remove();
                pagerEl = null;
            }
        }

        function pageNumbers(total, current) {
            const pages = [];
            for (let i = 1; i <= total; i++) {
                if (i === 1 || i === total || Math.abs(i - current) <= 1) {
                    pages.push(i);
                } else if (pages[pages.length - 1] !== "...") {
                    pages.push("...");
                }
            }
            return pages;
        }

        function applyPage(cards, page) {
            const totalPages = Math.max(1, Math.ceil(cards.length / PAGE_SIZE));
            currentPage = Math.min(Math.max(1, page), totalPages);
            const start = (currentPage - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;

            cards.forEach(function (card, index) {
                const visible = index >= start && index < end;
                card.classList.toggle("quiz-card-page-hidden", !visible);
            });

            renderPager(cards.length, totalPages);
        }

        function renderPager(totalCount, totalPages) {
            if (totalCount <= PAGE_SIZE) {
                removePager();
                return;
            }

            const nav = ensurePager();
            const start = (currentPage - 1) * PAGE_SIZE + 1;
            const end = Math.min(currentPage * PAGE_SIZE, totalCount);

            let html = '<p class="quiz-pager-range">Showing <strong>' + start + '\u2013' + end +
                '</strong> of <strong>' + totalCount + '</strong> quiz sets</p><div class="quiz-pager-controls">';

            html += '<button type="button" class="quiz-pager-btn quiz-pager-arrow" data-page="' +
                (currentPage - 1) + '"' + (currentPage === 1 ? " disabled" : "") +
                ' aria-label="Previous page"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>';

            pageNumbers(totalPages, currentPage).forEach(function (p) {
                if (p === "...") {
                    html += '<span class="quiz-pager-ellipsis">\u2026</span>';
                } else {
                    html += '<button type="button" class="quiz-pager-btn' +
                        (p === currentPage ? " active" : "") + '" data-page="' + p + '"' +
                        (p === currentPage ? ' aria-current="page"' : "") +
                        '>' + p + '</button>';
                }
            });

            html += '<button type="button" class="quiz-pager-btn quiz-pager-arrow" data-page="' +
                (currentPage + 1) + '"' + (currentPage === totalPages ? " disabled" : "") +
                ' aria-label="Next page"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>';

            html += "</div>";
            nav.innerHTML = html;

            nav.querySelectorAll("[data-page]").forEach(function (btn) {
                btn.addEventListener("click", function () {
                    const target = parseInt(btn.getAttribute("data-page"), 10);
                    if (!target || target === currentPage) return;
                    applyPage(getCards(), target);
                    list.scrollIntoView({ behavior: "smooth", block: "start" });
                });
            });
        }

        function refresh() {
            const cards = getCards();
            if (!cards.length) {
                removePager();
                return;
            }
            applyPage(cards, 1);
        }

        const observer = new MutationObserver(refresh);
        observer.observe(list, { childList: true });

        refresh();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
}());
