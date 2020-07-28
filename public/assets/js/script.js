import SlideNav from './vendor/slide.js'

const slide = new SlideNav('.slide', '.wrapper-slide')
slide.init()
slide.addArrow('.prev', '.next')

slide.addControl('.custom-controls') 


$(document).ready(function(){
  $('.depoimento-slide-container').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });
});