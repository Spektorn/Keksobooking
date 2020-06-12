'use strict';

var ADS_QUANTITY = 8;
var USERS_QUANTITY = 8;

var TYPE_PATTERN = [
  'palace',
  'flat',
  'house',
  'bungalo',
];
var TITLE_PATTERN = [
  'Огромное поместье на окраине города',
  'Загородное поместье напротив лесной чащи',
  'Просторная квартира в центре города',
  'Небольшая уютная квартира',
  'Уютный маленький дом в пригороде',
  'Загородный дом с бассейном и садом',
  'Загородное бунгало',
  'Бунгало напротив живописного парка',
];
var DESCRIPTION_PATTERN = [
  'Лучшее жилье в целом Токио!',
  'Небольшая уютная квартира в тихом районе города',
  'Комфортабельные апартаменты в центре города',
  'Жилье со всеми удобствами в 5 минутах от метро',
  'Прекрасный загородный дом для большой семьи',
  'Небольшой домик в пригороде для любителей прекрасных видов',
  'Загородное бунгало с завораживающим видом на горные хребты',
  'Прекрасно обустроенное бунгало недалеко от центрального парка',
];
var CHECKTIME_PATTERN = [
  '12:00',
  '13:00',
  '14:00',
];
var FEATURES_PATTERN = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
var PHOTOS_PATTERN = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var X_MIN = 300;
var X_MAX = 900;
var Y_MIN = 130;
var Y_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 62;
var MAIN_PIN_HEIGHT = 84;
var MAIN_PIN_DEFAULT_X = 570;
var MAIN_PIN_DEFAULT_Y = 375;

var housingTypeToName = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
};

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

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArrValue = function (patternName) {
  return patternName[getRandomInt(0, patternName.length - 1)];
};

var getSeveralRandomArrValues = function (patternName) {
  var allValues = patternName.slice();
  var arrValues = [];
  var elementsQuantity = getRandomInt(1, allValues.length);

  for (var i = 0; i < elementsQuantity; i++) {
    var currentValueIndex = getRandomInt(0, allValues.length - 1);
    var currentValue = allValues[currentValueIndex];
    allValues.splice(currentValueIndex, 1);
    arrValues.push(currentValue);
  }

  return arrValues;
};

var generateAvatars = function () {
  var avatars = [];

  for (var i = 1; i <= USERS_QUANTITY; i++) {
    avatars.push('img/avatars/user0' + i + '.png');
  }

  return avatars;
};

var getAvatar = function (avatars) {
  var currentAvatarIndex = getRandomInt(0, avatars.length - 1);
  var currentAvatar = avatars[currentAvatarIndex];
  avatars.splice(currentAvatarIndex, 1);

  return currentAvatar;
};

var getRandomAds = function (avatars) {
  var ads = [];

  for (var i = 0; i < ADS_QUANTITY; i++) {
    var randomX = getRandomInt(X_MIN, X_MAX);
    var randomY = getRandomInt(Y_MIN, Y_MAX);

    var newAd = {
      'author': {
        'avatar': getAvatar(avatars),
      },
      'offer': {
        'title': getRandomArrValue(TITLE_PATTERN),
        'address': randomX + ', ' + randomY,
        'price': getRandomInt(1000, 15000),
        'type': getRandomArrValue(TYPE_PATTERN),
        'rooms': getRandomInt(1, 6),
        'guests': getRandomInt(1, 6),
        'checkin': getRandomArrValue(CHECKTIME_PATTERN),
        'checkout': getRandomArrValue(CHECKTIME_PATTERN),
        'features': getSeveralRandomArrValues(FEATURES_PATTERN),
        'description': getRandomArrValue(DESCRIPTION_PATTERN),
        'photos': getSeveralRandomArrValues(PHOTOS_PATTERN),
      },
      'location': {
        'x': randomX,
        'y': randomY,
      },
    };

    ads.push(newAd);
  }

  return ads;
};

var renderPin = function (ad) {
  var newPin = pinTemplate.cloneNode(true);

  newPin.style.left = (ad.location.x - PIN_WIDTH / 2) + 'px';
  newPin.style.top = ad.location.y - PIN_HEIGHT + 'px';
  newPin.querySelector('img').src = ad.author.avatar;
  newPin.querySelector('img').alt = ad.offer.title;

  return newPin;
};

var renderPinFragment = function (ads) {
  var fragment = document.createDocumentFragment();

  ads.forEach(function (ad) {
    fragment.appendChild(renderPin(ad));
  });

  return fragment;
};

var renderCard = function (ads) {
  var newCard = cardTemplate.cloneNode(true);
  var previewAd = ads[0];

  newCard.querySelector('.popup__title').textContent = previewAd.offer.title;
  newCard.querySelector('.popup__text--address').textContent = previewAd.offer.address;
  newCard.querySelector('.popup__text--price').textContent = previewAd.offer.price + '₽/ночь';
  newCard.querySelector('.popup__type').textContent = housingTypeToName[previewAd.offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = previewAd.offer.rooms + ' комнаты для ' + previewAd.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + previewAd.offer.checkin + ', выезд до ' + previewAd.offer.checkout;
  newCard.querySelector('.popup__description').textContent = previewAd.offer.description;
  newCard.querySelector('.popup__avatar').src = previewAd.author.avatar;

  newCard.querySelectorAll('.popup__feature').forEach(function (elem) {
    elem.classList.add('hidden');
  });

  previewAd.offer.features.forEach(function (feature) {
    newCard.querySelector('.popup__feature--' + feature).classList.remove('hidden');
  });

  var photosPopupElement = newCard.querySelector('.popup__photos');
  var photoPopupElement = newCard.querySelector('.popup__photos .popup__photo');
  var photoPopupFragment = document.createDocumentFragment();
  while (photosPopupElement.firstChild) {
    photosPopupElement.removeChild(photosPopupElement.firstChild);
  }

  previewAd.offer.photos.forEach(function (photo) {
    var newPhoto = photoPopupElement.cloneNode(true);
    newPhoto.src = photo;
    photoPopupFragment.appendChild(newPhoto);
  });

  photosPopupElement.appendChild(photoPopupFragment);

  return newCard;
};

var getAddress = function () {
  var locationX = MAIN_PIN_DEFAULT_X + MAIN_PIN_WIDTH / 2;
  var locationY;

  if (mapElement.classList.contains('map--faded')) {
    locationY = MAIN_PIN_DEFAULT_Y + MAIN_PIN_WIDTH / 2;
  } else {
    locationY = MAIN_PIN_DEFAULT_Y + MAIN_PIN_HEIGHT;
  }

  var location = locationX + ', ' + locationY;

  return location;
};

var mainPinClickHandler = function () {
  mapElement.classList.remove('map--faded');
  adFormElement.classList.remove('ad-form--disabled');

  adFormFieldsetsElement.forEach(function (fieldset) {
    fieldset.disabled = false;
  });

  adFormAddressInputElement.value = getAddress();

  pinsListElement.appendChild(pinFragment);
  mapElement.insertBefore(card, mapFiltersElement);
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

var avatars = generateAvatars(USERS_QUANTITY);
var ads = getRandomAds(avatars);

var mapElement = document.querySelector('.map');
var mainPinElement = mapElement.querySelector('.map__pin--main');
var pinsListElement = mapElement.querySelector('.map__pins');
var mapFiltersElement = mapElement.querySelector('.map__filters-container');

var adFormElement = document.querySelector('.ad-form');
var adFormFieldsetsElement = adFormElement.querySelectorAll('fieldset');
var adFormAddressInputElement = adFormElement.querySelector('#address');
var adFormRoomsInputElement = adFormElement.querySelector('#room_number');
var adFormGuestsInputElement = adFormElement.querySelector('#capacity');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinFragment = renderPinFragment(ads);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var card = renderCard(ads);

adFormAddressInputElement.value = getAddress();

adFormFieldsetsElement.forEach(function (fieldset) {
  fieldset.disabled = true;
});

mainPinElement.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    mainPinClickHandler();
  }
});

mainPinElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    mainPinClickHandler();
  }
});

adFormRoomsInputElement.addEventListener('input', function () {
  roomsQuantityInputHandler();
});

adFormGuestsInputElement.addEventListener('input', function () {
  roomsQuantityInputHandler();
});
