if (Modernizr.canvas) {
    QUnit.test("Test empty circle with no options", function(assert) {
        var el = $('<div>').appendTo('#qunit-fixture').circleProgress({ value: 0 }),
            canvas = el.circleProgress('widget'),
            $canvas = $(canvas),
            defaultSize = 100,
            defaultThickness = parseInt(defaultSize / 14); // 7

        assert.equal($.circleProgress.defaults.size, defaultSize, "Default circle size: 100 pixels");
        assert.equal($.circleProgress.defaults.thickness, 'auto', "Default circle thickness: 'auto' (i.e. 1/14 of size)");
        assert.equal(canvas.tagName.toLowerCase(), 'canvas', "Method .circleProgress('widget') returns HTMLCanvasElement");
        assert.equal($canvas.width(), defaultSize, "Actual width: 100 pixels");
        assert.equal($canvas.height(), defaultSize, "Actual height: 100 pixels");
        assert.pixelCloseRGBA(canvas, 0, defaultSize / 2, 'rgba(0, 0, 0, 0.1)', 0.05);
        assert.pixelCloseRGBA(canvas, defaultThickness - 1, defaultSize / 2, 'rgba(0, 0, 0, 0.1)', 0.05);
        assert.pixelRGBA(canvas, defaultThickness + 1, defaultSize / 2, 'rgba(0, 0, 0, 0)');
    });

    QUnit.test("Test basic circle with no animation", function(assert) {
        var el = $('<div>').appendTo('#qunit-fixture').circleProgress({
                value: 0.5,
                animation: false
            }),
            canvas = el.circleProgress('widget'),
            defaultSize = 100;

        assert.pixelCloseHex(canvas, 1, defaultSize / 2 - 1, '#3aeabb', 0.05);
        assert.pixelCloseHex(canvas, defaultSize - 1, defaultSize / 2 - 1, '#fdd250', 0.05);
    });
} else {
    QUnit.test("Your browser doesn't support Canvas", function(assert) {
        assert.ok(true, "That's fine");
    });
}
