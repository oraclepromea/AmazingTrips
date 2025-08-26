// Enhanced JavaScript for Amazing Trips Professional Website
(function() {
  'use strict';

  // Curated gallery images array (duplicates removed) - now pointing to Images/optimized
  const images = [
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.16 (3).jpeg', // 18th photo now 1st
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.12 (1).jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.12.jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.13 (1).jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.13 (6).jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.13 (7).jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.13.jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.15 (8).jpeg', // replaced 8th with 17th
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.14 (3).jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.14 (4).jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.15 (9).jpeg', // replaced 11th with 18th
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.14.jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.15 (6).jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.15 (7).jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.15 (8).jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.15.jpeg', // 16th
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.16 (2).jpeg', // 17th
    'Images/optimized/Hero Image.jpeg', // previously 1st, now 18th
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.16 (5).jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.16.jpeg',
    'Images/optimized/WhatsApp Image 2025-08-25 at 16.06.17.jpeg'
  ];

  // Per-image object-position for best subject framing
  const objectPositions = [
    'center top',      // 1. Macaws flying (main subject top)
    'center center',   // 2. Group in boat (center)
    'center 60%',      // 3. Dolphin in water (slightly lower)
    'center 40%',      // 4. Caiman closeup (slightly higher)
    'center 30%',      // 5. Monkey in tree (higher)
    'center 70%',      // 6. Capybara (lower)
    'center center',   // 7. Group photo (center)
    'center 60%',      // 8. Anaconda (slightly lower)
    'center 40%',      // 9. Bala Canyon (slightly higher)
    'center 60%',      // 10. Sunset river (slightly lower)
    'center 50%',      // 11. Piranha fishing (center)
    'center 40%',      // 12. Jungle path (slightly higher)
    'center 60%',      // 13. Night boat (slightly lower)
    'center 40%',      // 14. Community lodge (slightly higher)
    'center 60%',      // 15. Parrot (slightly lower)
    'center center',   // 16. Group at lodge (center)
    'center 40%',      // 17. Madidi river (slightly higher)
    'center center',   // 18. Hero image (center)
    'center 60%',      // 19. Jungle flora (slightly lower)
    'center 50%',      // 20. River bend (center)
    'center 40%'       // 21. Agency logo (slightly higher)
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
    // Set per-image object-position for best subject framing
    img.style.objectPosition = objectPositions[index] || 'center center';
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

  // Itinerary Tabs Functionality
  document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.itinerary-tab');
    const tabContents = document.querySelectorAll('.itinerary-content');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remove active from all
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        // Add active to selected
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        const content = document.getElementById('tab-' + tabId);
        if (content) content.classList.add('active');
      });
    });
  });

  // Language translation logic
  document.addEventListener('DOMContentLoaded', function() {
    const langBtns = {
      es: document.getElementById('lang-es'),
      en: document.getElementById('lang-en')
    };
    let currentLang = 'es';

    // All translatable content
    const translations = {
      nav: {
        es: ['Inicio', 'Nosotros', 'Tours', 'Galería', 'Contacto', 'Book Now'],
        en: ['Home', 'About', 'Tours', 'Gallery', 'Contact', 'Book Now']
      },
      hero: {
        es: {
          title: 'Descubre la Amazonía Boliviana',
          subtitle: 'Vive experiencias únicas en las Pampas, el Cañón del Bala y la Selva Madidi con guías especializados y turismo responsable.',
          btnTours: 'Ver Tours',
          btnBook: 'Reservar Ahora',
          stats: ['Turistas Felices', 'Tours Únicos', 'Años de Experiencia'],
          imgAlt: 'Amazonía Boliviana - Rurrenabaque'
        },
        en: {
          title: 'Discover the Bolivian Amazon',
          subtitle: 'Live unique experiences in the Pampas, Bala Canyon, and Madidi Jungle with expert guides and responsible tourism.',
          btnTours: 'See Tours',
          btnBook: 'Book Now',
          stats: ['Happy Tourists', 'Unique Tours', 'Years of Experience'],
          imgAlt: 'Bolivian Amazon - Rurrenabaque'
        }
      },
      about: {
        es: {
          badge: '¿Quiénes Somos?',
          title: 'Tu Aventura Amazónica Comienza Aquí',
          desc: 'Somos una agencia local especializada en turismo responsable y sostenible en Rurrenabaque, Bolivia. Nuestro compromiso es ofrecerte experiencias auténticas mientras preservamos la rica biodiversidad de la región.',
          cards: [
            ['🌱', 'Turismo Sostenible', 'Trabajamos con comunidades locales para promover un turismo que beneficie tanto a visitantes como a la región.'],
            ['👥', 'Guías Especializados', 'Nuestro equipo cuenta con guías nativos con amplio conocimiento de la flora, fauna y cultura local.'],
            ['🛡️', 'Seguridad Garantizada', 'Todos nuestros tours cumplen con los más altos estándares de seguridad y cuentan con equipos de primeros auxilios.']
          ]
        },
        en: {
          badge: 'Who Are We?',
          title: 'Your Amazon Adventure Starts Here',
          desc: 'We are a local agency specializing in responsible and sustainable tourism in Rurrenabaque, Bolivia. Our commitment is to offer authentic experiences while preserving the region’s rich biodiversity.',
          cards: [
            ['🌱', 'Sustainable Tourism', 'We work with local communities to promote tourism that benefits both visitors and the region.'],
            ['👥', 'Expert Guides', 'Our team includes native guides with extensive knowledge of local flora, fauna, and culture.'],
            ['🛡️', 'Guaranteed Safety', 'All our tours meet the highest safety standards and include first aid equipment.']
          ]
        }
      },
      tours: {
        es: {
          badge: 'Nuestras Experiencias',
          title: 'Tours Diseñados Para Ti',
          desc: 'Desde aventuras de un día hasta expediciones de múltiples días, tenemos el tour perfecto para cada tipo de viajero.',
          cards: [
            {
              badge: 'Más Popular',
              title: 'Pampas Amazónicas',
              duration: '3 días / 2 noches',
              desc: 'Navega por los ríos observando delfines rosados, caimanes y anacondas. Incluye pesca de pirañas y navegación nocturna.',
              highlights: ['🐬 Natación con delfines rosados', '🐍 Búsqueda de anacondas', '🎣 Pesca de pirañas', '🌅 Amanecer y atardecer amazónicos'],
              price: '$180',
              priceLabel: 'por persona',
              btn: 'Reservar'
            },
            {
              badge: '',
              title: 'Cañón del Bala',
              duration: '1 día',
              desc: 'Explora el impresionante cañón y visita la comunidad San Miguel del Bala para conocer sus tradiciones ancestrales.',
              highlights: ['🏞️ Paisajes espectaculares', '🥾 Caminata guiada', '🏘️ Comunidad indígena', '🍯 Molienda de caña tradicional'],
              price: '$90',
              priceLabel: 'por persona',
              btn: 'Reservar'
            },
            {
              badge: 'Combo',
              title: 'Pampas + Cañón',
              duration: '3 días / 2 noches',
              desc: 'La combinación perfecta: aventura en las Pampas con la majestuosidad del Cañón del Bala en un solo paquete.',
              highlights: ['🌊 Lo mejor de ambos mundos', '💰 Ahorro en combo', '🗓️ Itinerario optimizado', '📸 Máxima variedad fotográfica'],
              price: '$200',
              priceLabel: 'por persona',
              btn: 'Reservar'
            },
            {
              badge: 'Experiencia Completa',
              title: 'Pampas + Selva Madidi',
              duration: '4 días / 3 noches',
              desc: 'La experiencia amazónica más completa: Pampas + inmersión total en la Selva Madidi con alojamiento en comunidad.',
              highlights: ['🏕️ Alojamiento en comunidad', '🌿 Parque Nacional Madidi', '🦋 Biodiversidad excepcional', '🌙 Caminatas nocturnas'],
              price: '$380',
              priceLabel: 'por persona',
              btn: 'Reservar'
            }
          ]
        },
        en: {
          badge: 'Our Experiences',
          title: 'Tours Designed For You',
          desc: 'From day adventures to multi-day expeditions, we have the perfect tour for every traveler.',
          cards: [
            {
              badge: 'Most Popular',
              title: 'Amazon Pampas',
              duration: '3 days / 2 nights',
              desc: 'Sail the rivers spotting pink dolphins, caimans, and anacondas. Includes piranha fishing and night navigation.',
              highlights: ['🐬 Swim with pink dolphins', '🐍 Anaconda search', '🎣 Piranha fishing', '🌅 Amazonian sunrise and sunset'],
              price: '$180',
              priceLabel: 'per person',
              btn: 'Book'
            },
            {
              badge: '',
              title: 'Bala Canyon',
              duration: '1 day',
              desc: 'Explore the impressive canyon and visit the San Miguel del Bala community to learn about their ancestral traditions.',
              highlights: ['🏞️ Spectacular landscapes', '🥾 Guided hike', '🏘️ Indigenous community', '🍯 Traditional sugarcane milling'],
              price: '$90',
              priceLabel: 'per person',
              btn: 'Book'
            },
            {
              badge: 'Combo',
              title: 'Pampas + Canyon',
              duration: '3 days / 2 nights',
              desc: 'The perfect combination: Pampas adventure with the majesty of Bala Canyon in one package.',
              highlights: ['🌊 Best of both worlds', '💰 Combo savings', '🗓️ Optimized itinerary', '📸 Maximum photo variety'],
              price: '$200',
              priceLabel: 'per person',
              btn: 'Book'
            },
            {
              badge: 'Full Experience',
              title: 'Pampas + Madidi Jungle',
              duration: '4 days / 3 nights',
              desc: 'The most complete Amazon experience: Pampas + full immersion in Madidi Jungle with community lodging.',
              highlights: ['🏕️ Community lodging', '🌿 Madidi National Park', '🦋 Exceptional biodiversity', '🌙 Night walks'],
              price: '$380',
              priceLabel: 'per person',
              btn: 'Book'
            }
          ]
        }
      },
      gallery: {
        es: {
          badge: 'Nuestras Aventuras',
          title: 'Galería de Experiencias',
          desc: 'Fotos reales de nuestras expediciones capturadas por nuestros huéspedes y guías profesionales.'
        },
        en: {
          badge: 'Our Adventures',
          title: 'Experience Gallery',
          desc: 'Real photos from our expeditions, captured by our guests and professional guides.'
        }
      },
      contact: {
        es: {
          title: '¿Listo Para Tu Aventura?',
          desc: 'Contáctanos para planificar tu experiencia amazónica perfecta. Nuestro equipo está disponible para resolver todas tus dudas.',
          whatsapp: 'WhatsApp',
          phone: '+591 7848 1534',
          available: 'Disponible 24/7',
          location: 'Ubicación',
          city: 'Rurrenabaque, Bolivia',
          gateway: 'Puerta de entrada a la Amazonía',
          hours: 'Horarios',
          schedule: 'Lun - Dom: 6:00 - 22:00',
          always: 'Siempre disponibles por WhatsApp',
          altPhone: 'Teléfono Alternativo',
          altNumber: '+591 7286 2223',
          localCalls: 'Llamadas y mensajes locales',
          contactBtn: 'Contactar por WhatsApp',
          whyUs: '¿Por qué elegirnos?',
          benefits: [
            '✅ Guías locales certificados',
            '✅ Grupos pequeños (máx. 8 personas)',
            '✅ Equipo de seguridad incluido',
            '✅ Turismo responsable',
            '✅ Precios transparentes',
            '✅ Garantía de satisfacción'
          ]
        },
        en: {
          title: 'Ready For Your Adventure?',
          desc: 'Contact us to plan your perfect Amazon experience. Our team is available to answer all your questions.',
          whatsapp: 'WhatsApp',
          phone: '+591 7848 1534',
          available: 'Available 24/7',
          location: 'Location',
          city: 'Rurrenabaque, Bolivia',
          gateway: 'Gateway to the Amazon',
          hours: 'Hours',
          schedule: 'Mon - Sun: 6:00am - 10:00pm',
          always: 'Always available on WhatsApp',
          altPhone: 'Alternative Phone',
          altNumber: '+591 7286 2223',
          localCalls: 'Local calls and messages',
          contactBtn: 'Contact via WhatsApp',
          whyUs: 'Why choose us?',
          benefits: [
            '✅ Certified local guides',
            '✅ Small groups (max. 8 people)',
            '✅ Safety equipment included',
            '✅ Responsible tourism',
            '✅ Transparent pricing',
            '✅ Satisfaction guarantee'
          ]
        }
      },
      itinerary: {
        es: {
          badge: 'Itinerarios',
          title: 'Itinerario Detallado',
          desc: 'Selecciona un tour para ver el itinerario detallado día por día. Puedes reservar directamente desde cada pestaña.',
          tabs: ['Pampas', 'Cañón del Bala', 'Pampas + Cañón', 'Pampas + Selva Madidi'],
          pampas: [
            '<strong>Día 1</strong><ul><li>Salida 10:00 AM desde la agencia hacia Santa Rosa</li><li>Almuerzo en Santa Rosa (incluido)</li><li>Navegación de ~3 horas observando fauna: capibaras, lagartos, tortugas, monos, etc.</li><li>Cena y descanso</li><li>Navegación nocturna para disfrutar el sonido de la noche y observar ojos de lagartos</li></ul>',
            '<strong>Día 2</strong><ul><li>05:00 salida para ver el amanecer</li><li>07:30 desayuno (buffet)</li><li>08:00 caminata buscando anacondas (3–4 horas aprox.)</li><li>12:00 almuerzo</li><li>Siesta</li><li>15:00 natación con delfines</li><li>17:30 salida para ver el atardecer</li><li>19:00 cena</li><li>20:00 navegación en bote nocturna</li></ul>',
            '<strong>Día 3</strong><ul><li>07:30 desayuno</li><li>Pesca de pirañas</li><li>12:00 almuerzo</li><li>Retorno a Rurrenabaque (llegada estimada 15:30–16:30)</li></ul>'
          ],
          pampasBtn: 'Reservar / WhatsApp',
          canon: [
            'Salida 08:00 AM en bote (40 minutos)',
            'Caminata ~1.5 horas: observación de insectos, plantas medicinales y paisaje',
            'Visita a la comunidad San Miguel del Bala: molienda de caña de azúcar y costumbres locales',
            '12:00 retorno a Rurrenabaque — fin del tour'
          ],
          canonBtn: 'Reservar / WhatsApp',
          combo: [
            '<strong>Día 1</strong>: Salida 10:00 AM hacia Santa Rosa, almuerzo incluido, navegación ~3 horas, cena y descanso',
            '<strong>Día 2</strong>: Salida temprana al Cañón del Bala (08:00 AM) — bote 40 min, caminata y visita a comunidad; por la tarde actividades en pampas (natación con delfines o pesca de pirañas según el programa)',
            '<strong>Día 3</strong>: Desayuno, actividades finales y retorno a Rurrenabaque'
          ],
          comboBtn: 'Reservar / WhatsApp',
          madidi: [
            '<strong>Día 1 (Pampas)</strong>: Salida 10:00 AM desde la agencia hacia Santa Rosa, almuerzo incluido, navegación ~3 horas, cena. Navegación nocturna y descanso.',
            '<strong>Día 2 (Pampas / Traslado a Selva)</strong>: Desayuno buffet, natación con delfines rosados, pesca de pirañas, almuerzo y retorno a Rurrenabaque (llegada 15:30–16:30). 17:00 salida hacia Selva Madidi; navegación 20 minutos por el río Beni. Llegada a la comunidad, acomodación en albergue, cena y caminata nocturna (~2 horas).',
            '<strong>Día 3 (Selva)</strong>: Desayuno, navegación ~3 horas por el río Beni y el río Tuichi hasta el campamento, almuerzo, caminata hacia el parabal para fotografía, siesta y más caminatas por senderos, cena. Opcional caminata nocturna o descanso.',
            '<strong>Día 4 (Retorno)</strong>: Desayuno, caminata matinal y retorno a Rurrenabaque.'
          ],
          madidiBtn: 'Reservar / WhatsApp'
        },
        en: {
          badge: 'Itineraries',
          title: 'Detailed Itinerary',
          desc: 'Select a tour to see the detailed day-by-day itinerary. You can book directly from each tab.',
          tabs: ['Pampas', 'Bala Canyon', 'Pampas + Canyon', 'Pampas + Madidi Jungle'],
          pampas: [
            '<strong>Day 1</strong><ul><li>Departure 10:00 AM from the agency to Santa Rosa</li><li>Lunch in Santa Rosa (included)</li><li>~3 hour boat ride observing wildlife: capybaras, caimans, turtles, monkeys, etc.</li><li>Dinner and rest</li><li>Night navigation to enjoy the sounds and spot caiman eyes</li></ul>',
            '<strong>Day 2</strong><ul><li>05:00 sunrise outing</li><li>07:30 breakfast (buffet)</li><li>08:00 walk searching for anacondas (approx. 3–4 hours)</li><li>12:00 lunch</li><li>Siesta</li><li>15:00 swimming with dolphins</li><li>17:30 sunset outing</li><li>19:00 dinner</li><li>20:00 night boat navigation</li></ul>',
            '<strong>Day 3</strong><ul><li>07:30 breakfast</li><li>Piranha fishing</li><li>12:00 lunch</li><li>Return to Rurrenabaque (estimated arrival 15:30–16:30)</li></ul>'
          ],
          pampasBtn: 'Book / WhatsApp',
          canon: [
            'Departure 08:00 AM by boat (40 minutes)',
            'Hike ~1.5 hours: observe insects, medicinal plants, and landscape',
            'Visit San Miguel del Bala community: sugarcane milling and local customs',
            '12:00 return to Rurrenabaque — end of tour'
          ],
          canonBtn: 'Book / WhatsApp',
          combo: [
            '<strong>Day 1</strong>: Departure 10:00 AM to Santa Rosa, lunch included, ~3 hour boat ride, dinner and rest',
            '<strong>Day 2</strong>: Early departure to Bala Canyon (08:00 AM) — 40 min boat, hike and community visit; afternoon activities in pampas (swimming with dolphins or piranha fishing as per program)',
            '<strong>Day 3</strong>: Breakfast, final activities and return to Rurrenabaque'
          ],
          comboBtn: 'Book / WhatsApp',
          madidi: [
            '<strong>Day 1 (Pampas)</strong>: Departure 10:00 AM from the agency to Santa Rosa, lunch included, ~3 hour boat ride, dinner. Night navigation and rest.',
            '<strong>Day 2 (Pampas / Transfer to Jungle)</strong>: Buffet breakfast, swimming with pink dolphins, piranha fishing, lunch and return to Rurrenabaque (arrival 15:30–16:30). 17:00 departure to Madidi Jungle; 20 min boat ride on the Beni river. Arrival at the community, lodge accommodation, dinner and night walk (~2 hours).',
            '<strong>Day 3 (Jungle)</strong>: Breakfast, ~3 hour boat ride on the Beni and Tuichi rivers to the camp, lunch, walk to the parabal for photography, siesta and more trail walks, dinner. Optional night walk or rest.',
            '<strong>Day 4 (Return)</strong>: Breakfast, morning walk and return to Rurrenabaque.'
          ],
          madidiBtn: 'Book / WhatsApp'
        }
      }
    };

    function setLang(lang) {
      currentLang = lang;
      // Update nav
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks[0].textContent = translations.nav[lang][0];
      navLinks[1].textContent = translations.nav[lang][1];
      navLinks[2].textContent = translations.nav[lang][2];
      navLinks[3].textContent = translations.nav[lang][3];
      navLinks[4].textContent = translations.nav[lang][4];
      navLinks[5].textContent = translations.nav[lang][5];
      // Update hero
      document.querySelector('.hero-title').textContent = translations.hero[lang].title;
      document.querySelector('.hero-subtitle').textContent = translations.hero[lang].subtitle;
      document.querySelector('.hero-buttons .btn-primary').textContent = translations.hero[lang].btnTours;
      document.querySelector('.hero-buttons .btn-outline').textContent = translations.hero[lang].btnBook;
      document.querySelector('.hero-image img').alt = translations.hero[lang].imgAlt;
      // Update stats
      const statLabels = document.querySelectorAll('.stat-label');
      statLabels[0].textContent = translations.hero[lang].stats[0];
      statLabels[1].textContent = translations.hero[lang].stats[1];
      statLabels[2].textContent = translations.hero[lang].stats[2];
      // Update about
      document.querySelector('.about .section-badge').textContent = translations.about[lang].badge;
      document.querySelector('.about .section-title').textContent = translations.about[lang].title;
      document.querySelector('.about .section-description').textContent = translations.about[lang].desc;
      const aboutCards = document.querySelectorAll('.about-card');
      translations.about[lang].cards.forEach((card, i) => {
        aboutCards[i].querySelector('.about-icon').textContent = card[0];
        aboutCards[i].querySelector('h3').textContent = card[1];
        aboutCards[i].querySelector('p').textContent = card[2];
      });
      // Update tours section
      const toursSection = document.querySelector('.tours');
      if (toursSection) {
        toursSection.querySelector('.section-badge').textContent = translations.tours[lang].badge;
        toursSection.querySelector('.section-title').textContent = translations.tours[lang].title;
        toursSection.querySelector('.section-description').textContent = translations.tours[lang].desc;
        const tourCards = toursSection.querySelectorAll('.tour-card');
        translations.tours[lang].cards.forEach((card, i) => {
          if (!tourCards[i]) return;
          const badge = tourCards[i].querySelector('.tour-badge');
          if (badge) badge.textContent = card.badge;
          tourCards[i].querySelector('.tour-title').textContent = card.title;
          tourCards[i].querySelector('.tour-duration').textContent = card.duration;
          tourCards[i].querySelector('.tour-description').textContent = card.desc;
          const highlights = tourCards[i].querySelectorAll('.tour-highlights li');
          card.highlights.forEach((hl, j) => { if (highlights[j]) highlights[j].textContent = hl; });
          tourCards[i].querySelector('.price-amount').textContent = card.price;
          tourCards[i].querySelector('.price-label').textContent = card.priceLabel;
          tourCards[i].querySelector('.btn-tour').textContent = card.btn;
        });
      }
      // Update gallery section
      const gallerySection = document.querySelector('.gallery');
      if (gallerySection) {
        gallerySection.querySelector('.section-badge').textContent = translations.gallery[lang].badge;
        gallerySection.querySelector('.section-title').textContent = translations.gallery[lang].title;
        gallerySection.querySelector('.section-description').textContent = translations.gallery[lang].desc;
      }
      // Update contact section
      const contactSection = document.querySelector('.contact');
      if (contactSection) {
        contactSection.querySelector('.contact-title').textContent = translations.contact[lang].title;
        contactSection.querySelector('.contact-description').textContent = translations.contact[lang].desc;
        // WhatsApp
        const contactMethods = contactSection.querySelectorAll('.contact-method');
        if (contactMethods[0]) {
          contactMethods[0].querySelector('h3').textContent = translations.contact[lang].whatsapp;
          contactMethods[0].querySelector('p').textContent = translations.contact[lang].phone;
          contactMethods[0].querySelector('.contact-note').textContent = translations.contact[lang].available;
        }
        // Location
        if (contactMethods[1]) {
          contactMethods[1].querySelector('h3').textContent = translations.contact[lang].location;
          contactMethods[1].querySelector('p').textContent = translations.contact[lang].city;
          contactMethods[1].querySelector('.contact-note').textContent = translations.contact[lang].gateway;
        }
        // Hours
        if (contactMethods[2]) {
          contactMethods[2].querySelector('h3').textContent = translations.contact[lang].hours;
          contactMethods[2].querySelector('p').textContent = translations.contact[lang].schedule;
          contactMethods[2].querySelector('.contact-note').textContent = translations.contact[lang].always;
        }
        // Alt phone
        if (contactMethods[3]) {
          contactMethods[3].querySelector('h3').textContent = translations.contact[lang].altPhone;
          contactMethods[3].querySelector('p').textContent = translations.contact[lang].altNumber;
          contactMethods[3].querySelector('.contact-note').textContent = translations.contact[lang].localCalls;
        }
        // Contact button
        const contactBtn = contactSection.querySelector('.btn-whatsapp');
        if (contactBtn) contactBtn.textContent = `📱 ${translations.contact[lang].contactBtn}`;
        // Why us
        const whyUsTitle = contactSection.querySelector('.contact-card h3');
        if (whyUsTitle) whyUsTitle.textContent = translations.contact[lang].whyUs;
        // Benefits
        const benefitsList = contactSection.querySelectorAll('.benefits-list li');
        translations.contact[lang].benefits.forEach((b, i) => { if (benefitsList[i]) benefitsList[i].textContent = b; });
      }
      // Update itinerary section
      const itinSection = document.querySelector('.itinerary');
      if (itinSection) {
        itinSection.querySelector('.section-badge').textContent = translations.itinerary[lang].badge;
        itinSection.querySelector('.section-title').textContent = translations.itinerary[lang].title;
        itinSection.querySelector('.section-description').textContent = translations.itinerary[lang].desc;
        // Tabs
        const tabs = itinSection.querySelectorAll('.itinerary-tab');
        translations.itinerary[lang].tabs.forEach((tab, i) => { if (tabs[i]) tabs[i].textContent = tab; });
        // Pampas
        const pampasList = itinSection.querySelector('#tab-pampas .itinerary-card ul');
        if (pampasList) {
          pampasList.innerHTML = translations.itinerary[lang].pampas.map(x => `<li>${x}</li>`).join('');
          itinSection.querySelector('#tab-pampas .btn-tour').textContent = translations.itinerary[lang].pampasBtn;
        }
        // Cañón
        const canonList = itinSection.querySelector('#tab-canon .itinerary-card ul');
        if (canonList) {
          canonList.innerHTML = translations.itinerary[lang].canon.map(x => `<li>${x}</li>`).join('');
          itinSection.querySelector('#tab-canon .btn-tour').textContent = translations.itinerary[lang].canonBtn;
        }
        // Combo
        const comboList = itinSection.querySelector('#tab-combo .itinerary-card ul');
        if (comboList) {
          comboList.innerHTML = translations.itinerary[lang].combo.map(x => `<li>${x}</li>`).join('');
          itinSection.querySelector('#tab-combo .btn-tour').textContent = translations.itinerary[lang].comboBtn;
        }
        // Madidi
        const madidiList = itinSection.querySelector('#tab-madidi .itinerary-card ul');
        if (madidiList) {
          madidiList.innerHTML = translations.itinerary[lang].madidi.map(x => `<li>${x}</li>`).join('');
          itinSection.querySelector('#tab-madidi .btn-tour').textContent = translations.itinerary[lang].madidiBtn;
        }
      }
      // Update active button
      langBtns.es.classList.toggle('active', lang === 'es');
      langBtns.en.classList.toggle('active', lang === 'en');
    }

    langBtns.es.addEventListener('click', () => setLang('es'));
    langBtns.en.addEventListener('click', () => setLang('en'));
    // Default to Spanish
    setLang('es');
  });

})();
