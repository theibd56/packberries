import Swiper from 'swiper/bundle';

const catalogBannerSlider = new Swiper('.catalogView-banners-slider', {
    slidesPerView: 1,
    spaceBetween: 40,
    speed: 800,
    loop: false,

    navigation: {
        nextEl: '.catalogView-banners-arrow__next',
        prevEl: '.catalogView-banners-arrow__prev',
    },

    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
});