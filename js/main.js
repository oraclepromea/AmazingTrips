// Enhanced JavaScript for Amazing Trips Professional Website
(function() {
  'use strict';

  // Curated gallery images array (duplicates removed)
  const images = [
    'Images/Hero Image.jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.12 (1).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.12 (3).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.13 (2).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.13 (4).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.13 (6).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.13 (7).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (2).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (3).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (5).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (8).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (9).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15 (1).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15 (4).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15 (6).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15 (8).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.16 (2).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.16 (4).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.16 (6).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.17.jpeg'
  ];

  // State management
  let currentImageIndex = 0;
  let galleryLoaded = 12; // Initially show 12 images
  const galleryIncrement = 8; // Load 8 more each time

  // DOM elements
  const gallery = document.getElementById('galleryGrid');
  const loadMoreBtn = document.getElementById('loadMore');
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const backToTop = document.getElementById('backToTop');

  // Initialize everything when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initGallery();
    initLightbox();
    initScrollEffects();
    initSmoothScrolling();
  });

  // Navigation functionality
  function initNavigation() {
    if (!navToggle || !navMenu) return;

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  // Gallery functionality
  function initGallery() {
    if (!gallery) return;

    loadGalleryImages();

    // Load more button functionality
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function() {
        loadGalleryImages();
      });
    }
  }

  function loadGalleryImages() {
    const fragment = document.createDocumentFragment();
    const endIndex = Math.min(galleryLoaded, images.length);

    for (let i = gallery.children.length; i < endIndex; i++) {
      const img = createGalleryImage(images[i], i);
      fragment.appendChild(img);
    }

    gallery.appendChild(fragment);
    galleryLoaded += galleryIncrement;

    // Hide load more button if all images are loaded
    if (galleryLoaded >= images.length && loadMoreBtn) {
      loadMoreBtn.style.display = 'none';
    }
  }

  function createGalleryImage(src, index) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Amazing Trips — Experiencia ${index + 1}`;
    img.loading = 'lazy';
    img.tabIndex = 0;
    img.dataset.index = index;
    
    // Event listeners for opening lightbox
    img.addEventListener('click', () => openLightbox(index));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });

    return img;
  }

  // Lightbox functionality
  function initLightbox() {
    createLightboxElement();
  }

  function createLightboxElement() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
      <div class="inner" role="dialog" aria-modal="true" aria-labelledby="lightbox-title">
        <button class="close" aria-label="Cerrar galería" title="Cerrar (Esc)">×</button>
        <img src="" alt="" id="lightbox-image" />
        <div class="nav">
          <button class="prev" aria-label="Imagen anterior" title="Anterior (←)">‹</button>
          <button class="next" aria-label="Imagen siguiente" title="Siguiente (→)">›</button>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);

    // Get lightbox elements
    const lbImg = lightbox.querySelector('#lightbox-image');
    const btnClose = lightbox.querySelector('.close');
    const btnPrev = lightbox.querySelector('.prev');
    const btnNext = lightbox.querySelector('.next');

    // Event listeners
    btnClose.addEventListener('click', closeLightbox);
    btnPrev.addEventListener('click', () => showImage(currentImageIndex - 1));
    btnNext.addEventListener('click', () => showImage(currentImageIndex + 1));

    // Close lightbox when clicking outside
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;

      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          showImage(currentImageIndex - 1);
          break;
        case 'ArrowRight':
          showImage(currentImageIndex + 1);
          break;
      }
    });

    function showImage(index) {
      if (index < 0) index = images.length - 1;
      if (index >= images.length) index = 0;
      
      currentImageIndex = index;
      lbImg.src = images[index];
      lbImg.alt = `Amazing Trips — Experiencia ${index + 1} de ${images.length}`;
    }

    // Make functions available to openLightbox
    window.showLightboxImage = showImage;
    window.lightboxElement = lightbox;
  }

  function openLightbox(index) {
    const lightbox = window.lightboxElement;
    if (!lightbox) return;

    currentImageIndex = index;
    window.showLightboxImage(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus on close button for accessibility
    const closeBtn = lightbox.querySelector('.close');
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    const lightbox = window.lightboxElement;
    if (!lightbox) return;

    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Scroll effects
  function initScrollEffects() {
    let ticking = false;

    function updateScrollEffects() {
      const scrollY = window.pageYOffset;
      
      // Navbar background opacity
      if (navbar) {
        if (scrollY > 100) {
          navbar.style.background = 'rgba(255, 255, 255, 0.98)';
          navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
          navbar.style.background = 'rgba(255, 255, 255, 0.95)';
          navbar.style.boxShadow = 'none';
        }
      }

      // Back to top button
      if (backToTop) {
        if (scrollY > 500) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }

      ticking = false;
    }

    function requestScrollUpdate() {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestScrollUpdate);

    // Back to top functionality
    if (backToTop) {
      backToTop.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // Smooth scrolling for navigation links
  function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just '#' or external link
        if (href === '#' || href.startsWith('http')) return;
        
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const headerOffset = navbar ? navbar.offsetHeight + 20 : 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      });
    });
  }

  // Intersection Observer for animations
  function initAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = '0.1s';
          entry.target.style.animationFillMode = 'both';
          entry.target.style.animationName = 'fadeInUp';
          entry.target.style.animationDuration = '0.6s';
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.tour-card, .about-card, .contact-method');
    animateElements.forEach(el => observer.observe(el));
  }

  // Performance optimization: Lazy load animations
  if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', initAnimations);
  }

  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .nav-toggle.active .bar:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active .bar:nth-child(2) {
      opacity: 0;
    }
    
    .nav-toggle.active .bar:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  `;
  document.head.appendChild(style);

  // Error handling for images
  function handleImageError(img) {
    img.style.display = 'none';
    console.warn('Failed to load image:', img.src);
  }

  // Add error handling to all images
  document.addEventListener('DOMContentLoaded', function() {
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
      img.addEventListener('error', () => handleImageError(img));
    });
  });

})();
