(function () {
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = document.body.getAttribute('data-nav-open') === 'true';
      document.body.setAttribute('data-nav-open', isOpen ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  }
})();
