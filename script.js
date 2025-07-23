document.addEventListener('DOMContentLoaded', function () {
  // Theme toggle functionality
  const themeToggle = document.getElementById('theme-toggle');
  const icon = themeToggle.querySelector('i');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Check for saved theme preference or use preferred color scheme
  let currentTheme = localStorage.getItem('theme');
  if (!currentTheme) {
    currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
  }

  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    if (isDark) {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const nav = document.querySelector('.nav');

  mobileMenuButton.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuButton.innerHTML = nav.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Header scroll effect
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Form validation
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    // Validate name
    const name = document.getElementById('name');
    const nameError = name.nextElementSibling;
    if (!name.value.trim()) {
      nameError.textContent = 'Name is required';
      nameError.style.display = 'block';
      isValid = false;
    } else {
      nameError.style.display = 'none';
    }

    // Validate email
    const email = document.getElementById('email');
    const emailError = email.nextElementSibling;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.value.trim()) {
      emailError.textContent = 'Email is required';
      emailError.style.display = 'block';
      isValid = false;
    } else if (!emailRegex.test(email.value)) {
      emailError.textContent = 'Please enter a valid email';
      emailError.style.display = 'block';
      isValid = false;
    } else {
      emailError.style.display = 'none';
    }

    // Validate message
    const message = document.getElementById('message');
    const messageError = message.nextElementSibling;
    if (!message.value.trim()) {
      messageError.textContent = 'Message is required';
      messageError.style.display = 'block';
      isValid = false;
    } else {
      messageError.style.display = 'none';
    }

    // If form is valid, submit it
    if (isValid) {
      // Simulated form submission
      console.log('Form submitted:', {
        name: name.value,
        email: email.value,
        message: message.value
      });

      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    }
  });

  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
