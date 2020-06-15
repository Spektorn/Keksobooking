'use strict';

window.pin = (function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (ad) {
    var newPin = pinTemplate.cloneNode(true);

    newPin.id = ad.id;
    newPin.style.left = (ad.location.x - window.constants.PIN_WIDTH / 2) + 'px';
    newPin.style.top = (ad.location.y - window.constants.PIN_HEIGHT) + 'px';
    newPin.querySelector('img').src = ad.author.avatar;
    newPin.querySelector('img').alt = ad.offer.title;

    return newPin;
  };

  var renderPinFragment = function (ads) {
    var newFragment = document.createDocumentFragment();

    ads.forEach(function (ad) {
      newFragment.appendChild(renderPin(ad));
    });

    return newFragment;
  };

  var pinFragment = renderPinFragment(window.data.ads);

  return {
    pinFragment: pinFragment,
  };
})();
