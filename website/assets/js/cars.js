(function () {
  var CAR_ICON_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
    '<path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13"/>' +
    '<path d="M3 13h18v4a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4Z"/>' +
    '<circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>';

  function formatKm(km) {
    return km.toLocaleString('nl-NL') + ' km';
  }

  function formatPrice(prijs) {
    return '€ ' + prijs.toLocaleString('nl-NL');
  }

  function carCardHTML(car, ctaLabel, ctaHref) {
    var meta = [car.jaar, formatKm(car.km), car.brandstof, car.transmissie]
      .filter(Boolean)
      .map(function (item) { return '<li>' + item + '</li>'; })
      .join('');

    return (
      '<article class="card">' +
      '<div class="car-card-media">' +
      (car.badge ? '<span class="car-card-badge">' + car.badge + '</span>' : '') +
      CAR_ICON_SVG +
      '</div>' +
      '<div class="car-card-body">' +
      '<h3>' + car.merk + ' ' + car.model + '</h3>' +
      '<ul class="car-card-meta">' + meta + '</ul>' +
      '<div class="car-card-footer">' +
      '<span class="car-card-price">' + formatPrice(car.prijs) + '</span>' +
      '<a class="btn btn-primary" style="padding:0.55rem 1rem;" href="' + ctaHref + '">' + ctaLabel + '</a>' +
      '</div></div></article>'
    );
  }

  function renderCars(selector, options) {
    var container = document.querySelector(selector);
    if (!container) return;

    var opts = options || {};
    var ctaLabel = opts.ctaLabel || 'Bekijken';
    var ctaHref = opts.ctaHref || 'contact.html';

    fetch('data/cars.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var cars = data.cars || [];
        if (opts.featuredOnly) {
          cars = cars.filter(function (car) { return car.featured; });
        }
        if (opts.limit) {
          cars = cars.slice(0, opts.limit);
        }
        if (!cars.length) {
          container.innerHTML = '<p>Op dit moment geen occasions beschikbaar. Neem contact op voor de actuele voorraad.</p>';
          return;
        }
        container.innerHTML = cars.map(function (car) { return carCardHTML(car, ctaLabel, ctaHref); }).join('');
      })
      .catch(function () {
        container.innerHTML = '<p>Het aanbod kon niet worden geladen. Neem contact op voor de actuele voorraad.</p>';
      });
  }

  window.renderCars = renderCars;
})();
