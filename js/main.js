'use strict';

var mapElement = document.querySelector('.map');
var mainPinElement = mapElement.querySelector('.map__pin--main');

mainPinElement.addEventListener('mousedown', window.map.mainPinClickHandler);

mainPinElement.addEventListener('keydown', window.map.mainPinPressEnterHandler);

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
