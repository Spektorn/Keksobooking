'use strict';

var ADS_QUANTITY = 8;
var USERS_QUANTITY = 8;

var TYPE_PATTERN = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало',
};
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

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getObjValues = function (obj) {
  var objValues = [];

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      objValues.push(obj[key]);
    }
  }

  return objValues;
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
        'type': getRandomArrValue(getObjValues(TYPE_PATTERN)),
        'rooms': getRandomInt(1, 6),
        'guests': getRandomInt(1, 6),
        'checkin': getRandomArrValue(CHECKTIME_PATTERN),
        'checkout': getRandomArrValue(CHECKTIME_PATTERN),
        'features': getSeveralRandomArrValues(FEATURES_PATTERN),
        'description': 'Лучшее жилье во всём Токио!',
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
  newCard.querySelector('.popup__type').textContent = previewAd.offer.type;
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

  var photosContainer = newCard.querySelector('.popup__photos');
  var photoCard = newCard.querySelector('.popup__photos').querySelector('.popup__photo');
  var photoCardFragment = document.createDocumentFragment();
  while (photosContainer.firstChild) {
    photosContainer.removeChild(photosContainer.firstChild);
  }

  previewAd.offer.photos.forEach(function (photo) {
    var newPhotoCard = photoCard.cloneNode(true);
    newPhotoCard.src = photo;
    photoCardFragment.appendChild(newPhotoCard);
  });

  photosContainer.appendChild(photoCardFragment);

  return newCard;
};

var avatars = generateAvatars(USERS_QUANTITY);
var ads = getRandomAds(avatars);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinsList = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinFragment = renderPinFragment(ads);

var mapFilters = map.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var card = renderCard(ads);

pinsList.appendChild(pinFragment);
map.insertBefore(card, mapFilters);
