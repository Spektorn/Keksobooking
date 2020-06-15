'use strict';

window.form = (function () {
  var adFormElement = document.querySelector('.ad-form');
  var adFormFieldsetsElement = adFormElement.querySelectorAll('fieldset');
  var adFormTypeInputElement = adFormElement.querySelector('#type');
  var adFormPriceInputElement = adFormElement.querySelector('#price');
  var adFormAddressInputElement = adFormElement.querySelector('#address');
  var adFormRoomsInputElement = adFormElement.querySelector('#room_number');
  var adFormGuestsInputElement = adFormElement.querySelector('#capacity');
  var adFormTimeInInputElement = adFormElement.querySelector('#timein');
  var adFormTimeOutInputElement = adFormElement.querySelector('#timeout');

  var mapElement = document.querySelector('.map');
  var mainPinElement = mapElement.querySelector('.map__pin--main');

  var housingTypeToPrice = {
    'palace': {
      minPrice: 10000,
      validityMessage: 'Укажите другую цену за ночь. Минимальная цена для дворца: 10000.',
    },
    'flat': {
      minPrice: 1000,
      validityMessage: 'Укажите другую цену за ночь. Минимальная цена для квартиры: 1000.',
    },
    'house': {
      minPrice: 5000,
      validityMessage: 'Укажите другую цену за ночь. Минимальная цена для дома: 5000.',
    },
    'bungalo': {
      minPrice: 0,
      validityMessage: 'Укажите другую цену за ночь. Минимальная цена для бунгало: 0.',
    },
  };

  var roomsQuantityToGuests = {
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

    adFormAddressInputElement.readOnly = true;
  };

  var getAddress = function () {
    var locationX = mainPinElement.offsetLeft + window.constants.MAIN_PIN_WIDTH / 2;
    var locationY = mapElement.classList.contains('map--faded') ?
      mainPinElement.offsetTop + window.constants.MAIN_PIN_WIDTH / 2 :
      mainPinElement.offsetTop + window.constants.MAIN_PIN_HEIGHT;

    var location = locationX + ', ' + locationY;

    return location;
  };

  var setAddressInputValue = function () {
    adFormAddressInputElement.value = getAddress();
  };

  var typeInputHandler = function () {
    var typeValue = adFormTypeInputElement.value;

    adFormPriceInputElement.placeholder = housingTypeToPrice[typeValue]['minPrice'];
  };

  var priceInputHandler = function () {
    var typeValue = adFormTypeInputElement.value;
    var priceValue = adFormPriceInputElement.value;

    var currentType = housingTypeToPrice[typeValue];
    var validityMessage = priceValue < currentType['minPrice'] ? currentType['validityMessage'] : '';

    adFormPriceInputElement.setCustomValidity(validityMessage);
  };

  var roomsQuantityInputHandler = function () {
    var roomsValue = adFormRoomsInputElement.value;
    var guestsValue = adFormGuestsInputElement.value;

    var currentRooms = roomsQuantityToGuests[roomsValue];
    var validityMessage = currentRooms['validityMessage'];

    for (var i = 0; i < currentRooms['guestsQuantity'].length; i++) {
      if (guestsValue === currentRooms['guestsQuantity'][i]) {
        validityMessage = '';
        break;
      }
    }

    adFormGuestsInputElement.setCustomValidity(validityMessage);
  };

  var checktimeInputHandler = function (evt) {
    var timeInValue = adFormTimeInInputElement.value;
    var timeOutValue = adFormTimeOutInputElement.value;

    if (timeInValue !== timeOutValue) {
      if (evt.target.id === 'timein') {
        adFormTimeOutInputElement.value = timeInValue;
      } else {
        adFormTimeInInputElement.value = timeOutValue;
      }
    }
  };

  setAddressInputValue();
  disableFormInputs();

  adFormTypeInputElement.addEventListener('input', typeInputHandler);
  adFormTypeInputElement.addEventListener('input', priceInputHandler);
  adFormPriceInputElement.addEventListener('input', priceInputHandler);
  adFormRoomsInputElement.addEventListener('input', roomsQuantityInputHandler);
  adFormGuestsInputElement.addEventListener('input', roomsQuantityInputHandler);
  adFormTimeInInputElement.addEventListener('input', checktimeInputHandler);
  adFormTimeOutInputElement.addEventListener('input', checktimeInputHandler);

  return {
    enableFormInputs: enableFormInputs,
    setAddressInputValue: setAddressInputValue,
  };
})();
