document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Scroll Animation
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delayed, .step-card');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    // Run on initial load
    checkFade();
    
    // Run on scroll
    window.addEventListener('scroll', checkFade);

    // Tool Category Filter
    const categoryButtons = document.querySelectorAll('.category-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Show/hide tools based on category
            toolCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = this.nextElementSibling;
            
            // Toggle active class
            faqItem.classList.toggle('active');
            
            // Toggle answer visibility
            if (answer.classList.contains('hidden')) {
                answer.classList.remove('hidden');
            } else {
                answer.classList.add('hidden');
            }
        });
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Rent Modal - Fixed functionality
    const rentButtons = document.querySelectorAll('.rent-btn');
    const rentModal = document.getElementById('rent-modal');
    const closeModal = document.getElementById('close-modal');
    const modalToolName = document.getElementById('modal-tool-name');
    const modalToolPrice = document.getElementById('modal-tool-price');
    const modalToolImage = document.getElementById('modal-tool-image');
    const baseRentalCost = document.getElementById('base-rental-cost');
    const optionsCost = document.getElementById('options-cost');
    const totalCost = document.getElementById('total-cost');
    
    // Add event listeners to all rent buttons
    rentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const toolCard = this.closest('.tool-card').querySelector('.bg-gray-800');
            const toolName = toolCard.querySelector('h3').textContent;
            const toolPrice = toolCard.querySelector('.absolute').textContent;
            const toolImage = toolCard.querySelector('img').src;
            
            // Update modal with tool information
            modalToolName.textContent = toolName;
            modalToolPrice.textContent = toolPrice;
            modalToolImage.src = toolImage;
            
            // Extract the price value for calculations
            const priceText = toolPrice;
            const priceMatch = priceText.match(/Rs-(\d+)/);
            const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
            
            // Update base rental cost
            baseRentalCost.textContent = `Rs-${price.toFixed(2)}`;
            
            // Calculate total
            updateTotalCost();
            
            // Show the modal
            rentModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking the close button
    closeModal.addEventListener('click', function() {
        rentModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    rentModal.addEventListener('click', function(e) {
        if (e.target === rentModal) {
            rentModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // Calculate rental cost dynamically
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    function updateTotalCost() {
        let optionsCostValue = 0;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                if (checkbox.nextElementSibling.textContent.includes('Damage Protection')) {
                    optionsCostValue += 5;
                } else if (checkbox.nextElementSibling.textContent.includes('Training')) {
                    optionsCostValue += 10;
                } else if (checkbox.nextElementSibling.textContent.includes('Extended Hours')) {
                    optionsCostValue += 3;
                }
            }
        });
        
        optionsCost.textContent = `Rs-${optionsCostValue.toFixed(2)}`;
        
        const baseRental = parseFloat(baseRentalCost.textContent.replace('Rs-', ''));
        const deposit = 50; // Fixed deposit amount
        
        const total = baseRental + optionsCostValue + deposit;
        totalCost.textContent = `Rs-${total.toFixed(2)}`;
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateTotalCost);
    });

    // Form Submission
    const rentalForm = document.getElementById('rental-form');
    
    rentalForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would normally send the form data to a server
        // For demo purposes, we'll just show an alert
        alert('Reservation submitted successfully! You will receive a confirmation email shortly.');
        
        rentModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Dynamic date calculations for rental form
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    if (dateInputs.length >= 2) {
        // Format dates as YYYY-MM-DD
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };
        
        dateInputs[0].value = formatDate(today);
        dateInputs[0].min = formatDate(today);
        
        dateInputs[1].value = formatDate(tomorrow);
        dateInputs[1].min = formatDate(tomorrow);
        
        // Update end date min value when start date changes
        dateInputs[0].addEventListener('change', function() {
            const newStartDate = new Date(this.value);
            const newMinEndDate = new Date(newStartDate);
            newMinEndDate.setDate(newMinEndDate.getDate() + 1);
            
            dateInputs[1].min = formatDate(newMinEndDate);
            
            // If current end date is before new min end date, update it
            if (new Date(dateInputs[1].value) < newMinEndDate) {
                dateInputs[1].value = formatDate(newMinEndDate);
            }
        });
    }

    // Initialize first FAQ to be open
    if (faqQuestions.length > 0) {
        faqQuestions[0].click();
    }
});