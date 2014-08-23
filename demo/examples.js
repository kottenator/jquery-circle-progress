/* Examples */

/*
 * Example 1:
 *   - no animation
 *   - custom gradient
 *
 * By the way - you may specify more than 2 colors for the gradient
 */
$('.first.circle').circleProgress({
    value: 0.35,
    animation: false,
    fill: { gradient: ['#ff1e41', '#ff5f43'] }
});

/*
 * Example 2:
 *   - default gradient
 *   - listening to `circle-animation-progress` event and display the animation progress: from 0 to 100%
 */
$('.second.circle').circleProgress({
    value: 0.6
}).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(parseInt(100 * progress) + '<i>%</i>');
});

/*
 * Example 3:
 *   - custom gradient
 *   - listening to `circle-animation-progress` event and display the dynamic change of the value: from 0 to 0.8
 */
$('.third.circle').circleProgress({
    value: 0.8,
    fill: { gradient: ['#0681c4', '#07c6c1'] }
}).on('circle-animation-progress', function(event, progress, stepValue) {
    $(this).find('strong').text(String(stepValue.toFixed(2)).substr(1));
});

/*
 * Example 4:
 *   - solid color fill
 *   - custom start angle
 */
$('.forth.circle').circleProgress({
    startAngle: -Math.PI / 4 * 3,
    value: .5,
    fill: { color: '#ffa500' }
});

/*
 * Example 5:
 *   - image fill; image should be squared; it will be stretched to SxS size, where S - size of the widget
 *   - fallback color fill (when image is not loaded)
 *   - custom widget size (default is 100px)
 *   - custom circle thickness (default is 1/14 of the size)
 */
$('.fifth.circle').circleProgress({
    value: 1,
    size: 60,
    thickness: 25,
    fill: {
        color: 'lime', // fallback color when image is not loaded
        image: 'http://i.imgur.com/pT0i89v.png'
    }
});