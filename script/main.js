const headerBig = document.querySelector('.header-big');
const headerSmall = document.querySelector('.header-small');

window.addEventListener('scroll', () => {
    if (window.scrollY > 24) { 
        headerSmall.classList.add('active'); 
    } else {
        headerSmall.classList.remove('active'); 
    }
});

// Таймеры
function initializeCountdown() {
    const now = new Date().getTime();
    const timerElements = document.querySelectorAll('.section-cta-left-time-box');

    timerElements.forEach(timer => {
        let endTime = localStorage.getItem('endTime');

        if (!endTime || new Date().getTime() >= new Date(endTime).getTime()) {
            // Устанавливаем новое время окончания на 6 дней вперед
            endTime = new Date(now + 6 * 24 * 60 * 60 * 1000).toISOString();
            localStorage.setItem('endTime', endTime);
        }

        timer.setAttribute('data-end-time', endTime);
    });
}

function updateCountdowns() {
    const now = new Date().getTime();
    document.querySelectorAll('.section-cta-left-time-box').forEach(timer => {
        const endTime = new Date(timer.getAttribute('data-end-time')).getTime();
        const timeLeft = endTime - now;

        if (timeLeft < 0) {
            // Устанавливаем новое время окончания на 6 дней вперед, если таймер истек
            const newEndTime = new Date(now + 6 * 24 * 60 * 60 * 1000).toISOString();
            localStorage.setItem('endTime', newEndTime);
            timer.setAttribute('data-end-time', newEndTime);
            return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        timer.querySelector(".days").textContent = days < 10 ? '0' + days : days;
        timer.querySelector(".hours").textContent = hours < 10 ? '0' + hours : hours;
        timer.querySelector(".minutes").textContent = minutes < 10 ? '0' + minutes : minutes;
        timer.querySelector(".seconds").textContent = seconds < 10 ? '0' + seconds : seconds;
    });
}

// Инициализируем таймер при загрузке страницы
initializeCountdown();

// Обновляем таймер каждую секунду
setInterval(updateCountdowns, 1000);


// Фенсибокс
$(document).ready(function() {
    $('[data-fancybox]').fancybox({
        youtube : {
            controls : 1,
            showinfo : 0
        },
        vimeo : {
            color : 'f00'
        }
    });
    $('.play-btn').on('click', function(event) {
        console.log("Fancybox should open now for video: " + $(this).attr('href'));
    });
});

$(document).ready(function() {
    $("[data-fancybox]").fancybox({
        clickOutside: "close"
    });
});

// Показать карточки на мобилке
function toggleCards() {
    const cards = document.querySelectorAll('.section-program-card');
    const showMoreButton = document.querySelector('.show-more');
    let isCardsExpanded = false; // Флаг для отслеживания состояния

    if (!cards.length || !showMoreButton) {
        return;
    }

    function setInitialCardVisibility() {
        if (window.matchMedia("(min-width: 1280px)").matches) {
            // На больших экранах показываем все карточки
            cards.forEach(card => card.style.display = 'flex');
            showMoreButton.style.display = 'none';
        } else {
            // На мобильных проверяем, раскрыты ли карточки
            if (isCardsExpanded) {
                cards.forEach(card => card.style.display = 'flex');
                showMoreButton.textContent = 'Скрыть';
            } else {
                cards.forEach((card, index) => {
                    card.style.display = index < 2 ? 'flex' : 'none';
                });
                showMoreButton.textContent = 'Показать больше';
            }
            showMoreButton.style.display = 'flex';
        }
    }

    // Обработчик клика по кнопке "Показать больше / Скрыть"
    showMoreButton.addEventListener('click', function() {
        if (isCardsExpanded) {
            // Скрываем все карточки, кроме первых двух
            cards.forEach((card, index) => {
                card.style.display = index < 2 ? 'flex' : 'none';
            });
            showMoreButton.textContent = 'Показать больше';
        } else {
            // Показываем все карточки
            cards.forEach(card => card.style.display = 'flex');
            showMoreButton.textContent = 'Скрыть';
        }
        isCardsExpanded = !isCardsExpanded; // Переключаем флаг
    });

    // Инициализируем видимость карточек
    setInitialCardVisibility();

    // Обновляем видимость карточек только при изменении ширины окна
    window.addEventListener('resize', setInitialCardVisibility);
}

toggleCards();

// Слайдер отзывы
document.addEventListener("DOMContentLoaded", function() {
    var sliderElement = document.querySelector(".section-reviews-slider");

    // Проверяем, существует ли элемент слайдера
    if (sliderElement) {
        var swiper1 = new Swiper(".section-reviews-slider", {
            loop: true,
            slidesPerView: "auto",
            spaceBetween: 16,
            pagination: {
                el: ".section-reviews-pagination",
                dynamicBullets: true,
                clickable: true, // Включает возможность клика по пагинации
            },
            speed: 500,
            effect: 'slide',
        });

        // Добавляем обработчики событий только если слайдер существует
        sliderElement.addEventListener('mouseenter', () => {
            swiper1.autoplay.stop();
        });

        sliderElement.addEventListener('mouseleave', () => {
            swiper1.autoplay.start();
        });
    }
});


// Попап форма
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById('main-popup');
    
    const openPopupButtons = document.querySelectorAll('.open-popup-btn');
    openPopupButtons.forEach(button => {
        button.addEventListener('click', function() {
            popup.style.display = 'flex';
            document.body.classList.add('popup-open'); 
        });
    });

    const closeButton = popup.querySelector('.close-btn');
    closeButton.addEventListener('click', function() {
        popup.style.display = 'none';
        document.body.classList.remove('popup-open'); 
    });

    popup.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
            document.body.classList.remove('popup-open'); 
        }
    });
});

// Якорь
$(document).ready(function() {
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        
        var target = $(this.getAttribute('href'));

        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000); 
        }
    });
});

// Фенсибокс ссылка
$(document).ready(function() {
    $('[data-fancybox="video"]').fancybox();

    $('.btn-play').on('click', function(event) {
        event.preventDefault(); 

        $(this).siblings('.fancybox-link').trigger('click');
    });
});

// Initialize Fancybox for the gallery
$(document).ready(function() {
    $('[data-fancybox="gallery"]').fancybox({
        buttons: ['close']
    });

    $('.section-reviews-opens2').on('click', function(event) {
        event.preventDefault();

        $(this).siblings('a[data-fancybox="gallery"]').trigger('click');
    });
});

// Отправка первой формы
jQuery(document).ready(function ($) {

    // $('input[type="tel"]').mask('+38(999) 999-99-99');

    // $('input[type="tel"]').on('focus', function() {
    //     const input = this;
    //     setTimeout(function() {
    //         if (input.value === "+38(___) ___-__-__") {
    //             input.setSelectionRange(4, 4);
    //         }
    //     }, 10);
    // });

    $("#ajax-contact-form").submit(function () {
        var str = $(this).serialize();
        console.log("submit")

        $.ajax({
            type: "POST",
            url: "contact.php",
            data: str,
            success: function (msg) {
                if (msg == 'OK') {
                    window.open('https://secure.wayforpay.com/button/bc399bfe888f8', '_self');
                    // window.location.href = "/thank-you.html";
                    console.log("OK")
                } else {
                    result = msg;
                    console.log("notOK")
                }
            }
        });
        return false;
    });
});

// Отправка второй формы
jQuery(document).ready(function ($) {

    $("#ajax-contact-form2").submit(function () {
        var str = $(this).serialize();
        console.log("submit")

        $.ajax({
            type: "POST",
            url: "contact.php",
            data: str,
            success: function (msg) {
                if (msg == 'OK') {
                    window.open('https://secure.wayforpay.com/button/bc399bfe888f8', '_self');
                    // window.location.href = "/thank-you.html";
                    console.log("OK")
                } else {
                    result = msg;
                    console.log("notOK")
                }
            }
        });
        return false;
    });
});

// Отправка в таблицу
function getUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const forms = document.querySelectorAll('.utm-form');

    forms.forEach(form => {
        form.querySelector('.utm_source').value = urlParams.get('utm_source') || '';
        form.querySelector('.utm_medium').value = urlParams.get('utm_medium') || '';
        form.querySelector('.utm_campaign').value = urlParams.get('utm_campaign') || '';
        form.querySelector('.utm_content').value = urlParams.get('utm_content') || '';
    });
}
window.onload = getUTMParameters;


jQuery(document).ready(function ($) {

    $("#ajax-contact-form3").submit(function () {
        var str = $(this).serialize();
        console.log("submit")

        $.ajax({
            type: "POST",
            url: "contact.php",
            data: str,
            success: function (msg) {
                if (msg == 'OK') {
                    window.open('https://secure.wayforpay.com/button/b561d2717f1ef', '_self');
                    // window.location.href = "/thank-you.html";
                    console.log("OK")
                } else {
                    result = msg;
                    console.log("notOK")
                }
            }
        });
        return false;
    });
});

// Отправка в таблицу
function getUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const forms = document.querySelectorAll('.utm-form');

    forms.forEach(form => {
        form.querySelector('.utm_source').value = urlParams.get('utm_source') || '';
        form.querySelector('.utm_medium').value = urlParams.get('utm_medium') || '';
        form.querySelector('.utm_campaign').value = urlParams.get('utm_campaign') || '';
        form.querySelector('.utm_content').value = urlParams.get('utm_content') || '';
    });
}
window.onload = getUTMParameters;

jQuery(document).ready(function ($) {

    $("#ajax-contact-form4").submit(function () {
        var str = $(this).serialize();
        console.log("submit")

        $.ajax({
            type: "POST",
            url: "contact.php",
            data: str,
            success: function (msg) {
                if (msg == 'OK') {
                    window.open('https://secure.wayforpay.com/button/b561d2717f1ef', '_self');
                    // window.location.href = "/thank-you.html";
                    console.log("OK")
                } else {
                    result = msg;
                    console.log("notOK")
                }
            }
        });
        return false;
    });
});

// Отправка в таблицу
function getUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const forms = document.querySelectorAll('.utm-form');

    forms.forEach(form => {
        form.querySelector('.utm_source').value = urlParams.get('utm_source') || '';
        form.querySelector('.utm_medium').value = urlParams.get('utm_medium') || '';
        form.querySelector('.utm_campaign').value = urlParams.get('utm_campaign') || '';
        form.querySelector('.utm_content').value = urlParams.get('utm_content') || '';
    });
}
window.onload = getUTMParameters;



