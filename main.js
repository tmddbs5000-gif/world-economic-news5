// (Existing NewsCard and data logic...)

// Modal Elements
const partnershipBtn = document.getElementById('partnership-btn');
const partnershipModal = document.getElementById('partnership-modal');
const closeModal = document.getElementById('close-modal');

// Modal Logic
partnershipBtn.onclick = () => {
    partnershipModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
};

const closeInquiryModal = () => {
    partnershipModal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

closeModal.onclick = closeInquiryModal;

// Close on outside click
window.onclick = (event) => {
    if (event.target === partnershipModal) {
        closeInquiryModal();
    }
};

// ... (Rest of existing logic for theme, language, etc.)
