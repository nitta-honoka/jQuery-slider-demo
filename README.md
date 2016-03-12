# slider-demo
自制 jQuery 插件实现的一个焦点图轮播 DEMO

##使用说明：
  - 在页面中引入 jQuery
  - 在页面中引入插件的 JS 文件与 CSS 文件 
  
  ``` html
  <link rel="stylesheet" href="plugins/jQuery-HoSlide-plugin.css">
  <script src="//cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
  <script src="plugins/jQuery-HoSlide-plugin.js"></script>
  ```
  - HTML 结构可以如图
  
  ``` html
  <div class="slider-container">
    <img src="images/alt01.png" alt="01">
    <img src="images/alt02.jpg" alt="02">
    <img src="images/alt03.jpg" alt="03">
    <img src="images/alt04.png" alt="04">
  </div>
  ```
  - 随后在 JS 中启用插件就可以啦
  
  ``` javascript
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
  ```
  
##插件配置项：
  - timeOut: 自动轮播间隔时间，默认 5000ms
  - auto: 是否启用自动轮播，默认启用
  - showNavigation: 是否显示向前/向后导航箭头，默认显示
  - pauseOnHover: 是否在鼠标移至图片上时停止轮播，默认启用(只在 auto 启用时有用)
  - showDots：是否显示导航圆点，默认显示
  
