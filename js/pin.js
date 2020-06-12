'use strict';

window.pin = (function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (ad) {
    var newPin = pinTemplate.cloneNode(true);

    newPin.style.left = (ad.location.x - window.constants.PIN_WIDTH / 2) + 'px';
    newPin.style.top = ad.location.y - window.constants.PIN_HEIGHT + 'px';
    newPin.querySelector('img').src = ad.author.avatar;
    newPin.querySelector('img').alt = ad.offer.title;

    return newPin;
  };

  var renderPinFragment = function (ads) {
    var fragment = document.createDocumentFragment();

    ads.forEach(function (ad) {
      fragment.appendChild(renderPin(ad));
    });

    return fragment;
  };

  var pinFragment = renderPinFragment(window.data.ads);

  return {
    pinFragment: pinFragment,
  };
})();
