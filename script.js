// ══ CARRUSEL TÁCTIL ══
(function() {
  const track   = document.getElementById('carousel-track');
  const dotsWrap = document.getElementById('carousel-dots');
  if (!track) return;

  const slides  = track.querySelectorAll('.carousel-slide');
  const total   = slides.length;
  let current   = 0;
  let startX    = 0, isDragging = false, dragDelta = 0;

  // Crear dots
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Slide ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });

  function slideWidth() {
    return slides[0].offsetWidth + 24; // ancho + margin*2
  }

  function goTo(index) {
    current = (index + total) % total;
    const offset = -current * slideWidth();
    track.style.transform = `translateX(${offset}px)`;
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  // Botones
  document.getElementById('carousel-prev').addEventListener('click', () => goTo(current - 1));
  document.getElementById('carousel-next').addEventListener('click', () => goTo(current + 1));

  // Touch swipe
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = false;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    dragDelta = e.touches[0].clientX - startX;
    isDragging = true;
    const offset = -current * slideWidth() + dragDelta;
    track.style.transition = 'none';
    track.style.transform = `translateX(${offset}px)`;
  }, { passive: true });

  track.addEventListener('touchend', () => {
    track.style.transition = '';
    if (isDragging) {
      if (dragDelta < -60)      goTo(current + 1);
      else if (dragDelta > 60)  goTo(current - 1);
      else                      goTo(current);
    }
    isDragging = false;
    dragDelta = 0;
  });

  // Mouse drag (desktop)
  track.addEventListener('mousedown', e => {
    startX = e.clientX;
    isDragging = true;
    track.classList.add('dragging');
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    dragDelta = e.clientX - startX;
    const offset = -current * slideWidth() + dragDelta;
    track.style.transition = 'none';
    track.style.transform = `translateX(${offset}px)`;
  });
  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    track.classList.remove('dragging');
    track.style.transition = '';
    if (dragDelta < -60)     goTo(current + 1);
    else if (dragDelta > 60) goTo(current - 1);
    else                     goTo(current);
    isDragging = false;
    dragDelta = 0;
  });

  // Auto-play suave cada 5s
  let autoplay = setInterval(() => goTo(current + 1), 5000);
  track.addEventListener('touchstart', () => clearInterval(autoplay), { passive: true });
  track.addEventListener('mousedown', () => clearInterval(autoplay));

  // Init
  goTo(0);
})();

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
