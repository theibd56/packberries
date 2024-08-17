import Swiper from 'swiper/bundle';
// import styles bundle
import 'swiper/css/bundle';

import './sass/style.scss';

const promoSlider = new Swiper('.promo__slider', {
    slidesPerView: 1,
    spaceBetween: 40,
    speed: 800,
    loop: false,
    navigation: {
        nextEl: '.promo__arrow_next',
        prevEl: '.promo__arrow_prev',
    },
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
});