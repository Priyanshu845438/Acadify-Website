/**
 * Quote Calculator JavaScript
 * Handles dynamic pricing calculations and form interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeQuoteCalculator();
});

function initializeQuoteCalculator() {
    const form = document.getElementById('quote-calculator-form');
    if (!form) return; // Exit if not on quote calculator page
    
    const serviceInputs = document.querySelectorAll('input[name="service"]');
    const complexitySlider = document.getElementById('complexity');
    const featureInputs = document.querySelectorAll('input[name="features"]');
    const timelineInputs = document.querySelectorAll('input[name="timeline"]');
    
    // Initialize default values
    const standardTimeline = document.querySelector('input[name="timeline"][value="standard"]');
    if (standardTimeline) {
        standardTimeline.checked = true;
    }
    
    // Add event listeners
    serviceInputs.forEach(input => input.addEventListener('change', updateQuote));
    complexitySlider.addEventListener('input', updateComplexityDescription);
    complexitySlider.addEventListener('input', updateQuote);
    featureInputs.forEach(input => input.addEventListener('change', updateQuote));
    timelineInputs.forEach(input => input.addEventListener('change', updateQuote));
    
    // Form submission
    form.addEventListener('submit', handleQuoteSubmission);
    
    // Book consultation button
    const bookBtn = document.getElementById('book-consultation');
    if (bookBtn) {
        bookBtn.addEventListener('click', bookConsultation);
    }
    
    // Initialize
    updateComplexityDescription();
    updateQuote();
}

function updateComplexityDescription() {
    const complexitySlider = document.getElementById('complexity');
    const descElement = document.getElementById('complexity-desc');
    const value = parseInt(complexitySlider.value);
    
    const descriptions = {
        1: 'Basic features with minimal customization',
        2: 'Standard features with moderate customization',
        3: 'Advanced features with extensive customization'
    };
    
    descElement.textContent = descriptions[value];
}

function updateQuote() {
    const selectedService = document.querySelector('input[name="service"]:checked');
    const complexity = parseInt(document.getElementById('complexity').value);
    const selectedFeatures = document.querySelectorAll('input[name="features"]:checked');
    const selectedTimeline = document.querySelector('input[name="timeline"]:checked');
    
    let basePrice = 0;
    let complexityMultiplier = 1;
    let featuresPrice = 0;
    let timelineMultiplier = 1;
    
    // Base service price
    if (selectedService) {
        basePrice = parseInt(selectedService.dataset.basePrice);
        document.getElementById('base-price').textContent = formatCurrency(basePrice);
    } else {
        document.getElementById('base-price').textContent = '$0';
    }
    
    // Complexity multiplier
    const complexityMultipliers = { 1: 0.8, 2: 1.0, 3: 1.4 };
    complexityMultiplier = complexityMultipliers[complexity];
    document.getElementById('complexity-cost').textContent = `×${complexityMultiplier}`;
    
    // Features price
    selectedFeatures.forEach(feature => {
        featuresPrice += parseInt(feature.dataset.price);
    });
    document.getElementById('features-cost').textContent = formatCurrency(featuresPrice);
    
    // Timeline multiplier
    if (selectedTimeline) {
        timelineMultiplier = parseFloat(selectedTimeline.dataset.multiplier);
        document.getElementById('timeline-cost').textContent = `×${timelineMultiplier}`;
    } else {
        document.getElementById('timeline-cost').textContent = '×1.0';
    }
    
    // Calculate total
    const subtotal = (basePrice * complexityMultiplier) + featuresPrice;
    const total = subtotal * timelineMultiplier;
    
    // Update display
    document.getElementById('total-price').textContent = formatCurrency(total);
    
    // Calculate range (±20%)
    const rangeMin = Math.round(total * 0.8);
    const rangeMax = Math.round(total * 1.2);
    document.getElementById('price-range').textContent = `${formatCurrency(rangeMin)} - ${formatCurrency(rangeMax)}`;
    
    // Add animation to total price
    const totalElement = document.getElementById('total-price');
    totalElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        totalElement.style.transform = 'scale(1)';
    }, 200);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function handleQuoteSubmission(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(e.target);
    const selectedService = document.querySelector('input[name="service"]:checked');
    const totalPrice = document.getElementById('total-price').textContent;
    
    if (!selectedService) {
        showNotification('Please select a service to continue.', 'warning');
        return;
    }
    
    // Show success message
    showNotification('Quote request submitted successfully! We\'ll contact you within 24 hours.', 'success');
    
    // Reset form (optional)
    // e.target.reset();
    // updateQuote();
    
    // In a real application, you would send this data to your server
    console.log('Quote submission:', {
        service: selectedService.value,
        totalPrice: totalPrice,
        formData: Object.fromEntries(formData)
    });
}

function bookConsultation() {
    // Redirect to contact page with consultation form
    window.location.href = 'contact.html#consultation';
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification__close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Service card interactions
document.addEventListener('DOMContentLoaded', function() {
    const serviceOptions = document.querySelectorAll('.service-option');
    const timelineOptions = document.querySelectorAll('.timeline-option');
    const featureOptions = document.querySelectorAll('.feature-option');
    
    // Add hover effects and animations
    serviceOptions.forEach(option => {
        option.addEventListener('mouseenter', () => {
            option.style.transform = 'translateY(-5px)';
        });
        
        option.addEventListener('mouseleave', () => {
            option.style.transform = 'translateY(0)';
        });
    });
    
    // Smooth scrolling for form sections
    const formSections = document.querySelectorAll('.form-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    formSections.forEach(section => {
        observer.observe(section);
    });
});