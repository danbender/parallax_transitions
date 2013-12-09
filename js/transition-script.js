$(document).ready(function() {

    var $view = $('#view');
    var w = $view.width();
    var h = $view.height();
    var l = 0;
    var t = 0;
    var scrollDown = false;
    var scrollUp = false;
    var scroll = 0;

    $view.find('.parallax').each(function() {
        var $moving = $(this);
        if($moving.hasClass('from-left')) {
            $moving.css('left', 0 - $moving.width());
        } else if($moving.hasClass('from-right')) {
            $moving.css('left', w);
        } else if($moving.hasClass('from-top')) {
            $moving.css('top', 0 - $moving.height());
        } else if($moving.hasClass('from-bottom')) {
            $moving.css('top', h);
        }
        $moving.css('z-index', 0);
    });

    var $moving = $view.find('.parallax:first');

    var mousew = function(e) {
        var d = 0;
        if(!e) e = window.event;
        if (e.wheelDelta) {
            d = -e.wheelDelta/120;
        } else if (e.detail) {
            d = e.detail/3;
        }
        parallaxScroll(d);
    }
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', mousew, false);
    }
    window.onmousewheel = document.onmousewheel = mousew;

    window.setInterval(function() {
        if(scrollDown)
        parallaxScroll(4);
        else if(scrollUp)
        parallaxScroll(-4);
    }, 50);

    function parallaxScroll(scroll) {
        var ml = $moving.position().left;
        var mt = $moving.position().top;
        var mw = $moving.width();
        var mh = $moving.height();
        var fromTop = false;
        var fromBottom = false;
        var fromLeft = false;
        var fromRight = false;
        var vLeft = 0;
        var vTop = 0;
        if($moving.hasClass('from-top')) {
            vTop = scroll;
            fromTop = true;
        } else if($moving.hasClass('from-bottom')) {
            vTop = -scroll;
            fromBottom = true;
        } else if($moving.hasClass('from-left')) {
            vLeft = scroll;
            fromLeft = true;
        } else if($moving.hasClass('from-right')) {
            vLeft = -scroll;
            fromRight = true;
        };

        var newLeft = ml + vLeft;
        var newTop = mt + vTop;
        var finished = false;
        if(fromTop && (newTop > t || newTop + mh < t)) {
            finished = true;
            newTop = (scroll > 0 ? t : t - mh);
        } else if(fromBottom && (newTop < t || newTop > h)) {
            finished = true;
            newTop = (scroll > 0 ? t : t + h);
        } else if(fromLeft && (newLeft > l || newLeft + mw < l)) {
            finished = true;
            newLeft = (scroll > 0 ? l : l - mw);
        } else if(fromRight && (newLeft < l || newLeft > w)) {
            finished = true;
            newLeft = (scroll > 0 ? l : l + w);
        };

        $moving.css('left', newLeft);
        $moving.css('top', newTop);
        if(finished) {
            if(scroll > 0) {
                $moving = $moving.next('.parallax');
                if($moving.length == 0)
                    $moving = $view.find('.parallax:last');
            } else {
                $moving = $moving.prev('.parallax');
                if($moving.length == 0)
                    $moving = $view.find('.parallax:first');
            }
        };
    };

});



