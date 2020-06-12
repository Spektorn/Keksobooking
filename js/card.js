'use strict';

window.card = (function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var housingTypeToName = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
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

  var card = renderCard(window.data.ads);

  return {
    card: card,
  };
})();
