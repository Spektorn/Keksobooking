'use strict';

window.data = (function () {
  var generateAvatars = function () {
    var avatars = [];

    for (var i = 1; i <= window.constants.USERS_QUANTITY; i++) {
      avatars.push('img/avatars/user0' + i + '.png');
    }

    return avatars;
  };

  var getAvatar = function (avatars) {
    var currentAvatarIndex = window.utilities.getRandomInt(0, avatars.length - 1);
    var currentAvatar = avatars[currentAvatarIndex];

    avatars.splice(currentAvatarIndex, 1);

    return currentAvatar;
  };

  var generateRandomAds = function (avatars) {
    var ads = [];

    for (var i = 0; i < window.constants.ADS_QUANTITY; i++) {
      var randomX = window.utilities.getRandomInt(window.constants.X_MIN, window.constants.X_MAX);
      var randomY = window.utilities.getRandomInt(window.constants.Y_MIN, window.constants.Y_MAX);

      var newAd = {
        'id': 'ad-' + (i + 1),
        'author': {
          'avatar': getAvatar(avatars),
        },
        'offer': {
          'title': window.utilities.getRandomArrValue(window.constants.TITLE_PATTERNS),
          'address': randomX + ', ' + randomY,
          'price': window.utilities.getRandomInt(1000, 15000),
          'type': window.utilities.getRandomArrValue(window.constants.TYPE_PATTERNS),
          'rooms': window.utilities.getRandomInt(1, 6),
          'guests': window.utilities.getRandomInt(1, 6),
          'checkin': window.utilities.getRandomArrValue(window.constants.CHECKTIME_PATTERNS),
          'checkout': window.utilities.getRandomArrValue(window.constants.CHECKTIME_PATTERNS),
          'features': window.utilities.getSeveralRandomArrValues(window.constants.FEATURES_PATTERNS),
          'description': window.utilities.getRandomArrValue(window.constants.DESCRIPTION_PATTERNS),
          'photos': window.utilities.getSeveralRandomArrValues(window.constants.PHOTOS_PATTERNS),
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

  var loadAdsHandler = function (data) {
    var currentAdID = 1;

    data.forEach(function (ad) {
      ad.id = currentAdID;
      currentAdID++;
    });

    return data;
  };

  return {
    generateAvatars: generateAvatars,
    generateRandomAds: generateRandomAds,
    loadAdsHandler: loadAdsHandler,
  };
})();
