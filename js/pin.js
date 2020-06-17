'use strict';

window.pin = (function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (ad, adID) {
    var newPin = pinTemplate.cloneNode(true);

    newPin.id = adID;
    newPin.style.left = (ad.location.x - window.constants.PIN_WIDTH / 2) + 'px';
    newPin.style.top = (ad.location.y - window.constants.PIN_HEIGHT) + 'px';
    newPin.querySelector('img').src = ad.author.avatar;
    newPin.querySelector('img').alt = ad.offer.title;

    return newPin;
  };

  var renderPinFragment = function (ads, parentElement) {
    var newFragment = document.createDocumentFragment();
    var currentPinID = 1;

    ads.forEach(function (ad) {
      newFragment.appendChild(renderPin(ad, currentPinID));
      currentPinID++;
    });

    parentElement.appendChild(newFragment);
  };

  return {
    renderPinFragment: renderPinFragment,
  };
})();
