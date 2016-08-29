(function() {
  QUnit.extend(QUnit.assert, {
    pixelRGBA: function(canvas, x, y, expectedRGBA, message) {
      return _pixelColor.call(this, canvas, x, y, expectedRGBA, 0, message, _parseRGBA, _dumpRGBA);
    },

    pixelHex: function(canvas, x, y, expectedHex, message) {
      return _pixelColor.call(this, canvas, x, y, expectedHex, 0, message, _parseHex, _dumpHex, true);
    },

    pixelCloseRGBA: function(canvas, x, y, expectedRGBA, maxDiff, message) {
      if (typeof maxDiff == 'undefined' || maxDiff === null)
        maxDiff = 0.01;
      return _pixelColor.call(this, canvas, x, y, expectedRGBA, maxDiff, message, _parseRGBA, _dumpRGBA);
    },

    pixelCloseHex: function(canvas, x, y, expectedHex, maxDiff, message) {
      if (typeof maxDiff == 'undefined' || maxDiff === null)
        maxDiff = 0.015;
      return _pixelColor.call(this, canvas, x, y, expectedHex, maxDiff, message, _parseHex, _dumpHex, true);
    }
  });

  function _pixelColor(canvas, x, y, expectedColor, maxDiff, message, parseColorFn, dumpColorFn, ignoreAlpha) {
    var scaleBy = window.devicePixelRatio || 1,
      data = canvas.getContext('2d').getImageData(Math.round(x * scaleBy), Math.round(y * scaleBy), 1, 1).data,
      expectedData = parseColorFn(expectedColor),
      actualColor = dumpColorFn(data);

    maxDiff = maxDiff || 0;

    var actualDiff = Math.max(
      Math.abs(data[0] - expectedData[0]) / 255,
      Math.abs(data[1] - expectedData[1]) / 255,
      Math.abs(data[2] - expectedData[2]) / 255,
      ignoreAlpha ? 0 : Math.abs(data[3] - expectedData[3]) / 255
    );

    var result = actualDiff <= maxDiff;

    if (!message) {
      message = "Pixel color at " + x + "×" + y + " should be ";
      message += maxDiff ? "close to " + expectedColor : "equal to " + expectedColor;
      if (!result) {
        message += ". Actual color: " + actualColor;
        message += maxDiff ? ". Actual diff: " + actualDiff.toFixed(6) + ". Expected diff: " + maxDiff : "";
      }
    }

    this.push(result, actualColor, expectedColor, message);
  }

  function _parseRGBA(s) {
    s = s.replace(/^rgba\(|\s+|\)$/gi, '').split(',');
    return [
      parseInt(s[0], 10),
      parseInt(s[1], 10),
      parseInt(s[2], 10),
      s[3] * 255
    ];
  }

  function _dumpRGBA(data) {
    return 'rgba(' + data[0] + ', ' + data[1] + ', ' + data[2] + ', ' + data[3] / 255 + ')';
  }

  function _parseHex(s) {
    s = s.replace(/[#\s]/gi, '');
    return [
      parseInt(s.substr(0, 2), 16),
      parseInt(s.substr(2, 2), 16),
      parseInt(s.substr(4, 2), 16),
      255
    ];
  }

  function _dumpHex(data) {
    var r = '0' + data[0].toString(16),
      g = '0' + data[1].toString(16),
      b = '0' + data[2].toString(16);
    r = r.substr(r.length - 2);
    g = g.substr(g.length - 2);
    b = b.substr(b.length - 2);
    return '#' + r + g + b;
  }
})();
