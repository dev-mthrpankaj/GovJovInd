(function () {
    function initQuizMobileHeaderFix() {
        if (document.getElementById('gjuQuizMobileHeaderFix')) return;
        const style = document.createElement('style');
        style.id = 'gjuQuizMobileHeaderFix';
        style.textContent = `
            @media (max-width: 767px) {
                body.page-loaded { transform: none !important; }
                body { padding-top: 68px !important; }
                header {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    width: 100% !important;
                    z-index: 100000 !important;
                    background: rgba(255,255,255,.98) !important;
                    transform: translateZ(0) !important;
                }
                header .header-container {
                    background: rgba(255,255,255,.98) !important;
                }
                header nav {
                    position: fixed !important;
                    top: 68px !important;
                    left: 0 !important;
                    right: 0 !important;
                    z-index: 99999 !important;
                    max-height: calc(100dvh - 68px) !important;
                    overflow-y: auto !important;
                    overscroll-behavior: contain !important;
                    -webkit-overflow-scrolling: touch !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initQuizMobileHeaderFix);
    } else {
        initQuizMobileHeaderFix();
    }

    const memory = {};
    const prefix = 'GovJobUpdatesQuiz.';

    function available() {
        try {
            const key = `${prefix}test`;
            localStorage.setItem(key, '1');
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            return false;
        }
    }

    const canUseLocalStorage = available();

    function read(key, fallback) {
        try {
            const raw = canUseLocalStorage ? localStorage.getItem(prefix + key) : memory[key];
            return raw ? JSON.parse(raw) : fallback;
        } catch (error) {
            return fallback;
        }
    }

    function write(key, value) {
        try {
            const raw = JSON.stringify(value);
            if (canUseLocalStorage) {
                localStorage.setItem(prefix + key, raw);
            } else {
                memory[key] = raw;
            }
            return true;
        } catch (error) {
            memory[key] = JSON.stringify(value);
            return false;
        }
    }

    function remove(key) {
        try {
            if (canUseLocalStorage) {
                localStorage.removeItem(prefix + key);
            }
            delete memory[key];
        } catch (error) {
            delete memory[key];
        }
    }

    function clearHistory() {
        write('attempts', []);
        write('performance', {});
    }

    window.QuizStorage = {
        read,
        write,
        remove,
        clearHistory,
        isPersistent: canUseLocalStorage
    };
})();
