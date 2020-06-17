'use strict';

window.pin = (function () {
  var pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (ad) {
    var newPin = pinTemplateElement.cloneNode(true);

    newPin.id = ad.id;
    newPin.style.left = (ad.location.x - window.constants.PIN_WIDTH / 2) + 'px';
    newPin.style.top = (ad.location.y - window.constants.PIN_HEIGHT) + 'px';
    newPin.querySelector('img').src = ad.author.avatar;
    newPin.querySelector('img').alt = ad.offer.title;

    return newPin;
  };

  var renderPinFragment = function (ads, parentElement) {
    var newFragment = document.createDocumentFragment();

    ads.forEach(function (ad) {
      if (ad.offer) {
        newFragment.appendChild(renderPin(ad));
      }
    });

    parentElement.appendChild(newFragment);
  };

  return {
    renderPinFragment: renderPinFragment,
  };
})();
