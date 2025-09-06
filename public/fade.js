/*document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("*");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-visible");
        observer.unobserve(entry.target); // fade-in only once
      }
    });
  }, { threshold: 0.05 });

  elements.forEach(el => observer.observe(el));
});*/

document.addEventListener('DOMContentLoaded', () => {
  const faders = document.querySelectorAll('.fade-in');

  const options = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target); // only once
      }
    });
  }, options);

  faders.forEach(fader => {
    observer.observe(fader);
  });
});
