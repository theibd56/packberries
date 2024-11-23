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
    pagination: {
        el: '.promo__pagination',
        type: 'bullets',
        clickable: true,
    }
});

//----------------- слайдер для блока с брендами -----------------//
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
    breakpoints: {
        320: {
            slidesPerView: 1.5,
            spaceBetween: 10,
        },
        576: {
            slidesPerView: 2.2,
        },
        768: {
            slidesPerView: 3.3,
            spaceBetween: 20,
        },
        992: {
            slidesPerView: 4,
        }
    }
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
        breakpoints: {
            320: {
                slidesPerView: 2.2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            },
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
    spaceBetween: 40,
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
//----------------- function -----------------//
function createdMore (eachedElem, indexNum, trigger) {
    eachedElem.forEach((item, index) => {
        if(index > indexNum) {
            item.classList.toggle('hidden')
        }
    })
    trigger.querySelector('svg').classList.toggle('show')

    trigger.querySelector('span').innerText === 'Показать все' ?
        trigger.querySelector('span').innerText = 'Скрыть' :
        trigger.querySelector('span').innerText = 'Показать все';
}
//----------------- function end -----------------//


// //----------------- расчет скидки в % в карточке товара -----------------//
// (function () {
//     document.querySelectorAll('.card').forEach((item, index) => {
//         //смена цвета прайса
//         const cardPriceNew = item.querySelector('.card__price_new');
//         const cardPriceOld = item.querySelector('.card__price_old');
//         const cardSale = item.querySelector('.card__top_heading-sale');
//
//         if (cardPriceOld) {
//             //смена новой цены на красный цвет
//             cardPriceNew.style.color = '#f0371e'
//
//             //расчет скидки в %
//             const saleProcent = Math.round( 100 -
//                 (cardPriceNew.innerText.replace(/[\s.,₽]/g, '') /
//                     cardPriceOld.innerText.replace(/[\s.,₽]/g, '') * 100)
//             )
//             cardSale.classList.add('show');
//             cardSale.innerText = saleProcent + '%'
//         } else {
//             //смена новой цены на дефолтный цвет
//             cardPriceNew.style.color = '#290718'
//         }
//     })
// }());
// //----------------- расчет скидки в % на странице товара -----------------//
// (function () {
//     document.querySelectorAll('.card').forEach((item, index) => {
//         //смена цвета прайса
//         const productPriceNew = document.querySelector('.product__info_price-new');
//         const productPriceOld = document.querySelector('.product__info_price-old');
//         const productSale = document.querySelector('.product__info_left-sale');
//
//         if (productPriceOld) {
//             //расчет скидки в %
//             const saleProcent = Math.round( 100 -
//                 (productPriceNew.innerText.replace(/[\s.,₽]/g, '') /
//                     productPriceOld.innerText.replace(/[\s.,₽]/g, '') * 100)
//             )
//             productSale.innerText = saleProcent + '%'
//         }
//     })
// }());
//----------------- триггер на кнопку -----------------//
(function () {
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
}());
//----------------- триггер на кнопку like-----------------//
(function () {
    document.querySelectorAll('.like-trigger').forEach((item, index) => {
        const likeSvg = item.querySelector('svg');

        if(likeSvg.parentNode) {
            likeSvg.parentNode.addEventListener('click', () => {
                likeSvg.parentNode.classList.toggle('like')
            })
        }
    })
}());
//----------------- скрипт для сорта -----------------//
(function () {
    const sortRow = document.querySelector('.sort-view-row');
    const sortGrid = document.querySelector('.sort-view-grid');
    const catalogCards = document.querySelector('.catalog-content__cards')
    if (catalogCards) {
        const cards = catalogCards.querySelectorAll('.card')

        if (sortRow) {
            sortRow.addEventListener('click', function() {
                if(sortGrid.classList.contains('sort-view-item-active')) {
                    sortGrid.classList.remove('sort-view-item-active')
                    sortRow.classList.add('sort-view-item-active')

                    catalogCards.classList.add('catalog-content__cards-row')

                    cards.forEach(item => {
                        item.classList.add('card-row')
                    })
                }
            })
        }

        if (sortGrid) {
            sortGrid.addEventListener('click', function() {
                if (sortRow.classList.contains('sort-view-item-active')) {
                    sortRow.classList.remove('sort-view-item-active')
                    sortGrid.classList.add('sort-view-item-active')

                    catalogCards.classList.remove('catalog-content__cards-row')

                    cards.forEach(item => {
                        item.classList.remove('card-row')
                    })
                }
            })
        }
    }
}());
//----------------- установка заполнения прогресс бара в коутере отзывов -----------------//
(function () {
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
}());
//----------------- установка инициалов в качестве иконки пользователя -----------------//
(function () {
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
}());
//----------------- тогл класса активности у кнопок сорта на странице продукта -----------------//
(function ()    {
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
}());
//----------------- вывод определенного кол-ва изображений в отзывах -----------------//
(function () {
    const productReviewImages = document.querySelector('.product__review_images');
    if (productReviewImages) {
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
    }
}());
//----------------- inc / dec в input при добавление товара в корзину -----------------//
(function () {
    const productCounterToCart = document.querySelectorAll('.product__info_counter-cart')
    if (productCounterToCart) {

        productCounterToCart.forEach(counter => {
            const productCounterInput = counter.querySelector('input')
            const productCounterDec = counter.querySelector('.js-product-cart-dec')
            const productCounterInc = counter.querySelector('.js-product-cart-inc')

            function decrementCart() {
                productCounterInput.value <= 1 ? // ограничение в 1 ед. товара
                    productCounterInput.value = productCounterInput.value :
                    productCounterInput.value = --productCounterInput.value
            }

            function incrementCart() {
                productCounterInput.value >= 999 ? // ограничение в 999 ед. товара
                    productCounterInput.value = productCounterInput.value :
                    productCounterInput.value = ++productCounterInput.value
            }

            productCounterDec.addEventListener('click', decrementCart);
            productCounterInc.addEventListener('click', incrementCart);
        })
    }
}());
//----------------- кнопка показать еще в характеристиках -----------------//
(function() {
    const characteristicWrapper = document.querySelector('.product__info_characteristic-wrapper')
    if (characteristicWrapper) {
        const characteristicItem = characteristicWrapper.querySelectorAll('.product__info_characteristic-item')
        const characteristicMore = characteristicWrapper.querySelector('.product__info_characteristic-more')
        const characteristicMoreSpan = characteristicMore.querySelector('span')

        if (characteristicItem.length > 5) {
            characteristicItem.forEach((item, index) => {
                if(index > 4) {
                    item.classList.add('hidden')
                }
            })

            characteristicMore.classList.remove('hidden')
        }

        characteristicMore.addEventListener('click', () => {
            createdMore(characteristicItem, 4, characteristicMore)
            characteristicWrapper.classList.toggle('characteristic-active')
        })
    }
}());
//----------------- custom select -----------------//
(function () {
    // Variables
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        const input = dropdown.querySelector('input');
        const listOfOptions = dropdown.querySelectorAll('.option');
        const body = document.body;

        if(input.value === '') {
            input.value = listOfOptions[0].textContent;
        }

// Functions
        const toggleDropdown = (event) => {
            event.stopPropagation();
            dropdown.classList.toggle('opened');
        };

        const selectOption = (event) => {
            input.value = event.currentTarget.textContent;
        };

        const closeDropdownFromOutside = () => {
            if (dropdown.classList.contains('opened')) {
                dropdown.classList.remove('opened');
            }
        };
// Event Listeners

        body.addEventListener('click', closeDropdownFromOutside);

        listOfOptions.forEach((option) => {
            option.addEventListener('click', selectOption);
        });

        dropdown.addEventListener('click', toggleDropdown);
    }
}());
//----------------- catalog dropdown trigger -----------------//
(function() {
    const catalogTrigger = document.querySelector('.header__catalog');
    const catalogDropdown = document.querySelector('.header-catalog');

    catalogTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        catalogDropdown.classList.toggle('active')
        catalogTrigger.classList.toggle('active')
    })
}());
//----------------- catalog dropdown -----------------//
(function() {
    const catalogTab = document.querySelectorAll('.header-catalog__tabs_item');
    const catalogContent = document.querySelectorAll('.header-catalog__menu');

    for (let i = 0; i < catalogTab.length; i++) {
        catalogTab[i].addEventListener("click", function(e){
            e.preventDefault();
            const activeTabAttr = e.target.getAttribute("data-tab");

            for (let j = 0; j < catalogTab.length; j++) {
                let contentAttr = catalogContent[j].getAttribute("data-tab-content");

                if (activeTabAttr === contentAttr) {
                    catalogTab[j].classList.add("active");
                    catalogContent[j].classList.add("active");
                } else {
                    catalogTab[j].classList.remove("active");
                    catalogContent[j].classList.remove("active");
                }
            }
        })
    }
}());
//----------------- catalog dropdown more -----------------//
(function() {
    const catalogMenu = document.querySelectorAll('.header-catalog__menu_item')

    catalogMenu.forEach(item => {
        const catalogMenuItems = item.querySelectorAll('.header-catalog__menu_wrapper li');
        const catalogMoreTrigger = item.querySelector('.header-catalog__menu_more');

        if (catalogMenuItems.length > 5) {
            catalogMenuItems.forEach((item, index) => {
                if(index > 4) {
                    item.classList.add('hidden')
                }
            })

            catalogMoreTrigger.classList.add('active')
        }

        catalogMoreTrigger.addEventListener('click', () =>
            createdMore(catalogMenuItems, 4, catalogMoreTrigger))
    })
}());
//----------------- product review more -----------------//
(function() {
    const reviewWrapper = document.querySelector('.product__review_wrapper');

    if(reviewWrapper) {
        const reviewItems = reviewWrapper.querySelectorAll('.product__review_item');
        const reviewMoreTrigger = reviewWrapper.querySelector('.product__review_more');
        const reviewLessTrigger = reviewWrapper.querySelector('.product__review_less');

        if (reviewItems.length > 4) {
            reviewItems.forEach((item, index) => {
                if(index > 3) {
                    item.classList.add('hidden')
                }
            })
            reviewMoreTrigger.classList.add('active')
        }

        let showsItem = 0;
        reviewMoreTrigger.addEventListener("click", function() {
            showsItem += 10
            reviewItems.forEach((item, index) => {
                if(index <= showsItem) {
                    item.classList.remove('hidden')
                }

                if(showsItem >= reviewItems.length - 1) {
                    reviewLessTrigger.classList.add('active')
                    reviewMoreTrigger.classList.remove('active')
                }
            })
        })

        reviewLessTrigger.addEventListener("click", function() {
            showsItem = 0

            if (reviewItems.length > 4) {
                reviewItems.forEach((item, index) => {
                    if(index > 3) {
                        item.classList.add('hidden')
                    }
                })
            }

            reviewLessTrigger.classList.remove('active')
            reviewMoreTrigger.classList.add('active')
        })
    }
}());
//----------------- маска ввода для номера телефона -----------------//
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const phoneInput = document.querySelector('#phone');

        if (phoneInput) {
            phoneInput.onkeydown = function(e) {
                inputphone(e, phoneInput);
            };
        }

        function inputphone(e, phone) {
            function stop(evt) {
                evt.preventDefault();
            }

            let key = e.key;
            let v = phone.value;
            let not = key.replace(/([0-9])/, 1);

            if (not == 1 || 'Backspace' === not) {
                if ('Backspace' != not) {
                    if (v.length < 4 || v === '') {phone.value = '+7 ('}
                    if (v.length === 7) {phone.value = v + ') '}
                    if (v.length === 11) {phone.value = v + '-'}
                    if (v.length === 14) {phone.value = v + '-'}
                }
            } else {stop(e)}
        }
    });
}());
//----------------- кнопка показать еще в описании продукта -----------------//
(function() {
    const productDescr = document.querySelector('.product__info_description-text') //элемент
    if (productDescr) {
        const productDescrTrigger = document.querySelector('.product__info_description-more') //триггер
        const productDescrHTML = productDescr.innerHTML //html элемента (чтобы возвращать изначальный вид)
        const productDescrText = productDescr.textContent //текст элемента
        const maxChar = 850;  //максимум символов

        //разбиваем текст на символы и добавляем ... в конце + убираем все br теги
        function splitText() {
            let itemRest = productDescrText.slice(0, maxChar);
            let itemArr = itemRest.split('');
            itemArr.splice(itemArr.length-1,1);
            productDescr.innerText = (itemArr.join('')+'...')

            productDescr.querySelectorAll('br').forEach(item => {
                item.remove()
            })
        }

        if(productDescrText.split('').length > maxChar) {
            productDescrTrigger.classList.add('active')
            splitText()
        }

        productDescrTrigger.addEventListener('click', function() {
            const span = this.querySelector('span')
            if (span.innerText === 'Показать все') {
                productDescr.innerHTML = productDescrHTML
                this.querySelector('svg').classList.toggle('show')
                this.querySelector('span').innerText = 'Скрыть'
            } else {
                this.querySelector('svg').classList.toggle('show')
                this.querySelector('span').innerText = 'Показать все'
                splitText()
            }
        })
    }
}());
//----------------- скрипт для оценки товара в модалке отзыва -----------------//
(function () {
    document.addEventListener('DOMContentLoaded', function() {
        const reviewStars = document.querySelectorAll('.review-modal__stars_label');
        const reviewStarCount = document.getElementById('js-star-count');

        reviewStars.forEach(function(star) {
            star.addEventListener('click', function() {
                // Убираем класс checked у всех звезд
                reviewStars.forEach(function(s) {
                    s.classList.remove('checked');
                });

                // Добавляем класс checked к текущей звезде
                star.classList.add('checked');

                // Получаем input внутри текущей звезды
                const reviewStarInput = star.querySelector('input');
                if (reviewStarInput) {
                    const reviewStarValue = reviewStarInput.value;
                    reviewStarCount.value = reviewStarValue;
                    console.log('Поставленных звезд - ' + reviewStarValue);
                }
            });
        });
    });
}());

//----------------- скрипт для мульти загрузки в модалке отзыва -----------------//
(function () {
    document.addEventListener('DOMContentLoaded', function(event) {
        const fileMulti = document.getElementById('fileMulti');
        if (fileMulti) {
            const maxFiles = 10; // максимальное количество загружаемых файлов
            const maxFileSize = 60 * 1024 * 1024; // максимальный размер файла (60 МБ)
            let totalFilesCount = 0;

            fileMulti.addEventListener('change', function(event) {
                const files = event.target.files;
                const outputElement = document.getElementById('outputMulti');
                const outputLabel = document.querySelector('.review-modal__images_download');

                if (totalFilesCount + files.length > maxFiles) {
                    alert(`Вы можете загрузить не более ${maxFiles} файлов.`);
                    fileMulti.value = '';
                    return;
                }

                if (outputElement) {
                    const spans = outputElement.getElementsByTagName('span');
                    Array.from(spans).forEach(span => {
                        span.remove();
                    });
                }

                for (let i = 0, f; f = files[i]; i++) {
                    // проверка типа файла
                    if (!f.type.match('image.*') && !f.type.match('video.*')) {
                        alert("Только изображения и видео");
                        continue; // пропуск итерации
                    }

                    // проверка размера файла
                    if (f.size > maxFileSize) {
                        alert(`Размер файла "${f.name}" превышает максимальный размер в 60 МБ.`);
                        continue; // пропуск итерации
                    }

                    const reader = new FileReader();

                    reader.onload = (function(theFile) {
                        return function(e) {
                            // рендер thumbnail
                            const thumb = document.createElement('div');

                            if (f.type.match('image.*')) {
                                thumb.innerHTML = ['<img class="review-modal__file_thumb" src="', e.target.result,
                                    '" title="', encodeURIComponent(theFile.name), '"/>'].join('');

                                outputElement.insertBefore(thumb, outputLabel);
                            } else if (f.type.match('video.*')) {
                                thumb.classList.add('thumb-video');
                                // Убираем controls
                                thumb.innerHTML = ['<video class="review-modal__file_thumb" style="cursor: pointer;">',
                                    '<source src="', e.target.result, '" type="', f.type, '">',
                                    'Ваш браузер не поддерживает видео.',
                                    '</video>'].join('');
                                outputElement.insertBefore(thumb, outputLabel);
                            }
                            totalFilesCount++;

                            Fancybox.bind('[data-fancybox="reviewThumb"]', {});
                        };
                    })(f);

                    reader.readAsDataURL(f);
                }
            }, false);
        }
    });
}());

//добваление отсупа снизу для мобилки на странице корзины
(function () {
    document.addEventListener('DOMContentLoaded', function() {
        // Функция для обновления отступа
        function updateCartOffset() {
            // Получаем элементы
            const mobileMenu = document.querySelector('.mobile-menu');
            const cartContentRight = document.querySelector('.cart__content_right');

            if (mobileMenu && cartContentRight) {
                const mobileMenuHeight = mobileMenu.offsetHeight;

                cartContentRight.style.bottom = `${mobileMenuHeight - 5}px`;
            }
        }

        updateCartOffset();

        window.addEventListener('resize', updateCartOffset);
    });
}())