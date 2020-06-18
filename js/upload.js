'use strict';

(function () {
  var StatusCode = {
    OK: 200,
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.open('POST', window.constants.API_URL);
    xhr.send(data);
  };
})();