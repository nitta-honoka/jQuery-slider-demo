/**
 * Created by honoka on 2016/3/13.
 * 轮播插件
 */
(function ($) {
    "use strict";
    $.fn.slideShow = function (context, options) {
        var self = this;
        //默认配置
        self.options = $.extend({
            timeOut: 5000, //自动轮播间隔时间
            auto: true,
            showNavigation: true, //是否显示向前/向后箭头
            pauseOnHover: true, //hover 时停止轮播
            showDots: true //是否显示小圆点
        }, options);
        //变量
        var _slideshowImgs = [], //图片列表
            _dots = [], //导航圆点
            _cont, //包裹元素
            _width,
            _height,
            _prev,
            _next,
            _imgLength,
            _timeOutFunc,
            _index = 0,
            _fade = false;
        //得到每个图片元素的信息
        (function () {
            _cont = $(context);
            _slideshowImgs = _cont.find('img');
            _imgLength = _slideshowImgs.length;
            _width = _cont.outerWidth(true);
            _height = _cont.outerHeight(true);
            _cont.width(_width);
            _cont.height(_height);

            //为每个 slideshow 创建一个 div，带有自己的 id 和 class
            _cont.addClass('slideshow');
            for (var i = 0; i < _imgLength; i++) {
                $(_slideshowImgs[i]).addClass('slide');
            }
            //如果 showNavigation 为选择项，增加导航按钮
            if (self.options.showNavigation) {
                createNavigation();
            }

            //如果 showDots 为选择项，增加导航小圆点
            if (self.options.showDots) {
                createDots(_imgLength);
            }
            //启动轮播
            if (self.options.auto) {
                play();
                //绑定 hover 事件,移入暂停轮播,移出重新启动
                if (self.options.pauseOnHover) {
                    $('.slideshow').on('mouseover', function () {
                        pause();
                        $('.slideBtn').css('display', 'block');
                    });
                    $('.slideshow').on('mouseout', function () {
                        play();
                        $('.slideBtn').css('display', 'none');
                    });
                }
            }
            //给导航按钮绑定点击事件
            $('.next').on('click', nextImg);
            $('.prev').on('click', prevImg);

        })();
        //创建导航按钮
        function createNavigation() {
            //生成导航按钮元素
            _prev = $('<div class="leftBtn slideBtn hide">');
            _next = $('<div class="rightBtn slideBtn hide">');
            //插入显示文本
            var prevPointer = $('<span class="pointer prev"><</span>');
            var nextPointer = $('<span class="pointer next">></span>');
            prevPointer.appendTo(_prev);
            nextPointer.appendTo(_next);

            _prev.appendTo(_cont);
            _next.appendTo(_cont);
        }

        function createDots(length) {
            var dots = $('<ul class="slideDots"></ul>');
            $('<li class="on slideDot"></li>').appendTo(dots);
            for (var z = 1; z < length; z++) {
                var dot = $('<li class="slideDot"></li>');
                dot.appendTo(dots);
            }
            dots.appendTo(_cont);
            _dots = $('.slideDot');
        }

        //点亮小圆点
        function lightDot() {
            $('.slideDots').find('.on').removeClass('on');
            $('.slideDot').eq(_index).addClass('on');
        }

        //切换至下一张
        function nextImg() {
            fadeOut($(_slideshowImgs[_index]));
            _index++;
            if (_index == _imgLength) {
                _index = 0;
            }
            fadeIn($(_slideshowImgs[_index]));
            lightDot();
        };
        //切换至上一张
        function prevImg() {
            if (_fade) {
                return;
            } else {
                fadeOut($(_slideshowImgs[_index]));
                if (_index === 0) {
                    _index = _imgLength;
                }
                _index--;
                fadeIn($(_slideshowImgs[_index]));
                lightDot();
            }
        };
        //圆点控制切换
        (function () {
            for (var i = 0; i < _imgLength; i++) {
                _dots[i].order = i;
                _dots[i].onmousemove = function () {
                    if (this.order == _index) {
                        return;
                    } else {
                        fadeOut($(_slideshowImgs[_index]));
                        _index = this.order;
                        fadeIn($(_slideshowImgs[_index]));
                        lightDot();
                    }
                }
            }
        })();
        //启动轮播
        function play() {
            _timeOutFunc = setTimeout(function () {
                nextImg();
                play();
            }, self.options.timeOut);
        }

        //暂停轮播
        function pause() {
            clearTimeout(_timeOutFunc);
        }

        //设置透明度
        function setOpacity(obj, opa) {
            if (obj.filters) {
                obj.css('filter', 'alpha(opacity:' + opa + ')');
            } else {
                obj.css('opacity', opa / 100);
            }
        }

        //设置淡入淡出动画
        function fadeIn(obj) {
            _fade = true;
            obj.css('display', 'block');
            var opa = 0;
            (function func() {
                if (opa < 100) {
                    opa += 10;
                    setOpacity(obj, opa);
                    setTimeout(func, 20);
                } else {
                    _fade = false;
                }
            })();
        }

        function fadeOut(obj) {
            _fade = true;
            var opa = 100;
            (function func() {
                if (opa > 0) {
                    opa -= 10;
                    setOpacity(obj, opa);
                    setTimeout(func, 30);
                } else {
                    obj.css('display', 'none');
                }
            })();
        }
    }
})(jQuery);