'use strict';
var mapElement = document.querySelector('.map');
var mainPinElement = mapElement.querySelector('.map__pin--main');

mainPinElement.addEventListener('mousedown', window.map.mainPinClickHandler);
mainPinElement.addEventListener('keydown', window.map.mainPinPressEnterHandler);
mainPinElement.addEventListener('mousedown', window.map.mainPinMoveHandler);

var adFormElement = document.querySelector('.ad-form');
var adFormTypeInputElement = adFormElement.querySelector('#type');
var adFormPriceInputElement = adFormElement.querySelector('#price');
var adFormRoomsInputElement = adFormElement.querySelector('#room_number');
var adFormGuestsInputElement = adFormElement.querySelector('#capacity');
var adFormTimeInInputElement = adFormElement.querySelector('#timein');
var adFormTimeOutInputElement = adFormElement.querySelector('#timeout');

window.form.disableFormInputs();

adFormTypeInputElement.addEventListener('input', window.form.typeInputHandler);
adFormTypeInputElement.addEventListener('input', window.form.priceInputHandler);
adFormPriceInputElement.addEventListener('input', window.form.priceInputHandler);
adFormRoomsInputElement.addEventListener('input', window.form.roomsQuantityInputHandler);
adFormGuestsInputElement.addEventListener('input', window.form.roomsQuantityInputHandler);
adFormTimeInInputElement.addEventListener('input', window.form.checktimeInputHandler);
adFormTimeOutInputElement.addEventListener('input', window.form.checktimeInputHandler);

adFormElement.addEventListener('submit', window.form.adFormSubmitHandler);
adFormElement.addEventListener('reset', window.form.adFormResetHandler);
