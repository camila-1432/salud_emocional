  // Carousel functionality
const carousel = document.querySelector('.carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');
const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

// Create dots
items.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
    updateDots();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length;
    goToSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    goToSlide(currentIndex);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto play carousel
// ¡CAMBIO CLAVE AQUÍ! Reducimos de 5000ms a 2500ms (2.5 segundos)
setInterval(nextSlide, 2500); 

// Form submission handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
    this.reset();
});

document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('commentName').value;
    const comment = document.getElementById('commentText').value;
    const date = new Date().toLocaleDateString();
    
    const commentList = document.querySelector('.comment-list');
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <div class="comment-header">
            <span>${name}</span>
            <span class="comment-date">${date}</span>
        </div>
        <div class="comment-text">${comment}</div>
    `;
    
    commentList.prepend(newComment);
    this.reset();
});

// Scroll animations
function checkScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});