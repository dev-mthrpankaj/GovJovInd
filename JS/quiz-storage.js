(function () {
    const memory = {};
    const prefix = 'sarkariOfficerQuiz.';

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
