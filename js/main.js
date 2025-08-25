// Populate gallery from the Images folder and implement a lightbox
(function(){
  const images = [
    'Images/Hero Image.jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.12 (1).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.12 (3).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.12.jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.13 (1).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.13 (2).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.13 (3).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.13 (4).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.13 (5).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.13 (6).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.13 (7).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.13.jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (1).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (2).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (3).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (4).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (5).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (6).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (7).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (8).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14 (9).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.14.jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15 (1).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15 (2).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15 (3).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15 (4).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15 (5).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15 (6).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15 (7).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15 (8).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15 (9).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.15.jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.16 (1).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.16 (2).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.16 (3).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.16 (4).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.16 (5).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.16 (6).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.16 (7).jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.16.jpeg',
    'Images/WhatsApp Image 2025-08-25 at 16.06.17.jpeg'
  ];

  const gallery = document.getElementById('galleryGrid');
  if(!gallery) return;

  images.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Amazing Trips — foto ${idx+1}`;
    img.tabIndex = 0;
    img.dataset.index = idx;
    img.loading = 'lazy';
    img.addEventListener('click', openLightbox);
    img.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' ') openLightbox(e); });
    gallery.appendChild(img);
  });

  // Create lightbox element
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <div class="inner" role="dialog" aria-modal="true">
      <button class="close" aria-label="Cerrar">×</button>
      <img src="" alt="" />
      <div class="nav">
        <button class="prev" aria-label="Anterior">‹</button>
        <button class="next" aria-label="Siguiente">›</button>
      </div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('img');
  const btnClose = lightbox.querySelector('.close');
  const btnPrev = lightbox.querySelector('.prev');
  const btnNext = lightbox.querySelector('.next');
  let current = 0;

  function openLightbox(e){
    const idx = Number(e.currentTarget.dataset.index);
    current = isNaN(idx) ? 0 : idx;
    show(current);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function closeLightbox(){
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function show(i){
    if(i < 0) i = images.length - 1;
    if(i >= images.length) i = 0;
    current = i;
    lbImg.src = images[i];
    lbImg.alt = `Amazing Trips — foto ${i+1}`;
  }

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', () => show(current - 1));
  btnNext.addEventListener('click', () => show(current + 1));

  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if(!lightbox.classList.contains('active')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') show(current - 1);
    if(e.key === 'ArrowRight') show(current + 1);
  });

})();
