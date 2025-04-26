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
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.classList.add('hidden');
            } else {
                answer.classList.remove('hidden');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Testimonial Slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    
    let currentIndex = 0;
    const slideWidth = testimonialSlides[0].offsetWidth + 32; // Width + padding
    
    function updateSlider() {
        testimonialTrack.scrollLeft = currentIndex * slideWidth;
    }
    
    prevButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextButton.addEventListener('click', function() {
        if (currentIndex < testimonialSlides.length - 1) {
            currentIndex++;
            updateSlider();
        }
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

    // Rent Modal
    const rentButtons = document.querySelectorAll('.rent-btn');
    const rentModal = document.getElementById('rent-modal');
    const closeModal = document.getElementById('close-modal');
    const modalToolName = document.getElementById('modal-tool-name');
    const modalToolPrice = document.getElementById('modal-tool-price');
    const modalToolImage = document.getElementById('modal-tool-image');
    
    rentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const toolCard = this.closest('.tool-card');
            const toolName = toolCard.querySelector('h3').textContent;
            const toolPrice = toolCard.querySelector('.absolute').textContent;
            const toolImage = toolCard.querySelector('img').src;
            
            modalToolName.textContent = toolName;
            modalToolPrice.textContent = toolPrice;
            modalToolImage.src = toolImage;
            
            rentModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });
    
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

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
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

    // Calculate rental cost dynamically
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const baseRentalElement = document.querySelector('.flex.justify-between.mb-2:nth-child(1) .text-white');
    const optionsElement = document.querySelector('.flex.justify-between.mb-2:nth-child(2) .text-white');
    const totalElement = document.querySelector('.flex.justify-between.font-bold .text-yellow-500');
    
    function updateCost() {
        let optionsCost = 0;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                if (checkbox.nextElementSibling.textContent.includes('Damage Protection')) {
                    optionsCost += 5;
                } else if (checkbox.nextElementSibling.textContent.includes('Training')) {
                    optionsCost += 10;
                } else if (checkbox.nextElementSibling.textContent.includes('Extended Hours')) {
                    optionsCost += 3;
                }
            }
        });
        
        optionsElement.textContent = `$${optionsCost.toFixed(2)}`;
        
        const baseRental = parseFloat(baseRentalElement.textContent.replace('$', ''));
        const deposit = 50; // Fixed deposit amount
        
        const total = baseRental + optionsCost + deposit;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCost);
    });

    // Initialize first FAQ to be open
    if (faqQuestions.length > 0) {
        faqQuestions[0].click();
    }
});