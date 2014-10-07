QUnit.test("Test empty circle with no options", function(assert) {
    if (Modernizr.canvas) {
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
        assert.equal(pixelColor(canvas, 0, defaultSize / 2), 'rgba(0, 0, 0, 0.1)', "Gray circle color: rgba(0, 0, 0, 0.1)");
        assert.equal(pixelColor(canvas, defaultThickness - 1, defaultSize / 2), 'rgba(0, 0, 0, 0.1)', "Inside the border (6, 50)");
        assert.equal(pixelColor(canvas, defaultThickness + 1, defaultSize / 2), 'rgba(0, 0, 0, 0)', "Outside the border (8, 50)");
    }
});

function pixelColor(canvas, x, y) {
    var ctx = canvas.getContext('2d');
    var data = ctx.getImageData(x, y, 1, 1).data;
    console.log(data);
    return 'rgba(' + data[0] + ', ' + data[1] + ', ' +data[2] + ', ' + Math.round(data[3] / 255 * 100) / 100 + ')';
}
