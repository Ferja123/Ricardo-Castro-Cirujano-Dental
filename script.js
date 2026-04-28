// ══ NAV SCROLL ══
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ══ HAMBURGER ══
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
hamburger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
navMobile.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ══ SMOOTH SCROLL ══
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ══ CONTACT FORM → WHATSAPP ══
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('c-name').value;
  const phone   = document.getElementById('c-phone').value;
  const service = document.getElementById('c-service').value;
  const msg     = document.getElementById('c-msg').value;
  const text = `Hola Dr. Castro, mi nombre es ${name}. Me interesa: ${service || 'una consulta'}. Mi teléfono: ${phone}. ${msg ? 'Mensaje: ' + msg : ''}`;
  window.open(`https://wa.me/51919749480?text=${encodeURIComponent(text)}`, '_blank');
});

// ══ FADE-IN ON SCROLL ══
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.service-card, .testimonio-card, .process-step, .credential, .contact-info-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
