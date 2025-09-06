const blobs = document.querySelectorAll('#blob-bg .blob');
const hoverArea = document.getElementById('hover-area');

// initial positioning and animations setup
blobs.forEach((blob, i) => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const startX = vw / 2 + (Math.random() - 0.5) * vw * 0.7;
  const startY = vh / 2 + (Math.random() - 0.5) * vh * 0.7;

  blob.style.left = `${startX}px`;
  blob.style.top = `${startY}px`;

  blob.style.animationDelay = `${Math.random() * 10}s`;
});

// on scroll - subtle random jumps vertically
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const delta = Math.abs(window.scrollY - lastScrollY);
  lastScrollY = window.scrollY;

  blobs.forEach(blob => {
    const jump = (Math.random() - 0.5) * delta * 0.5;
    blob.style.transform = `translateY(${jump}px)`;
    setTimeout(() => {
      blob.style.transform = '';
    }, 300);
  });
});

// on hover over #hover-area morph blobs inside that zone
hoverArea.addEventListener('mouseenter', () => {
  blobs.forEach(blob => {
    // check if blob is inside hoverArea horizontally
    const rect = blob.getBoundingClientRect();
    const hoverRect = hoverArea.getBoundingClientRect();

    if (rect.left + rect.width / 2 >= hoverRect.left &&
        rect.left + rect.width / 2 <= hoverRect.right) {
      blob.classList.add('morphing');
    }
  });
});

hoverArea.addEventListener('mouseleave', () => {
  blobs.forEach(blob => {
    blob.classList.remove('morphing');
  });
});
