$(function() {
    var topBtn = $('#page-top');
    topBtn.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});

$(function() {
  $('a[href^="#"]').click(function() {
    var speed = 500;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('html, body').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
});

$(function() {
  $(window).scroll(function () {
  });
});

//swiper初期化
$(function() {
  var mySwiper = new Swiper ('.swiper-container', {
	loop: true,
  slidesPerView: 2,
	spaceBetween: 10,
	centeredSlides : true,
	pagination: '.swiper-pagination',
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev'
  });
});

$(function() {
  var $allMsg = $('#title');
  var $wordList = $('#title').html().split("");
  $('#title').html("");
  $.each($wordList, function(idx, elem) {
    var newEL = $("<span/>").text(elem).css({ opacity: 0 });
    newEL.appendTo($allMsg);
    newEL.delay(idx * 70);
    newEL.animate({ opacity: 1 }, 1100);
  });
});
