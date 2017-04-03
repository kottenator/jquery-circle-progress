(function() {
  // Utilities
  function createCircle(cfg) {
    var output = $('#qunit-fixture');
    if (!output[0])
      output = $('body');
    return $('<span>').appendTo(output).circleProgress(cfg);
  }

  QUnit.module("Layout tests, no animation");

  QUnit.test("Test circle with value = 0 (without any options)", function(assert) {
    var canvas = createCircle({
      value: 0
    }).circleProgress('widget');
    var $canvas = $(canvas);
    var defaultSize = 100;
    var defaultThickness = parseInt(defaultSize / 14); // 7

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
    }).circleProgress('widget');
    var size = $.circleProgress.defaults.size;

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
    var color = '#ff0000';
    var canvas = createCircle({
      value: 0.5,
      fill: {
        color: color
      },
      animation: false
    }).circleProgress('widget');
    var defaultSize = $.circleProgress.defaults.size;

    assert.pixelHex(canvas, 1, defaultSize / 2 - 1, color);
    assert.pixelHex(canvas, defaultSize - 1, defaultSize / 2 - 1, color);
  });

  QUnit.module("Layout tests with animation");

  QUnit.test("Test circle with value = 0.5 and solid fill", function(assert) {
    var color = '#00aa55';
    var circle = createCircle({
      value: 0, // value will be updated dynamically
      animation: false, // initially we draw an empty circle w/o animation
      fill: {
        color: color
      }
    });
    var canvas = circle.circleProgress('widget');
    var size = $.circleProgress.defaults.size;
    var done = assert.async();

    assert.expect(10);

    // Before the animation
    assert.pixelCloseRGBA(canvas, 1, size / 2 - 1, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, 1, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, size / 2 + 1, 1, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, size - 2, size / 2 - 1, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, size - 2, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');

    // After the animation
    circle.on('circle-animation-end', function() {
      assert.pixelHex(canvas, 1, size / 2 - 1, color);
      assert.pixelCloseRGBA(canvas, 1, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');
      assert.pixelHex(canvas, size / 2 + 1, 1, color);
      assert.pixelHex(canvas, size - 2, size / 2 - 1, color);
      assert.pixelCloseRGBA(canvas, size - 2, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');
      done();
    });

    // Start the animation
    circle.circleProgress({
      value: 0.5,
      animation: {
        duration: 500
      }
    });
  });

  QUnit.test("Test circle with value = 0.5, size = 80 and custom gradient", function(assert) {
    var circle = createCircle({
      value: 0, // value will be updated dynamically
      animation: false, // initially we draw an empty circle w/o animation
      size: 80,
      fill: {
        gradient: ['#ff327a', '#fff430', '#ff8989']
      }
    });
    var canvas = circle.circleProgress('widget');
    var size = 80;
    var done = assert.async();

    assert.expect(10);

    // Before the animation
    assert.pixelCloseRGBA(canvas, 1, size / 2 - 1, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, 1, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, size / 2, 1, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, size - 2, size / 2 - 1, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, size - 2, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');

    // After the animation
    circle.on('circle-animation-end', function() {
      assert.pixelCloseHex(canvas, 1, size / 2 - 1, '#ff3777');
      assert.pixelCloseRGBA(canvas, 1, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');
      assert.pixelCloseHex(canvas, size / 2, 1, '#fff330');
      assert.pixelCloseHex(canvas, size - 2, size / 2 - 1, '#ff8c86');
      assert.pixelCloseRGBA(canvas, size - 2, size / 2 + 1, 'rgba(0, 0, 0, 0.1)');
      done();
    });

    // Start the animation
    circle.circleProgress({
      value: 0.5,
      animation: {
        duration: 500
      }
    });
  });

  QUnit.test("Test circle with value = 0.75, custom start angle and custom animation start value", function(assert) {
    var circle = createCircle({
      value: 0, // value will be updated dynamically
      animation: false, // initially we draw an empty circle w/o animation
      startAngle: -Math.PI / 4,
      animationStartValue: 0.25
    });
    var canvas = circle.circleProgress('widget');
    var done = assert.async();

    assert.expect(12);

    // Before the animation
    assert.pixelCloseRGBA(canvas, 15, 20, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, 20, 15, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, 80, 15, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, 80, 85, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, 85, 20, 'rgba(0, 0, 0, 0.1)');
    assert.pixelCloseRGBA(canvas, 85, 80, 'rgba(0, 0, 0, 0.1)');

    // After the animation
    circle.on('circle-animation-end', function() {
      assert.pixelCloseHex(canvas, 15, 20, '#57e6aa');
      assert.pixelCloseRGBA(canvas, 20, 15, 'rgba(0, 0, 0, 0.1)');
      assert.pixelCloseRGBA(canvas, 80, 15, 'rgba(0, 0, 0, 0.1)');
      assert.pixelCloseHex(canvas, 80, 85, '#d6d664');
      assert.pixelCloseHex(canvas, 85, 20, '#e0d55f');
      assert.pixelCloseHex(canvas, 85, 80, '#e0d55f');
      done();
    });

    // Start the animation
    circle.circleProgress({
      value: 0.75,
      animation: {
        duration: 500
      }
    });
  });

  QUnit.test("Test circle with value = 0.5, image background and reverse", function(assert) {
    var urlPrefix = $('script[src*="tests.js"]').attr('src').replace(/tests\.js.*$/, '');
    var imageUrl = urlPrefix + 'images/circle.png';
    var image = new Image();
    var done = assert.async();

    assert.expect(12);

    // Start loading the image
    image.src = imageUrl;

    $(image).on('load', function() {
      var circle = createCircle({
        value: 0, // value will be updated dynamically
        animation: false, // initially we draw an empty circle w/o animation
        thickness: 20,
        fill: {
          image: image
        },
        reverse: true
      });
      var canvas = circle.circleProgress('widget');

      // Before the animation
      assert.pixelRGBA(canvas, 21, 49, 'rgba(0, 0, 0, 0)');
      assert.pixelRGBA(canvas, 78, 49, 'rgba(0, 0, 0, 0)');
      assert.pixelRGBA(canvas, 49, 77, 'rgba(0, 0, 0, 0)');
      assert.pixelCloseRGBA(canvas, 17, 51, 'rgba(0, 0, 0, 0.1)');
      assert.pixelCloseRGBA(canvas, 49, 81, 'rgba(0, 0, 0, 0.1)');
      assert.pixelCloseRGBA(canvas, 81, 51, 'rgba(0, 0, 0, 0.1)');

      // After the animation
      circle.on('circle-animation-end', function() {
        assert.pixelRGBA(canvas, 21, 49, 'rgba(0, 0, 0, 0)');
        assert.pixelRGBA(canvas, 78, 49, 'rgba(0, 0, 0, 0)');
        assert.pixelRGBA(canvas, 49, 77, 'rgba(0, 0, 0, 0)');
        assert.pixelCloseHex(canvas, 17, 51, '#00f7ff');
        assert.pixelCloseHex(canvas, 49, 81, '#7700ff');
        assert.pixelCloseHex(canvas, 81, 51, '#ff0008');
        done();
      });

      // Start the animation
      circle.circleProgress({
        value: 0.5,
        animation: {
          duration: 500
        }
      });
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
    }).circleProgress('widget');

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
    }).circleProgress('widget');

    assert.equal(50, $(canvas).height());
    assert.equal(50, canvas.width);
  });
})();