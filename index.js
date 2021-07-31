const images = document.querySelectorAll(".slider .slider__img");
const circles = document.querySelectorAll(".circle");
const imgContainer = document.querySelector(".slider .slider__box");
const sliderLeftBtn = document.querySelector(".slider .slider__left-btn");
const sliderRightBtn = document.querySelector(".slider .slider__right-btn");

let counter = 0;
const imgWidth = images[0].width;
let intervalId;

const removeInterval = () => {
  clearInterval(intervalId);
};
const addInterval = () => {
  intervalId = setInterval(() => {
    slideToRight();
  }, 5000);
};
const removeClassFromCircle = () => {
  circles.forEach((circle) => circle.classList.remove("circle--active"));
};
const addClassToCircle = (index) => {
  circles[index].classList.add("circle--active");
};
const slideImgInInterval = (yes = true) => {
  if (yes) {
    removeInterval();
    addInterval();
  }
};
slideImgInInterval();

const slideToLeft = () => {
  counter--;
  if (counter < 0) {
    counter = 4;
  }
  imgContainer.style.transform = `translateX(-${counter * imgWidth}px)`;
  removeClassFromCircle();
  addClassToCircle(counter);
  slideImgInInterval(true);
};
const slideToRight = () => {
  counter++;
  if (counter >= 5) {
    counter = 0;
  }
  imgContainer.style.transform = `translateX(-${counter * imgWidth}px)`;
  removeClassFromCircle();
  addClassToCircle(counter);
  slideImgInInterval(true);
};
const getActiveCircleIndex = () => {
  return Array.from(circles).findIndex((circle) =>
    circle.classList.contains("circle--active")
  );
};
const slideImg = (e) => {
  const activeCircleIndex = getActiveCircleIndex();
  const currCircleIndex = parseInt(e.target.dataset.index);
  slideImgInInterval(true);
  if (currCircleIndex >= activeCircleIndex) {
    counter = currCircleIndex - 1;
    slideToRight();
  } else {
    counter = currCircleIndex + 1;
    slideToLeft();
  }
};

sliderLeftBtn.addEventListener("click", slideToLeft);
sliderRightBtn.addEventListener("click", slideToRight);
circles.forEach((circle) => circle.addEventListener("click", slideImg));
