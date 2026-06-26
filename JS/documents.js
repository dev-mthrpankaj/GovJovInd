const IMAGE_MAX_BYTES = 8 * 1024 * 1024;
const PDF_MAX_BYTES = 15 * 1024 * 1024;
const PDF_TOTAL_MAX_BYTES = 60 * 1024 * 1024;
const IMAGE_WARNING_PIXELS = 24 * 1000 * 1000;
const IMAGE_MAX_PROCESS_PIXELS = 48 * 1000 * 1000;
const IMAGE_MAX_OUTPUT_PIXELS = 36 * 1000 * 1000;
const MM_TO_POINTS = 2.83465;
const READABLE_IMAGE_TYPES = new Set([
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/avif',
    'image/gif',
    'image/bmp',
    'image/svg+xml'
]);
const READABLE_IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'bmp', 'svg']);
const OUTPUT_IMAGE_FORMATS = {
    jpg: { mime: 'image/jpeg', extension: 'jpg', label: 'JPG' },
    png: { mime: 'image/png', extension: 'png', label: 'PNG' },
    webp: { mime: 'image/webp', extension: 'webp', label: 'WEBP' },
    avif: { mime: 'image/avif', extension: 'avif', label: 'AVIF' }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function formatFileSize(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 Bytes';
    const units = ['Bytes', 'KB', 'MB', 'GB'];
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 2)} ${units[index]}`;
}

function showMessage(box, type, message) {
    if (!box) return;
    box.className = `message-box ${type || 'info'}`;
    box.textContent = message;
}

function clearMessage(box) {
    if (!box) return;
    box.className = 'message-box hidden';
    box.textContent = '';
}

function setBusy(button, busy, text) {
    if (!button) return;
    if (busy) {
        if (!button.dataset.originalHtml) button.dataset.originalHtml = button.innerHTML;
        button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text || 'Processing...'}`;
        button.disabled = true;
        return;
    }
    button.innerHTML = button.dataset.originalHtml || button.innerHTML;
    delete button.dataset.originalHtml;
    button.disabled = false;
}

function sanitizeFilename(filename, fallback = 'GovJobUpdates_Document') {
    const cleaned = String(filename || '')
        .replace(/[\\/:*?"<>|]+/g, '-')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/^\.+|\.+$/g, '')
        .slice(0, 140);
    return cleaned || fallback;
}

function withExtension(filename, extension) {
    const safeExtension = String(extension || '').replace(/^\./, '').toLowerCase();
    const safeName = sanitizeFilename(filename);
    if (!safeExtension) return safeName;
    return safeName.toLowerCase().endsWith(`.${safeExtension}`) ? safeName : `${safeName}.${safeExtension}`;
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = sanitizeFilename(filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function bytesFromTarget(valueId, unitId) {
    const value = parseFloat($(valueId).value);
    if (!Number.isFinite(value) || value <= 0) return 0;
    return $(unitId).value === 'MB' ? value * 1024 * 1024 : value * 1024;
}

function bindTargetPresetButtons(scope, valueSelector, unitSelector) {
    const host = typeof scope === 'string' ? document.querySelector(scope) : scope;
    if (!host) return;

    host.querySelectorAll('[data-target-value][data-target-unit]').forEach((button) => {
        button.addEventListener('click', () => {
            const valueInput = $(valueSelector);
            const unitSelect = $(unitSelector);
            if (!valueInput || !unitSelect) return;
            valueInput.value = button.dataset.targetValue || '';
            unitSelect.value = button.dataset.targetUnit || 'KB';
        });
    });
}

function getImagePixelCount(image) {
    return (image.naturalWidth || image.width || 0) * (image.naturalHeight || image.height || 0);
}

function formatPixelCount(pixels) {
    if (!Number.isFinite(pixels) || pixels <= 0) return '0';
    if (pixels >= 1000000) return `${(pixels / 1000000).toFixed(1)}MP`;
    return `${Math.round(pixels / 1000)}K`;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function isImageFile(file) {
    if (!file) return false;
    return READABLE_IMAGE_TYPES.has(file.type) || READABLE_IMAGE_EXTENSIONS.has(getFileExtension(file.name));
}

function isPdfFile(file) {
    return file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'));
}

function ensurePdfLib() {
    if (!window.PDFLib || !window.PDFLib.PDFDocument) {
        throw new Error('PDF library failed to load. Please check your internet connection and reload this page.');
    }
}

function getPdfErrorMessage(error) {
    const message = error?.message || '';
    if (/password|encrypted/i.test(message)) {
        return 'This PDF appears to be password protected or encrypted. Please unlock it first, then try again.';
    }
    if (/invalid|damaged|corrupt/i.test(message)) {
        return 'This PDF could not be opened. It may be damaged or unsupported.';
    }
    return message || 'Processing failed. Please try a smaller file.';
}

function validateFile(file, options) {
    if (!file) return 'Please select a file first.';
    if (file.size <= 0) return 'This file looks empty. Please choose another file.';
    if (file.size > options.maxBytes) return `This file is too large. Maximum allowed size is ${formatFileSize(options.maxBytes)}.`;
    if (!options.isValidType(file)) return options.invalidTypeMessage;
    return '';
}

function setupUploadArea(area, input, options) {
    const pickFile = () => input.click();

    area.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            pickFile();
        }
    });

    ['dragenter', 'dragover'].forEach((eventName) => {
        area.addEventListener(eventName, (event) => {
            event.preventDefault();
            area.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
        area.addEventListener(eventName, () => area.classList.remove('dragover'));
    });

    area.addEventListener('drop', (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        handleFile(file, input, options);
    });

    input.addEventListener('change', () => {
        handleFile(input.files[0], input, options);
    });
}

function setupMultiUploadArea(area, input, options) {
    const pickFile = () => input.click();

    area.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            pickFile();
        }
    });

    ['dragenter', 'dragover'].forEach((eventName) => {
        area.addEventListener(eventName, (event) => {
            event.preventDefault();
            area.classList.add('dragover');
        });
    });

    ['dragleave', 'drop'].forEach((eventName) => {
        area.addEventListener(eventName, () => area.classList.remove('dragover'));
    });

    area.addEventListener('drop', (event) => {
        event.preventDefault();
        handleFiles(Array.from(event.dataTransfer.files || []), input, options);
    });

    input.addEventListener('change', () => {
        handleFiles(Array.from(input.files || []), input, options);
    });
}

function handleFiles(files, input, options) {
    clearMessage(options.messageBox);
    if (!files.length) {
        input.value = '';
        showMessage(options.messageBox, 'error', 'Please select at least one file.');
        options.onInvalid?.();
        return;
    }

    if (options.minFiles && files.length < options.minFiles) {
        input.value = '';
        showMessage(options.messageBox, 'error', `Please select at least ${options.minFiles} files.`);
        options.onInvalid?.();
        return;
    }

    if (options.maxFiles && files.length > options.maxFiles) {
        input.value = '';
        showMessage(options.messageBox, 'error', `Please select ${options.maxFiles} files or fewer.`);
        options.onInvalid?.();
        return;
    }

    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (options.maxTotalBytes && totalBytes > options.maxTotalBytes) {
        input.value = '';
        showMessage(options.messageBox, 'error', `Selected files are too large together. Maximum total size is ${formatFileSize(options.maxTotalBytes)}.`);
        options.onInvalid?.();
        return;
    }

    const badFile = files.find((file) => validateFile(file, options));
    if (badFile) {
        input.value = '';
        showMessage(options.messageBox, 'error', validateFile(badFile, options));
        options.onInvalid?.();
        return;
    }

    options.onValid(files);
}

function moveArrayItem(items, fromIndex, toIndex) {
    if (toIndex < 0 || toIndex >= items.length) return items;
    const copy = items.slice();
    const [item] = copy.splice(fromIndex, 1);
    copy.splice(toIndex, 0, item);
    return copy;
}

function parsePageRange(rangeText, pageCount) {
    const text = String(rangeText || '').trim();
    if (!text) return Array.from({ length: pageCount }, (_, index) => index);
    const pages = [];
    const seen = new Set();

    text.split(',').forEach((chunk) => {
        const part = chunk.trim();
        if (!part) return;
        const match = part.match(/^(\d+)(?:\s*-\s*(\d+))?$/);
        if (!match) throw new Error('Please enter page range like 1-3,5,8-10.');
        const start = Number(match[1]);
        const end = Number(match[2] || match[1]);
        if (start < 1 || end < 1 || start > pageCount || end > pageCount) {
            throw new Error(`Page range must be between 1 and ${pageCount}.`);
        }
        const step = start <= end ? 1 : -1;
        for (let page = start; step === 1 ? page <= end : page >= end; page += step) {
            const index = page - 1;
            if (!seen.has(index)) {
                pages.push(index);
                seen.add(index);
            }
        }
    });

    if (!pages.length) throw new Error('Please enter at least one page.');
    return pages;
}

function getPdfLibraryStatus() {
    const missing = [];
    if (!window.PDFLib || !window.PDFLib.PDFDocument) missing.push('PDF builder');
    if (!window.pdfjsLib) missing.push('PDF renderer');
    return missing;
}

function showPdfLibraryWarnings() {
    const missing = getPdfLibraryStatus();
    if (!missing.length) return;
    const message = `${missing.join(' and ')} library failed to load. PDF tools need internet/CDN access; image resize can still work. Please refresh after internet is stable.`;
    ['#pdf-message', '#resize-pdf-message', '#pdf-manager-message'].forEach((selector) => showMessage($(selector), 'error', message));
}

function handleFile(file, input, options) {
    clearMessage(options.messageBox);
    const error = validateFile(file, options);
    if (error) {
        input.value = '';
        showMessage(options.messageBox, 'error', error);
        options.onInvalid?.();
        return;
    }
    options.onValid(file);
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Unable to read this file. Please try again.'));
        reader.readAsDataURL(file);
    });
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('This image could not be opened in your browser. Please try JPG, PNG, WEBP, GIF, BMP, SVG, or AVIF.'));
        image.src = src;
    });
}

function canvasToBlob(canvas, mimeType, quality) {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error('Processing failed. Please try a smaller image or a different format.'));
                return;
            }
            if (mimeType !== 'image/png' && blob.type && blob.type !== mimeType) {
                reject(new Error('This browser does not support the selected output format.'));
                return;
            }
            resolve(blob);
        }, mimeType, quality);
    });
}

function getImageMime(format) {
    return OUTPUT_IMAGE_FORMATS[format]?.mime || OUTPUT_IMAGE_FORMATS.jpg.mime;
}

function getImageExtension(format) {
    return OUTPUT_IMAGE_FORMATS[format]?.extension || OUTPUT_IMAGE_FORMATS.jpg.extension;
}

function getImageFormatLabel(format) {
    return OUTPUT_IMAGE_FORMATS[format]?.label || OUTPUT_IMAGE_FORMATS.jpg.label;
}

function getFileExtension(fileName) {
    return (fileName.split('.').pop() || '').toLowerCase();
}

function getImageFormatFromFile(file) {
    const extension = getFileExtension(file?.name || '');
    if (file?.type === 'image/jpeg' || extension === 'jpg' || extension === 'jpeg') return 'jpg';
    if (file?.type === 'image/png' || extension === 'png') return 'png';
    if (file?.type === 'image/webp' || extension === 'webp') return 'webp';
    if (file?.type === 'image/avif' || extension === 'avif') return 'avif';
    return 'png';
}

function supportsImageOutputFormat(format) {
    if (format === 'jpg' || format === 'png') return true;
    const mimeType = getImageMime(format);
    if (!mimeType) return false;

    try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL(mimeType).startsWith(`data:${mimeType}`);
    } catch (error) {
        return false;
    }
}

function isLossyImageMime(mimeType) {
    return ['image/jpeg', 'image/webp', 'image/avif'].includes(mimeType);
}

function convertDimension(value, unit, dpi, basePixels) {
    if (unit === '%') return Math.round((basePixels * value) / 100);
    if (unit === 'mm') return Math.round((value * dpi) / 25.4);
    if (unit === 'cm') return Math.round((value * dpi) / 2.54);
    if (unit === 'inch') return Math.round(value * dpi);
    return Math.round(value);
}

function pixelsToDimension(pixels, unit, dpi, basePixels) {
    let value = pixels;
    if (unit === '%') value = basePixels ? (pixels / basePixels) * 100 : 100;
    if (unit === 'mm') value = (pixels * 25.4) / dpi;
    if (unit === 'cm') value = (pixels * 2.54) / dpi;
    if (unit === 'inch') value = pixels / dpi;
    return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

function initMobileMenu() {
    const menuToggle = $('#menuToggle');
    const mainNav = $('#mainNav');
    if (!menuToggle || !mainNav) return;

    const toggleMenu = () => {
        mainNav.classList.toggle('active');
        const isOpen = mainNav.classList.contains('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars', !isOpen);
        icon.classList.toggle('fa-times', isOpen);
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    };

    menuToggle.addEventListener('click', toggleMenu);
    menuToggle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });

    $$('nav ul li a').forEach((link) => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            menuToggle.setAttribute('aria-label', 'Open navigation');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function initToolTabs() {
    const tabs = $$('.tab-btn');
    const panels = $$('.tool-content');

    function activateTab(tab) {
        tabs.forEach((item) => {
            const isActive = item === tab;
            item.classList.toggle('active', isActive);
            item.setAttribute('aria-selected', String(isActive));
            item.tabIndex = isActive ? 0 : -1;
        });

        panels.forEach((panel) => {
            const isActive = panel.id === tab.dataset.tab;
            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
        });
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => activateTab(tab));
        tab.addEventListener('keydown', (event) => {
            if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
            event.preventDefault();
            let nextIndex = index;
            if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
            if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
            if (event.key === 'Home') nextIndex = 0;
            if (event.key === 'End') nextIndex = tabs.length - 1;
            tabs[nextIndex].focus();
            activateTab(tabs[nextIndex]);
        });
    });
}

function initImageResizer() {
    const messageBox = $('#image-message');
    const fileInput = $('#image-upload');
    const previewContainer = $('#image-preview-container');
    const actionBtns = $('#image-action-btns');
    const downloadArea = $('#image-download-area');
    const originalPreview = $('#image-preview');
    const resizedPreview = $('#resized-image-preview');
    const resizeBtn = $('#resize-image-btn');
    const resetBtn = $('#reset-image-btn');
    const downloadBtn = $('#download-image-btn');
    const qualityInput = $('#image-quality');
    const qualityValue = $('#image-quality-value');
    const widthInput = $('#image-width');
    const heightInput = $('#image-height');
    const widthUnitSelect = $('#image-width-unit');
    const heightUnitSelect = $('#image-height-unit');
    const dpiInput = $('#image-resolution');
    const formatSelect = $('#image-format');
    const sizeModeSelect = $('#image-size-mode');
    const lockRatioInput = $('#image-lock-ratio');
    const backgroundSelect = $('#image-background');
    const bgColorGroup = $('#image-bg-color-group');
    const bgColorInput = $('#image-bg-color');
    const rotateLeftBtn = $('#rotate-left-btn');
    const rotateRightBtn = $('#rotate-right-btn');
    const flipHorizontalBtn = $('#flip-horizontal-btn');
    const flipVerticalBtn = $('#flip-vertical-btn');

    let originalFile = null;
    let originalImage = null;
    let resizedBlob = null;
    let resizedUrl = '';
    let resizedFormat = 'jpg';
    let syncingDimensions = false;
    let rotation = 0;
    let flipHorizontal = false;
    let flipVertical = false;

    const presets = {
        passport: { label: 'Passport Photo', width: 3.5, height: 4.5, unit: 'cm', dpi: 300, format: 'jpg', quality: 90, target: 100, mode: 'exact', lockRatio: false },
        signature: { label: 'Signature', width: 4, height: 2, unit: 'cm', dpi: 300, format: 'jpg', quality: 90, target: 50, mode: 'exact', lockRatio: false },
        small: { label: 'Small Upload', width: 800, height: 800, unit: 'px', dpi: 300, format: 'jpg', quality: 82, target: 50, mode: 'contain', lockRatio: true },
        form: { label: 'Form Upload', width: 1000, height: 1000, unit: 'px', dpi: 300, format: 'jpg', quality: 85, target: 100, mode: 'contain', lockRatio: true },
        photo20: { label: 'Photo 20 KB', width: 3.5, height: 4.5, unit: 'cm', dpi: 200, format: 'jpg', quality: 72, target: 20, mode: 'exact', lockRatio: false },
        photo50: { label: 'Photo 50 KB', width: 3.5, height: 4.5, unit: 'cm', dpi: 250, format: 'jpg', quality: 82, target: 50, mode: 'exact', lockRatio: false },
        signature20: { label: 'Signature 20 KB', width: 4, height: 2, unit: 'cm', dpi: 200, format: 'jpg', quality: 72, target: 20, mode: 'exact', lockRatio: false },
        signature50: { label: 'Signature 50 KB', width: 4, height: 2, unit: 'cm', dpi: 250, format: 'jpg', quality: 82, target: 50, mode: 'exact', lockRatio: false },
        sscPhoto: { label: 'SSC Photo', width: 3.5, height: 4.5, unit: 'cm', dpi: 300, format: 'jpg', quality: 88, target: 50, mode: 'exact', lockRatio: false },
        railwayPhoto: { label: 'Railway Photo', width: 35, height: 45, unit: 'mm', dpi: 300, format: 'jpg', quality: 86, target: 50, mode: 'exact', lockRatio: false },
        upssscPhoto: { label: 'UPSSSC Photo', width: 600, height: 800, unit: 'px', dpi: 300, format: 'jpg', quality: 84, target: 100, mode: 'cover', lockRatio: false },
        policePhoto: { label: 'Police Form Photo', width: 600, height: 800, unit: 'px', dpi: 300, format: 'jpg', quality: 84, target: 100, mode: 'cover', lockRatio: false },
        aadhaarPan: { label: 'Aadhaar/PAN Upload', width: 1000, height: 700, unit: 'px', dpi: 200, format: 'jpg', quality: 82, target: 200, mode: 'contain', lockRatio: true }
    };

    setupUploadArea($('#image-upload-area'), fileInput, {
        maxBytes: IMAGE_MAX_BYTES,
        isValidType: isImageFile,
        invalidTypeMessage: 'Please upload a supported image: JPG, PNG, WEBP, AVIF, GIF, BMP, or SVG.',
        messageBox,
        onInvalid: resetImageResult,
        onValid: handleImageUpload
    });

    refreshImageFormatOptions();

    $$('.preset-btn').forEach((button) => {
        button.addEventListener('click', () => applyPreset(button.dataset.preset));
    });

    qualityInput.addEventListener('input', updateImageQualityLabel);
    formatSelect.addEventListener('change', updateImageFormatControls);
    backgroundSelect.addEventListener('change', updateBackgroundControls);
    widthInput.addEventListener('input', () => syncLockedImageDimension('width'));
    heightInput.addEventListener('input', () => syncLockedImageDimension('height'));
    lockRatioInput.addEventListener('change', () => {
        if (lockRatioInput.checked) syncLockedImageDimension('width');
    });
    rotateLeftBtn?.addEventListener('click', () => updateImageTransform(-90));
    rotateRightBtn?.addEventListener('click', () => updateImageTransform(90));
    flipHorizontalBtn?.addEventListener('click', () => updateImageTransform(0, 'horizontal'));
    flipVerticalBtn?.addEventListener('click', () => updateImageTransform(0, 'vertical'));

    resizeBtn.addEventListener('click', resizeImage);
    resetBtn.addEventListener('click', resetImage);
    downloadBtn.addEventListener('click', () => {
        if (!resizedBlob) {
            showMessage(messageBox, 'error', 'Please resize an image before downloading.');
            return;
        }
        const extension = getImageExtension(resizedFormat);
        downloadBlob(resizedBlob, withExtension(`GovJobUpdates_Resized_${Date.now()}`, extension));
    });

    updateImageQualityLabel();
    updateImageFormatControls();
    updateBackgroundControls();
    bindTargetPresetButtons('[data-target-for="image"]', '#target-size-value', '#target-size-unit');

    function refreshImageFormatOptions() {
        Array.from(formatSelect.options).forEach((option) => {
            if (!option.dataset.label) option.dataset.label = option.textContent;
            if (option.value === 'original') return;
            const supported = supportsImageOutputFormat(option.value);
            option.disabled = !supported;
            option.textContent = supported ? option.dataset.label : `${option.dataset.label} (not supported)`;
        });

        if (formatSelect.selectedOptions[0]?.disabled) {
            formatSelect.value = 'jpg';
        }
    }

    function updateImageQualityLabel() {
        qualityValue.textContent = qualityInput.disabled ? 'Lossless' : `${qualityInput.value}%`;
    }

    function updateImageFormatControls() {
        const outputFormat = resolveImageOutputFormat(formatSelect.value);
        const lossy = isLossyImageMime(getImageMime(outputFormat));
        qualityInput.disabled = !lossy;
        updateImageQualityLabel();
    }

    function updateBackgroundControls() {
        bgColorGroup.classList.toggle('hidden', backgroundSelect.value !== 'custom');
    }

    function updateImageTransform(degrees, flipAxis) {
        rotation = ((rotation + degrees) % 360 + 360) % 360;
        if (flipAxis === 'horizontal') flipHorizontal = !flipHorizontal;
        if (flipAxis === 'vertical') flipVertical = !flipVertical;
        applyImageTransformPreview();
        resetImageResult();
        showMessage(messageBox, 'info', 'Rotate/flip applied. Press Resize Image to generate the updated download.');
    }

    function applyImageTransformPreview() {
        const scaleX = flipHorizontal ? -1 : 1;
        const scaleY = flipVertical ? -1 : 1;
        originalPreview.style.transform = `rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`;
        originalPreview.style.transition = 'transform 0.18s ease';
        flipHorizontalBtn?.classList.toggle('is-active', flipHorizontal);
        flipVerticalBtn?.classList.toggle('is-active', flipVertical);
    }

    function resetImageTransform() {
        rotation = 0;
        flipHorizontal = false;
        flipVertical = false;
        applyImageTransformPreview();
    }

    function syncLockedImageDimension(source) {
        if (!lockRatioInput.checked || !originalImage || syncingDimensions) return;

        const sourceWidth = originalImage.naturalWidth || originalImage.width;
        const sourceHeight = originalImage.naturalHeight || originalImage.height;
        const ratio = sourceWidth / sourceHeight;
        const dpi = parseInt(dpiInput.value, 10) || 300;

        syncingDimensions = true;
        try {
            if (source === 'width') {
                const widthPx = convertDimension(parseFloat(widthInput.value), widthUnitSelect.value, dpi, sourceWidth);
                if (!Number.isFinite(widthPx) || widthPx < 1) return;
                const heightPx = widthPx / ratio;
                heightInput.value = pixelsToDimension(heightPx, heightUnitSelect.value, dpi, sourceHeight);
                return;
            }

            const heightPx = convertDimension(parseFloat(heightInput.value), heightUnitSelect.value, dpi, sourceHeight);
            if (!Number.isFinite(heightPx) || heightPx < 1) return;
            const widthPx = heightPx * ratio;
            widthInput.value = pixelsToDimension(widthPx, widthUnitSelect.value, dpi, sourceWidth);
        } finally {
            syncingDimensions = false;
        }
    }

    function resolveImageOutputFormat(requestedFormat) {
        const format = requestedFormat === 'original' ? getImageFormatFromFile(originalFile) : requestedFormat;
        if (supportsImageOutputFormat(format)) return format;
        return 'jpg';
    }

    function applyPreset(name) {
        const preset = presets[name];
        if (!preset) return;

        const useOriginalDimensions = ['small', 'form'].includes(name) && originalImage;
        const width = useOriginalDimensions ? originalImage.width : preset.width;
        const height = useOriginalDimensions ? originalImage.height : preset.height;

        widthInput.value = width;
        heightInput.value = height;
        widthUnitSelect.value = preset.unit;
        heightUnitSelect.value = preset.unit;
        dpiInput.value = preset.dpi;
        formatSelect.value = preset.format;
        sizeModeSelect.value = preset.mode;
        lockRatioInput.checked = preset.lockRatio;
        backgroundSelect.value = 'white';
        qualityInput.value = preset.quality;
        $('#target-size-value').value = preset.target;
        $('#target-size-unit').value = 'KB';
        updateImageFormatControls();
        updateBackgroundControls();
        showMessage(messageBox, 'info', `${preset.label} preset applied. Official portal ki exact limit hamesha notification/portal se verify karein.`);
    }

    async function handleImageUpload(file) {
        try {
            resetImageResult();
            resetImageTransform();
            originalFile = file;
            const dataUrl = await readFileAsDataUrl(file);
            originalImage = await loadImage(dataUrl);
            const sourcePixels = getImagePixelCount(originalImage);

            if (sourcePixels > IMAGE_MAX_PROCESS_PIXELS) {
                resetImage();
                showMessage(messageBox, 'error', `This image is very large (${formatPixelCount(sourcePixels)} pixels). Browser freeze ho sakta hai. Please pehle dimensions reduce karke smaller image upload karein.`);
                return;
            }

            originalPreview.src = dataUrl;
            $('#image-file-name').textContent = file.name;
            $('#original-image-size').textContent = formatFileSize(file.size);
            $('#result-original-image-size').textContent = formatFileSize(file.size);
            widthInput.value = originalImage.width;
            heightInput.value = originalImage.height;
            widthUnitSelect.value = 'px';
            heightUnitSelect.value = 'px';
            $('#new-image-size').textContent = '-';
            $('#new-image-dimensions').textContent = '-';
            $('#new-image-format').textContent = '-';
            $('#new-image-reduction').textContent = '-';
            $('#new-image-target-status').textContent = '-';
            updateImageFormatControls();

            $('#image-file-summary').classList.remove('hidden');
            previewContainer.classList.remove('hidden');
            actionBtns.classList.remove('hidden');
            const warning = sourcePixels > IMAGE_WARNING_PIXELS
                ? ` Image dimensions are large (${formatPixelCount(sourcePixels)} pixels). Browser slow/freeze ho sakta hai; resize output ko smaller dimensions par rakhein.`
                : '';
            showMessage(messageBox, warning ? 'info' : 'success', `Image ready. Choose format, mode, dimensions, and target size.${warning}`);
        } catch (error) {
            showMessage(messageBox, 'error', error.message || 'Unable to open this image.');
        }
    }

    function resetImageResult() {
        if (resizedUrl) URL.revokeObjectURL(resizedUrl);
        resizedUrl = '';
        resizedBlob = null;
        resizedFormat = 'jpg';
        downloadArea.classList.add('hidden');
        resizedPreview.removeAttribute('src');
        $('#new-image-reduction').textContent = '-';
    }

    function resetImage() {
        fileInput.value = '';
        originalFile = null;
        originalImage = null;
        originalPreview.removeAttribute('src');
        resetImageTransform();
        $('#image-file-summary').classList.add('hidden');
        previewContainer.classList.add('hidden');
        actionBtns.classList.add('hidden');
        resetImageResult();
        clearMessage(messageBox);
    }

    async function resizeImage() {
        if (!originalImage || !originalFile) {
            showMessage(messageBox, 'error', 'Please upload an image before resizing.');
            return;
        }

        const sourceWidth = originalImage.naturalWidth || originalImage.width;
        const sourceHeight = originalImage.naturalHeight || originalImage.height;
        const transformedSize = getTransformedImageSize(sourceWidth, sourceHeight);
        const width = parseFloat(widthInput.value);
        const height = parseFloat(heightInput.value);
        const dpi = parseInt(dpiInput.value, 10) || 300;
        const targetWidth = convertDimension(width, widthUnitSelect.value, dpi, transformedSize.width);
        const targetHeight = convertDimension(height, heightUnitSelect.value, dpi, transformedSize.height);
        const outputFormat = resolveImageOutputFormat(formatSelect.value);
        const mimeType = getImageMime(outputFormat);
        const targetBytes = bytesFromTarget('#target-size-value', '#target-size-unit');

        if (!Number.isFinite(targetWidth) || !Number.isFinite(targetHeight) || targetWidth < 1 || targetHeight < 1) {
            showMessage(messageBox, 'error', 'Please enter valid width and height values.');
            return;
        }

        const outputPixels = targetWidth * targetHeight;
        if (outputPixels > IMAGE_MAX_OUTPUT_PIXELS) {
            showMessage(messageBox, 'error', `Output dimensions are too large (${formatPixelCount(outputPixels)} pixels). Browser freeze ho sakta hai. Please width/height reduce karein.`);
            return;
        }

        setBusy(resizeBtn, true, 'Processing...');
        clearMessage(messageBox);

        try {
            const layout = getImageResizeLayout(transformedSize.width, transformedSize.height, targetWidth, targetHeight);
            const background = getImageCanvasBackground(outputFormat);
            const canvas = document.createElement('canvas');
            canvas.width = layout.canvasWidth;
            canvas.height = layout.canvasHeight;
            const context = canvas.getContext('2d', { alpha: background === 'transparent' });

            if (!context) throw new Error('Canvas is not available in this browser.');

            if (background !== 'transparent') {
                context.fillStyle = background;
                context.fillRect(0, 0, canvas.width, canvas.height);
            }

            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';
            drawTransformedImage(context, originalImage, layout);

            const initialQuality = qualityInput.disabled ? 1 : parseInt(qualityInput.value, 10) / 100;
            const result = await createTargetImageBlob(canvas, mimeType, initialQuality, targetBytes);
            resizedBlob = result.blob;
            resizedFormat = outputFormat;

            if (resizedUrl) URL.revokeObjectURL(resizedUrl);
            resizedUrl = URL.createObjectURL(resizedBlob);
            resizedPreview.src = resizedUrl;
            $('#new-image-size').textContent = formatFileSize(resizedBlob.size);
            $('#new-image-dimensions').textContent = `${canvas.width} x ${canvas.height} px`;
            $('#new-image-format').textContent = getImageFormatLabel(outputFormat);
            $('#new-image-reduction').textContent = buildImageReductionText(originalFile.size, resizedBlob.size);
            $('#new-image-target-status').textContent = buildImageTargetStatus(result, targetBytes, outputFormat);
            downloadArea.classList.remove('hidden');

            const targetNote = targetBytes && resizedBlob.size > targetBytes * 1.12
                ? ' Target size is too low for these dimensions and format.'
                : '';
            const fallbackNote = formatSelect.value !== outputFormat && formatSelect.value !== 'original'
                ? ` ${getImageFormatLabel(formatSelect.value)} is not supported in this browser, so ${getImageFormatLabel(outputFormat)} was used.`
                : '';
            showMessage(messageBox, 'success', `Image resized successfully.${targetNote}${fallbackNote}`);
        } catch (error) {
            showMessage(messageBox, 'error', error.message || 'Processing failed. Please try a smaller image.');
        } finally {
            setBusy(resizeBtn, false);
        }
    }

    function getTransformedImageSize(width, height) {
        const quarterTurn = rotation === 90 || rotation === 270;
        return quarterTurn ? { width: height, height: width } : { width, height };
    }

    function drawTransformedImage(context, image, layout) {
        const quarterTurn = rotation === 90 || rotation === 270;
        const drawWidth = quarterTurn ? layout.drawHeight : layout.drawWidth;
        const drawHeight = quarterTurn ? layout.drawWidth : layout.drawHeight;
        const centerX = layout.drawX + layout.drawWidth / 2;
        const centerY = layout.drawY + layout.drawHeight / 2;

        context.save();
        context.translate(centerX, centerY);
        context.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
        context.rotate((rotation * Math.PI) / 180);
        context.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        context.restore();
    }

    function getImageResizeLayout(sourceWidth, sourceHeight, targetWidth, targetHeight) {
        const mode = sizeModeSelect.value;
        if (mode === 'contain') {
            const ratio = Math.min(targetWidth / sourceWidth, targetHeight / sourceHeight);
            const drawWidth = Math.max(1, Math.round(sourceWidth * ratio));
            const drawHeight = Math.max(1, Math.round(sourceHeight * ratio));
            return {
                canvasWidth: drawWidth,
                canvasHeight: drawHeight,
                drawX: 0,
                drawY: 0,
                drawWidth,
                drawHeight
            };
        }

        if (mode === 'cover') {
            const ratio = Math.max(targetWidth / sourceWidth, targetHeight / sourceHeight);
            const drawWidth = Math.max(1, Math.round(sourceWidth * ratio));
            const drawHeight = Math.max(1, Math.round(sourceHeight * ratio));
            return {
                canvasWidth: targetWidth,
                canvasHeight: targetHeight,
                drawX: Math.round((targetWidth - drawWidth) / 2),
                drawY: Math.round((targetHeight - drawHeight) / 2),
                drawWidth,
                drawHeight
            };
        }

        return {
            canvasWidth: targetWidth,
            canvasHeight: targetHeight,
            drawX: 0,
            drawY: 0,
            drawWidth: targetWidth,
            drawHeight: targetHeight
        };
    }

    function getImageCanvasBackground(outputFormat) {
        const selection = backgroundSelect.value;
        if (selection === 'transparent' && outputFormat !== 'jpg') return 'transparent';
        if (selection === 'black') return '#000000';
        if (selection === 'custom') return bgColorInput.value || '#ffffff';
        return '#ffffff';
    }

    async function createTargetImageBlob(canvas, mimeType, initialQuality, targetBytes) {
        let bestResult = {
            blob: await canvasToBlob(canvas, mimeType, initialQuality),
            quality: initialQuality
        };
        if (!targetBytes || !isLossyImageMime(mimeType)) return bestResult;

        let low = 0.2;
        let high = initialQuality;

        for (let i = 0; i < 8; i++) {
            const quality = (low + high) / 2;
            const blob = await canvasToBlob(canvas, mimeType, quality);
            if (Math.abs(blob.size - targetBytes) < Math.abs(bestResult.blob.size - targetBytes)) {
                bestResult = { blob, quality };
            }
            if (blob.size > targetBytes) {
                high = quality;
            } else {
                low = quality;
            }
        }

        return bestResult;
    }

    function buildImageTargetStatus(result, targetBytes, outputFormat) {
        const mimeType = getImageMime(outputFormat);
        const qualityText = isLossyImageMime(mimeType) ? `, ${Math.round(result.quality * 100)}% quality` : ', lossless';

        if (!targetBytes) {
            return `No target set${qualityText}.`;
        }

        if (result.blob.size <= targetBytes) {
            return `Within ${formatFileSize(targetBytes)}${qualityText}.`;
        }

        return `Above ${formatFileSize(targetBytes)}${qualityText}. Try smaller dimensions or JPG/WEBP.`;
    }

    function buildImageReductionText(originalBytes, outputBytes) {
        if (!Number.isFinite(originalBytes) || originalBytes <= 0 || !Number.isFinite(outputBytes)) return '-';
        if (outputBytes < originalBytes) {
            return `${((1 - outputBytes / originalBytes) * 100).toFixed(1)}% smaller`;
        }
        if (outputBytes === originalBytes) return 'Same size';
        return `${((outputBytes / originalBytes - 1) * 100).toFixed(1)}% larger`;
    }
}

function initImageToPdf() {
    const messageBox = $('#pdf-message');
    const fileInput = $('#pdf-upload');
    const previewContainer = $('#pdf-preview-container');
    const actionBtns = $('#pdf-action-btns');
    const downloadArea = $('#pdf-download-area');
    const preview = $('#pdf-preview');
    const convertBtn = $('#convert-pdf-btn');
    const resetBtn = $('#reset-pdf-btn');
    const downloadBtn = $('#download-pdf-btn');
    const pageSizeSelect = $('#pdf-page-size');
    const qualityInput = $('#image-pdf-quality');
    const qualityValue = $('#image-pdf-quality-value');
    const imageList = $('#image-pdf-list');
    const orderActions = $('#image-pdf-order-actions');
    const clearListBtn = $('#clear-image-pdf-list-btn');

    let imageItems = [];
    let pdfBlob = null;

    setupMultiUploadArea($('#pdf-upload-area'), fileInput, {
        maxBytes: IMAGE_MAX_BYTES,
        maxFiles: 20,
        maxTotalBytes: PDF_TOTAL_MAX_BYTES,
        isValidType: isImageFile,
        invalidTypeMessage: 'Please upload a supported image: JPG, PNG, WEBP, AVIF, GIF, BMP, or SVG.',
        messageBox,
        onInvalid: resetPdfResult,
        onValid: handlePdfImagesUpload
    });

    pageSizeSelect.addEventListener('change', () => {
        $('#pdf-custom-size').classList.toggle('hidden', pageSizeSelect.value !== 'custom');
    });

    qualityInput.addEventListener('input', updatePdfQualityLabel);
    convertBtn.addEventListener('click', convertToPdf);
    resetBtn.addEventListener('click', resetPdf);
    clearListBtn?.addEventListener('click', resetPdf);
    downloadBtn.addEventListener('click', () => {
        if (!pdfBlob) {
            showMessage(messageBox, 'error', 'Please convert an image before downloading.');
            return;
        }
        downloadBlob(pdfBlob, withExtension(`GovJobUpdates_Image_To_PDF_${Date.now()}`, 'pdf'));
    });

    updatePdfQualityLabel();
    bindTargetPresetButtons('[data-target-for="image-pdf"]', '#image-pdf-target-size-value', '#image-pdf-target-size-unit');

    async function handlePdfImagesUpload(files) {
        try {
            resetPdfResult();
            const loaded = [];
            for (const file of files) {
                const dataUrl = await readFileAsDataUrl(file);
                const image = await loadImage(dataUrl);
                const sourcePixels = getImagePixelCount(image);
                if (sourcePixels > IMAGE_MAX_PROCESS_PIXELS) {
                    resetPdf();
                    showMessage(messageBox, 'error', `${file.name} is very large (${formatPixelCount(sourcePixels)} pixels). Browser freeze ho sakta hai. Please pehle dimensions reduce karke smaller image upload karein.`);
                    return;
                }
                loaded.push({ file, dataUrl, image, sourcePixels });
            }

            imageItems = loaded;
            preview.src = imageItems[0].dataUrl;
            $('#pdf-file-name').textContent = imageItems.length === 1 ? imageItems[0].file.name : `${imageItems.length} images selected`;
            $('#original-pdf-size').textContent = formatFileSize(imageItems.reduce((sum, item) => sum + item.file.size, 0));
            $('#new-pdf-size').textContent = '-';
            $('#new-pdf-dimensions').textContent = '-';
            $('#new-pdf-pages').textContent = '-';
            $('#new-pdf-target-status').textContent = '-';
            renderImagePdfList();
            $('#pdf-file-summary').classList.remove('hidden');
            imageList.classList.remove('hidden');
            orderActions.classList.remove('hidden');
            previewContainer.classList.remove('hidden');
            actionBtns.classList.remove('hidden');
            const largest = Math.max(...imageItems.map((item) => item.sourcePixels));
            const warning = largest > IMAGE_WARNING_PIXELS
                ? ` One or more images are large. Browser slow/freeze ho sakta hai; lower quality or smaller source image use karein.`
                : '';
            showMessage(messageBox, warning ? 'info' : 'success', `${imageItems.length} image${imageItems.length === 1 ? '' : 's'} ready. Arrange order, choose page size, and convert.${warning}`);
        } catch (error) {
            showMessage(messageBox, 'error', error.message || 'Unable to open this image.');
        }
    }

    function resetPdfResult() {
        pdfBlob = null;
        downloadArea.classList.add('hidden');
    }

    function resetPdf() {
        fileInput.value = '';
        imageItems = [];
        preview.removeAttribute('src');
        $('#pdf-file-summary').classList.add('hidden');
        imageList.classList.add('hidden');
        imageList.innerHTML = '';
        orderActions.classList.add('hidden');
        previewContainer.classList.add('hidden');
        actionBtns.classList.add('hidden');
        $('#new-pdf-pages').textContent = '-';
        resetPdfResult();
        clearMessage(messageBox);
    }

    function renderImagePdfList() {
        imageList.innerHTML = imageItems.map((item, index) => `
            <div class="file-row" data-index="${index}">
                <div class="file-row-info">
                    <strong>${index + 1}. ${escapeHtml(item.file.name)}</strong>
                    <span>${formatFileSize(item.file.size)} | ${item.image.width} x ${item.image.height} px</span>
                </div>
                <div class="file-row-actions">
                    <button type="button" data-action="up" aria-label="Move image up" ${index === 0 ? 'disabled' : ''}><i class="fas fa-arrow-up"></i></button>
                    <button type="button" data-action="down" aria-label="Move image down" ${index === imageItems.length - 1 ? 'disabled' : ''}><i class="fas fa-arrow-down"></i></button>
                    <button type="button" data-action="delete" aria-label="Remove image"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    imageList.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-action]');
        const row = event.target.closest('.file-row');
        if (!button || !row) return;
        const index = Number(row.dataset.index);
        const action = button.dataset.action;
        if (action === 'up') imageItems = moveArrayItem(imageItems, index, index - 1);
        if (action === 'down') imageItems = moveArrayItem(imageItems, index, index + 1);
        if (action === 'delete') imageItems.splice(index, 1);
        resetPdfResult();
        if (!imageItems.length) {
            resetPdf();
            showMessage(messageBox, 'info', 'Image list cleared.');
            return;
        }
        preview.src = imageItems[0].dataUrl;
        $('#pdf-file-name').textContent = imageItems.length === 1 ? imageItems[0].file.name : `${imageItems.length} images selected`;
        $('#original-pdf-size').textContent = formatFileSize(imageItems.reduce((sum, item) => sum + item.file.size, 0));
        renderImagePdfList();
    });

    function updatePdfQualityLabel() {
        qualityValue.textContent = `${qualityInput.value}%`;
    }

    async function convertToPdf() {
        if (!imageItems.length) {
            showMessage(messageBox, 'error', 'Please upload one or more images before converting to PDF.');
            return;
        }

        try {
            ensurePdfLib();
        } catch (error) {
            showMessage(messageBox, 'error', error.message);
            return;
        }

        setBusy(convertBtn, true, 'Creating PDF...');
        clearMessage(messageBox);

        try {
            const pageSize = getPdfPageSize();
            const targetBytes = bytesFromTarget('#image-pdf-target-size-value', '#image-pdf-target-size-unit');
            const initialQuality = clampPdfQuality(parseInt(qualityInput.value, 10) / 100);
            const result = await createTargetImagePdf(pageSize, targetBytes, initialQuality);
            pdfBlob = result.blob;
            $('#new-pdf-size').textContent = formatFileSize(pdfBlob.size);
            $('#new-pdf-dimensions').textContent = `${Math.round(pageSize.width / MM_TO_POINTS)} x ${Math.round(pageSize.height / MM_TO_POINTS)} mm`;
            $('#new-pdf-pages').textContent = String(imageItems.length);
            $('#new-pdf-target-status').textContent = buildImagePdfTargetStatus(result, targetBytes);
            downloadArea.classList.remove('hidden');

            if (targetBytes && pdfBlob.size > targetBytes) {
                showMessage(messageBox, 'info', `PDF created, but ${formatFileSize(targetBytes)} target is too small for this image.`);
            } else {
                showMessage(messageBox, 'success', 'PDF created successfully. Download button is ready.');
            }
        } catch (error) {
            showMessage(messageBox, 'error', error.message || 'Processing failed. Please try another image.');
        } finally {
            setBusy(convertBtn, false);
        }
    }

    function getPdfPageSize() {
        const sizes = {
            a4: { width: 210, height: 297 },
            letter: { width: 216, height: 279 },
            legal: { width: 216, height: 356 },
            custom: {
                width: parseFloat($('#pdf-width').value) || 210,
                height: parseFloat($('#pdf-height').value) || 297
            }
        };
        const selected = sizes[pageSizeSelect.value] || sizes.a4;
        let width = selected.width;
        let height = selected.height;
        if ($('#pdf-orientation').value === 'landscape') {
            [width, height] = [height, width];
        }
        return { width: width * MM_TO_POINTS, height: height * MM_TO_POINTS };
    }

    function getImagePdfLayout(pageSize, image) {
        const margin = Math.max(0, parseFloat($('#pdf-margin').value) || 0) * MM_TO_POINTS;
        const maxWidth = Math.max(10, pageSize.width - margin * 2);
        const maxHeight = Math.max(10, pageSize.height - margin * 2);
        const fitToPage = $('#pdf-fit-page').checked;
        const sourceWidth = image.naturalWidth || image.width;
        const sourceHeight = image.naturalHeight || image.height;

        let drawWidth = sourceWidth;
        let drawHeight = sourceHeight;
        const ratio = fitToPage
            ? Math.min(maxWidth / drawWidth, maxHeight / drawHeight)
            : Math.min(1, maxWidth / drawWidth, maxHeight / drawHeight);

        drawWidth *= ratio;
        drawHeight *= ratio;

        return {
            x: (pageSize.width - drawWidth) / 2,
            y: (pageSize.height - drawHeight) / 2,
            drawWidth,
            drawHeight
        };
    }

    function clampPdfQuality(value) {
        if (!Number.isFinite(value)) return 0.85;
        return Math.min(1, Math.max(0.3, value));
    }

    async function createTargetImagePdf(pageSize, targetBytes, initialQuality) {
        const maxPasses = targetBytes ? 7 : 1;
        let bestResult = null;
        let scale = 1;
        let quality = initialQuality;

        for (let pass = 1; pass <= maxPasses; pass++) {
            const result = await buildImagePdf(pageSize, quality, scale);
            bestResult = chooseBetterImagePdfCandidate(bestResult, result, targetBytes);

            if (!targetBytes || result.blob.size <= targetBytes) {
                return result;
            }

            const sizeRatio = Math.max(0.16, targetBytes / result.blob.size);
            if (quality > 0.44) {
                quality = Math.max(0.44, quality - (sizeRatio < 0.55 ? 0.16 : 0.1));
                continue;
            }

            scale = Math.max(0.28, scale * Math.max(0.62, Math.sqrt(sizeRatio) * 0.96));
            quality = 0.42;
        }

        return bestResult;
    }

    function chooseBetterImagePdfCandidate(bestResult, candidate, targetBytes) {
        if (!bestResult) return candidate;
        if (!targetBytes) return candidate;

        const candidateIsUnderTarget = candidate.blob.size <= targetBytes;
        const bestIsUnderTarget = bestResult.blob.size <= targetBytes;

        if (candidateIsUnderTarget && !bestIsUnderTarget) return candidate;
        if (candidateIsUnderTarget && bestIsUnderTarget) return bestResult;
        return candidate.blob.size < bestResult.blob.size ? candidate : bestResult;
    }

    async function buildImagePdf(pageSize, quality, scale) {
        const { PDFDocument } = window.PDFLib;
        const pdfDoc = await PDFDocument.create();
        for (const item of imageItems) {
            const page = pdfDoc.addPage([pageSize.width, pageSize.height]);
            const layout = getImagePdfLayout(pageSize, item.image);
            const imageBytes = await getImageBytesForPdf(item.image, quality, scale);
            const embeddedImage = await pdfDoc.embedJpg(imageBytes);

            page.drawImage(embeddedImage, {
                x: layout.x,
                y: layout.y,
                width: layout.drawWidth,
                height: layout.drawHeight
            });
        }

        const bytes = await pdfDoc.save({ useObjectStreams: true });
        return {
            blob: new Blob([bytes], { type: 'application/pdf' }),
            quality,
            scale
        };
    }

    async function getImageBytesForPdf(image, quality, scale) {
        const sourceWidth = image.naturalWidth || image.width;
        const sourceHeight = image.naturalHeight || image.height;
        const targetWidth = Math.max(1, Math.round(sourceWidth * scale));
        const targetHeight = Math.max(1, Math.round(sourceHeight * scale));
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Canvas is not available in this browser.');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.drawImage(image, 0, 0, targetWidth, targetHeight);
        const blob = await canvasToBlob(canvas, 'image/jpeg', quality);
        const bytes = await blob.arrayBuffer();
        canvas.width = 0;
        canvas.height = 0;
        return bytes;
    }

    function buildImagePdfTargetStatus(result, targetBytes) {
        const qualityText = `${Math.round(result.quality * 100)}% quality`;
        const scaleText = result.scale < 0.99 ? `, ${Math.round(result.scale * 100)}% pixels` : '';

        if (!targetBytes) {
            return `No target set, ${qualityText}${scaleText}.`;
        }

        if (result.blob.size <= targetBytes) {
            return `Within ${formatFileSize(targetBytes)}, ${qualityText}${scaleText}.`;
        }

        return `Above ${formatFileSize(targetBytes)}, ${qualityText}${scaleText}.`;
    }
}

function initPdfResizer() {
    const PDFJS_WORKER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    const messageBox = $('#resize-pdf-message');
    const fileInput = $('#resize-pdf-upload');
    const previewContainer = $('#resize-pdf-preview-container');
    const actionBtns = $('#resize-pdf-action-btns');
    const downloadArea = $('#resize-pdf-download-area');
    const resizeBtn = $('#resize-pdf-btn');
    const resetBtn = $('#reset-resize-pdf-btn');
    const downloadBtn = $('#download-resize-pdf-btn');
    const qualityInput = $('#pdf-quality');
    const qualityValue = $('#pdf-quality-value');
    const compressionSelect = $('#pdf-compression');
    const progress = $('#resize-pdf-progress');
    const progressBar = $('#resize-pdf-progress-bar');
    const progressText = $('#resize-pdf-progress-text');

    let originalPdf = null;
    let resizedPdf = null;

    setupUploadArea($('#resize-pdf-upload-area'), fileInput, {
        maxBytes: PDF_MAX_BYTES,
        isValidType: isPdfFile,
        invalidTypeMessage: 'Please upload a PDF file.',
        messageBox,
        onInvalid: resetPdfResizeResult,
        onValid: handlePdfUpload
    });

    qualityInput.addEventListener('input', updateQualityLabel);

    resizeBtn.addEventListener('click', resizePdf);
    resetBtn.addEventListener('click', resetResizePdf);
    downloadBtn.addEventListener('click', () => {
        if (!resizedPdf) {
            showMessage(messageBox, 'error', 'Please process a PDF before downloading.');
            return;
        }
        downloadBlob(resizedPdf, withExtension(`GovJobUpdates_Compressed_PDF_${Date.now()}`, 'pdf'));
    });

    updateQualityLabel();
    bindTargetPresetButtons('[data-target-for="pdf"]', '#pdf-target-size-value', '#pdf-target-size-unit');

    function handlePdfUpload(file) {
        originalPdf = file;
        resizedPdf = null;
        downloadBtn.disabled = false;
        $('#resize-pdf-name').textContent = file.name;
        $('#original-resize-pdf-size').textContent = formatFileSize(file.size);
        $('#result-original-resize-pdf-size').textContent = formatFileSize(file.size);
        $('#new-resize-pdf-size').textContent = '-';
        $('#pdf-reduction').textContent = '-';
        previewContainer.classList.remove('hidden');
        actionBtns.classList.remove('hidden');
        downloadArea.classList.add('hidden');
        hideProgress();
        showMessage(messageBox, 'success', 'PDF ready. Choose target size, compression level, and DPI.');
    }

    function resetPdfResizeResult() {
        resizedPdf = null;
        downloadBtn.disabled = false;
        downloadArea.classList.add('hidden');
        hideProgress();
    }

    function resetResizePdf() {
        fileInput.value = '';
        originalPdf = null;
        $('#resize-pdf-name').textContent = 'filename.pdf';
        previewContainer.classList.add('hidden');
        actionBtns.classList.add('hidden');
        resetPdfResizeResult();
        clearMessage(messageBox);
    }

    function updateQualityLabel() {
        qualityValue.textContent = `${qualityInput.value} DPI`;
    }

    function clampNumber(value, min, max, fallback) {
        const number = Number(value);
        if (!Number.isFinite(number)) return fallback;
        return Math.min(max, Math.max(min, number));
    }

    function setProgress(percent, text) {
        if (!progress || !progressBar || !progressText) return;
        progress.classList.remove('hidden');
        progressBar.style.width = `${clampNumber(percent, 0, 100, 0)}%`;
        progressText.textContent = text || 'Processing PDF...';
    }

    function hideProgress() {
        if (!progress || !progressBar || !progressText) return;
        progress.classList.add('hidden');
        progressBar.style.width = '0%';
        progressText.textContent = 'Ready';
    }

    function getCompressionSettings() {
        const selectedDpi = clampNumber(parseInt(qualityInput.value, 10), 72, 300, 150);
        const level = compressionSelect.value || 'medium';
        const presets = {
            low: { quality: 0.88, minQuality: 0.58, maxPixels: 5200000 },
            medium: { quality: 0.72, minQuality: 0.46, maxPixels: 3600000 },
            high: { quality: 0.58, minQuality: 0.34, maxPixels: 2400000 }
        };
        const preset = presets[level] || presets.medium;

        return {
            level,
            dpi: selectedDpi,
            quality: preset.quality,
            minQuality: preset.minQuality,
            maxPixels: preset.maxPixels
        };
    }

    function ensurePdfLibraries() {
        if (!window.PDFLib || !window.PDFLib.PDFDocument) {
            throw new Error('PDF library failed to load. Please check your internet connection and reload this page.');
        }
        if (!window.pdfjsLib) {
            throw new Error('PDF renderer failed to load. Please check your internet connection and reload this page.');
        }
        if (window.pdfjsLib.GlobalWorkerOptions && !window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
        }
    }

    async function resizePdf() {
        if (!originalPdf) {
            showMessage(messageBox, 'error', 'Please upload a PDF before resizing.');
            return;
        }

        try {
            ensurePdfLibraries();
        } catch (error) {
            showMessage(messageBox, 'error', error.message);
            return;
        }

        setBusy(resizeBtn, true, 'Processing...');
        clearMessage(messageBox);
        resizedPdf = null;
        downloadBtn.disabled = false;
        downloadArea.classList.add('hidden');

        try {
            const targetBytes = bytesFromTarget('#pdf-target-size-value', '#pdf-target-size-unit');
            const originalBytes = await originalPdf.arrayBuffer();
            const rasterResult = await createRasterCompressedPdf(originalBytes, targetBytes, getCompressionSettings());
            setProgress(96, 'Checking final PDF size...');

            const structureBlob = await optimizePdfStructure(originalBytes);
            const candidates = [rasterResult];
            if (structureBlob) {
                candidates.push({
                    blob: structureBlob,
                    method: 'structure',
                    pages: rasterResult.pages,
                    dpi: 0,
                    quality: 1,
                    attempts: rasterResult.attempts
                });
            }

            const bestResult = candidates.reduce((best, candidate) => (
                candidate.blob.size < best.blob.size ? candidate : best
            ));
            const isReduced = bestResult.blob.size < originalPdf.size;
            const reduction = isReduced ? ((1 - bestResult.blob.size / originalPdf.size) * 100) : 0;

            $('#new-resize-pdf-size').textContent = formatFileSize(bestResult.blob.size);

            if (isReduced) {
                resizedPdf = bestResult.blob;
                downloadBtn.disabled = false;
                $('#pdf-reduction').textContent = buildPdfResultText(bestResult, reduction, targetBytes);
                downloadArea.classList.remove('hidden');
                setProgress(100, 'Compression complete.');

                if (targetBytes && bestResult.blob.size > targetBytes) {
                    showMessage(messageBox, 'info', `PDF compressed, but ${formatFileSize(targetBytes)} target is too small for this file.`);
                } else {
                    showMessage(messageBox, 'success', 'PDF compressed successfully. Download button is ready.');
                }
            } else {
                resizedPdf = null;
                downloadBtn.disabled = true;
                $('#pdf-reduction').textContent = `No reduction. Best processed copy was ${formatFileSize(bestResult.blob.size)}; original is already smaller.`;
                downloadArea.classList.remove('hidden');
                setProgress(100, 'Original is already optimized.');
                showMessage(messageBox, 'info', 'No smaller PDF could be created with these settings. Try High compression or lower DPI for image-heavy PDFs.');
            }
        } catch (error) {
            hideProgress();
            showMessage(messageBox, 'error', getPdfErrorMessage(error));
        } finally {
            setBusy(resizeBtn, false);
        }
    }

    async function createRasterCompressedPdf(originalBytes, targetBytes, settings) {
        const attempts = [];
        const maxAttempts = targetBytes ? 4 : 1;
        let dpi = settings.dpi;
        let quality = settings.quality;

        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            const progressOffset = 8 + ((attempt - 1) * 84) / maxAttempts;
            const progressSpan = 84 / maxAttempts;
            const result = await renderPdfAsImages(originalBytes, {
                dpi,
                quality,
                maxPixels: settings.maxPixels,
                attempt,
                progressOffset,
                progressSpan,
                showAttempt: maxAttempts > 1
            });
            attempts.push(result);

            const targetReached = targetBytes && result.blob.size <= targetBytes;
            const cannotReduceMore = dpi <= 72 && quality <= settings.minQuality;
            if (!targetBytes || targetReached || cannotReduceMore) break;

            dpi = Math.max(72, Math.round(dpi * 0.82));
            quality = Math.max(settings.minQuality, Number((quality - 0.12).toFixed(2)));
        }

        const best = attempts.reduce((smallest, candidate) => (
            candidate.blob.size < smallest.blob.size ? candidate : smallest
        ));

        return {
            ...best,
            method: 'raster',
            attempts: attempts.length
        };
    }

    async function renderPdfAsImages(originalBytes, options) {
        const loadingTask = window.pdfjsLib.getDocument({
            data: originalBytes.slice(0),
            useSystemFonts: true,
            disableFontFace: false,
            isEvalSupported: false
        });
        const sourcePdf = await loadingTask.promise;
        const { PDFDocument } = window.PDFLib;
        const outputPdf = await PDFDocument.create();
        const pageCount = sourcePdf.numPages;

        try {
            for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
                const page = await sourcePdf.getPage(pageNumber);
                const baseViewport = page.getViewport({ scale: 1 });
                const scale = getRenderScale(baseViewport, options.dpi, options.maxPixels);
                const viewport = page.getViewport({ scale });
                const canvas = document.createElement('canvas');
                canvas.width = Math.max(1, Math.round(viewport.width));
                canvas.height = Math.max(1, Math.round(viewport.height));

                const context = canvas.getContext('2d', { alpha: false });
                if (!context) throw new Error('Canvas is not available in this browser.');

                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, canvas.width, canvas.height);
                context.imageSmoothingEnabled = true;
                context.imageSmoothingQuality = 'high';

                const pageProgress = options.progressOffset + (pageNumber / pageCount) * options.progressSpan;
                const attemptText = options.showAttempt ? `Pass ${options.attempt}: ` : '';
                setProgress(pageProgress, `${attemptText}Compressing page ${pageNumber} of ${pageCount}...`);

                await page.render({
                    canvasContext: context,
                    viewport,
                    background: 'rgb(255,255,255)'
                }).promise;

                const imageBlob = await canvasToBlob(canvas, 'image/jpeg', options.quality);
                const imageBytes = await imageBlob.arrayBuffer();
                const embeddedImage = await outputPdf.embedJpg(imageBytes);
                const outputPage = outputPdf.addPage([baseViewport.width, baseViewport.height]);
                outputPage.drawImage(embeddedImage, {
                    x: 0,
                    y: 0,
                    width: baseViewport.width,
                    height: baseViewport.height
                });

                page.cleanup();
                canvas.width = 0;
                canvas.height = 0;
            }

            setProgress(options.progressOffset + options.progressSpan, 'Building compressed PDF...');
            const bytes = await outputPdf.save({
                useObjectStreams: true,
                addDefaultPage: false,
                objectsPerTick: 25
            });

            return {
                blob: new Blob([bytes], { type: 'application/pdf' }),
                pages: pageCount,
                dpi: options.dpi,
                quality: options.quality
            };
        } finally {
            if (sourcePdf.destroy) {
                await sourcePdf.destroy();
            }
        }
    }

    function getRenderScale(viewport, dpi, maxPixels) {
        const requestedScale = dpi / 72;
        const requestedPixels = viewport.width * requestedScale * viewport.height * requestedScale;
        if (requestedPixels <= maxPixels) return requestedScale;
        return Math.max(0.45, Math.sqrt(maxPixels / (viewport.width * viewport.height)));
    }

    async function optimizePdfStructure(originalBytes) {
        try {
            const { PDFDocument } = window.PDFLib;
            const pdfDoc = await PDFDocument.load(originalBytes.slice(0), { ignoreEncryption: true });
            const bytes = await pdfDoc.save({
                useObjectStreams: true,
                addDefaultPage: false,
                objectsPerTick: 50
            });
            return new Blob([bytes], { type: 'application/pdf' });
        } catch (error) {
            return null;
        }
    }

    function buildPdfResultText(result, reduction, targetBytes) {
        const reductionText = `${reduction.toFixed(1)}% smaller`;
        const targetText = targetBytes && result.blob.size > targetBytes
            ? ` Target ${formatFileSize(targetBytes)} not reached.`
            : '';

        if (result.method === 'structure') {
            return `${reductionText}. PDF structure optimized without rasterizing.${targetText}`;
        }

        return `${reductionText}. ${result.pages} page${result.pages === 1 ? '' : 's'}, ${result.dpi} DPI, ${Math.round(result.quality * 100)}% JPEG quality.${targetText}`;
    }

    function getPdfErrorMessage(error) {
        const message = error?.message || '';
        if (/password|encrypted/i.test(message)) {
            return 'This PDF appears to be password protected or encrypted. Please unlock it first, then try again.';
        }
        if (/invalid|damaged|corrupt/i.test(message)) {
            return 'This PDF could not be opened. It may be damaged or unsupported.';
        }
        return message || 'Processing failed. Please try a smaller PDF or lower DPI.';
    }
}

function initPdfManager() {
    const messageBox = $('#pdf-manager-message');
    const mergeInput = $('#merge-pdf-upload');
    const mergeList = $('#merge-pdf-list');
    const mergeBtn = $('#merge-pdf-btn');
    const clearMergeBtn = $('#clear-merge-pdf-btn');
    const mergeDownloadArea = $('#merge-pdf-download-area');
    const mergeDownloadBtn = $('#download-merge-pdf-btn');
    const organizeInput = $('#organize-pdf-upload');
    const organizeSummary = $('#organize-pdf-summary');
    const splitControls = $('#split-pdf-controls');
    const splitActions = $('#split-pdf-action-btns');
    const pageOrderList = $('#pdf-page-order-list');
    const extractBtn = $('#extract-pdf-btn');
    const saveOrganizedBtn = $('#save-organized-pdf-btn');
    const resetOrganizeBtn = $('#reset-organize-pdf-btn');
    const organizeDownloadArea = $('#organize-pdf-download-area');
    const organizeDownloadBtn = $('#download-organize-pdf-btn');

    let mergeItems = [];
    let mergedPdfBlob = null;
    let organizeFile = null;
    let organizeBytes = null;
    let organizePageCount = 0;
    let pageOrder = [];
    let organizedPdfBlob = null;
    let organizedFilename = 'GovJobUpdates_Organized_PDF.pdf';

    setupMultiUploadArea($('#merge-pdf-upload-area'), mergeInput, {
        maxBytes: PDF_MAX_BYTES,
        maxTotalBytes: PDF_TOTAL_MAX_BYTES,
        minFiles: 2,
        maxFiles: 20,
        isValidType: isPdfFile,
        invalidTypeMessage: 'Please upload PDF files only.',
        messageBox,
        onInvalid: () => resetMerge({ keepMessage: true }),
        onValid: handleMergeFiles
    });

    setupUploadArea($('#organize-pdf-upload-area'), organizeInput, {
        maxBytes: PDF_MAX_BYTES,
        isValidType: isPdfFile,
        invalidTypeMessage: 'Please upload a PDF file.',
        messageBox,
        onInvalid: () => resetOrganize({ keepMessage: true }),
        onValid: handleOrganizeFile
    });

    mergeList.addEventListener('click', handleMergeListClick);
    pageOrderList.addEventListener('click', handlePageOrderClick);
    mergeBtn.addEventListener('click', mergePdfs);
    clearMergeBtn.addEventListener('click', resetMerge);
    extractBtn.addEventListener('click', extractPages);
    saveOrganizedBtn.addEventListener('click', saveOrganizedPdf);
    resetOrganizeBtn.addEventListener('click', resetOrganize);
    mergeDownloadBtn.addEventListener('click', () => {
        if (!mergedPdfBlob) {
            showMessage(messageBox, 'error', 'Please merge PDFs before downloading.');
            return;
        }
        downloadBlob(mergedPdfBlob, withExtension(`GovJobUpdates_Merged_PDF_${Date.now()}`, 'pdf'));
    });
    organizeDownloadBtn.addEventListener('click', () => {
        if (!organizedPdfBlob) {
            showMessage(messageBox, 'error', 'Please create an output PDF before downloading.');
            return;
        }
        downloadBlob(organizedPdfBlob, withExtension(organizedFilename || `GovJobUpdates_Organized_PDF_${Date.now()}`, 'pdf'));
    });

    async function handleMergeFiles(files) {
        try {
            ensurePdfLib();
            setBusy(mergeBtn, true, 'Reading...');
            clearMessage(messageBox);
            mergedPdfBlob = null;
            mergeDownloadArea.classList.add('hidden');
            mergeItems = [];

            for (const file of files) {
                const bytes = await file.arrayBuffer();
                const pdfDoc = await window.PDFLib.PDFDocument.load(bytes.slice(0), { ignoreEncryption: true });
                mergeItems.push({ file, bytes, pageCount: pdfDoc.getPageCount() });
            }

            renderMergeList();
            mergeList.classList.remove('hidden');
            showMessage(messageBox, 'success', `${mergeItems.length} PDFs ready. Arrange order and click Merge PDFs.`);
        } catch (error) {
            resetMerge();
            showMessage(messageBox, 'error', getPdfErrorMessage(error));
        } finally {
            setBusy(mergeBtn, false);
        }
    }

    function renderMergeList() {
        mergeList.innerHTML = mergeItems.map((item, index) => `
            <div class="file-row" data-index="${index}">
                <div class="file-row-info">
                    <strong>${index + 1}. ${escapeHtml(item.file.name)}</strong>
                    <span>${item.pageCount} page${item.pageCount === 1 ? '' : 's'} | ${formatFileSize(item.file.size)}</span>
                </div>
                <div class="file-row-actions">
                    <button type="button" data-action="up" aria-label="Move PDF up" ${index === 0 ? 'disabled' : ''}><i class="fas fa-arrow-up"></i></button>
                    <button type="button" data-action="down" aria-label="Move PDF down" ${index === mergeItems.length - 1 ? 'disabled' : ''}><i class="fas fa-arrow-down"></i></button>
                    <button type="button" data-action="delete" aria-label="Remove PDF"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    function handleMergeListClick(event) {
        const button = event.target.closest('button[data-action]');
        const row = event.target.closest('.file-row');
        if (!button || !row) return;
        const index = Number(row.dataset.index);
        const action = button.dataset.action;
        if (action === 'up') mergeItems = moveArrayItem(mergeItems, index, index - 1);
        if (action === 'down') mergeItems = moveArrayItem(mergeItems, index, index + 1);
        if (action === 'delete') mergeItems.splice(index, 1);
        mergedPdfBlob = null;
        mergeDownloadArea.classList.add('hidden');
        if (mergeItems.length < 2) {
            renderMergeList();
            showMessage(messageBox, 'info', 'Merge ke liye kam se kam 2 PDFs chahiye.');
            return;
        }
        renderMergeList();
    }

    async function mergePdfs() {
        if (mergeItems.length < 2) {
            showMessage(messageBox, 'error', 'Please upload at least 2 PDFs to merge.');
            return;
        }

        try {
            ensurePdfLib();
            setBusy(mergeBtn, true, 'Merging...');
            clearMessage(messageBox);
            const { PDFDocument } = window.PDFLib;
            const outputPdf = await PDFDocument.create();
            let totalPages = 0;

            for (const item of mergeItems) {
                const sourcePdf = await PDFDocument.load(item.bytes.slice(0), { ignoreEncryption: true });
                const pageIndexes = sourcePdf.getPageIndices();
                const pages = await outputPdf.copyPages(sourcePdf, pageIndexes);
                pages.forEach((page) => outputPdf.addPage(page));
                totalPages += pageIndexes.length;
            }

            const bytes = await outputPdf.save({ useObjectStreams: true, addDefaultPage: false });
            mergedPdfBlob = new Blob([bytes], { type: 'application/pdf' });
            $('#merge-pdf-size').textContent = formatFileSize(mergedPdfBlob.size);
            $('#merge-pdf-pages').textContent = String(totalPages);
            mergeDownloadArea.classList.remove('hidden');
            showMessage(messageBox, 'success', 'PDFs merged successfully. Download button is ready.');
        } catch (error) {
            showMessage(messageBox, 'error', getPdfErrorMessage(error));
        } finally {
            setBusy(mergeBtn, false);
        }
    }

    function resetMerge(options = {}) {
        mergeInput.value = '';
        mergeItems = [];
        mergedPdfBlob = null;
        mergeList.innerHTML = '';
        mergeList.classList.add('hidden');
        mergeDownloadArea.classList.add('hidden');
        $('#merge-pdf-size').textContent = '-';
        $('#merge-pdf-pages').textContent = '-';
        if (!options.keepMessage) clearMessage(messageBox);
    }

    async function handleOrganizeFile(file) {
        try {
            ensurePdfLib();
            clearMessage(messageBox);
            organizedPdfBlob = null;
            organizeDownloadArea.classList.add('hidden');
            organizeFile = file;
            organizeBytes = await file.arrayBuffer();
            const pdfDoc = await window.PDFLib.PDFDocument.load(organizeBytes.slice(0), { ignoreEncryption: true });
            organizePageCount = pdfDoc.getPageCount();
            pageOrder = Array.from({ length: organizePageCount }, (_, index) => index);
            $('#organize-pdf-name').textContent = file.name;
            $('#organize-pdf-page-count').textContent = String(organizePageCount);
            $('#split-page-range').value = `1-${organizePageCount}`;
            organizeSummary.classList.remove('hidden');
            splitControls.classList.remove('hidden');
            splitActions.classList.remove('hidden');
            pageOrderList.classList.remove('hidden');
            renderPageOrderList();
            showMessage(messageBox, 'success', `${organizePageCount} pages ready. Extract range or reorder/delete pages.`);
        } catch (error) {
            resetOrganize();
            showMessage(messageBox, 'error', getPdfErrorMessage(error));
        }
    }

    function renderPageOrderList() {
        pageOrderList.innerHTML = pageOrder.map((pageIndex, index) => `
            <div class="page-order-row" data-index="${index}">
                <div class="page-order-info">
                    <strong>Output page ${index + 1}</strong>
                    <span>Original page ${pageIndex + 1}</span>
                </div>
                <div class="page-order-actions">
                    <button type="button" data-action="up" aria-label="Move page up" ${index === 0 ? 'disabled' : ''}><i class="fas fa-arrow-up"></i></button>
                    <button type="button" data-action="down" aria-label="Move page down" ${index === pageOrder.length - 1 ? 'disabled' : ''}><i class="fas fa-arrow-down"></i></button>
                    <button type="button" data-action="delete" aria-label="Delete page"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }

    function handlePageOrderClick(event) {
        const button = event.target.closest('button[data-action]');
        const row = event.target.closest('.page-order-row');
        if (!button || !row) return;
        const index = Number(row.dataset.index);
        const action = button.dataset.action;
        if (action === 'up') pageOrder = moveArrayItem(pageOrder, index, index - 1);
        if (action === 'down') pageOrder = moveArrayItem(pageOrder, index, index + 1);
        if (action === 'delete') pageOrder.splice(index, 1);
        organizedPdfBlob = null;
        organizeDownloadArea.classList.add('hidden');
        if (!pageOrder.length) {
            showMessage(messageBox, 'error', 'At least one page must remain.');
            pageOrder = Array.from({ length: organizePageCount }, (_, pageIndex) => pageIndex);
        }
        renderPageOrderList();
    }

    async function extractPages() {
        if (!organizeBytes || !organizePageCount) {
            showMessage(messageBox, 'error', 'Please upload a PDF first.');
            return;
        }

        try {
            const selectedPages = parsePageRange($('#split-page-range').value, organizePageCount);
            await buildOrganizedPdf(selectedPages, $('#split-output-name').value || 'GovJobUpdates_Extracted_Pages.pdf', extractBtn, 'Extracting...');
            showMessage(messageBox, 'success', 'Selected page range extracted. Download button is ready.');
        } catch (error) {
            showMessage(messageBox, 'error', getPdfErrorMessage(error));
        }
    }

    async function saveOrganizedPdf() {
        if (!organizeBytes || !organizePageCount) {
            showMessage(messageBox, 'error', 'Please upload a PDF first.');
            return;
        }
        if (!pageOrder.length) {
            showMessage(messageBox, 'error', 'At least one page must remain.');
            return;
        }

        try {
            await buildOrganizedPdf(pageOrder, 'GovJobUpdates_Reordered_PDF.pdf', saveOrganizedBtn, 'Saving...');
            showMessage(messageBox, 'success', 'Reordered PDF created. Download button is ready.');
        } catch (error) {
            showMessage(messageBox, 'error', getPdfErrorMessage(error));
        }
    }

    async function buildOrganizedPdf(pageIndexes, filename, button, busyText) {
        ensurePdfLib();
        setBusy(button, true, busyText);
        try {
            const { PDFDocument } = window.PDFLib;
            const sourcePdf = await PDFDocument.load(organizeBytes.slice(0), { ignoreEncryption: true });
            const outputPdf = await PDFDocument.create();
            const pages = await outputPdf.copyPages(sourcePdf, pageIndexes);
            pages.forEach((page) => outputPdf.addPage(page));
            const bytes = await outputPdf.save({ useObjectStreams: true, addDefaultPage: false });
            organizedPdfBlob = new Blob([bytes], { type: 'application/pdf' });
            organizedFilename = withExtension(filename, 'pdf');
            $('#organize-pdf-size').textContent = formatFileSize(organizedPdfBlob.size);
            $('#organize-pdf-output-pages').textContent = String(pageIndexes.length);
            organizeDownloadArea.classList.remove('hidden');
        } finally {
            setBusy(button, false);
        }
    }

    function resetOrganize(options = {}) {
        organizeInput.value = '';
        organizeFile = null;
        organizeBytes = null;
        organizePageCount = 0;
        pageOrder = [];
        organizedPdfBlob = null;
        organizedFilename = 'GovJobUpdates_Organized_PDF.pdf';
        organizeSummary.classList.add('hidden');
        splitControls.classList.add('hidden');
        splitActions.classList.add('hidden');
        pageOrderList.classList.add('hidden');
        pageOrderList.innerHTML = '';
        organizeDownloadArea.classList.add('hidden');
        $('#organize-pdf-size').textContent = '-';
        $('#organize-pdf-output-pages').textContent = '-';
        if (!options.keepMessage) clearMessage(messageBox);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initToolTabs();
    initImageResizer();
    initImageToPdf();
    initPdfResizer();
    initPdfManager();
    showPdfLibraryWarnings();
});
