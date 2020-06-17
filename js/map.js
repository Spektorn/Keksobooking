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

    window.load(function (data) {
      window.pin.renderPinFragment(data, pinsListElement);
    });

    pinsListElement.addEventListener('click', pinClickHandler);
    pinsListElement.addEventListener('keydown', pinPressEnterHandler);
  };

  var mainPinClickHandler = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      activatePage();
      mainPinElement.removeEventListener('mousedown', mainPinClickHandler);
      mainPinElement.removeEventListener('keydown', mainPinPressEnterHandler);
    }
  };

  var mainPinPressEnterHandler = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      activatePage();
      mainPinElement.removeEventListener('mousedown', mainPinClickHandler);
      mainPinElement.removeEventListener('keydown', mainPinPressEnterHandler);
    }
  };

  var mainPinMoveHandler = function (evt) {
    evt.preventDefault();

    var startLocation = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startLocation.x - moveEvt.clientX,
        y: startLocation.y - moveEvt.clientY,
      };

      startLocation = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var newStyle = {
        top: (mainPinElement.offsetTop - shift.y),
        left: (mainPinElement.offsetLeft - shift.x),
      };

      newStyle.top = (newStyle.top + window.constants.MAIN_PIN_HEIGHT) < window.constants.Y_MIN ?
        window.constants.Y_MIN - window.constants.MAIN_PIN_HEIGHT : newStyle.top;

      newStyle.top = (newStyle.top + window.constants.MAIN_PIN_HEIGHT) > window.constants.Y_MAX ?
        window.constants.Y_MAX - window.constants.MAIN_PIN_HEIGHT : newStyle.top;

      newStyle.left = (newStyle.left + window.constants.MAIN_PIN_WIDTH / 2) < 0 ?
        0 - window.constants.MAIN_PIN_WIDTH / 2 : newStyle.left;

      newStyle.left = (newStyle.left + window.constants.MAIN_PIN_WIDTH / 2) > mapElement.offsetWidth ?
        mapElement.offsetWidth - window.constants.MAIN_PIN_WIDTH / 2 : newStyle.left;

      mainPinElement.style.top = newStyle.top + 'px';
      mainPinElement.style.left = newStyle.left + 'px';

      window.form.setAddressInputValue();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  mainPinElement.addEventListener('mousedown', mainPinClickHandler);
  mainPinElement.addEventListener('keydown', mainPinPressEnterHandler);
  mainPinElement.addEventListener('mousedown', mainPinMoveHandler);
})();
