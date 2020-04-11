$(document).ready(function(){

   $('.flying-symbol').removeClass('flying-symbol_anim promo__flying-symbol_anim');

   //Mobile menu
   $(function() {
      var $menu_popup = $('.header-left__menu-nav_mobile');
      $(".header-left__menu-btn, .header-left__menu-close, .menu-item__link_mobile").click(function(){
         $menu_popup.slideToggle(300, function(){
            if ($menu_popup.is(':hidden')) {
               $('body').removeClass('body_pointer');
            } else {
               $('body').addClass('body_pointer');
            }
         });
         return false;
      });
      $(document).on('click', function(e){
         if (!$(e.target).closest('.menu').length){
            $('body').removeClass('body_pointer');
            $menu_popup.slideUp(300);
         }
      });
   });

   //Modal Window
   /* зaсунем срaзу все элементы в переменные, чтoбы скрипту не прихoдилoсь их кaждый рaз искaть при кликaх */
   var overlay = $('.overlay'); // пoдлoжкa, дoлжнa быть oднa нa стрaнице
   var open_modal = $('.open-modal'); // все ссылки, кoтoрые будут oткрывaть oкнa
   var close = $('.modal_close, .overlay'); // все, чтo зaкрывaет мoдaльнoе oкнo, т.е. крестик и oверлэй-пoдлoжкa
   var modal = $('.modal-div'); // все скрытые мoдaльные окна

   open_modal.click( function(event){ // лoвим клик пo ссылке с клaссoм open_modal
      event.preventDefault(); // вырубaем стaндaртнoе пoведение
      var div = $(this).attr('data-href'); // вoзьмем стрoку с селектoрoм у кликнутoй ссылки
      overlay.fadeIn(400, //пoкaзывaем oверлэй
          function(){ // пoсле oкoнчaния пoкaзывaния oверлэя
         $(div) // берем стрoку с селектoрoм и делaем из нее jquery oбъект
             .css('display', 'block')
             .animate({opacity: 1, top: '50%'}, 200); // плaвнo пoкaзывaем
      });
   });

   close.click( function(){ // лoвим клик пo крестику или oверлэю
      modal // все мoдaльные oкнa
         .animate({opacity: 0, top: '45%'}, 200, // плaвнo прячем
              function(){ // пoсле этoгo
             $(this).css('display', 'none');
             overlay.fadeOut(400); // прячем пoдлoжку
         }
         );
   });

   // Swiper
   var mySwiper = new Swiper ('.swiper-container', {
      direction: 'horizontal',
      loop: true,

      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
      pagination: {
         el: '.swiper-pagination',
         type: 'bullets',
      },
      slidesPerView: 3,
      breakpoints: {
         319: {
            slidesPerView: 1,
         },
         577: {
            slidesPerView: 2,
            spaceBetween: 35,
         },
         1271: {
            slidesPerView: 3,
            spaceBetween: 35,
         },
         1320: {
            slidesPerView: 3,
            spaceBetween: 35,
         },
      }
   });

   // Smooth section transition
   $('.section-transition').click((e) => {
      e.preventDefault();
      let href = $(e.currentTarget).attr('href');

      let top = $(href).offset().top;

      $('body,html').animate({
         scrollTop: top,
      }, 700);
   });

   //inputmask
   $('input[type="tel"]').inputmask({"mask": "+7 (999) 999-9999"});

   //Validate
   $('.form-callback').each(function () {
      $(this).validate({
         errorPlacement(error, element) {
            return true;
         },
         messages: {
            Телефон: {
               required: "Поле 'Телефон' обязательно к заполнению"
            },
            Имя: {
               required: "Поле 'Имя' обязательно к заполнению",
               maxlength: "Максимум 25 символов",
               minlength: "Введите минимум 2 символа"
            },
            Email: {
               required: "Поле 'Email' обязательно к заполнению",
               email: "Необходимо ввести корректный Email"
            }
         },
         focusInvalid: false,
         rules: {
            Телефон: {
               required: true,
            },
            Имя: {
               required: true,
               maxlength: 25,
               minlength: 2
            },
            Email: {
               required: true,
               email: true
            }
         },
         submitHandler(form) {
            let th = $(form);

            console.log(th);

            $.ajax({
               type: 'POST',
               url: './php/mail.php',
               data: th.serialize(),
            }).done(() => {
               alert('Отправлено, ожидайте звонка.');
               th.trigger('reset');
               $(modal).animate(
                   {opacity: 0, top: '45%'}, 200, function () {
                      $(this).css('display', 'none');
                      overlay.fadeOut(400);
                   });

               return false;
            });
         }
      });
   });
});