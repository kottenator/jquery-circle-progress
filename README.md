jquery-circle-progress
======================

jQuery Plugin to draw animated circular progress bars like this:

![image](http://i.imgur.com/zV5VUQG.png)

Browsers support
----------------
It uses `<canvas>` which is supported by all modern browsers (including mobile browsers)
and Internet Explorer 9+ ([Can I Use](http://caniuse.com/#search=canvas)).

I have not implemented any fallback / polyfill for unsupported browsers yet
*(i.e. for Internet Explorer 8 and older / misc browsers)*.

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

Options
-------
You should specify options like in usage example above.

Here are all available options:

| Option  | Default | Description |
| ---- | ---- | ---- |
| **value** | `0` | You should specify your own - this is the only required option. It should be in range: `0.0 ... 1.0` |
| size | `100` | Size of the circle / canvas in pixels |
| startAngle | `-Math.PI` | Initial angle (for `0` value) |
| startColor | `"#3aeabb"` | Left gradient's side color |
| endColor | `"#fdd250"` | Right gradient's side color |
| animation | ... | Animation config. See [jQuery Animations](http://api.jquery.com/animate/). You may also set it to `false` |
| animation.duration | `1200` | Duration in ms |
| animation.easing | `"circleProgressEase"` | Easing function name. Default one is just a copy of *ease-in-out-cubic* |

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
You can get the `<canvas>` (but only if the widget is already inited):
```js
$('#circle').circleProgress({ value: 0.5 });
var canvas = $('#circle').circleProgress('widget');
```

You can change the default options:
```js
$.circleProgress.defaults = {
    value: 0.5,
    size: 50,
    startAngle: -Math.PI / 2,
    startColor: 'red',
    endColor: 'orange',
    animation: {
        duration: 500,
        easing: 'linear'
    }
}
```
