'use strict';

var mapElement = document.querySelector('.map');
var mainPinElement = mapElement.querySelector('.map__pin--main');

mainPinElement.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    window.map.mainPinClickHandler();
  }
});

mainPinElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    window.map.mainPinClickHandler();
  }
});

var adFormElement = document.querySelector('.ad-form');
var adFormRoomsInputElement = adFormElement.querySelector('#room_number');
var adFormGuestsInputElement = adFormElement.querySelector('#capacity');

window.form.setAddressInputValue();
window.form.disableFormInputs();

adFormRoomsInputElement.addEventListener('input', function () {
  window.form.roomsQuantityInputHandler();
});

adFormGuestsInputElement.addEventListener('input', function () {
  window.form.roomsQuantityInputHandler();
});
