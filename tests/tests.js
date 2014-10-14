if (Modernizr.canvas) {
    QUnit.module("Layout tests, no animation");

    QUnit.test("Test circle with value = 0 (without any options)", function(assert) {
        var el = $('<div>').appendTo('#qunit-fixture').circleProgress({ value: 0 }),
            canvas = el.circleProgress('widget'),
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
        var el = $('<div>').appendTo('#qunit-fixture').circleProgress({
                value: 0.5,
                animation: false
            }),
            canvas = el.circleProgress('widget'),
            defaultSize = 100;

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
        var el = $('<div>').appendTo('#qunit-fixture').circleProgress({
                value: 0.5,
                fill: { color: '#ff0000' },
                animation: false
            }),
            canvas = el.circleProgress('widget'),
            defaultSize = 100;

        assert.pixelHex(canvas, 1, defaultSize / 2 - 1, '#ff0000');
        assert.pixelHex(canvas, defaultSize - 1, defaultSize / 2 - 1, '#ff0000');
    });
} else {
    QUnit.test("Your browser doesn't support Canvas", function(assert) {
        assert.ok(true, "That's fine");
    });
}
