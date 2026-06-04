const loader = document.getElementById('loader');
const themeSwitch = document.getElementById('themeSwitch');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const cursor = document.getElementById('cursor');
const revealElements = document.querySelectorAll('.reveal');
const contactForm = document.getElementById('contactForm');
const backToTop = document.getElementById('backToTop');
const body = document.body;

window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hide'), 650);
  applyTheme();
  initReveal();
  initCursor();
});

function applyTheme() {
  const theme = localStorage.getItem('portfolio-theme');
  if (theme === 'light') {
    body.classList.add('light');
    themeSwitch.textContent = '☀️';
  } else {
    body.classList.remove('light');
    themeSwitch.textContent = '☾';
  }
}

if (themeSwitch) {
  themeSwitch.addEventListener('click', () => {
    body.classList.toggle('light');
    const isLight = body.classList.contains('light');
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
    themeSwitch.textContent = isLight ? '☀️' : '☾';
  });
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.forEach((item) => item.classList.remove('active'));
    link.classList.add('active');
    navMenu.classList.remove('open');
  });
});

function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealElements.forEach((el) => observer.observe(el));
}

function initCursor() {
  window.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });

  window.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
  });

  window.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = contactForm.elements.name.value.trim();
    const email = contactForm.elements.email.value.trim();
    const subject = contactForm.elements.subject.value.trim();
    const message = contactForm.elements.message.value.trim();
    const text = `Hello Vignesh,%0A%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0ASubject: ${encodeURIComponent(subject)}%0AMessage: ${encodeURIComponent(message)}%0A%0AThank you.`;
    const whatsappUrl = `https://wa.me/9163834488927?text=${text}`;
    window.open(whatsappUrl, '_blank');
    contactForm.reset();
  });
}

function updateBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle('show', window.scrollY > 520);
}

window.addEventListener('scroll', updateBackToTop);

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.addEventListener('click', (event) => {
  if (navMenu.classList.contains('open') && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
    navMenu.classList.remove('open');
  }
});
