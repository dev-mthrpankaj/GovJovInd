// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }
}

// Tab Switching
function initToolTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tool-content').forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Helper function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Image Resizer Tool
function initImageResizer() {
    const uploadArea = document.getElementById('image-upload-area');
    const fileInput = document.getElementById('image-upload');
    const previewContainer = document.getElementById('image-preview-container');
    const imagePreview = document.getElementById('image-preview');
    const originalSize = document.getElementById('original-image-size');
    const actionBtns = document.getElementById('image-action-btns');
    const downloadArea = document.getElementById('image-download-area');
    const newSize = document.getElementById('new-image-size');
    const newDimensions = document.getElementById('new-image-dimensions');
    
    let originalImage = null;
    let resizedImage = null;
    
    // Setup drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleImageUpload(fileInput.files[0]);
        }
    });
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handleImageUpload(fileInput.files[0]);
        }
    });
    
    function handleImageUpload(file) {
        if (!file.type.match('image.*')) {
            alert('Please select an image file (JPEG, PNG, etc.)');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            originalImage = new Image();
            originalImage.onload = function() {
                imagePreview.src = e.target.result;
                originalSize.textContent = formatFileSize(file.size);
                
                // Set initial dimensions
                document.getElementById('image-width').value = this.width;
                document.getElementById('image-height').value = this.height;
                
                previewContainer.classList.remove('hidden');
                actionBtns.classList.remove('hidden');
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    document.getElementById('resize-image-btn').addEventListener('click', resizeImage);
    document.getElementById('reset-image-btn').addEventListener('click', resetImage);
    document.getElementById('download-image-btn').addEventListener('click', downloadResizedImage);
    
    document.getElementById('image-quality').addEventListener('input', function() {
        document.getElementById('image-quality-value').textContent = this.value + '%';
    });
    
    function resizeImage() {
        const width = parseInt(document.getElementById('image-width').value);
        const height = parseInt(document.getElementById('image-height').value);
        const widthUnit = document.getElementById('image-width-unit').value;
        const heightUnit = document.getElementById('image-height-unit').value;
        const resolution = parseInt(document.getElementById('image-resolution').value);
        const format = document.getElementById('image-format').value;
        const quality = parseInt(document.getElementById('image-quality').value) / 100;
        const targetSizeValue = parseInt(document.getElementById('target-size-value').value);
        const targetSizeUnit = document.getElementById('target-size-unit').value;
        const targetBytes = targetSizeUnit === 'KB' ? targetSizeValue * 1024 : targetSizeValue * 1024 * 1024;
        
        // Convert units to pixels
        let targetWidth = width;
        let targetHeight = height;
        
        if (widthUnit === 'cm') {
            targetWidth = Math.round(width * resolution / 2.54);
        } else if (widthUnit === 'inch') {
            targetWidth = Math.round(width * resolution);
        }
        
        if (heightUnit === 'cm') {
            targetHeight = Math.round(height * resolution / 2.54);
        } else if (heightUnit === 'inch') {
            targetHeight = Math.round(height * resolution);
        }
        
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        
        // Draw resized image
        ctx.drawImage(originalImage, 0, 0, targetWidth, targetHeight);
        
        // Show loading
        const resizeBtn = document.getElementById('resize-image-btn');
        const originalText = resizeBtn.innerHTML;
        resizeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        resizeBtn.disabled = true;
        
        // Process in steps for better UX
        setTimeout(() => {
            canvas.toBlob((blob) => {
                if (targetBytes > 0) {
                    adjustQualityToTargetSize(canvas, blob, format, targetBytes, targetWidth, targetHeight);
                } else {
                    finalizeResize(blob, targetWidth, targetHeight);
                }
                resizeBtn.innerHTML = originalText;
                resizeBtn.disabled = false;
            }, `image/${format}`, quality);
        }, 100);
    }
    
    function adjustQualityToTargetSize(canvas, initialBlob, format, targetBytes, width, height) {
        let minQuality = 0.1;
        let maxQuality = 1.0;
        let bestBlob = initialBlob;
        let closestDiff = Math.abs(initialBlob.size - targetBytes);
        let iterations = 0;
        const MAX_ITERATIONS = 5;
        
        const processNext = (callback) => {
            if (iterations >= MAX_ITERATIONS) return callback();
            
            iterations++;
            const midQuality = (minQuality + maxQuality) / 2;
            
            canvas.toBlob((blob) => {
                const diff = Math.abs(blob.size - targetBytes);
                
                if (diff < closestDiff) {
                    closestDiff = diff;
                    bestBlob = blob;
                }
                
                // If within 5% of target, stop
                if (blob.size > targetBytes * 0.95 && blob.size < targetBytes * 1.05) {
                    return callback();
                }
                
                // Adjust quality range
                if (blob.size > targetBytes) {
                    maxQuality = midQuality;
                } else {
                    minQuality = midQuality;
                }
                
                processNext(callback);
            }, `image/${format}`, midQuality);
        };
        
        processNext(() => {
            finalizeResize(bestBlob, width, height);
        });
    }
    
    function finalizeResize(blob, width, height) {
        resizedImage = blob;
        newSize.textContent = formatFileSize(blob.size);
        newDimensions.textContent = `${width} × ${height} px`;
        downloadArea.classList.remove('hidden');
        downloadArea.scrollIntoView({ behavior: 'smooth' });
    }
    
    function resetImage() {
        fileInput.value = '';
        previewContainer.classList.add('hidden');
        actionBtns.classList.add('hidden');
        downloadArea.classList.add('hidden');
    }
    
    function downloadResizedImage() {
        if (!resizedImage) return;
        
        const format = document.getElementById('image-format').value;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `NaukariTrack_Resized_${timestamp}.${format}`;
        
        saveAs(resizedImage, filename);
    }
}

// Image to PDF Converter
function initImageToPdf() {
    const uploadArea = document.getElementById('pdf-upload-area');
    const fileInput = document.getElementById('pdf-upload');
    const previewContainer = document.getElementById('pdf-preview-container');
    const pdfPreview = document.getElementById('pdf-preview');
    const originalSize = document.getElementById('original-pdf-size');
    const actionBtns = document.getElementById('pdf-action-btns');
    const downloadArea = document.getElementById('pdf-download-area');
    const newSize = document.getElementById('new-pdf-size');
    const newDimensions = document.getElementById('new-pdf-dimensions');
    const pageSizeSelect = document.getElementById('pdf-page-size');
    const customSizeGroup = document.getElementById('pdf-custom-size');
    
    let originalImage = null;
    let pdfBlob = null;
    
    // Setup drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleImageUpload(fileInput.files[0]);
        }
    });
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handleImageUpload(fileInput.files[0]);
        }
    });
    
    pageSizeSelect.addEventListener('change', function() {
        customSizeGroup.classList.toggle('hidden', this.value !== 'custom');
    });
    
    function handleImageUpload(file) {
        if (!file.type.match('image.*')) {
            alert('Please select an image file (JPEG, PNG, etc.)');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            originalImage = new Image();
            originalImage.onload = function() {
                pdfPreview.src = e.target.result;
                originalSize.textContent = formatFileSize(file.size);
                previewContainer.classList.remove('hidden');
                actionBtns.classList.remove('hidden');
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    
    document.getElementById('convert-pdf-btn').addEventListener('click', convertToPdf);
    document.getElementById('reset-pdf-btn').addEventListener('click', resetPdf);
    document.getElementById('download-pdf-btn').addEventListener('click', downloadPdf);
    
    async function convertToPdf() {
        const pageSize = document.getElementById('pdf-page-size').value;
        const margin = parseInt(document.getElementById('pdf-margin').value);
        const orientation = document.getElementById('pdf-orientation').value;
        
        let pageWidth, pageHeight;
        
        switch(pageSize) {
            case 'a4':
                pageWidth = 210;
                pageHeight = 297;
                break;
            case 'letter':
                pageWidth = 216;
                pageHeight = 279;
                break;
            case 'legal':
                pageWidth = 216;
                pageHeight = 356;
                break;
            case 'custom':
                pageWidth = parseInt(document.getElementById('pdf-width').value);
                pageHeight = parseInt(document.getElementById('pdf-height').value);
                break;
        }
        
        if (orientation === 'landscape') {
            [pageWidth, pageHeight] = [pageHeight, pageWidth];
        }
        
        // Convert mm to points (1 mm = 2.83465 points)
        pageWidth *= 2.83465;
        pageHeight *= 2.83465;
        const marginPoints = margin * 2.83465;
        
        // Show loading
        const convertBtn = document.getElementById('convert-pdf-btn');
        const originalText = convertBtn.innerHTML;
        convertBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        convertBtn.disabled = true;
        
        try {
            const { PDFDocument, rgb } = PDFLib;
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([pageWidth, pageHeight]);
            
            // Calculate image dimensions
            const maxWidth = pageWidth - (marginPoints * 2);
            const maxHeight = pageHeight - (marginPoints * 2);
            
            let imgWidth = originalImage.width;
            let imgHeight = originalImage.height;
            const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
            
            imgWidth *= ratio;
            imgHeight *= ratio;
            
            // Center image
            const x = (pageWidth - imgWidth) / 2;
            const y = (pageHeight - imgHeight) / 2;
            
            // Embed image
            const imageBytes = await fetch(originalImage.src).then(res => res.arrayBuffer());
            const image = await pdfDoc.embedJpg(imageBytes);
            
            // Draw image
            page.drawImage(image, { x, y, width: imgWidth, height: imgHeight });
            
            // Save PDF
            const pdfBytes = await pdfDoc.save();
            pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            
            // Show results
            newSize.textContent = formatFileSize(pdfBlob.size);
            newDimensions.textContent = `${pageWidth / 2.83465} × ${pageHeight / 2.83465} mm`;
            downloadArea.classList.remove('hidden');
            downloadArea.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            console.error('PDF creation error:', error);
            alert('Error creating PDF. Please try a different image.');
        } finally {
            convertBtn.innerHTML = originalText;
            convertBtn.disabled = false;
        }
    }
    
    function resetPdf() {
        fileInput.value = '';
        previewContainer.classList.add('hidden');
        actionBtns.classList.add('hidden');
        downloadArea.classList.add('hidden');
    }
    
    function downloadPdf() {
        if (!pdfBlob) return;
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `NaukariTrack_Converted_${timestamp}.pdf`;
        
        saveAs(pdfBlob, filename);
    }
}

// PDF Resizer Tool
function initPdfResizer() {
    const uploadArea = document.getElementById('resize-pdf-upload-area');
    const fileInput = document.getElementById('resize-pdf-upload');
    const previewContainer = document.getElementById('resize-pdf-preview-container');
    const pdfName = document.getElementById('resize-pdf-name');
    const originalSize = document.getElementById('original-resize-pdf-size');
    const actionBtns = document.getElementById('resize-pdf-action-btns');
    const downloadArea = document.getElementById('resize-pdf-download-area');
    const newSize = document.getElementById('new-resize-pdf-size');
    const reduction = document.getElementById('pdf-reduction');
    
    let originalPdf = null;
    let resizedPdf = null;
    
    // Setup drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handlePdfUpload(fileInput.files[0]);
        }
    });
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handlePdfUpload(fileInput.files[0]);
        }
    });
    
    document.getElementById('pdf-quality').addEventListener('input', function() {
        document.getElementById('pdf-quality-value').textContent = this.value + ' DPI';
    });
    
    function handlePdfUpload(file) {
        if (!file.type.match('application.pdf')) {
            alert('Please select a PDF file');
            return;
        }
        
        pdfName.textContent = file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name;
        originalSize.textContent = formatFileSize(file.size);
        originalPdf = file;
        previewContainer.classList.remove('hidden');
        actionBtns.classList.remove('hidden');
    }
    
    document.getElementById('resize-pdf-btn').addEventListener('click', resizePdf);
    document.getElementById('reset-resize-pdf-btn').addEventListener('click', resetResizePdf);
    document.getElementById('download-resize-pdf-btn').addEventListener('click', downloadResizedPdf);
    
    async function resizePdf() {
        const targetSize = parseInt(document.getElementById('pdf-target-size-value').value);
        const targetUnit = document.getElementById('pdf-target-size-unit').value;
        const compression = document.getElementById('pdf-compression').value;
        const quality = parseInt(document.getElementById('pdf-quality').value);
        
        const targetBytes = targetUnit === 'KB' ? targetSize * 1024 : targetSize * 1024 * 1024;
        
        // Show loading
        const resizeBtn = document.getElementById('resize-pdf-btn');
        const originalText = resizeBtn.innerHTML;
        resizeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        resizeBtn.disabled = true;
        
        try {
            // First try client-side compression
            const { PDFDocument } = PDFLib;
            const pdfBytes = await originalPdf.arrayBuffer();
            const pdfDoc = await PDFDocument.load(pdfBytes);
            
            // Save with compression
            const compressedBytes = await pdfDoc.save({
                useObjectStreams: true,
                // Add any available compression options
            });
            
            let resultBlob = new Blob([compressedBytes], { type: 'application/pdf' });
            
            // If client-side result is not close enough, use Cloudflare Worker
            if (Math.abs(resultBlob.size - targetBytes) / targetBytes > 0.1) {
                try {
                    resultBlob = await compressWithCloudflare(originalPdf, targetBytes, compression);
                } catch (e) {
                    console.log('Cloudflare compression failed, using client-side result', e);
                }
            }
            
            resizedPdf = resultBlob;
            
            // Show results
            const originalSizeFormatted = formatFileSize(originalPdf.size);
            const newSizeFormatted = formatFileSize(resizedPdf.size);
            const reductionPercent = Math.round((1 - (resizedPdf.size / originalPdf.size)) * 100);
            
            newSize.textContent = newSizeFormatted;
            reduction.textContent = `${reductionPercent}% (from ${originalSizeFormatted}) | Target: ${formatFileSize(targetBytes)}`;
            downloadArea.classList.remove('hidden');
            downloadArea.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            console.error('PDF processing error:', error);
            alert('Error processing PDF. Please try a different file.');
        } finally {
            resizeBtn.innerHTML = originalText;
            resizeBtn.disabled = false;
        }
    }
    
    async function compressWithCloudflare(pdfFile, targetBytes, compressionLevel) {
        const formData = new FormData();
        formData.append('file', pdfFile);
        formData.append('target_size', targetBytes);
        formData.append('compression', compressionLevel);
        
        const response = await fetch('https://sarkariofficer.in/resize-pdf', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(await response.text());
        }
        
        return await response.blob();
    }
    
    function resetResizePdf() {
        fileInput.value = '';
        previewContainer.classList.add('hidden');
        actionBtns.classList.add('hidden');
        downloadArea.classList.add('hidden');
    }
    
    function downloadResizedPdf() {
        if (!resizedPdf) return;
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `NaukariTrack_Resized_${timestamp}.pdf`;
        
        saveAs(resizedPdf, filename);
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initToolTabs();
    initImageResizer();
    initImageToPdf();
    initPdfResizer();
});