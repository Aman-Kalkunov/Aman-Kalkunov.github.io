$(document).ready(function() {

    /* Сворачивание меню */

    let menu = $('.header__nav');

    $('body').on('click', '.burger', function(event) {
        menu.addClass('header__nav_open');
    });

    $(document).mouseup(function(e) {
        menu.removeClass('header__nav_open');
    });

    /* Скролл по ссылкам */

    $('.nav__link').click((e) => {
        e.preventDefault();
        let href = $(e.currentTarget).attr('href');
        let top = $(href).offset().top;

        $('body,html').animate({
            scrollTop: top,
        }, 900);
    });

    /* Swiper */

    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 1,
        breakpoints: {
            577: {
                slidesPerView: 2,
                spaceBetween: 40
            },

            1025: {
                slidesPerView: 3,
                spaceBetween: 30
            },

        },
        navigation: {
            nextEl: '.swiper-next',
            prevEl: '.swiper-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
    })

    /* Летающие элементы */

    new WOW().init();

    /* Работа с popup  */

    let popup = $('.popup-container'),
        callback = $('.callback'),
        mainInfo = $('.main-info__popup'),
        skills = $('.skills__popup');


    function disableScroll() {
        $('html , body').css('overflow', 'hidden');
    }

    function enableScroll() {
        $('html , body').css('overflow', 'visible');
    }

    $('body').on('click', '.popup__close', function(event) {
        event.preventDefault();
        popup.fadeOut(enableScroll)
    });

    $('body').on('click', '.phone__button_js', function() {

        callback.fadeIn(disableScroll)
        callback.css('display', 'flex')
    });

    $('body').on('click', '.main-info__button', function() {

        mainInfo.fadeIn(disableScroll)
        mainInfo.css('display', 'flex')
    });

    $('body').on('click', '.skills__button', function() {

        skills.fadeIn(disableScroll)
        skills.css('display', 'flex')
    });

    $(popup).click(function(event) {
        if (event.target == this) {
            $(this).fadeOut(enableScroll);
        }
    });

    /* маска телефона */

    $('#phone').inputmask({ "mask": "+7(999) 999-9999" });

    $('form').each(function() {
        $(this).validate({
            errorPlacement(error, element) {
                return true;
            },
            focusInvalid: false,
            rules: {
                name: {
                    required: true,
                    minlength: 2,
                    maxlength: 30,
                },
                phone: {
                    required: true,
                },
                email: {
                    required: true,
                    email: true,
                },
                message: {
                    required: true,
                    minlength: 20,
                    maxlength: 500,
                }
            },
            submitHandler(form) {
                let th = $(form);

                $.ajax({
                    type: 'POST',
                    url: 'mail.php',
                    data: th.serialize(),
                }).done(() => {
                    $('.send').css('display', 'flex'),
                        th.trigger('reset');
                });

                return false;
            },

        });
    });

});