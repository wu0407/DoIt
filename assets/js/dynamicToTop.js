var mv_dynamic_to_top = {
  'text': '0',
  'version': '0',
  'min': '200',
  "speed": '300',
  'easing': 'easeInOutExpo',
  'margin': '20',
};

jQuery(function($) {
  $.fn.DynamicToTop = function(options) {
    var defaults = {
        text: mv_dynamic_to_top.text,
        min: parseInt(mv_dynamic_to_top.min, 10),
        fade_in: 600,
        fade_out: 400,
        speed: parseInt(mv_dynamic_to_top.speed, 10),
        easing: mv_dynamic_to_top.easing,
        version: mv_dynamic_to_top.version,
        id: 'dynamic-to-top',
    },
    settings = $.extend(defaults, options);
    if (settings.version === '' || settings.version === '0') {
      settings.text = '<span>&nbsp;</span>';
    }
    if (!$.isFunction(settings.easing)) {
      settings.easing = 'linear';
    }
    var $toTop = $('<a href=\"#\" id=\"' + settings.id + '\"></a>').html(settings.text);
    $toTop.hide().appendTo('body').click(function() {
      $('html, body').stop().animate({
        scrollTop: 0
      }, settings.speed, settings.easing);
      return false;
    });
    $(window).scroll(function() {
      var sd = $(window).scrollTop();
      if (typeof document.body.style.maxHeight === 'undefined') {
        $toTop.css({
          'position': 'absolute',
          'top': sd + $(window).height() - mv_dynamic_to_top.margin
        });
      }
      if (sd > settings.min) {
        $toTop.fadeIn(settings.fade_in);
      } else {
        $toTop.fadeOut(settings.fade_out);
      }
    });
  };
  $('body').DynamicToTop();
});
