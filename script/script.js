document.addEventListener('DOMContentLoaded', function() {

  var track = document.getElementById('screen3Track');
  if (track) {
    var slides = track.querySelectorAll('.destinations-slide');
    var current = 0;

    var isDragging = false;
    var startPos = 0;
    var currentTranslate = 0;
    var initialOffset = 0;

    function updateSlider() {
      var view = document.getElementById('destinationsView');
      if (!view) return;
      
      var viewWidth = view.offsetWidth || window.innerWidth;
      var slideWidth = (slides.length > 0 ? slides[0].offsetWidth : 320) || 320;
      var gap = 24;
      var offset = (viewWidth / 2) - (slideWidth / 2) - current * (slideWidth + gap);

      track.style.transform = 'translateX(' + offset + 'px)';
      initialOffset = offset;

      for (var i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
      }
      if (slides[current]) {
        slides[current].classList.add('active');
      }
    }

    var btnNext = document.getElementById('destinations-button-next');
    var btnPrev = document.getElementById('destinations-button-prev');

    if (btnNext) {
      btnNext.addEventListener('click', function() {
        if (current < slides.length - 1) current++;
        updateSlider();
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', function() {
        if (current > 0) current--;
        updateSlider();
      });
    }

    setTimeout(updateSlider, 50);
    window.addEventListener('resize', updateSlider);

    function dragStart(event) {
      if (event.type.includes('mouse') && window.innerWidth > 1024) return;

      isDragging = true;
      startPos = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
      
      track.style.transition = 'none';
      track.style.cursor = 'grabbing';
    }

    function dragMove(event) {
      if (!isDragging) return;
      var currentPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
      var diff = currentPosition - startPos;
      
      track.style.transform = 'translateX(' + (initialOffset + diff) + 'px)';
      currentTranslate = diff;
    }

    function dragEnd() {
      if (!isDragging) return;
      isDragging = false;
      
      track.style.cursor = window.innerWidth <= 1024 ? 'grab' : 'auto';
      track.style.transition = 'transform 0.3s ease';

      if (currentTranslate < -50 && current < slides.length - 1) {
        current++;
      } else if (currentTranslate > 50 && current > 0) {
        current--;
      }

      updateSlider();
      currentTranslate = 0;
    }

    track.addEventListener('touchstart', dragStart, { passive: true });
    track.addEventListener('touchmove', dragMove, { passive: true });
    track.addEventListener('touchend', dragEnd);

    track.addEventListener('mousedown', dragStart);
    track.addEventListener('mousemove', dragMove);
    track.addEventListener('mouseup', dragEnd);
    track.addEventListener('mouseleave', dragEnd);

    track.style.cursor = window.innerWidth <= 1024 ? 'grab' : 'auto';
  }

  var reviews = [
    { text: 'Їхній сервіс просто чудовий і дешевший, ніж безпосередньо в готелі чи на будь-якому іншому сайті бронювання. Ви одразу відповіли нам, і жодних проблем не виникло.', avatar: 0 },
    { text: 'Чудова альтернатива популярним сервісам. Отримали номер за вигідною ціною, без зайвих переплат і прихованих комісій. На всі запитання відповідали дуже швидко, все пройшло бездоганно.', avatar: 1 },
    { text: 'Приємно вражені оперативністю. Навіть не очікували, що знайдемо таку ціну — дешевше, ніж всюди в інтернеті. Жодних затримок із підтвердженням, сервіс працює як годинник.', avatar: 2 },
    { text: 'Бронювали вперше і залишилися в захваті. Економія суттєва, а рівень обслуговування — на висоті. Дуже зручно, що зворотний зв\'язок майже миттєвий. Обов\'язково звернемося ще!', avatar: 3 },
    { text: 'Все чесно, швидко і вигідно. Порівнювали ціни на багатьох ресурсах, але тут пропозиція была найкращою. Заселення пройшло ідеально, жодних нюансів чи проблем не виникло.', avatar: 4 },
    { text: 'Дуже задоволені сервісом! Ціна виявилася значно приємнішою, ніж на офіційному сайті готелю. Бронювання пройшло миттєво, підтримка завжди на зв\'язку. Рекомендую всім!', avatar: 5 }
  ];

  var currentReview = 0;
  var reviewText = document.querySelector('.review-text');
  var avatars = document.querySelectorAll('.reviews-avatar');
  var arrow = document.querySelector('.reviews-arrow');

  function updateReview() {
    if (!reviewText) return;
    
    reviewText.style.opacity = '0';
    reviewText.style.transform = 'translateY(10px)';

    setTimeout(function() {
      reviewText.textContent = reviews[currentReview].text;
      reviewText.style.opacity = '1';
      reviewText.style.transform = 'translateY(0)';
    }, 300);

    avatars.forEach(function(av) {
      av.classList.remove('reviews-avatar-active');
    });
    
    if (avatars[reviews[currentReview].avatar]) {
      avatars[reviews[currentReview].avatar].classList.add('reviews-avatar-active');
    }
  }

  if (arrow) {
    arrow.addEventListener('click', function() {
      currentReview = (currentReview + 1) % reviews.length;
      updateReview(); 
    }); 
  }

  var touchStartX = 0;
  var touchEndX = 0;
  var reviewBlock = document.querySelector('.reviews-right');

  if (reviewBlock) {
    reviewBlock.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    reviewBlock.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      
      if (touchStartX - touchEndX > 50) {
        currentReview = (currentReview + 1) % reviews.length;
        updateReview();
      } else if (touchEndX - touchStartX > 50) {
        currentReview = (currentReview - 1 + reviews.length) % reviews.length;
        updateReview();
      }
    }, {passive: true});
  }

});