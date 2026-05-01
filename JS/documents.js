const IMAGE_MAX_BYTES = 8 * 1024 * 1024;
const PDF_MAX_BYTES = 15 * 1024 * 1024;
const MM_TO_POINTS = 2.83465;

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
    return file && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
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
        image.onerror = () => reject(new Error('This image could not be opened. Please try a JPG or PNG file.'));
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
            resolve(blob);
        }, mimeType, quality);
    });
}

function getImageMime(format) {
    if (format === 'png') return 'image/png';
    if (format === 'webp') return 'image/webp';
    return 'image/jpeg';
}

function getImageExtension(format) {
    return format === 'jpg' ? 'jpg' : format;
}

function convertDimension(value, unit, dpi) {
    if (unit === 'cm') return Math.round((value * dpi) / 2.54);
    if (unit === 'inch') return Math.round(value * dpi);
    return Math.round(value);
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

    let originalFile = null;
    let originalImage = null;
    let resizedBlob = null;
    let resizedUrl = '';

    const presets = {
        passport: { width: 3.5, height: 4.5, unit: 'cm', dpi: 300, format: 'jpg', quality: 90, target: 100 },
        signature: { width: 4, height: 2, unit: 'cm', dpi: 300, format: 'jpg', quality: 90, target: 50 },
        small: { width: 800, height: 800, unit: 'px', dpi: 300, format: 'jpg', quality: 82, target: 50 },
        form: { width: 1000, height: 1000, unit: 'px', dpi: 300, format: 'jpg', quality: 85, target: 100 }
    };

    setupUploadArea($('#image-upload-area'), fileInput, {
        maxBytes: IMAGE_MAX_BYTES,
        isValidType: isImageFile,
        invalidTypeMessage: 'Please upload a JPG, PNG, or WEBP image.',
        messageBox,
        onInvalid: resetImageResult,
        onValid: handleImageUpload
    });

    $$('.preset-btn').forEach((button) => {
        button.addEventListener('click', () => applyPreset(button.dataset.preset));
    });

    qualityInput.addEventListener('input', () => {
        qualityValue.textContent = `${qualityInput.value}%`;
    });

    resizeBtn.addEventListener('click', resizeImage);
    resetBtn.addEventListener('click', resetImage);
    downloadBtn.addEventListener('click', () => {
        if (!resizedBlob) {
            showMessage(messageBox, 'error', 'Please resize an image before downloading.');
            return;
        }
        const extension = getImageExtension($('#image-format').value);
        downloadBlob(resizedBlob, `GovJobUpdates_Resized_${Date.now()}.${extension}`);
    });

    function applyPreset(name) {
        const preset = presets[name];
        if (!preset) return;

        const width = (name === 'small' || name === 'form') && originalImage ? originalImage.width : preset.width;
        const height = (name === 'small' || name === 'form') && originalImage ? originalImage.height : preset.height;

        $('#image-width').value = width;
        $('#image-height').value = height;
        $('#image-width-unit').value = preset.unit;
        $('#image-height-unit').value = preset.unit;
        $('#image-resolution').value = preset.dpi;
        $('#image-format').value = preset.format;
        $('#image-quality').value = preset.quality;
        $('#target-size-value').value = preset.target;
        $('#target-size-unit').value = 'KB';
        qualityValue.textContent = `${preset.quality}%`;
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
            $('#image-width').value = originalImage.width;
            $('#image-height').value = originalImage.height;
            $('#image-width-unit').value = 'px';
            $('#image-height-unit').value = 'px';

            $('#image-file-summary').classList.remove('hidden');
            previewContainer.classList.remove('hidden');
            actionBtns.classList.remove('hidden');
            showMessage(messageBox, 'success', 'Image ready. Choose a preset or adjust the fields, then resize.');
        } catch (error) {
            showMessage(messageBox, 'error', error.message || 'Unable to open this image.');
        }
    }

    function resetImageResult() {
        if (resizedUrl) URL.revokeObjectURL(resizedUrl);
        resizedUrl = '';
        resizedBlob = null;
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

        const width = parseFloat($('#image-width').value);
        const height = parseFloat($('#image-height').value);
        const dpi = parseInt($('#image-resolution').value, 10) || 300;
        const targetWidth = convertDimension(width, $('#image-width-unit').value, dpi);
        const targetHeight = convertDimension(height, $('#image-height-unit').value, dpi);
        const format = $('#image-format').value;
        const mimeType = getImageMime(format);
        const targetBytes = bytesFromTarget('#target-size-value', '#target-size-unit');

        if (!Number.isFinite(targetWidth) || !Number.isFinite(targetHeight) || targetWidth < 1 || targetHeight < 1) {
            showMessage(messageBox, 'error', 'Please enter valid width and height values.');
            return;
        }

        setBusy(resizeBtn, true, 'Processing...');
        clearMessage(messageBox);

        try {
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const context = canvas.getContext('2d', { alpha: format !== 'jpg' });

            if (format === 'jpg') {
                context.fillStyle = '#ffffff';
                context.fillRect(0, 0, canvas.width, canvas.height);
            }

            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';
            context.drawImage(originalImage, 0, 0, targetWidth, targetHeight);

            const initialQuality = parseInt(qualityInput.value, 10) / 100;
            resizedBlob = await createTargetImageBlob(canvas, mimeType, initialQuality, targetBytes);

            if (resizedUrl) URL.revokeObjectURL(resizedUrl);
            resizedUrl = URL.createObjectURL(resizedBlob);
            resizedPreview.src = resizedUrl;
            $('#new-image-size').textContent = formatFileSize(resizedBlob.size);
            $('#new-image-dimensions').textContent = `${targetWidth} x ${targetHeight} px`;
            downloadArea.classList.remove('hidden');

            const targetNote = targetBytes && resizedBlob.size > targetBytes * 1.12
                ? ' The exact target size may not be possible with these dimensions and format.'
                : '';
            showMessage(messageBox, 'success', `Image resized successfully.${targetNote}`);
        } catch (error) {
            showMessage(messageBox, 'error', error.message || 'Processing failed. Please try a smaller image.');
        } finally {
            setBusy(resizeBtn, false);
        }
    }

    async function createTargetImageBlob(canvas, mimeType, initialQuality, targetBytes) {
        let bestBlob = await canvasToBlob(canvas, mimeType, initialQuality);
        if (!targetBytes || mimeType === 'image/png') return bestBlob;

        let low = 0.2;
        let high = initialQuality;

        for (let i = 0; i < 8; i++) {
            const quality = (low + high) / 2;
            const blob = await canvasToBlob(canvas, mimeType, quality);
            if (Math.abs(blob.size - targetBytes) < Math.abs(bestBlob.size - targetBytes)) {
                bestBlob = blob;
            }
            if (blob.size > targetBytes) {
                high = quality;
            } else {
                low = quality;
            }
        }

        return bestBlob;
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

    let originalFile = null;
    let originalImage = null;
    let originalDataUrl = '';
    let pdfBlob = null;

    setupUploadArea($('#pdf-upload-area'), fileInput, {
        maxBytes: IMAGE_MAX_BYTES,
        isValidType: isImageFile,
        invalidTypeMessage: 'Please upload a JPG, PNG, or WEBP image.',
        messageBox,
        onInvalid: resetPdfResult,
        onValid: handlePdfImageUpload
    });

    pageSizeSelect.addEventListener('change', () => {
        $('#pdf-custom-size').classList.toggle('hidden', pageSizeSelect.value !== 'custom');
    });

    convertBtn.addEventListener('click', convertToPdf);
    resetBtn.addEventListener('click', resetPdf);
    downloadBtn.addEventListener('click', () => {
        if (!pdfBlob) {
            showMessage(messageBox, 'error', 'Please convert an image before downloading.');
            return;
        }
        downloadBlob(pdfBlob, `GovJobUpdates_Image_To_PDF_${Date.now()}.pdf`);
    });

    async function handlePdfImageUpload(file) {
        try {
            resetPdfResult();
            originalFile = file;
            originalDataUrl = await readFileAsDataUrl(file);
            originalImage = await loadImage(originalDataUrl);
            preview.src = originalDataUrl;
            $('#pdf-file-name').textContent = file.name;
            $('#original-pdf-size').textContent = formatFileSize(file.size);
            $('#pdf-file-summary').classList.remove('hidden');
            previewContainer.classList.remove('hidden');
            actionBtns.classList.remove('hidden');
            showMessage(messageBox, 'success', 'Image ready. A4 portrait is selected by default.');
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
            const { PDFDocument } = window.PDFLib;
            const pdfDoc = await PDFDocument.create();
            const pageSize = getPdfPageSize();
            const page = pdfDoc.addPage([pageSize.width, pageSize.height]);
            const margin = Math.max(0, parseFloat($('#pdf-margin').value) || 0) * MM_TO_POINTS;
            const maxWidth = Math.max(10, pageSize.width - margin * 2);
            const maxHeight = Math.max(10, pageSize.height - margin * 2);
            const imageBytes = await getImageBytesForPdf(originalImage);
            const embeddedImage = await pdfDoc.embedJpg(imageBytes);
            const fitToPage = $('#pdf-fit-page').checked;

            let drawWidth = originalImage.width;
            let drawHeight = originalImage.height;
            const ratio = fitToPage ? Math.min(maxWidth / drawWidth, maxHeight / drawHeight) : Math.min(1, maxWidth / drawWidth, maxHeight / drawHeight);
            drawWidth *= ratio;
            drawHeight *= ratio;

            page.drawImage(embeddedImage, {
                x: (pageSize.width - drawWidth) / 2,
                y: (pageSize.height - drawHeight) / 2,
                width: drawWidth,
                height: drawHeight
            });

            const bytes = await pdfDoc.save({ useObjectStreams: true });
            pdfBlob = new Blob([bytes], { type: 'application/pdf' });
            $('#new-pdf-size').textContent = formatFileSize(pdfBlob.size);
            $('#new-pdf-dimensions').textContent = `${Math.round(pageSize.width / MM_TO_POINTS)} x ${Math.round(pageSize.height / MM_TO_POINTS)} mm`;
            downloadArea.classList.remove('hidden');
            showMessage(messageBox, 'success', 'PDF created successfully. Download button is ready.');
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

    async function getImageBytesForPdf(image) {
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth || image.width;
        canvas.height = image.naturalHeight || image.height;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);
        const blob = await canvasToBlob(canvas, 'image/jpeg', 0.92);
        return blob.arrayBuffer();
    }
}

function initPdfResizer() {
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

    qualityInput.addEventListener('input', () => {
        qualityValue.textContent = `${qualityInput.value} DPI`;
    });

    resizeBtn.addEventListener('click', resizePdf);
    resetBtn.addEventListener('click', resetResizePdf);
    downloadBtn.addEventListener('click', () => {
        if (!resizedPdf) {
            showMessage(messageBox, 'error', 'Please process a PDF before downloading.');
            return;
        }
        downloadBlob(resizedPdf, `GovJobUpdates_Resized_PDF_${Date.now()}.pdf`);
    });

    function handlePdfUpload(file) {
        originalPdf = file;
        resizedPdf = null;
        $('#resize-pdf-name').textContent = file.name;
        $('#original-resize-pdf-size').textContent = formatFileSize(file.size);
        $('#result-original-resize-pdf-size').textContent = formatFileSize(file.size);
        previewContainer.classList.remove('hidden');
        actionBtns.classList.remove('hidden');
        downloadArea.classList.add('hidden');
        showMessage(messageBox, 'success', 'PDF ready. Choose a target size and process.');
    }

    function resetPdfResizeResult() {
        resizedPdf = null;
        downloadArea.classList.add('hidden');
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

    async function resizePdf() {
        if (!originalPdf) {
            showMessage(messageBox, 'error', 'Please upload a PDF before resizing.');
            return;
        }

        if (!window.PDFLib || !window.PDFLib.PDFDocument) {
            showMessage(messageBox, 'error', 'PDF library failed to load. Please check your internet connection and reload this page.');
            return;
        }

        setBusy(resizeBtn, true, 'Processing...');
        clearMessage(messageBox);

        try {
            const targetBytes = bytesFromTarget('#pdf-target-size-value', '#pdf-target-size-unit');
            const { PDFDocument } = window.PDFLib;
            const originalBytes = await originalPdf.arrayBuffer();
            const pdfDoc = await PDFDocument.load(originalBytes, { ignoreEncryption: true });
            const compressedBytes = await pdfDoc.save({
                useObjectStreams: true,
                addDefaultPage: false,
                objectsPerTick: 50
            });

            const compressedBlob = new Blob([compressedBytes], { type: 'application/pdf' });
            resizedPdf = compressedBlob.size < originalPdf.size ? compressedBlob : originalPdf;

            const reduction = Math.max(0, Math.round((1 - resizedPdf.size / originalPdf.size) * 100));
            $('#new-resize-pdf-size').textContent = formatFileSize(resizedPdf.size);

            if (resizedPdf.size >= originalPdf.size) {
                $('#pdf-reduction').textContent = 'No meaningful reduction found. Your original PDF is already optimized or image-heavy.';
                showMessage(messageBox, 'info', 'This PDF could not be reduced safely in the browser. You can still download the original file from the button below.');
            } else if (targetBytes && resizedPdf.size > targetBytes) {
                $('#pdf-reduction').textContent = `${reduction}% smaller. Target was ${formatFileSize(targetBytes)}, but this PDF cannot safely reach that size in-browser.`;
                showMessage(messageBox, 'info', 'PDF processed, but the exact target size may not be possible without reducing scanned image quality outside the browser.');
            } else {
                $('#pdf-reduction').textContent = `${reduction}% smaller`;
                showMessage(messageBox, 'success', 'PDF processed successfully. Download button is ready.');
            }

            downloadArea.classList.remove('hidden');
        } catch (error) {
            showMessage(messageBox, 'error', error.message || 'Processing failed. This PDF may be encrypted, damaged, or unsupported.');
        } finally {
            setBusy(resizeBtn, false);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initToolTabs();
    initImageResizer();
    initImageToPdf();
    initPdfResizer();
});
