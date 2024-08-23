import Swiper from 'swiper/bundle';
import { Fancybox } from "@fancyapps/ui";
// import styles bundle

import 'swiper/css/bundle';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import './sass/style.scss';

//fancybox (может конфликтовать)
Fancybox.bind("[data-fancybox]", {
    // Your custom options
});

//----------------- SLIDERS -----------------//
//----------------- слайдер для промо блока -----------------//
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

//----------------- слайдер для блока с карточками товаров -----------------//
const cardSliders = document.querySelectorAll('.card__slider'),
    cardPrevArrow = document.querySelectorAll('.card__arrow_prev'),
    cardNextArrow = document.querySelectorAll('.card__arrow_next');

cardSliders.forEach((slider, index) => {
    let cardSlider = new Swiper(slider, {
        slidesPerView: 5,
        spaceBetween: 20,
        speed: 800,
        loop: false,
        navigation: {
            nextEl: cardNextArrow[index],
            prevEl: cardPrevArrow[index],
        },
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
    });
})

//----------------- слайдер для баннера в каталоге -----------------//
const bannerSlider = new Swiper('.catalog-banners-slider', {
    slidesPerView: 1,
    spaceBetween: 40,
    speed: 800,
    loop: false,
    navigation: {
        nextEl: '.catalog-banners-arrow__next',
        prevEl: '.catalog-banners-arrow__prev',
    },
    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
});

//----------------- слайдер для навигационного слайдера на странице продукта -----------------//
const productSliderNavigate = new Swiper('.product__slider_thumbs', {
    centeredSlidesBounds: true,
    slidesPerView: 7,
    spaceBetween: 10,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    direction: 'vertical',
    speed: 800,
});

//----------------- слайдер для главного слайдера на странице продукта -----------------//
const productSlider = new Swiper('.product__slider_main', {
    speed: 800,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    preventInteractionOnTransition: true,
    thumbs: {
        swiper: productSliderNavigate,
    },
    navigation: {
        nextEl: '.product__slider_navigate-next',
        prevEl: '.product__slider_navigate-prev',
    },
});

productSlider.on('slideChangeTransitionStart', function() {
    productSliderNavigate.slideTo(productSlider.activeIndex);
});

productSliderNavigate.on('transitionStart', function(){
    productSlider.slideTo(productSliderNavigate.activeIndex);
});

//----------------- OTHER SCRIPTS -----------------//
//----------------- смена стилей если нет скидки -----------------//
document.querySelectorAll('.card').forEach((item, index) => {
    //смена цвета прайса
    const cardPriceNew = item.querySelector('.card__price_new');
    const cardPriceOld = item.querySelector('.card__price_old');
    const cardSale = item.querySelector('.card__top_heading-sale');

    if (cardPriceOld) {
        //смена новой цены на красный цвет
        cardPriceNew.style.color = '#f0371e'

        //расчет скидки в %
        const saleProcent = Math.round(
            (cardPriceNew.innerText.replace(/[\s.,₽]/g, '') /
                cardPriceOld.innerText.replace(/[\s.,₽]/g, '') * 100)
        )
        cardSale.innerText = saleProcent + '%'
    } else {
        //смена новой цены на дефолтный цвет
        cardPriceNew.style.color = '#290718'
    }
})

//----------------- триггер на кнопку -----------------//
document.querySelectorAll('.card').forEach((item, index) => {
    const cardButton = item.querySelector('.card__button');

    if(cardButton) {
        cardButton.addEventListener('click', function() {
            cardButton.classList.toggle('card__button-cart');

            cardButton.innerHTML == 'Добавить в корзину' ?
                cardButton.innerHTML = 'В корзине' :
                cardButton.innerHTML = 'Добавить в корзину';

        })
    }
})

//----------------- триггер на кнопку like-----------------//
document.querySelectorAll('.like-trigger').forEach((item, index) => {
    const likeSvg = item.querySelector('svg');

    if(likeSvg.parentNode) {
        likeSvg.parentNode.addEventListener('click', () => {
            likeSvg.parentNode.classList.toggle('like')
        })
    }
})

//----------------- скрипт для сорта -----------------//
const sortRow = document.querySelector('.sort-view-row');
const sortGrid = document.querySelector('.sort-view-grid');
const catalogCards = document.querySelector('.catalog-content__cards')

if (sortRow) {
    sortRow.addEventListener('click', function() {
        if(sortGrid.classList.contains('sort-view-item-active')) {
            sortGrid.classList.remove('sort-view-item-active')
            sortRow.classList.add('sort-view-item-active')

            catalogCards.classList.add('catalog-content__cards-row')
        }
    })
}

if (sortGrid) {
    sortGrid.addEventListener('click', function() {
        if (sortRow.classList.contains('sort-view-item-active')) {
            sortRow.classList.remove('sort-view-item-active')
            sortGrid.classList.add('sort-view-item-active')

            catalogCards.classList.remove('catalog-content__cards-row')
        }
    })
}

//----------------- установка заполнения прогресс бара в коутере отзывов -----------------//
let totalRating = 0
const reviewCounterItem = document.querySelectorAll('.product__review_counter-item')
const reviewCounterAmount = document.querySelectorAll('.product__review_counter-item__amount')

//считаем общую сумму все отзывов
reviewCounterAmount.forEach(amount => {
    totalRating += +amount.textContent
})
reviewCounterItem.forEach(item => {
    //получаем значение из селектора в числовом типе
    const reviewAmount = +item.querySelector('.product__review_counter-item__amount').textContent
    const reviewProgressActive = item.querySelector('.product__review_counter-item__progress-active')

    //задаем ширину ширину активному прогрес бару
    reviewProgressActive.style.width = (reviewAmount / totalRating) * 100 + '%'
})

//----------------- установка инициалов в качестве иконки пользователя -----------------//
const productReview = document.querySelectorAll('.product__review_item')
productReview.forEach(item => {
    const productReviewerName = item.querySelector('.product__review_item-name')
    const productReviewerIco = item.querySelector('.product__review_item-ico')

    let initialName = ''

    productReviewerName.textContent.split(' ').forEach(part => {
        initialName += part.charAt(0).toUpperCase();
    })

    if(initialName.length <= 3) {
        productReviewerIco.textContent = initialName
    } else {
        productReviewerIco.textContent = initialName.substring(0, 3)
    }
})

//----------------- тогл класса активности у кнопок сорта на странице продукта -----------------//
const reviewSortItem = document.getElementsByClassName("product__review_sort-item");
const reviewSortItemActive = document.getElementsByClassName('active');
for (let i = 0; reviewSortItem.length > i; i++) {
    reviewSortItem[i].onclick = function() {
        let currentActive = reviewSortItemActive[0];
        if (currentActive)
            currentActive.classList.remove("active");

        if (currentActive !== this)
            this.classList.add("active");
    };
}

//----------------- вывод определенного кол-ва изображений в отзывах -----------------//
const productReviewImages = document.querySelector('.product__review_images');
const productReviewImagesItem = productReviewImages.querySelectorAll('.product__review_images-item')
let maxViewImages = 10
let productReviewImagesDifference = productReviewImagesItem.length - maxViewImages

productReviewImagesItem.forEach((item, index) => {
    //получаем img
    const productReviewImg = item.querySelector('img')

    //создаем span
    const span = document.createElement("span");

    span.innerText = productReviewImagesDifference > 10 ?
                        //в innerText попадает число округленное до меньшего десятка с добавлением плюса
                        Math.floor(productReviewImagesDifference/10)*10 + '+' :
                        productReviewImagesDifference
    span.classList.add()

    //если индекс item'а больше или равен максимальному числу - то он убирается
    if (index >= maxViewImages) {
        item.style.display = 'none'
    }

    //если индекс item'а равен 9, то задаем фото блюр и добавляем ранее созданный span
    if (index === 9) {
        productReviewImg.style.filter = "blur(2px)";
        item.append(span)
    }
})

//----------------- inc / dec в input при добавление товара в корзину -----------------//
const productCounterToCart = document.querySelector('.product__info_counter-cart')
const productCounterInput = productCounterToCart.querySelector('input')
const productCounterDec = productCounterToCart.querySelector('#product__cart_dec')
const productCounterInc = productCounterToCart.querySelector('#product__cart_inc')

function decrementCart() {
    productCounterInput.value <= 1 ? // ограничение в 1 ед. товара
        productCounterInput.value = productCounterInput.value :
        productCounterInput.value = --productCounterInput.value
}
productCounterDec.addEventListener('click', decrementCart)
function incrementCart() {
    productCounterInput.value >= 999 ? // ограничение в 999 ед. товара
        productCounterInput.value = productCounterInput.value :
        productCounterInput.value = ++productCounterInput.value
}
productCounterInc.addEventListener('click', incrementCart)

