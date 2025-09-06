document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('year').textContent = new Date().getFullYear();

  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');

  navToggle.addEventListener('click', function(){
    const expanded = siteNav.style.display === 'flex';
    siteNav.style.display = expanded ? '' : 'flex';
    if(!expanded){
      siteNav.style.flexDirection = 'column';
      siteNav.style.gap = '12px';
    }
  });
});
