/**
 * Created by honoka on 2016/3/11.
 */
(function ($) {
    "use strict";
   $(window).load(function () {
        $('.slideImgs').slideShow('.slider-container', {
            timeOut: 3000,
            showNavigation: true,
            pauseOnHover: true,
        });
    });
})(jQuery);
