jquery-circle-progress
======================

[![Build Status](https://travis-ci.org/kottenator/jquery-circle-progress.svg?branch=master)](https://travis-ci.org/kottenator/jquery-circle-progress)
[![Bower version](https://badge.fury.io/bo/jquery-circle-progress.svg)](https://badge.fury.io/bo/jquery-circle-progress)

jQuery Plugin to draw animated circular progress bars like this:

![](http://i.imgur.com/zV5VUQG.png)

Check out [more examples](http://kottenator.github.io/jquery-circle-progress/)! Or maybe the crazy [one](http://jsbin.com/vatuza/1/)?

Install
-------

Download [latest GitHub release](https://github.com/kottenator/jquery-circle-progress/releases)
or `bower install jquery-circle-progress`

Usage
-----

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
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
| reverse | Reverse animation and arc draw <br> Default: `false` |
| thickness | Width of the arc. By default it's automatically calculated as 1/14 of `size` but you may set your own number <br> Default: `"auto"` |
| lineCap | Arc line cap: `"butt"`, `"round"` or `"square"` - [read more](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.lineCap) <br> Default: `"butt"`
| fill | The arc fill config. You may specify next:  <br>- `"#ff1e41"` <br>- `{ color: "#ff1e41" }` <br>- `{ color: 'rgba(255, 255, 255, .3)' }` <br>- `{ gradient: ["red", "green", "blue"] }` <br>- `{ gradient: [["red", .2], ["green", .3], ["blue", .8]] }` <br>- `{ gradient: [ ... ], gradientAngle: Math.PI / 4 }` <br>- `{ gradient: [ ... ], gradientDirection: [x0, y0, x1, y1] }` <br>- `{ image: "http://i.imgur.com/pT0i89v.png" }`<br>- `{ image: imageInstance }`<br>- `{ color: "lime", image: "http://i.imgur.com/pT0i89v.png" }` <br> Default: `{ gradient: ["#3aeabb", "#fdd250"] }` |
| emptyFill | Color of the "empty" arc. Only a color fill supported by now <br> Default: `"rgba(0, 0, 0, .1)"` |
| animation | Animation config. See [jQuery animations](http://api.jquery.com/animate/). <br> You may also set it to `false` <br> Default: `{ duration: 1200, easing: "circleProgressEase" }`  <br> `"circleProgressEase"` *is just a ease-in-out-cubic easing* |
| animationStartValue | Default animation starts at `0.0` and ends at specified `value`. Let's call this direct animation. If you want to make reversed animation then you should set `animationStartValue` to `1.0`. Also you may specify any other value from `0.0` to `1.0` <br> Default: `0.0`
| insertMode | Canvas insertion mode: append or prepend it into the parent element? <br> Default: `"prepend"` |

From version `1.1.3` you can specify any config option as HTML `data-` attribute.

It will work *only on init*, i.e. after the widget is inited you may update its properties only via `.circleProgress({/*...*/})` method. `data-` attributes will be ignored.

Also, object options like `"fill"` or `"animation"` should be valid JSON (and don't forget about HTML-escaping):

```html
<div
    class="circle"
    data-value="0.9"
    data-size="60"
    data-thickness="20"
    data-animation-start-value="1.0"
    data-fill="{
        &quot;color&quot;: &quot;rgba(0, 0, 0, .3)&quot;,
        &quot;image&quot;: &quot;http://i.imgur.com/pT0i89v.png&quot;
    }"
    data-reverse="true"
></div>
```

Events
------

When animation is enabled, there are 3 events available:

| Event | Handler |
| ---- | ---- |
| `circle-animation-start` | `function(event)`: <br>- `event` - jQuery event |
| `circle-animation-progress` | `function(event, animationProgress, stepValue)`: <br>- `event` - jQuery event <br>- `animationProgress` - from `0.0` to `1.0` <br>- `stepValue` - current step value: from `0.0` to `value` |
| `circle-animation-end` | `function(event)`: <br>- `event` - jQuery event |

When the circular progress bar is inited or re-inited, there is the following event:

| Event | Handler |
| ---- | ---- |
| `circle-inited` | `function(event)`: <br>- `event` - jQuery event |

Browsers support
----------------

It uses `<canvas>` which is supported by all modern browsers *(including mobile browsers)*
and Internet Explorer 9+ ([Can I Use](http://caniuse.com/#search=canvas)).

I have not implemented any fallback / polyfill for unsupported browsers yet
*(i.e. for Internet Explorer 8 and older / misc browsers)*.

API
---

### Get/set value

Get it:

```js
$('.circle').circleProgress({ value: 0.5 });
var value = $('.circle').circleProgress('value'); // 0.5
```

It will return the *first* item's value (by *first* I mean when `$('.circle').length >= 1`).
*It works only if the widget is already inited. Raises an error otherwise*.

Set it:

```js
$('.circle').circleProgress('value', 0.75); // set value to 0.75 & animate the change
```

It will update *all* selected items value and animate the change.
It doesn't *redraw* the widget - it updates the value & animates the changes.
For example, it may be an AJAX loading indicator, which shows the loading progress.

### Get `<canvas>`

```js
$('.circle').circleProgress({ value: 0.5 });
var canvas = $('.circle').circleProgress('widget');
```

It will return the *first* item's `<canvas>` (by *first* I mean when `$('.circle').length >= 1`).
*It works only if the widget is already inited. Raises an error otherwise*.

### Get `CircleProgress` instance

```js
var instance = $('#circle').data('circle-progress');
```

### Redraw existing circle

```js
$('#circle').circleProgress({ value: 0.5, fill: { color: 'orange' }});
$('#circle').circleProgress('redraw'); // use current configuration and redraw
$('#circle').circleProgress(); // alias for 'redraw'
$('#circle').circleProgress({ size: 150 }); // set new size and redraw
```

*It works only if the widget is already inited. Raises an error otherwise*.

### Change default options

```js
$.circleProgress.defaults.size = 50;
```

FAQ
---

<dl>
<dt>How to start the animation only when the circle appears in browser's view (on scrolling)?
<dd>Here is <a href="https://github.com/kottenator/jquery-circle-progress/issues/8">my proposed solution</a>.
<dt>How to make the size flexible?
<dd>E.g. for responsive design, you can do it <a href="https://github.com/kottenator/jquery-circle-progress/issues/17">in the following way</a>.
<dt>What if I need it to run in IE8?
<dd>There is no full-feature support for IE8 (actually, I didn't imlpement IE8 support at all). But you may follow <a href="https://github.com/kottenator/jquery-circle-progress/issues/35">my recommendations</a>.
<dt>How to stop the animation?
<dd>Here is <a href="https://github.com/kottenator/jquery-circle-progress/issues/37">what you can do</a>.
<dt>Can I handle "click" event?
<dd>It's not in the "core" but you can use <a href="http://output.jsbin.com/fetequ/5">my example of mouse/touch events handling</a>.
<dt>May I customize the shape somehow?
<dd>It's a bit "tricky" but possible. Here is <a href="https://github.com/kottenator/jquery-circle-progress/wiki/Custom-layouts">my little collection</a>.
</dl>

Development
-----------

### Install

```sh
git clone git@github.com:kottenator/jquery-circle-progress.git
npm install
```

### Update minified version

You need to update `dist/circle-progress.min.js` after any change to `dist/circle-progress.js`:
 
```sh
npm run build-min
```

If you're using one of JetBrains IDEs - you can configure a File Watcher.
It's also possible to use some CLI tool like [Watchman](https://facebook.github.io/watchman/).

### Test

```sh
npm test
```

SauceLabs:

```sh
export SAUCE_USERNAME=...
export SAUCE_ACCESS_KEY=...
export BUILD_NUMBER=...
npm test -- karma-saucelabs.conf.js
```

### Build docs

The API docs are not complete yet but you can build them:

```sh
npm run build-docs
```

They will be generated in `docs/api/`.

### Release new version

You need to:

* finalize the code
* update min dist: `npm run build-min`
* push into `master`
* create new version tag (e.g.): `git tag v1.2.3 && git push --tags`
* update the version in `package.json`, `bower.json` and `dist/circle-progress.js` docstring 
