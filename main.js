$(document).ready(function() {

    /* Сворачивание меню */
    let menu = $('.header__nav');
    $('body').on('click', '.burger', function() {
        menu.addClass('header__nav_open');
        $('.burger').addClass('burger_activ');
    });
    $(document).mouseup(function() {
        menu.removeClass('header__nav_open');
        $('.burger').removeClass('burger_activ');
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

    //Скролл-бар
    $('.popup__text-box').mCustomScrollbar();

    /* Swiper */
    var swiper = new Swiper('.swiper-container', {
        loop: false,
        slidesPerView: 1,
        speed: 700,
        breakpoints: {
            769: {
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
    });

    /* Летающие элементы */
    new WOW().init();

    /* Работа с popup  */
    let popup = $('.popup-container'),
        callback = $('.callback'),
        mainInfo = $('.main-info__popup'),
        skills = $('.skills__popup'),
        popupPhoneButton = $('.phone__button_js'),
        popupMainInfoButton = $('.main-info__button'),
        popupSkillsButton = $('.skills__button');

    function disableScroll() {
        $('html , body').css('overflow', 'hidden');
    }

    function enableScroll() {
        $('html , body').css('overflow', 'visible');
    }

    $('body').on('click', '.popup__close', function(event) {
        event.preventDefault();
        popup.fadeOut(enableScroll);
    });

    $(popup).click(function(event) {
        if (event.target == this) {
            $(this).fadeOut(enableScroll);
        }
    });

    function popupButton(popupButton, popupWindow) {
        popupButton.on('click', function() {

            popupWindow.fadeIn(disableScroll);
            popupWindow.css('display', 'flex');
        });
    };
    popupButton(popupPhoneButton, callback);
    popupButton(popupMainInfoButton, mainInfo);
    popupButton(popupSkillsButton, skills);

    /* маска телефона */
    $('#phone').inputmask({ "mask": "+7(999) 999-9999" });

    //Работа с формой отправки
    $('form').each(function() {
        $(this).validate({
            errorPlacement() {
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
                },
            },
            submitHandler(form) {
                let th = $(form);
                $.ajax({
                    type: 'POST',
                    url: 'mail.php',
                    data: th.serialize(),
                }).done(() => {
                    th.trigger('reset'),
                        popup.css('display', 'none'),
                        $('.send').css('display', 'flex');

                });
                return false;
            },
        });
    });
});