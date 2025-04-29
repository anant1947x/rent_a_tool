const tools = [
    {
        id: 1,
        name: "Digital Multimeter",
        category: "Electronics",
        description: "Professional digital multimeter for measuring voltage, current, and resistance. Perfect for electronics projects and troubleshooting circuits.",
        image: "multi.png",
        price: 900,
        rentalRate: 9,
        availableUnits: 5,
        status: "Available"
    },
    {
        id: 2,
        name: "Cordless Drill",
        category: "Power Tools",
        description: "Powerful cordless drill with variable speed control and multiple torque settings. Includes a rechargeable battery and charger.",
        image: "cordless.jpg",
        price: 3000,
        rentalRate: 30,
        availableUnits: 3,
        status: "Available"
    },
    {
        id: 3,
        name: "Soldering Station",
        category: "Electronics",
        description: "Temperature-controlled soldering station with digital display. Includes soldering iron, stand, and cleaning sponge.",
        image: "sold.png",
        price: 4000,
        rentalRate: 40,
        availableUnits: 2,
        status: "Available"
    },
    {
        id: 4,
        name: "3D Printer",
        category: "3D Printing",
        description: "High-precision 3D printer with heated bed and auto-leveling. Perfect for prototyping and creating custom parts.",
        image: "3dprinter.jpg",
        price: 40000,
        rentalRate: 300,
        availableUnits: 1,
        status: "Available"
    },
    {
        id: 5,
        name: "DSLR Camera",
        category: "Photography",
        description: "Professional DSLR camera with 24MP sensor and 4K video recording. Includes 18-55mm lens kit.",
        image: "ds.png",
        price: 35000,
        rentalRate: 350,
        availableUnits: 2,
        status: "Available"
    },
    {
        id: 6,
        name: "Digital Caliper",
        category: "Measurement",
        description: "Precision digital caliper with LCD display. Measures in inches and millimeters with 0.01mm accuracy.",
        image: "digital caliper.jpg",
        price: 2000,
        rentalRate: 20,
        availableUnits: 4,
        status: "Available"
    },
    {
        id: 7,
        name: "Oscilloscope",
        category: "Electronics",
        description: "Digital storage oscilloscope with 100MHz bandwidth and 1GSa/s sample rate. Includes probes and USB connectivity.",
        image: "osci.jpg",
        price: 5000,
        rentalRate: 50,
        availableUnits: 1,
        status: "Available"
    },
    {
        id: 8,
        name: "Angle Grinder",
        category: "Power Tools",
        description: "Powerful angle grinder with 850W motor. Includes various discs for cutting, grinding, and polishing.",
        image: "angle.jpg",
        price: 4500,
        rentalRate: 45,
        availableUnits: 2,
        status: "Available"
    }
];

// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Render tools
function renderTools(toolsToRender) {
    const toolsGrid = document.getElementById('tools-grid');
    toolsGrid.innerHTML = '';
    
    toolsToRender.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'bg-dark rounded-lg overflow-hidden hover:shadow-lg transition-custom';
        toolCard.innerHTML = `
             <img src="${tool.image}" alt="${tool.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold">${tool.name}</h3>
                    <span class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">${tool.status}</span>
                </div>
                <p class="text-gray-400 text-sm mb-4">${tool.category}</p>
                <p class="text-gray-300 mb-4">${tool.description.substring(0, 80)}...</p>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-gray-400">3-day rental:</span>
                    <span class="font-bold text-primary">₹${tool.rentalRate}</span>
                </div>
                <button class="view-tool-btn w-full bg-primary hover:bg-yellow-600 text-dark font-bold py-2 px-4 rounded-md transition-custom" data-id="${tool.id}">View Details</button>
            </div>
        `;
        toolsGrid.appendChild(toolCard);
    });
    
    // Add event listeners to view tool buttons
    document.querySelectorAll('.view-tool-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const toolId = parseInt(this.getAttribute('data-id'));
            openToolDetail(toolId);
        });
    });
}

// Initial render
renderTools(tools);

// Category filter
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Update active state
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active', 'bg-primary', 'text-dark'));
        document.querySelectorAll('.category-btn').forEach(b => b.classList.add('bg-dark', 'text-white'));
        this.classList.remove('bg-dark', 'text-white');
        this.classList.add('active', 'bg-primary', 'text-dark');
        
        const category = this.textContent;
        if (category === 'All Tools') {
            renderTools(tools);
        } else {
            const filteredTools = tools.filter(tool => tool.category === category);
            renderTools(filteredTools);
        }
    });
});

// FAQ toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        answer.classList.toggle('hidden');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
});

// Modal functionality
function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Close modals when clicking the close button
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', function() {
        const modal = this.closest('[id$="-modal"]');
        closeModal(modal.id);
    });
});

// Close modals when clicking outside
document.querySelectorAll('[id$="-modal"]').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal(this.id);
        }
    });
});

// Switch between login and signup modals
document.querySelectorAll('.switch-modal').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const currentModal = this.closest('[id$="-modal"]');
        const targetModal = this.getAttribute('data-target');
        
        closeModal(currentModal.id);
        openModal(targetModal);
    });
});

// Open login modal
document.querySelectorAll('a[href="#login"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        openModal('login-modal');
    });
});

// Open signup modal
document.querySelectorAll('a[href="#signup"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        openModal('signup-modal');
    });
});

// Tool detail modal
function openToolDetail(toolId) {
    const tool = tools.find(t => t.id === toolId);
    if (!tool) return;
    
    document.getElementById('tool-detail-title').textContent = tool.name;
    document.getElementById('tool-detail-image').src = tool.image;
    document.getElementById('tool-detail-status').textContent = tool.status;
    document.getElementById('tool-detail-category').textContent = `Category: ${tool.category}`;
    document.getElementById('tool-detail-description').textContent = tool.description;
    document.getElementById('tool-detail-price').textContent = `₹${tool.price}`;
    document.getElementById('tool-detail-rental').textContent = `₹${tool.rentalRate}`;
    document.getElementById('tool-detail-units').textContent = tool.availableUnits;
    document.getElementById('booking-cost').textContent = `₹${tool.rentalRate}`;
    document.getElementById('booking-total').textContent = `₹${tool.rentalRate}`;
    
    // Update booking cost when duration changes
    document.getElementById('booking-duration').addEventListener('change', function() {
        const days = parseInt(this.value);
        const rentalBlocks = days / 3;
        const cost = tool.rentalRate * rentalBlocks;
        document.getElementById('booking-cost').textContent = `₹${cost}`;
        document.getElementById('booking-total').textContent = `₹${cost}`;
    });
    
    openModal('tool-detail-modal');
}

// Form submissions
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login functionality would be implemented with a backend.');
    closeModal('login-modal');
});

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Signup functionality would be implemented with a backend.');
    closeModal('signup-modal');
});

document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Booking functionality would be implemented with a backend.');
    closeModal('tool-detail-modal');
});

// Load more tools button (just for demonstration)
document.getElementById('load-more').addEventListener('click', function() {
    alert('In a real implementation, this would load more tools from the database.');
});