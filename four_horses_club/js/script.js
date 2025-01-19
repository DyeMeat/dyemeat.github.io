// Слайдер с участниками ---------start---------

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".members__track");
  const items = document.querySelectorAll(".members__item");
  const slider = document.querySelector(".members__slider");

  const totalItems = items.length;
  const currentSlideElement = document.getElementById("membersSlideCurrent");
  const totalSlidesElement = document.getElementById("membersSlidesTotal");

  let currentIndex = 0;
  let slidesToShow = 1;
  let slideGap = 20; // Gap between slides in pixels

  // Update total slides count in counter
  totalSlidesElement.textContent = Math.ceil(totalItems / slidesToShow);

  function updateSlidesToShow() {
    const width = window.innerWidth;
    if (width > 1199) {
      slidesToShow = 3;
    } else if (width > 767) {
      slidesToShow = 2;
    } else {
      slidesToShow = 1;
    }
    console.log(width);
    console.log(slidesToShow);
    updateTrackPosition();
    updateCounter();
  }

  function updateTrackPosition() {
    const itemWidth =
      (slider.offsetWidth - (slidesToShow - 1) * slideGap) / slidesToShow;
    const offset = currentIndex * (itemWidth + slideGap);

    items.forEach((item) => {
      item.style.width = `${itemWidth}px`;
      item.style.marginRight = `${slideGap}px`;
    });

    track.style.transform = `translateX(-${offset}px)`;
  }

  function updateCounter() {
    currentSlideElement.textContent =
      Math.ceil(currentIndex / slidesToShow) + 1;
    totalSlidesElement.textContent = Math.ceil(totalItems / slidesToShow);
  }

  function showNextMembersSlide() {
    currentIndex = (currentIndex + slidesToShow) % totalItems;
    updateTrackPosition();
    updateCounter();
  }

  function showPrevMembersSlide() {
    currentIndex = (currentIndex - slidesToShow + totalItems) % totalItems;
    updateTrackPosition();
    updateCounter();
  }

  // Attach functions to buttons
  window.showNextMembersSlide = showNextMembersSlide;
  window.showPrevMembersSlide = showPrevMembersSlide;

  // Auto-slide functionality
  setInterval(showNextMembersSlide, 4000); // Change slide every 4 seconds

  // Adjust slides on resize
  window.addEventListener("resize", updateSlidesToShow);
  updateSlidesToShow(); // Initial calculation
});

// Слайдер с участниками ---------end---------

// Функция для плавной прокрутки до якорной ссылки ---------start---------

function scrollToAnchor(anchorId) {
  const targetElement = document.getElementById(anchorId);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  } else {
    console.warn(`Элемент с ID "${anchorId}" не найден.`);
  }
}

// Пример использования
document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Отмена стандартного поведения
      const anchorId = link.getAttribute("href").substring(1); // Убираем #
      scrollToAnchor(anchorId);
    });
  });
});

// Функция для плавной прокрутки до якорной ссылки ---------end---------

// Stages slider ---------start---------

document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 1366) {
    const stagesContent = document.querySelector(".stages__list");
    const stagesBullets = document.querySelectorAll(".stages__bullet");
    const stagesPrev = document.querySelector(".stages__prev");
    const stagesNext = document.querySelector(".stages__next");

    let currentSlideIndex = 0;

    function showPrevStagesSlide() {
      if (currentSlideIndex <= 4 && currentSlideIndex != 0) {
        currentSlideIndex--;
        let num = currentSlideIndex * 100;
        stagesContent.style.transform = `translateX(-${num}%)`;
        updateStagesBullets();
        updateStagesSliderButtons();
      }
    }

    function showNextStagesSlide() {
      if (currentSlideIndex <= 3) {
        currentSlideIndex++;
        let num = currentSlideIndex * 100;
        stagesContent.style.transform = `translateX(-${num}%)`;
        updateStagesBullets();
        updateStagesSliderButtons();
      }
    }

    // Обновление буллетов
    function updateStagesBullets() {
      stagesBullets.forEach((bullet, idx) => {
        bullet.classList.toggle("active", idx === currentSlideIndex);
      });
    }

    function updateStagesSliderButtons() {
      switch (currentSlideIndex) {
        case 0:
          stagesPrev.disabled = true;
          stagesNext.disabled = false;
          break;

        case 4:
          stagesPrev.disabled = false;
          stagesNext.disabled = true;
          break;

        default:
          stagesPrev.disabled = false;
          stagesNext.disabled = false;
          break;
      }
    }

    window.showPrevStagesSlide = showPrevStagesSlide;
    window.showNextStagesSlide = showNextStagesSlide;

    updateStagesSliderButtons();
    updateStagesBullets();
  }
});

// Stages slider ---------end---------
