'use strict';

window.utilities = (function () {
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

  return {
    getRandomInt: getRandomInt,
    getRandomArrValue: getRandomArrValue,
    getSeveralRandomArrValues: getSeveralRandomArrValues,
  };
})();
