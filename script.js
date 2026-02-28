const cursorDot = document.getElementById('cursorDot');

document.addEventListener('mousemove', (e) => {
  cursorDot.style.left = e.clientX + 'px';
  cursorDot.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursorDot.style.transform = 'translate(-50%, -50%) scale(2.5)';
  cursorDot.style.opacity = '0.6';
});
document.addEventListener('mouseup', () => {
  cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
  cursorDot.style.opacity = '1';
});

// Hover effect on links/buttons
const interactables = document.querySelectorAll('a, button, .skill-card, .project-card, .stat-box');
interactables.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.width = '24px';
    cursorDot.style.height = '24px';
    cursorDot.style.background = 'rgba(200,255,0,0.4)';
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.style.width = '10px';
    cursorDot.style.height = '10px';
    cursorDot.style.background = '#c8ff00';
  });
});

// ===========================
// 2. NAVBAR SCROLL EFFECT
// ===========================
const mainNav = document.getElementById('mainNav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }
});

// ===========================
// 3. ACTIVE NAV LINK
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.style.color = '';
        link.style.borderBottom = '';
      });
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
      if (activeLink) {
        activeLink.style.color = '#c8ff00';
      }
    }
  });
}
window.addEventListener('scroll', setActiveLink);

// ===========================
// 4. SCROLL REVEAL ANIMATION
// ===========================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -20px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===========================
// 5. HERO SECTION — STAGGERED ENTRY
// ===========================
function initReveal() {
  // Immediately reveal hero items
  const heroItems = document.querySelectorAll('.hero-section .reveal');
  heroItems.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 100 + i * 120);
  });

  // Reveal all elements currently in viewport
  const allReveal = document.querySelectorAll('.reveal:not(.hero-section .reveal)');
  allReveal.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
}

// Run on DOMContentLoaded AND after a short delay (safety net)
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  setTimeout(initReveal, 500);
});
window.addEventListener('load', initReveal);

// ===========================
// 6. CONTACT FORM
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('.btn-main');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    // Simulate form submission delay
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.opacity = '1';
      btn.style.background = '#6fff00';

      // Reset form
      contactForm.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

// ===========================
// 7. SMOOTH SCROLL FOR NAV LINKS
// ===========================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });

        // Close mobile navbar
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    }
  });
});

// ===========================
// 8. SKILL CARD TILT EFFECT
// ===========================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / rect.height) * 8;
    const rotY = (x / rect.width) * 8;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
});

// ===========================
// 9. PROJECT CARD MAGNETIC HOVER
// ===========================
const projectLinks = document.querySelectorAll('.project-link');

projectLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.letterSpacing = '0.18em';
  });
  link.addEventListener('mouseleave', () => {
    link.style.letterSpacing = '';
  });
});

// ===========================
// 10. COUNTER ANIMATION (STATS)
// ===========================
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 1200;
  const step = target / (duration / 16);

  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num');
      nums.forEach(num => {
        const text = num.textContent.trim();
        if (text === '2+') animateCounter(num, 2, '+');
        else if (text === '5+') animateCounter(num, 5, '+');
        // 2026 stays static
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsRow = document.querySelector('.about-stats');
if (statsRow) statObserver.observe(statsRow);

// ===========================
// 11. KEYBOARD ACCESSIBILITY
// ===========================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});
