jquery-circle-progress
======================

jQuery Plugin to draw animated circular progress bars like this:

![image](http://i.imgur.com/zV5VUQG.png)

Check out [more examples](http://kottenator.github.io/jquery-circle-progress/)!

Usage
-----

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="jquery-circle-progress/dist/circle-progress.js"></script>

<div id="circle"></div>

<script>
    $('#circle').circleProgress({ value: 0.75, startColor: 'red', endColor: 'orange' })
</script>
```

Browsers support
----------------
It uses `<canvas>` which is supported by all modern browsers (including mobile browsers)
and Internet Explorer 9+ ([Can I Use](http://caniuse.com/#search=canvas)).

I have not implemented any fallback / polyfill for unsupported browsers yet
*(i.e. for Internet Explorer 8 and older / misc browsers)*.

Install
-------
Download [latest GitHub release](https://github.com/kottenator/jquery-circle-progress/releases)
or `bower install jquery-circle-progress`

Options
-------
You should specify options like in usage example above.

| Option  | Description |
| ---- | ---- | ---- |
| **value** | This is the only required option. It should be from `0.0` to `1.0` <br> Default: `0` |
| size | Size of the circle / canvas in pixels <br> Default: `100` |
| startAngle | Initial angle (for `0` value) <br> Default: `-Math.PI` |
| fill | The arc fill config. You may specify next: <br>- `{ gradient: ["red", "green", "blue"] }` <br>- `{ color: "#ff1e41" }` <br>- `{ image: "http://i.imgur.com/pT0i89v.png" }`<br>- `{ color: "lime", image: "http://i.imgur.com/pT0i89v.png" }` <br> Default: `{ gradient: ["#3aeabb", "#fdd250"] }` |
| animation | Animation config. See [jQuery animations](http://api.jquery.com/animate/). <br> You may also set it to `false` <br> Default: `{ duration: 1200, ease: "circleProgressEase" }`  <br> `"circleProgressEase"` *is just a ease-in-out-cubic easing* |

Events
------
When animation is enabled, there are 3 events available:

| Event | Handler |
| ---- | ---- |
| `circle-animation-start` | `function(event)`: <br>- `event` - jQuery event |
| `circle-animation-progress` | `function(event, animationProgress, stepValue)`: <br>- `event` - jQuery event <br>- `animationProgress` - from `0.0` to `1.0` <br>- `stepValue` - current step value: from `0.0` to *value* |
| `circle-animation-end` | `function(event)`: <br>- `event` - jQuery event |

Misc
----
You can get the `<canvas>` *(but only if the widget is already inited)*:
```js
$('#circle').circleProgress({ value: 0.5 });
var canvas = $('#circle').circleProgress('widget');
```

You can change the default options:
```js
$.circleProgress.defaults = {
    value: 0,
    size: 100,
    startAngle: -Math.PI,
    thickness: 'auto', // by default it's 1/14 of the size, but you may set it explicitly in px
    fill: {
        gradient: ['#3aeabb', '#fdd250'] // or color: '#3aeabb', or image: 'http://i.imgur.com/pT0i89v.png'
    },
    animation: {
        duration: 1200,
        easing: 'circleProgressEase' // equal to EaseInOutCubic
    }
}
```
