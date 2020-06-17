'use strict';

window.card = (function () {
  var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');

  var housingTypeToName = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };

  var renderCard = function (ad, pin) {
    var newCard = cardTemplateElement.cloneNode(true);
    var popupCloseButtonElement = newCard.querySelector('.popup__close');

    var cardTextElements = [
      {
        'element': newCard.querySelector('.popup__title'),
        'text': ad.offer.title ?
          ad.offer.title : '',
      },
      {
        'element': newCard.querySelector('.popup__text--address'),
        'text': ad.offer.address ?
          ad.offer.address : '',
      },
      {
        'element': newCard.querySelector('.popup__text--price'),
        'text': ad.offer.price ?
          ad.offer.price + '₽/ночь' : '',
      },
      {
        'element': newCard.querySelector('.popup__type'),
        'text': ad.offer.type ?
          housingTypeToName[ad.offer.type] : '',
      },
      {
        'element': newCard.querySelector('.popup__text--capacity'),
        'text': (ad.offer.rooms && ad.offer.guests) ?
          ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей' : '',
      },
      {
        'element': newCard.querySelector('.popup__text--time'),
        'text': (ad.offer.checkin && ad.offer.checkout) ?
          'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout : '',
      },
      {
        'element': newCard.querySelector('.popup__description'),
        'text': ad.offer.description ?
          ad.offer.description : '',
      },
    ];

    var cardMultipleContentElements = [
      {
        'element': newCard.querySelector('.popup__features'),
        'content': ad.offer.features,
      },
      {
        'element': newCard.querySelector('.popup__photos'),
        'content': ad.offer.photos,
      },
    ];

    var renderFeatures = function (featuresObj) {
      featuresObj.element.querySelectorAll('.popup__feature').forEach(function (featureElement) {
        featureElement.classList.add('hidden');
      });

      featuresObj.content.forEach(function (feature) {
        featuresObj.element.querySelector('.popup__feature--' + feature).classList.remove('hidden');
      });
    };

    var renderPhotos = function (photosObj) {
      var photoPopupElement = photosObj.element.querySelector('.popup__photo');
      var photoPopupFragment = document.createDocumentFragment();

      while (photosObj.element.firstChild) {
        photosObj.element.removeChild(photosObj.element.firstChild);
      }

      photosObj.content.forEach(function (photo) {
        var newPhoto = photoPopupElement.cloneNode(true);

        newPhoto.src = photo;
        photoPopupFragment.appendChild(newPhoto);
      });

      photosObj.element.appendChild(photoPopupFragment);
    };

    var closeCard = function (evt) {
      evt.preventDefault();

      newCard.remove();
      pin.classList.remove('map__pin--active');

      document.removeEventListener('keydown', cardClosePressEscHandler);
    };

    var cardCloseClickHandler = function (evt) {
      closeCard(evt);
    };

    var cardClosePressEscHandler = function (evt) {
      if (evt.key === 'Escape') {
        closeCard(evt);
      }
    };

    newCard.querySelector('.popup__avatar').src = ad.author.avatar;

    cardTextElements.forEach(function (textElement) {
      if (!textElement.text) {
        textElement.element.classList.add('hidden');
      } else {
        textElement.element.textContent = textElement.text;
      }
    });

    cardMultipleContentElements.forEach(function (multipleContentElement) {
      if (multipleContentElement.content.length === 0) {
        multipleContentElement.element.classList.add('hidden');
      } else {
        switch (multipleContentElement.element.className) {
          case 'popup__features':
            renderFeatures(multipleContentElement);
            break;
          case 'popup__photos':
            renderPhotos(multipleContentElement);
            break;
        }
      }
    });

    popupCloseButtonElement.addEventListener('click', cardCloseClickHandler);
    document.addEventListener('keydown', cardClosePressEscHandler);

    return newCard;
  };

  return {
    renderCard: renderCard,
  };
})();
