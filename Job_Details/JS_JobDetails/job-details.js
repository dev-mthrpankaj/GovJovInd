// Job Details Page JavaScript - Updated to avoid conflicts
(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        // Add smooth scrolling for anchor links (only for # links)
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                // Only prevent default for same-page anchor links
                if (targetId !== '#' && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        // Add animation to section headers
        const sectionHeaders = document.querySelectorAll('.section h2');
        sectionHeaders.forEach(header => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', function() {
                this.parentElement.classList.toggle('active');
            });
        });
        
        // Add print functionality to the notification section
        const printButtons = document.querySelectorAll('.btn-print');
        printButtons.forEach(button => {
            button.addEventListener('click', function() {
                window.print();
            });
        });
        
        // Add copy to clipboard functionality for important dates
        const dateCards = document.querySelectorAll('.date-card');
        dateCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.title = 'Click to copy date to clipboard';
            
            card.addEventListener('click', function() {
                const dateText = this.querySelector('p').textContent;
                const dateTitle = this.querySelector('h3').textContent;
                
                // Copy to clipboard
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(`${dateTitle}: ${dateText}`).then(() => {
                        showNotification('Date copied to clipboard!');
                    }).catch(err => {
                        console.error('Could not copy text: ', err);
                        fallbackCopyText(`${dateTitle}: ${dateText}`);
                    });
                } else {
                    // Use fallback method for older browsers
                    fallbackCopyText(`${dateTitle}: ${dateText}`);
                }
            });
        });
        
        // Fallback method for copying text to clipboard
        function fallbackCopyText(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                const msg = successful ? 'Date copied to clipboard!' : 'Failed to copy date';
                showNotification(msg);
            } catch (err) {
                console.error('Fallback copy failed: ', err);
                showNotification('Failed to copy date');
            }
            
            document.body.removeChild(textArea);
        }
        
        // Show notification function
        function showNotification(message) {
            // Remove existing notification if any
            const existingNotification = document.getElementById('custom-notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            // Create new notification
            const notification = document.createElement('div');
            notification.id = 'custom-notification';
            notification.textContent = message;
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = '#2563eb';
            notification.style.color = 'white';
            notification.style.padding = '10px 15px';
            notification.style.borderRadius = '5px';
            notification.style.zIndex = '10000';
            notification.style.fontSize = '14px';
            notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            
            document.body.appendChild(notification);
            
            // Remove notification after 2 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 2000);
        }
        
        // Add highlight effect to table rows on hover
        const tableRows = document.querySelectorAll('tbody tr');
        tableRows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.transition = 'background-color 0.2s ease';
                this.style.backgroundColor = '#e6f7ff';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
    });
})();