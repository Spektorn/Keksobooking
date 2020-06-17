'use strict';

window.card = (function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var housingTypeToName = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };

  var renderCard = function (ad) {
    var newCard = cardTemplate.cloneNode(true);
    var popupCloseButtonElement = newCard.querySelector('.popup__close');

    var cardCloseClickHandler = function (evt) {
      evt.preventDefault();
      newCard.remove();
      document.removeEventListener('keydown', cardCloseEscPressHandler);
    };

    var cardCloseEscPressHandler = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        newCard.remove();
        document.removeEventListener('keydown', cardCloseEscPressHandler);
      }
    };

    newCard.querySelector('.popup__title').textContent = ad.offer.title;
    newCard.querySelector('.popup__text--address').textContent = ad.offer.address;
    newCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = housingTypeToName[ad.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' +
      ad.offer.guests + ' гостей';
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin +
      ', выезд до ' + ad.offer.checkout;
    newCard.querySelector('.popup__description').textContent = ad.offer.description;
    newCard.querySelector('.popup__avatar').src = ad.author.avatar;

    newCard.querySelectorAll('.popup__feature').forEach(function (featureElem) {
      featureElem.classList.add('hidden');
    });

    ad.offer.features.forEach(function (feature) {
      newCard.querySelector('.popup__feature--' + feature).classList.remove('hidden');
    });

    var photosPopupElement = newCard.querySelector('.popup__photos');
    var photoPopupElement = photosPopupElement.querySelector('.popup__photo');
    var photoPopupFragment = document.createDocumentFragment();

    while (photosPopupElement.firstChild) {
      photosPopupElement.removeChild(photosPopupElement.firstChild);
    }

    ad.offer.photos.forEach(function (photo) {
      var newPhoto = photoPopupElement.cloneNode(true);

      newPhoto.src = photo;
      photoPopupFragment.appendChild(newPhoto);
    });

    photosPopupElement.appendChild(photoPopupFragment);

    popupCloseButtonElement.addEventListener('click', cardCloseClickHandler);
    document.addEventListener('keydown', cardCloseEscPressHandler);

    return newCard;
  };

  return {
    renderCard: renderCard,
  };
})();
