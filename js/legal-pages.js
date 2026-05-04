// Simple modal functionality for legal pages
const modalOverlay = document.getElementById('legal-modal');
const legalModalContent = document.getElementById('legal-modal-content');
const legalIframe = document.getElementById('legal-iframe');
const closeModalBtn = document.querySelector('.close-modal');

function openModal(pageType) {
    const pageMap = {
        'privacy': '/legal/privacy.html',
        'terms': '/legal/terms.html'
    };
    
    if (pageMap[pageType]) {
        legalIframe.src = pageMap[pageType];
        modalOverlay.classList.remove('hidden');
    }
}

function closeModal() {
    legalIframe.src = ''; // Stop any ongoing iframe activity
    modalOverlay.classList.add('hidden');
}

// Close when clicking the X button
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Close when clicking outside the content area
document.addEventListener('click', function(e) {
    if (!legalModalContent.contains(e.target)) {
        closeModal();
    }
});

// Escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
        closeModal();
    }
});

// Add keyboard navigation for accessibility
let focusedElement = null;

if (closeModalBtn) {
    // Focus management on modal open
    legalIframe.addEventListener('load', function() {
        setTimeout(() => {
            // Focus first focusable element in iframe or content area
            const firstFocusable = legalIframe.contentDocument.querySelector('[tabindex="0"], a, button, textarea') || 
                                  legalModalContent.firstElementChild;
            
            if (firstFocusable) {
                focusedElement = firstFocusable;
                firstFocusable.focus();
            } else {
                modalOverlay.firstElementChild.focus(); // Focus overlay for accessibility
            }
        }, 200);
    });
}

// Keyboard navigation within iframe
legalIframe.addEventListener('focusin', function(e) {
    focusedElement = e.target;
});

// Close on escape when focus returns to top-level document
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && legalIframe.src) {
        const iframeDoc = window.frames[0].document || 
                        window.frames[1]?.document || 
                        null; // Handle nested frame scenarios
        
        if (iframeDoc) {
            const escapeKey = iframeDoc.querySelector('kbd, button, a');
            if (escapeKey) {
                escapeKey.focus();
            } else {
                closeModal();
            }
        }
    }
});

// Cross-origin iframe security note:
// Legal pages should be same-origin for full functionality. If using an external legal template service, use a proxy or embed directly in HTML instead of iframe to avoid cross-origin restrictions.
