jquery-circle-progress
======================
[![Build Status](https://travis-ci.org/kottenator/jquery-circle-progress.svg?branch=master)](https://travis-ci.org/kottenator/jquery-circle-progress)

jQuery Plugin to draw animated circular progress bars like this:

![image](http://i.imgur.com/zV5VUQG.png)

Check out [more examples](http://kottenator.github.io/jquery-circle-progress/)!

Install
-------
Download [latest GitHub release](https://github.com/kottenator/jquery-circle-progress/releases)
or `bower install jquery-circle-progress`

Usage
-----
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="jquery-circle-progress/dist/circle-progress.js"></script>

<div id="circle"></div>

<script>
    $('#circle').circleProgress({
        value: 0.75,
        size: 80,
        fill: {
            gradient: ["red", "orange"]
        }
    });
</script>
```

Options
-------
You should specify options like in usage example above.

| Option  | Description |
| ---- | ---- | ---- |
| **value** | This is the only required option. It should be from `0.0` to `1.0` <br> Default: `0` |
| size | Size of the circle / canvas in pixels <br> Default: `100` |
| startAngle | Initial angle (for `0` value) <br> Default: `-Math.PI` |
| reverse | Reverse animation and arc draw<br> Default: `false` |
| thickness | Width of the arc. By default it's automatically calculated as 1/14 of `size` but you may set your own number <br> Default: `"auto"` |
| lineCap | Arc line cap (`"butt"`, `"round"` or `"square"`)) <br> Default: `"butt"`
| fill | The arc fill config. You may specify next:  <br>- `{ color: "#ff1e41" }` <br>- `{ color: 'rgba(255, 255, 255, .3)' }` <br>- `{ gradient: ["red", "green", "blue"] }` <br>- `{ gradient: [["red", .2], ["green", .3], ["blue", .8]] }` <br>- `{ gradient: ["red", "orange"], gradientAngle: Math.PI / 4 }` <br>- `{ gradient: ["red", "orange"], gradientDirection: [x0, y0, x1, y1] }` <br>- `{ image: "http://i.imgur.com/pT0i89v.png" }`<br>- `{ image: imageInstance }`<br>- `{ color: "lime", image: "http://i.imgur.com/pT0i89v.png" }` <br> Default: `{ gradient: ["#3aeabb", "#fdd250"] }` |
| emptyFill | Color of the "empty" arc. Only a color fill supported by now <br> Default: `"rgba(0, 0, 0, .1)"` |
| animation | Animation config. See [jQuery animations](http://api.jquery.com/animate/). <br> You may also set it to `false` <br> Default: `{ duration: 1200, ease: "circleProgressEase" }`  <br> `"circleProgressEase"` *is just a ease-in-out-cubic easing* |
| animationStartValue | Default animation starts at `0.0` and ends at specified `value`. Let's call this direct animation. If you want to make reversed animation then you should set `animationStartValue` to `1.0`. Also you may specify any other value from `0.0` to `1.0` <br> Default: `0.0`

Events
------
When animation is enabled, there are 3 events available:

| Event | Handler |
| ---- | ---- |
| `circle-animation-start` | `function(event)`: <br>- `event` - jQuery event |
| `circle-animation-progress` | `function(event, animationProgress, stepValue)`: <br>- `event` - jQuery event <br>- `animationProgress` - from `0.0` to `1.0` <br>- `stepValue` - current step value: from `0.0` to `value` |
| `circle-animation-end` | `function(event)`: <br>- `event` - jQuery event |

Browsers support
----------------
It uses `<canvas>` which is supported by all modern browsers *(including mobile browsers)*
and Internet Explorer 9+ ([Can I Use](http://caniuse.com/#search=canvas)).

I have not implemented any fallback / polyfill for unsupported browsers yet
*(i.e. for Internet Explorer 8 and older / misc browsers)*.

Misc
----
You can get the `<canvas>` *(but only if the widget is already inited)*:
```js
$('#circle').circleProgress({ value: 0.5 });
var canvas = $('#circle').circleProgress('widget');
```

You can get the `CircleProgress` instance:
```js
var instance = $('#circle').data('circle-progress');
```

You can redraw existing circle *(but only if the widget is already inited)*:
```js
$('#circle').circleProgress({ value: 0.5, fill: { color: 'orange' }});
$('#circle').circleProgress('redraw'); // use current configuration and redraw
$('#circle').circleProgress(); // alias for 'redraw'
$('#circle').circleProgress({ size: 150 }); // set new size and redraw
```

You can change the default options:
```js
$.circleProgress.defaults.size = 50;
```

Status
------
Often people look at "last updated" on GitHub. And if it was long ago, they don't trust such project. But project is alive, it has no bugs, it works just fine. So I will update README time to time, when I have no better tasks to do :)
