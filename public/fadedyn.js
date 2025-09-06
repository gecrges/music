// fade.js - simple observer, global function
const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
      observer.unobserve(entry.target);
    }
  });
});

function observeFadeInElements() {
  document.querySelectorAll('.fade-in:not(.fade-in-visible)').forEach(el => {
    fadeObserver.observe(el);
  });
}

// automatically run once when script loads
observeFadeInElements();
