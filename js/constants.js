'use strict';

window.constants = (function () {
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

  return {
    ADS_QUANTITY: ADS_QUANTITY,
    USERS_QUANTITY: USERS_QUANTITY,
    TYPE_PATTERN: TYPE_PATTERN,
    TITLE_PATTERN: TITLE_PATTERN,
    DESCRIPTION_PATTERN: DESCRIPTION_PATTERN,
    CHECKTIME_PATTERN: CHECKTIME_PATTERN,
    FEATURES_PATTERN: FEATURES_PATTERN,
    PHOTOS_PATTERN: PHOTOS_PATTERN,
    X_MIN: X_MIN,
    X_MAX: X_MAX,
    Y_MIN: Y_MIN,
    Y_MAX: Y_MAX,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    MAIN_PIN_DEFAULT_X: MAIN_PIN_DEFAULT_X,
    MAIN_PIN_DEFAULT_Y: MAIN_PIN_DEFAULT_Y,
  };
})();
