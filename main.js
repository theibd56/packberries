import Swiper from 'swiper/bundle';
// import styles bundle
import 'swiper/css/bundle';

import './sass/style.scss';

//слайдер для промо блока
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

//слайдер для блока бренды
const brandSlider = new Swiper('.brand__slider', {
    slidesPerView: 4,
    spaceBetween: 20,
    speed: 800,
    loop: false,
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
});

//смена стилей если нет скидки
document.querySelectorAll('.card').forEach((item) => {
    //смена цвета прайса
    const cardPriceNew = item.querySelector('.card__price_new');
    const cardPriceOld = item.querySelector('.card__price_old');

    if (cardPriceOld) {
        cardPriceNew.style.color = '#f0371e'
    } else {
        cardPriceNew.style.color = '#290718'
    }


})