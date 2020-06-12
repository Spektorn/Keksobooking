'use strict';

window.map = (function () {
  var mapElement = document.querySelector('.map');
  var pinsListElement = mapElement.querySelector('.map__pins');
  var mapFiltersElement = mapElement.querySelector('.map__filters-container');

  var adFormElement = document.querySelector('.ad-form');

  var mainPinClickHandler = function () {
    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');

    window.form.enableFormInputs();
    window.form.setAddressInputValue();

    pinsListElement.appendChild(window.pin.pinFragment);
    mapElement.insertBefore(window.card.card, mapFiltersElement);
  };

  return {
    mainPinClickHandler: mainPinClickHandler,
  };
})();
