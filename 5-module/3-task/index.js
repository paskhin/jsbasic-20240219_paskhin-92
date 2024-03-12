function initCarousel() {
  let buttonLeft = document.querySelector('.carousel__arrow_left');
  let buttonRight = document.querySelector('.carousel__arrow_right');
  let sliderList = document.querySelector('.carousel__inner');
  let slide = document.querySelector('.carousel__slide');
  let slides = document.querySelectorAll('.carousel__slide');
  let slideWidth = slide.offsetWidth;
  let offSet = 0;
  let maxOffSet = -slideWidth * (slides.length - 1);
  let sliderCoord = slide.getBoundingClientRect();

  buttonLeft.style.display = 'none';
  document.addEventListener('click', function (event) {
    let target = event.target;
    let clickCoordLeft = event.clientX - sliderCoord.left;
    if (!target.closest('.carousel__img') && !target.closest('.carousel__arrow')) {
      return;

    } else if (clickCoordLeft < slideWidth / 2) {
      buttonRight.style.display = '';

      if (offSet >= -slideWidth) {
        buttonLeft.style.display = 'none';
        offSet = 0;
      } else {
        offSet = offSet + slideWidth;
      }

    } else if (clickCoordLeft > slideWidth / 2) {
      buttonLeft.style.display = '';
      offSet = offSet - slideWidth;

      if (offSet <= maxOffSet) {
        buttonRight.style.display = 'none';
        offSet = maxOffSet;
      }
    }
    sliderList.style.transform = `translateX(${offSet}px)`;
  })
}
