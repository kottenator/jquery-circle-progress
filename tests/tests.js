(function() {
    if (Modernizr.canvas) {
        QUnit.module("Layout tests, no animation");

        QUnit.test("Test circle with value = 0 (without any options)", function(assert) {
            var canvas = createCircle({ value: 0 }),
                $canvas = $(canvas),
                defaultSize = 100,
                defaultThickness = parseInt(defaultSize / 14); // 7

            assert.equal($.circleProgress.defaults.size, defaultSize, "Default circle size: 100 pixels");
            assert.equal($.circleProgress.defaults.thickness, 'auto', "Default circle thickness: 'auto' (i.e. 1/14 of size)");
            assert.equal(canvas.tagName.toLowerCase(), 'canvas', "Method .circleProgress('widget') returns HTMLCanvasElement");
            assert.equal($canvas.width(), defaultSize, "Default width: 100 pixels");
            assert.equal($canvas.height(), defaultSize, "Default height: 100 pixels");
            assert.pixelCloseRGBA(canvas, 0, defaultSize / 2, 'rgba(0, 0, 0, 0.1)', 0.01);
            assert.pixelCloseRGBA(canvas, defaultThickness - 1, defaultSize / 2, 'rgba(0, 0, 0, 0.1)', 0.01);
            assert.pixelRGBA(canvas, defaultThickness + 1, defaultSize / 2, 'rgba(0, 0, 0, 0)');
        });

        QUnit.test("Test circle with value = 0.5 and default fill", function(assert) {
            var canvas = createCircle({
                    value: 0.5,
                    animation: false
                }),
                defaultSize = $.circleProgress.defaults.size;

            assert.pixelCloseHex(canvas, 1, defaultSize / 2 - 1, '#3aeabb', 0.015);
            assert.pixelCloseRGBA(canvas, 1, defaultSize / 2 + 1, 'rgba(0, 0, 0, 0.1)', 0.01);
            assert.pixelCloseHex(canvas, defaultSize - 1, defaultSize / 2 - 1, '#fdd250', 0.015);
            assert.pixelCloseRGBA(canvas, defaultSize - 1, defaultSize / 2 + 1, 'rgba(0, 0, 0, 0.1)', 0.01);
            assert.pixelCloseHex(canvas, defaultSize / 2, 1, '#9ade85', 0.015);
            assert.pixelRGBA(canvas, defaultSize / 2, 8, 'rgba(0, 0, 0, 0)');
            assert.pixelCloseRGBA(canvas, defaultSize / 2, defaultSize - 1, 'rgba(0, 0, 0, 0.1)', 0.01);
            assert.pixelRGBA(canvas, defaultSize / 2, defaultSize - 9, 'rgba(0, 0, 0, 0)');
        });

        QUnit.test("Test circle with value = 0.5 and solid fill", function(assert) {
            var color = '#ff0000',
                canvas = createCircle({
                    value: 0.5,
                    fill: { color: color },
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
                    fill: { color: color }
                }),
                defaultSize = $.circleProgress.defaults.size;

            assert.expect(8);
            QUnit.stop();

            assert.pixelCloseRGBA(canvas, 1, defaultSize / 2 - 1, 'rgba(0, 0, 0, 0.1)', 0.01);
            setTimeout(function() {
                assert.pixelHex(canvas, 1, defaultSize / 2 - 1, color);
            }, 200);

            assert.pixelCloseRGBA(canvas, defaultSize / 2 + 1, 1, 'rgba(0, 0, 0, 0.1)', 0.01);
            setTimeout(function() {
                assert.pixelHex(canvas, defaultSize / 2 + 1, 1, color);
            }, 700);

            assert.pixelCloseRGBA(canvas, defaultSize - 2, defaultSize / 2 - 1, 'rgba(0, 0, 0, 0.1)', 0.01);
            setTimeout(function() {
                assert.pixelHex(canvas, defaultSize - 2, defaultSize / 2 - 1, color);
                QUnit.start();
            }, 1300);

            assert.pixelCloseRGBA(canvas, 1, defaultSize / 2 + 1, 'rgba(0, 0, 0, 0.1)', 0.01);
            assert.pixelCloseRGBA(canvas, defaultSize - 2, defaultSize / 2 + 1, 'rgba(0, 0, 0, 0.1)', 0.01);
        });

        QUnit.test("Test circle with value = 0.5 and custom gradient", function(assert) {
            var canvas = createCircle({
                    value: 0.5,
                    fill: {
                        gradient: ['#ff327a', '#fff430', '#ff8989']
                    }
                }),
                defaultSize = $.circleProgress.defaults.size;

            assert.expect(8);
            QUnit.stop();

            assert.pixelCloseRGBA(canvas, 1, defaultSize / 2 - 1, 'rgba(0, 0, 0, 0.1)', 0.01);
            setTimeout(function() {
                assert.pixelCloseHex(canvas, 1, defaultSize / 2 - 1, '#ff3777', 0.01);
            }, 200);

            assert.pixelCloseRGBA(canvas, defaultSize / 2, 1, 'rgba(0, 0, 0, 0.1)', 0.01);
            setTimeout(function() {
                assert.pixelCloseHex(canvas, defaultSize / 2, 1, '#fff330', 0.01);
            }, 700);

            assert.pixelCloseRGBA(canvas, defaultSize - 2, defaultSize / 2 - 1, 'rgba(0, 0, 0, 0.1)', 0.01);
            setTimeout(function() {
                assert.pixelCloseHex(canvas, defaultSize - 2, defaultSize / 2 - 1, '#ff8c86', 0.01);
                QUnit.start();
            }, 1300);

            assert.pixelCloseRGBA(canvas, 1, defaultSize / 2 + 1, 'rgba(0, 0, 0, 0.1)', 0.01);
            assert.pixelCloseRGBA(canvas, defaultSize - 2, defaultSize / 2 + 1, 'rgba(0, 0, 0, 0.1)', 0.01);
        });

        QUnit.test("Test circle with value = 0.75, custom start angle and animation start value", function(assert) {
            var canvas = createCircle({
                value: 0.75,
                startAngle: -Math.PI / 4,
                animationStartValue: 0.25
            });

            assert.expect(8);
            QUnit.stop();

            assert.pixelCloseRGBA(canvas, 80, 15, 'rgba(0, 0, 0, 0.1)', 0.01);
            assert.pixelCloseHex(canvas, 85, 20, '#e0d55f', 0.01);
            assert.pixelCloseHex(canvas, 85, 80, '#e0d55f', 0.01);
            assert.pixelCloseRGBA(canvas, 80, 85, 'rgba(0, 0, 0, 0.1)', 0.01);
            setTimeout(function() {
                assert.pixelCloseHex(canvas, 80, 85, '#d6d664', 0.01);
            }, 400);

            assert.pixelCloseRGBA(canvas, 15, 20, 'rgba(0, 0, 0, 0.1)', 0.01);
            setTimeout(function() {
                assert.pixelCloseHex(canvas, 15, 20, '#57e6aa', 0.01);
                assert.pixelCloseRGBA(canvas, 20, 15, 'rgba(0, 0, 0, 0.1)', 0.01);
                QUnit.start();
            }, 1300);
        });
    } else {
        QUnit.test("Your browser doesn't support Canvas", function(assert) {
            assert.ok(true, "That's fine");
        });
    }

    // Utilities
    function createCircle(cfg) {
        var output = $('#qunit-fixture');
        if (!output[0])
            output = $('body');
        var el = $('<span>').appendTo(output).circleProgress(cfg);
        return el.circleProgress('widget');
    }
})();
