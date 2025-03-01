// Modern CV Landing Page JavaScript

// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
const animatedElements = document.querySelectorAll('.animate-text, .animate-image');
const skillLevels = document.querySelectorAll('.skill-level');
const statNumbers = document.querySelectorAll('.stat-number');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contact-form');

// Helper Functions
const isInViewport = (element, offset = 100) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight - offset || document.documentElement.clientHeight - offset) &&
    rect.bottom >= 0
  );
};

// Theme Toggle
const toggleTheme = () => {
  body.classList.toggle('dark-mode');
  
  // Update moon/sun icon
  if (body.classList.contains('dark-mode')) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', 'light');
  }
};

// Check saved theme preference
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Mobile Menu Toggle
const toggleMobileMenu = () => {
  navLinks.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  
  // Animate hamburger to X
  const bars = mobileMenu.querySelectorAll('.bar');
  bars.forEach(bar => bar.classList.toggle('animate'));
};

// Animate elements when they come into view
const animateOnScroll = () => {
  animatedElements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('show');
    }
  });
  
  // Animate skill bars
  skillLevels.forEach(skill => {
    if (isInViewport(skill.parentElement)) {
      const level = skill.getAttribute('data-level');
      skill.style.width = `${level}%`;
    }
  });
  
  // Animate stat counters
  statNumbers.forEach(stat => {
    if (isInViewport(stat) && !stat.classList.contains('counted')) {
      const countTo = parseInt(stat.getAttribute('data-count'));
      let count = 0;
      const interval = setInterval(() => {
        stat.textContent = count;
        if (count >= countTo) {
          clearInterval(interval);
        }
        count = Math.ceil(count + countTo / 30);
        if (count > countTo) count = countTo;
      }, 30);
      stat.classList.add('counted');
    }
  });
};

// Filter projects
const filterProjects = (category) => {
  projectCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    
    if (category === 'all' || cardCategory === category) {
      card.style.display = 'block';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 10);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.8)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
};

// Smooth scroll for navigation links
const smoothScroll = (target) => {
  const element = document.querySelector(target);
  window.scrollTo({
    top: element.offsetTop - 80, // Adjust for header height
    behavior: 'smooth'
  });
};

// Set up redirections based on query parameters
const setupRedirections = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const section = urlParams.get('section');
  
  if (section) {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      setTimeout(() => {
        window.scrollTo({
          top: sectionElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }, 500);
    }
  }
};

// Form submission with validation
const handleFormSubmit = (e) => {
  e.preventDefault();
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  
  // Basic validation
  let isValid = true;
  
  if (nameInput.value.trim() === '') {
    isValid = false;
    nameInput.classList.add('error');
  } else {
    nameInput.classList.remove('error');
  }
  
  if (emailInput.value.trim() === '' || !validateEmail(emailInput.value)) {
    isValid = false;
    emailInput.classList.add('error');
  } else {
    emailInput.classList.remove('error');
  }
  
  if (subjectInput.value.trim() === '') {
    isValid = false;
    subjectInput.classList.add('error');
  } else {
    subjectInput.classList.remove('error');
  }
  
  if (messageInput.value.trim() === '') {
    isValid = false;
    messageInput.classList.add('error');
  } else {
    messageInput.classList.remove('error');
  }
  
  if (isValid) {
    // In a real application, you would send the form data to a server
    // For this demo, we'll just show a success message
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      subject: subjectInput.value,
      message: messageInput.value
    };
    
    console.log('Form submitted with data:', formData);
    
    // Show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Message sent successfully!';
    contactForm.appendChild(successMessage);
    
    // Reset form
    contactForm.reset();
    
    // Remove success message after 3 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 3000);
  }
};

// Email validation helper
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Add CSS styles for form validation and success message
const addDynamicStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    .input-group input.error, .input-group textarea.error {
      border-color: var(--secondary-color);
      box-shadow: 0 0 0 3px rgba(255, 51, 102, 0.1);
    }
    
    .success-message {
      padding: 1rem;
      margin-top: 1rem;
      background-color: rgba(39, 174, 96, 0.1);
      color: #27ae60;
      border-radius: 5px;
      text-align: center;
      font-weight: 500;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    .project-card {
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .mobile-menu .bar.animate:nth-child(1) {
      transform: translateY(9px) rotate(45deg);
    }
    
    .mobile-menu .bar.animate:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu .bar.animate:nth-child(3) {
      transform: translateY(-9px) rotate(-45deg);
    }
  `;
  document.head.appendChild(style);
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Run initial animations
  setTimeout(() => {
    animateOnScroll();
  }, 100);
  
  // Add event listeners
  themeToggle.addEventListener('click', toggleTheme);
  mobileMenu.addEventListener('click', toggleMobileMenu);
  
  window.addEventListener('scroll', animateOnScroll);
  
  // Smooth scroll for navigation links
  navLinksItems.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      smoothScroll(target);
      
      // Close mobile menu if open
      if (navLinks.classList.contains('active')) {
        toggleMobileMenu();
      }
    });
  });
  
  // Project filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const category = btn.getAttribute('data-filter');
      filterProjects(category);
    });
  });
  
  // Form submission
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Add dynamic styles
  addDynamicStyles();
  
  // Set up redirections
  setupRedirections();
});

// Page transitions and dynamic redirections
window.addEventListener('popstate', (event) => {
  // Handle browser back/forward navigation
  if (event.state && event.state.section) {
    const sectionElement = document.getElementById(event.state.section);
    if (sectionElement) {
      window.scrollTo({
        top: sectionElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  }
});

// Preloading and performance optimization
window.addEventListener('load', () => {
  // Hide preloader if exists
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }
});