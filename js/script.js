/* ==========================================================================
   Volodymyr Saakian — Portfolio JS
   ========================================================================== */

// --- Theme ---
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

const setTheme = (theme) => {
  html.className = theme;
  localStorage.setItem('theme', theme);
  themeToggle.innerHTML = theme === 'dark'
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
};

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  setTheme(html.className === 'dark' ? 'light' : 'dark');
});

// --- Mobile menu ---
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

const headerEl = document.getElementById('header');

mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  headerEl.classList.toggle('menu-open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    navLinks.classList.remove('active');
    headerEl.classList.remove('menu-open');
  });
});

// --- Active nav tracking ---
const sections = document.querySelectorAll('.section, .hero');
const navLinkEls = document.querySelectorAll('.nav-link');

const updateActiveNav = () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (scrollY >= top) current = section.id;
  });
  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

// --- Reveal animations ---
const revealElements = document.querySelectorAll('.anim-reveal');
const sectionElements = document.querySelectorAll('.section');

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
};

const revealObserver = new IntersectionObserver(observerCallback, {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

sectionElements.forEach(el => {
  el.classList.add('section-observed');
  sectionObserver.observe(el);
});

// --- Stagger children animations ---
const staggerElements = document.querySelectorAll('.stagger-children');
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      staggerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
staggerElements.forEach(el => staggerObserver.observe(el));

// --- Timeline item stagger ---
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
timelineItems.forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.12}s`;
  timelineObserver.observe(item);
});

// --- Project card glow tracking ---
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
  });
});

// --- Button radial hover effect ---
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    btn.style.setProperty('--mouse-x', `${x}%`);
    btn.style.setProperty('--mouse-y', `${y}%`);
  });
});

// --- Counter animation ---
const counterElements = document.querySelectorAll('.hero-stat-num');

const animateCounter = (el) => {
  const target = parseInt(el.dataset.count);
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.counted) {
      entry.target.dataset.counted = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

counterElements.forEach(el => counterObserver.observe(el));

// --- Skill bar animation ---
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const level = entry.target.dataset.level;
      entry.target.style.width = `${level}%`;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(el => skillObserver.observe(el));

// --- Project filter ---
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// --- Contact form ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-submit');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Sending...</span>';
    btn.disabled = true;

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        contactForm.reset();
        const msg = document.createElement('div');
        msg.className = 'success-message';
        msg.textContent = 'Message sent successfully!';
        contactForm.appendChild(msg);
        setTimeout(() => msg.remove(), 4000);
      } else {
        throw new Error('Submit failed');
      }
    } catch {
      alert('Error sending message. Please try again.');
    } finally {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
    }
  });
}

// --- CV Download password protection ---
const CV_HASH = 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f';

const hashPassword = async (pw) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
};

const downloadBtn = document.getElementById('download-cv-btn');
const modal = document.getElementById('password-modal');
const modalClose = document.getElementById('password-modal-close');
const passwordForm = document.getElementById('password-form');
const passwordInput = document.getElementById('password-input');
const passwordError = document.getElementById('password-error');

if (downloadBtn && modal) {
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
    passwordInput.value = '';
    passwordError.classList.remove('visible');
    passwordInput.classList.remove('error');
    setTimeout(() => passwordInput.focus(), 100);
  });

  const closeModal = () => modal.classList.remove('active');
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const hash = await hashPassword(passwordInput.value);
    if (hash === CV_HASH) {
      closeModal();
      const a = document.createElement('a');
      a.href = './CV.pdf';
      a.download = '';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } else {
      passwordError.classList.add('visible');
      passwordInput.classList.add('error');
      passwordInput.value = '';
      passwordInput.focus();
    }
  });

  passwordInput.addEventListener('input', () => {
    passwordError.classList.remove('visible');
    passwordInput.classList.remove('error');
  });
}

// --- Smooth scroll for nav ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// --- Header scroll effect ---
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  updateActiveNav();

  const scroll = window.scrollY;
  if (scroll > 100) {
    header.style.borderBottomColor = 'var(--border)';
  } else {
    header.style.borderBottomColor = 'var(--border-subtle)';
  }
  lastScroll = scroll;
}, { passive: true });

// --- URL query redirect ---
const urlParams = new URLSearchParams(window.location.search);
const section = urlParams.get('section');
if (section) {
  const el = document.getElementById(section);
  if (el) {
    setTimeout(() => {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }, 400);
  }
}
