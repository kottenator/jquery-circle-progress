jquery-circle-progress
======================

jQuery Plugin to draw animated circular progress bars like this:

![image](http://i.imgur.com/zV5VUQG.png)

Browsers support
----------------
It uses `<canvas>` which is supported by all modern browsers (including mobile browsers) 
and Internet Explorer 9+.

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
| ------------- | ------------- | ------------- |
| **value** | 0 | Despite of default value, you should specify your own. This is the only required option. It should be in range: `0.0 ... 1.0` |
| size | 100 | Size of the circle / canvas in pixels |
| startColor | '#3aeabb' |  |
| endColor | '#fdd250' |  |
| animation | ```{
    duration: 1200,
    easing: 'circleProgressEase' // equal to EaseInOutCubic
}``` | Animation config. See [jQuery Animations](http://api.jquery.com/animate/). You may also set it to `false` |
