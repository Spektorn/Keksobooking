'use strict';

var ADS_QUANTITY = 8;
var USERS_QUANTITY = 8;

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
var TYPE_PATTERN = [
  'palace',
  'flat',
  'house',
  'bungalo',
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

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomAdValue = function (patternName) {
  return patternName[getRandomInt(0, patternName.length - 1)];
};

var getSeveralRandomAdValues = function (patternName) {
  var allValues = patternName.slice();
  var adValues = [];
  var elementsQuantity = getRandomInt(1, allValues.length);

  for (var i = 0; i < elementsQuantity; i++) {
    var currentValueIndex = getRandomInt(0, allValues.length - 1);
    var currentValue = allValues[currentValueIndex];
    allValues.splice(currentValueIndex, 1);
    adValues.push(currentValue);
  }

  return adValues;
};

var generateAvatars = function (usersQuantity) {
  var avatars = [];

  for (var i = 1; i <= usersQuantity; i++) {
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

var getRandomAds = function () {
  var ads = [];

  for (var i = 0; i < ADS_QUANTITY; i++) {
    var randomX = getRandomInt(300, 900);
    var randomY = getRandomInt(130, 630);

    var newAd = {
      'author': {
        'avatar': getAvatar(avatars),
      },
      'offer': {
        'title': getRandomAdValue(TITLE_PATTERN),
        'address': randomX + ', ' + randomY,
        'price': getRandomInt(1000, 100000),
        'type': getRandomAdValue(TYPE_PATTERN),
        'rooms': getRandomInt(1, 6),
        'guests': getRandomInt(1, 6),
        'checkin': getRandomAdValue(CHECKTIME_PATTERN),
        'checkout': getRandomAdValue(CHECKTIME_PATTERN),
        'features': getSeveralRandomAdValues(FEATURES_PATTERN),
        'description': '',
        'photos': getSeveralRandomAdValues(PHOTOS_PATTERN),
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

var renderPinFragment = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }

  return fragment;
};

var avatars = generateAvatars(USERS_QUANTITY);
var ads = getRandomAds();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinsList = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var pinFragment = renderPinFragment();

pinsList.appendChild(pinFragment);
