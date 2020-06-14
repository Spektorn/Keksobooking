'use strict';

window.map = (function () {
  var mapElement = document.querySelector('.map');
  var mainPinElement = mapElement.querySelector('.map__pin--main');
  var pinsListElement = mapElement.querySelector('.map__pins');
  var mapFiltersElement = mapElement.querySelector('.map__filters-container');

  var adFormElement = document.querySelector('.ad-form');

  var showCard = function (evt) {
    var target = evt.target;
    var button = target.closest('button');

    if (!button || button.classList.contains('map__pin--main')) {
      return;
    }

    if (mapElement.querySelector('.map__card')) {
      mapElement.querySelector('.map__card').remove();
    }

    var adID = button.id.replace(/ad-/, '') - 1;
    var card = window.card.renderCard(window.data.ads[adID]);

    mapElement.insertBefore(card, mapFiltersElement);
  };

  var pinClickHandler = function (evt) {
    evt.preventDefault();
    showCard(evt);
  };

  var pinPressEnterHandler = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      showCard(evt);
    }
  };

  var activatePage = function () {
    mapElement.classList.remove('map--faded');
    adFormElement.classList.remove('ad-form--disabled');

    window.form.enableFormInputs();
    window.form.setAddressInputValue();

    pinsListElement.appendChild(window.pin.pinFragment);

    pinsListElement.addEventListener('click', pinClickHandler);
    pinsListElement.addEventListener('keydown', pinPressEnterHandler);
  };

  var mainPinClickHandler = function (evt) {
    if (evt.button === 0) {
      activatePage();
      mainPinElement.removeEventListener('mousedown', mainPinClickHandler);
      mainPinElement.removeEventListener('keydown', mainPinPressEnterHandler);
    }
  };

  var mainPinPressEnterHandler = function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      mainPinElement.removeEventListener('mousedown', mainPinClickHandler);
      mainPinElement.removeEventListener('keydown', mainPinPressEnterHandler);
    }
  };

  return {
    mainPinClickHandler: mainPinClickHandler,
    mainPinPressEnterHandler: mainPinPressEnterHandler,
  };
})();
