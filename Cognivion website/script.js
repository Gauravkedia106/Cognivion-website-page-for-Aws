// Mobile menu
document.getElementById('hbg').addEventListener('click', function () {
  document.getElementById('mobMenu').classList.toggle('show');
});
document.querySelectorAll('#mobMenu a').forEach(function (a) {
  a.addEventListener('click', function () {
    document.getElementById('mobMenu').classList.remove('show');
  });
});

// Active nav link on scroll
var sections = document.querySelectorAll('section[id],div[id]');
var navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', function () {
  var pos = window.scrollY + 100;
  sections.forEach(function (s) {
    if (pos >= s.offsetTop && pos < s.offsetTop + s.offsetHeight) {
      navLinks.forEach(function (a) { a.classList.remove('active-link'); });
      var matching = document.querySelector('.nav-links a[href="#' + s.id + '"]');
      if (matching) matching.style.color = '#f4701e';
    }
  });
}, { passive: true });

// Count-up animation
const countItems = document.querySelectorAll('.count-me');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const endVal = parseInt(target.getAttribute('data-target'));
      const suffix = target.getAttribute('data-suffix') || '';
      let startVal = 0;
      const duration = 2000;
      const startTime = performance.now();

      function updateCount(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentVal = Math.floor(progress * endVal);

        // Format number with commas for 3000+
        let displayVal = currentVal;
        if (endVal >= 1000) {
          displayVal = currentVal.toLocaleString();
        }

        target.innerText = displayVal + suffix;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          target.innerText = endVal.toLocaleString() + suffix;
        }
      }
      requestAnimationFrame(updateCount);
      countObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });

countItems.forEach(item => countObserver.observe(item));
