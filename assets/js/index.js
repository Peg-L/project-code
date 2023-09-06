var bannerSwiper = new Swiper(".bannerSwiper", {
  slidesPerView: 1,
  loop: true,
  // autoplay: true,
  pagination: {
    el: ".bannerSwiper-pagination",
    clickable: true,
  },
});

var recommendSwiper = new Swiper(".recommendSwiper", {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  pagination: {
    el: ".recommendSwiper-pagination",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 5,
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 16,
      navigation: {
        nextEl: ".recommendSwiper-button-next",
        prevEl: ".recommendSwiper-button-prev",
      },
      pagination: {
        dynamicMainBullets: 3,
      },
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 24,
      navigation: {
        nextEl: ".recommendSwiper-button-next",
        prevEl: ".recommendSwiper-button-prev",
      },
      pagination: {
        dynamicMainBullets: 3,
      },
    },
  },
});

var reviewsSwiper = new Swiper(".reviewsSwiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  loop: true,
  pagination: {
    el: ".reviewsSwiper-pagination-custom",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 5,
  },
  breakpoints: {
    992: {
      slidesPerView: 2,
      spaceBetween: 24,
      navigation: {
        nextEl: ".reviewsSwiper-button-next-custom",
        prevEl: ".reviewsSwiper-button-prev-custom",
      },
      pagination: {
        dynamicMainBullets: 3,
      },
    },
  },
});
