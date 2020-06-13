'use strict';

window.form = (function () {
  var adFormElement = document.querySelector('.ad-form');
  var adFormFieldsetsElement = adFormElement.querySelectorAll('fieldset');
  var adFormAddressInputElement = adFormElement.querySelector('#address');
  var adFormRoomsInputElement = adFormElement.querySelector('#room_number');
  var adFormGuestsInputElement = adFormElement.querySelector('#capacity');

  var mapElement = document.querySelector('.map');

  var roomsQuantityToMessage = {
    '1': {
      guestsQuantity: ['1'],
      validityMessage: 'Выберите другое количество гостей. Для 1 комнаты возможны варианты: 1 гость.',
    },
    '2': {
      guestsQuantity: ['1', '2'],
      validityMessage: 'Выберите другое количество гостей. Для 2 комнат возможны варианты: 1 гость, 2 гостя.',
    },
    '3': {
      guestsQuantity: ['1', '2', '3'],
      validityMessage: 'Выберите другое количество гостей. Для 3 комнат возможны варианты: 1 гость, 2 гостя, 3 гостя.',
    },
    '100': {
      guestsQuantity: ['0'],
      validityMessage: 'Выберите другое количество гостей. Для 100 комнат возможны варианты: не для гостей.',
    },
  };

  var disableFormInputs = function () {
    adFormFieldsetsElement.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
  };

  var enableFormInputs = function () {
    adFormFieldsetsElement.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
  };

  var getAddress = function () {
    var locationX = window.constants.MAIN_PIN_DEFAULT_X + window.constants.MAIN_PIN_WIDTH / 2;
    var locationY;

    if (mapElement.classList.contains('map--faded')) {
      locationY = window.constants.MAIN_PIN_DEFAULT_Y + window.constants.MAIN_PIN_WIDTH / 2;
    } else {
      locationY = window.constants.MAIN_PIN_DEFAULT_Y + window.constants.MAIN_PIN_HEIGHT;
    }

    var location = locationX + ', ' + locationY;

    return location;
  };

  var setAddressInputValue = function () {
    adFormAddressInputElement.value = getAddress();
  };

  var roomsQuantityInputHandler = function () {
    var roomsValue = adFormRoomsInputElement.value;
    var guestsValue = adFormGuestsInputElement.value;

    var currentRooms = roomsQuantityToMessage[roomsValue];
    var validityMessage = currentRooms['validityMessage'];

    for (var i = 0; i < currentRooms['guestsQuantity'].length; i++) {
      if (guestsValue === currentRooms['guestsQuantity'][i]) {
        validityMessage = '';
        break;
      }
    }

    adFormGuestsInputElement.setCustomValidity(validityMessage);
  };

  return {
    disableFormInputs: disableFormInputs,
    enableFormInputs: enableFormInputs,
    setAddressInputValue: setAddressInputValue,
    roomsQuantityInputHandler: roomsQuantityInputHandler,
  };
})();
