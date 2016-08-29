(function() {
  // Utilities
  function createCircle(cfg) {
    var output = $('#qunit-fixture');
    if (!output[0])
      output = $('body');
    var el = $('<span>').appendTo(output).circleProgress(cfg);
    return el.circleProgress('widget');
  }

  QUnit.module("Layout tests, no animation");

  QUnit.test("Test circle with value = 0 (without any options)", function(assert) {
    var canvas = createCircle({value: 0}),
      $canvas = $(canvas),
      defaultSize = 100,
      defaultThickness = parseInt(defaultSize / 14); // 7

    assert.equal($.circleProgress.defaults.size, defaultSize, "Default circle size: 100 pixels");
    assert.equal($.circleProgress.defaults.thickness, 'auto', "Default circle thickness: 'auto' (i.e. 1/14 of size)");
    assert.equal(canvas.tagName.toLowerCase(), 'canvas', "Method .circleProgress('widget') returns HTMLCanvasElement");
    assert.equal($canvas.width(), defaultSize, "Default width: 100 pixels");
    assert.equal($canvas.height(), defaultSize, "Default height: 100 pixels");
    assert.pixelCloseRGBA(canvas, 0, defaultSize / 2, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, defaultThickness - 1, defaultSize / 2, 'rgba(0, 0, 0, 0.1)');
    assert.pixelRGBA(canvas, defaultThickness + 1, defaultSize / 2, 'rgba(0, 0, 0, 0)');
  });

  QUnit.test("Test circle with value = 0.5 and default fill", function(assert) {
    var canvas = createCircle({
        value: 0.5,
        animation: false
      }),
      size = $.circleProgress.defaults.size;

    assert.pixelCloseHex(canvas, 1, size / 2 - 1, '#3aeabb');
    assert.pixelCloseRGBA(canvas, 1, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseHex(canvas, size - 1, size / 2 - 1, '#fdd250');
    assert.pixelCloseRGBA(canvas, size - 1, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseHex(canvas, size / 2, 1, '#9ade85');
    assert.pixelRGBA(canvas, size / 2, 8, 'rgba(0, 0, 0, 0)');
    assert.pixelCloseRGBA(canvas, size / 2, size - 1, 'rgba(0, 0, 0, 0.1)');
    assert.pixelRGBA(canvas, size / 2, size - 9, 'rgba(0, 0, 0, 0)');
  });

  QUnit.test("Test circle with value = 0.5 and solid fill", function(assert) {
    var color = '#ff0000',
      canvas = createCircle({
        value: 0.5,
        fill: {color: color},
        animation: false
      }),
      defaultSize = $.circleProgress.defaults.size;

    assert.pixelHex(canvas, 1, defaultSize / 2 - 1, color);
    assert.pixelHex(canvas, defaultSize - 1, defaultSize / 2 - 1, color);
  });

  QUnit.module("Layout tests with animation");

  QUnit.test("Test circle with value = 0.5 and solid fill", function(assert) {
    var color = '#00aa55',
      canvas = createCircle({
        value: 0.5,
        fill: {color: color}
      }),
      size = $.circleProgress.defaults.size;

    assert.expect(8);
    var done = assert.async();

    assert.pixelCloseRGBA(canvas, 1, size / 2 - 1, 'rgba(0, 0, 0, 0.1)');
    setTimeout(function() {
      assert.pixelHex(canvas, 1, size / 2 - 1, color);
    }, 200);

    assert.pixelCloseRGBA(canvas, size / 2 + 1, 1, 'rgba(0, 0, 0, 0.1)');
    setTimeout(function() {
      assert.pixelHex(canvas, size / 2 + 1, 1, color);
    }, 700);

    assert.pixelCloseRGBA(canvas, size - 2, size / 2 - 1, 'rgba(0, 0, 0, 0.1)');
    setTimeout(function() {
      assert.pixelHex(canvas, size - 2, size / 2 - 1, color);
      done();
    }, 1300);

    assert.pixelCloseRGBA(canvas, 1, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, size - 2, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');
  });

  QUnit.test("Test circle with value = 0.5, size = 80 and custom gradient", function(assert) {
    var canvas = createCircle({
        value: 0.5,
        size: 80,
        fill: {
          gradient: ['#ff327a', '#fff430', '#ff8989']
        }
      }),
      size = 80;

    assert.expect(8);
    var done = assert.async();

    assert.pixelCloseRGBA(canvas, 1, size / 2 - 1, 'rgba(0, 0, 0, 0.1)');
    setTimeout(function() {
      assert.pixelCloseHex(canvas, 1, size / 2 - 1, '#ff3777');
    }, 200);

    assert.pixelCloseRGBA(canvas, size / 2, 1, 'rgba(0, 0, 0, 0.1)');
    setTimeout(function() {
      assert.pixelCloseHex(canvas, size / 2, 1, '#fff330');
    }, 700);

    assert.pixelCloseRGBA(canvas, size - 2, size / 2 - 1, 'rgba(0, 0, 0, 0.1)');
    setTimeout(function() {
      assert.pixelCloseHex(canvas, size - 2, size / 2 - 1, '#ff8c86');
      done();
    }, 1300);

    assert.pixelCloseRGBA(canvas, 1, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, size - 2, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');
  });

  QUnit.test("Test circle with value = 0.75, custom start angle and custom animation start value", function(assert) {
    var canvas = createCircle({
      value: 0.75,
      startAngle: -Math.PI / 4,
      animationStartValue: 0.25
    });

    assert.expect(8);
    var done = assert.async();

    assert.pixelCloseRGBA(canvas, 80, 15, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseHex(canvas, 85, 20, '#e0d55f');
    assert.pixelCloseHex(canvas, 85, 80, '#e0d55f');
    assert.pixelCloseRGBA(canvas, 80, 85, 'rgba(0, 0, 0, 0.1)');
    setTimeout(function() {
      assert.pixelCloseHex(canvas, 80, 85, '#d6d664');
    }, 400);

    assert.pixelCloseRGBA(canvas, 15, 20, 'rgba(0, 0, 0, 0.1)');
    setTimeout(function() {
      assert.pixelCloseHex(canvas, 15, 20, '#57e6aa');
      assert.pixelCloseRGBA(canvas, 20, 15, 'rgba(0, 0, 0, 0.1)');
      done();
    }, 1300);
  });

  QUnit.test("Test circle with value = 0.5, image background and reverse", function(assert) {
    var urlPrefix = $('script[src*="tests.js"]').attr('src').replace(/tests\.js.*$/, ''),
      imageUrl = urlPrefix + 'images/circle.png',
      image = new Image();

    assert.expect(9);
    var done = assert.async();
    image.src = imageUrl;

    $(image).on('load', function() {
      var canvas = createCircle({
        value: 0.5,
        thickness: 20,
        fill: {image: image},
        reverse: true
      });

      assert.pixelRGBA(canvas, 21, 49, 'rgba(0, 0, 0, 0)');
      assert.pixelRGBA(canvas, 78, 49, 'rgba(0, 0, 0, 0)');
      assert.pixelRGBA(canvas, 49, 77, 'rgba(0, 0, 0, 0)');

      assert.pixelCloseRGBA(canvas, 17, 51, 'rgba(0, 0, 0, 0.1)');
      setTimeout(function() {
        assert.pixelCloseHex(canvas, 17, 51, '#00f7ff');
      }, 400);

      assert.pixelCloseRGBA(canvas, 49, 81, 'rgba(0, 0, 0, 0.1)');
      setTimeout(function() {
        assert.pixelCloseHex(canvas, 49, 81, '#7700ff');
      }, 700);

      assert.pixelCloseRGBA(canvas, 81, 51, 'rgba(0, 0, 0, 0.1)');
      setTimeout(function() {
        assert.pixelCloseHex(canvas, 81, 51, '#ff0008');
        done();
      }, 1400);
    });
  });

  QUnit.test("Test correct rendering on Retina displays", function(assert) {
    /**
     * Mock devicePixelRatio
     */
    window.devicePixelRatio = 2;

    var canvas = createCircle({
      value: 0.75,
      size: 50
    });

    assert.equal(50, $(canvas).width());
    assert.equal(100, canvas.width);
  });

  QUnit.test("Test correct rendering on regular pixel density", function(assert) {
    /**
     * Mock devicePixelRatio
     */
    window.devicePixelRatio = 1;

    var canvas = createCircle({
      value: 0.75,
      size: 50
    });

    assert.equal(50, $(canvas).height());
    assert.equal(50, canvas.width);
  });
})();
