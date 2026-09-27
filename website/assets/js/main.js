(function () {
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var isOpen = document.body.getAttribute('data-nav-open') === 'true';
      document.body.setAttribute('data-nav-open', isOpen ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    });
  }

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var name = contactForm.name.value.trim();
      var email = contactForm.email.value.trim();
      var phone = contactForm.phone.value.trim();
      var message = contactForm.message.value.trim();

      var bodyLines = [
        'Naam: ' + name,
        'E-mail: ' + email,
        phone ? 'Telefoon: ' + phone : null,
        '',
        message
      ].filter(function (line) { return line !== null; });

      var subject = encodeURIComponent('Contactformulier website — ' + name);
      var body = encodeURIComponent(bodyLines.join('\n'));

      window.location.href = 'mailto:info@jellema-autos.nl?subject=' + subject + '&body=' + body;
    });
  }
})();
