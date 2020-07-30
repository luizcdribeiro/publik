import SlideNav from './vendor/slide.js'

const slide = new SlideNav('.slide', '.wrapper-slide')
slide.init()
slide.addArrow('.prev', '.next')

slide.addControl('.custom-controls') 


$(document).ready(function(){
  $('.depoimento-slide-container').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.clientes-container').slick({
    infinite: true,
    slidesToScroll: 3,
    slidesToShow: 3
  })
});