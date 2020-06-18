'use strict';

(function () {
  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('GET', window.constants.API_URL + 'data');
    xhr.send();
  };
})();
