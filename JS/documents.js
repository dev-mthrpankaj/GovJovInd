const IMAGE_MAX_BYTES = 8 * 1024 * 1024;
const PDF_MAX_BYTES = 15 * 1024 * 1024;
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
        button.dataset.originalHtml = button.innerHTML;
        button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text || 'Processing...'}`;
        button.disabled = true;
        return;
    }
    button.innerHTML = button.dataset.originalHtml || button.innerHTML;
    button.disabled = false;
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
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

function isImageFile(file) {
    if (!file) return false;
    return READABLE_IMAGE_TYPES.has(file.type) || READABLE_IMAGE_EXTENSIONS.has(getFileExtension(file.name));
}

function isPdfFile(file) {
    return file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf'));
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

    let originalFile = null;
    let originalImage = null;
    let resizedBlob = null;
    let resizedUrl = '';
    let resizedFormat = 'jpg';
    let syncingDimensions = false;

    const presets = {
        passport: { width: 3.5, height: 4.5, unit: 'cm', dpi: 300, format: 'jpg', quality: 90, target: 100, mode: 'exact', lockRatio: false },
        signature: { width: 4, height: 2, unit: 'cm', dpi: 300, format: 'jpg', quality: 90, target: 50, mode: 'exact', lockRatio: false },
        small: { width: 800, height: 800, unit: 'px', dpi: 300, format: 'jpg', quality: 82, target: 50, mode: 'contain', lockRatio: true },
        form: { width: 1000, height: 1000, unit: 'px', dpi: 300, format: 'jpg', quality: 85, target: 100, mode: 'contain', lockRatio: true }
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

    resizeBtn.addEventListener('click', resizeImage);
    resetBtn.addEventListener('click', resetImage);
    downloadBtn.addEventListener('click', () => {
        if (!resizedBlob) {
            showMessage(messageBox, 'error', 'Please resize an image before downloading.');
            return;
        }
        const extension = getImageExtension(resizedFormat);
        downloadBlob(resizedBlob, `GovJobUpdates_Resized_${Date.now()}.${extension}`);
    });

    updateImageQualityLabel();
    updateImageFormatControls();
    updateBackgroundControls();

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

        const width = (name === 'small' || name === 'form') && originalImage ? originalImage.width : preset.width;
        const height = (name === 'small' || name === 'form') && originalImage ? originalImage.height : preset.height;

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
        showMessage(messageBox, 'info', `${buttonLabel(name)} preset applied. Upload an image or press Resize Image if your file is already selected.`);
    }

    function buttonLabel(name) {
        if (name === 'passport') return 'Passport Photo';
        if (name === 'signature') return 'Signature';
        if (name === 'small') return 'Small Upload';
        return 'Form Upload';
    }

    async function handleImageUpload(file) {
        try {
            resetImageResult();
            originalFile = file;
            const dataUrl = await readFileAsDataUrl(file);
            originalImage = await loadImage(dataUrl);

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
            $('#new-image-target-status').textContent = '-';
            updateImageFormatControls();

            $('#image-file-summary').classList.remove('hidden');
            previewContainer.classList.remove('hidden');
            actionBtns.classList.remove('hidden');
            showMessage(messageBox, 'success', 'Image ready. Choose format, mode, dimensions, and target size.');
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
    }

    function resetImage() {
        fileInput.value = '';
        originalFile = null;
        originalImage = null;
        originalPreview.removeAttribute('src');
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
        const width = parseFloat(widthInput.value);
        const height = parseFloat(heightInput.value);
        const dpi = parseInt(dpiInput.value, 10) || 300;
        const targetWidth = convertDimension(width, widthUnitSelect.value, dpi, sourceWidth);
        const targetHeight = convertDimension(height, heightUnitSelect.value, dpi, sourceHeight);
        const outputFormat = resolveImageOutputFormat(formatSelect.value);
        const mimeType = getImageMime(outputFormat);
        const targetBytes = bytesFromTarget('#target-size-value', '#target-size-unit');

        if (!Number.isFinite(targetWidth) || !Number.isFinite(targetHeight) || targetWidth < 1 || targetHeight < 1) {
            showMessage(messageBox, 'error', 'Please enter valid width and height values.');
            return;
        }

        setBusy(resizeBtn, true, 'Processing...');
        clearMessage(messageBox);

        try {
            const layout = getImageResizeLayout(sourceWidth, sourceHeight, targetWidth, targetHeight);
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
            context.drawImage(originalImage, layout.drawX, layout.drawY, layout.drawWidth, layout.drawHeight);

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

    let originalFile = null;
    let originalImage = null;
    let originalDataUrl = '';
    let pdfBlob = null;

    setupUploadArea($('#pdf-upload-area'), fileInput, {
        maxBytes: IMAGE_MAX_BYTES,
        isValidType: isImageFile,
        invalidTypeMessage: 'Please upload a supported image: JPG, PNG, WEBP, AVIF, GIF, BMP, or SVG.',
        messageBox,
        onInvalid: resetPdfResult,
        onValid: handlePdfImageUpload
    });

    pageSizeSelect.addEventListener('change', () => {
        $('#pdf-custom-size').classList.toggle('hidden', pageSizeSelect.value !== 'custom');
    });

    qualityInput.addEventListener('input', updatePdfQualityLabel);
    convertBtn.addEventListener('click', convertToPdf);
    resetBtn.addEventListener('click', resetPdf);
    downloadBtn.addEventListener('click', () => {
        if (!pdfBlob) {
            showMessage(messageBox, 'error', 'Please convert an image before downloading.');
            return;
        }
        downloadBlob(pdfBlob, `GovJobUpdates_Image_To_PDF_${Date.now()}.pdf`);
    });

    updatePdfQualityLabel();

    async function handlePdfImageUpload(file) {
        try {
            resetPdfResult();
            originalFile = file;
            originalDataUrl = await readFileAsDataUrl(file);
            originalImage = await loadImage(originalDataUrl);
            preview.src = originalDataUrl;
            $('#pdf-file-name').textContent = file.name;
            $('#original-pdf-size').textContent = formatFileSize(file.size);
            $('#new-pdf-size').textContent = '-';
            $('#new-pdf-dimensions').textContent = '-';
            $('#new-pdf-target-status').textContent = '-';
            $('#pdf-file-summary').classList.remove('hidden');
            previewContainer.classList.remove('hidden');
            actionBtns.classList.remove('hidden');
            showMessage(messageBox, 'success', 'Image ready. Choose page size and target PDF size.');
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
        originalFile = null;
        originalImage = null;
        originalDataUrl = '';
        preview.removeAttribute('src');
        $('#pdf-file-summary').classList.add('hidden');
        previewContainer.classList.add('hidden');
        actionBtns.classList.add('hidden');
        resetPdfResult();
        clearMessage(messageBox);
    }

    function updatePdfQualityLabel() {
        qualityValue.textContent = `${qualityInput.value}%`;
    }

    async function convertToPdf() {
        if (!originalImage || !originalFile) {
            showMessage(messageBox, 'error', 'Please upload an image before converting to PDF.');
            return;
        }

        if (!window.PDFLib || !window.PDFLib.PDFDocument) {
            showMessage(messageBox, 'error', 'PDF library failed to load. Please check your internet connection and reload this page.');
            return;
        }

        setBusy(convertBtn, true, 'Creating PDF...');
        clearMessage(messageBox);

        try {
            const pageSize = getPdfPageSize();
            const layout = getImagePdfLayout(pageSize);
            const targetBytes = bytesFromTarget('#image-pdf-target-size-value', '#image-pdf-target-size-unit');
            const initialQuality = clampPdfQuality(parseInt(qualityInput.value, 10) / 100);
            const result = await createTargetImagePdf(pageSize, layout, targetBytes, initialQuality);
            pdfBlob = result.blob;
            $('#new-pdf-size').textContent = formatFileSize(pdfBlob.size);
            $('#new-pdf-dimensions').textContent = `${Math.round(pageSize.width / MM_TO_POINTS)} x ${Math.round(pageSize.height / MM_TO_POINTS)} mm`;
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

    function getImagePdfLayout(pageSize) {
        const margin = Math.max(0, parseFloat($('#pdf-margin').value) || 0) * MM_TO_POINTS;
        const maxWidth = Math.max(10, pageSize.width - margin * 2);
        const maxHeight = Math.max(10, pageSize.height - margin * 2);
        const fitToPage = $('#pdf-fit-page').checked;
        const sourceWidth = originalImage.naturalWidth || originalImage.width;
        const sourceHeight = originalImage.naturalHeight || originalImage.height;

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

    async function createTargetImagePdf(pageSize, layout, targetBytes, initialQuality) {
        const maxPasses = targetBytes ? 7 : 1;
        let bestResult = null;
        let scale = 1;
        let quality = initialQuality;

        for (let pass = 1; pass <= maxPasses; pass++) {
            const result = await buildImagePdf(pageSize, layout, quality, scale);
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

    async function buildImagePdf(pageSize, layout, quality, scale) {
        const { PDFDocument } = window.PDFLib;
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([pageSize.width, pageSize.height]);
        const imageBytes = await getImageBytesForPdf(originalImage, quality, scale);
        const embeddedImage = await pdfDoc.embedJpg(imageBytes);

        page.drawImage(embeddedImage, {
            x: layout.x,
            y: layout.y,
            width: layout.drawWidth,
            height: layout.drawHeight
        });

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
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.drawImage(image, 0, 0, targetWidth, targetHeight);
        const blob = await canvasToBlob(canvas, 'image/jpeg', quality);
        canvas.width = 0;
        canvas.height = 0;
        return blob.arrayBuffer();
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
        downloadBlob(resizedPdf, `GovJobUpdates_Compressed_PDF_${Date.now()}.pdf`);
    });

    updateQualityLabel();

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

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initToolTabs();
    initImageResizer();
    initImageToPdf();
    initPdfResizer();
});
