function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    //SLIDER

const slides = document.querySelectorAll(slide),
slider = document.querySelector(container),
prev = document.querySelector(prevArrow),
next = document.querySelector(nextArrow),
total = document.querySelector(totalCounter),
current = document.querySelector(currentCounter),
slidesWrepper = document.querySelector(wrapper),
slidesField = document.querySelector(field),
width = window.getComputedStyle(slidesWrepper).width;

let slideIndex = 1,
offset = 0;

if ( slides.length < 10) {
total.innerHTML = '0' + slides.length;
current.innerHTML = '0' + slideIndex;
} else {
total.innerHTML =slides.length;
current.innerHTML = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrepper.style.overflow = 'hidden';

slides.forEach(slide => {
slide.style.width = width;
});

slider.style.position = 'relative';
const indicators = document.createElement('ol'),
dots = [];
indicators.classList.add('carousel-indicators');
slider.append(indicators);

for (let i = 0;i < slides.length; i++) {
const dot = document.createElement('li');
dot.setAttribute('data-slide-to', i+1);
dot.classList.add('dot');
if (i == 0) {
dot.style.opacity = 1;
}
indicators.append(dot);
dots.push(dot);
}

function add0 () {
if (slideIndex < 10) {
current.innerHTML = '0'+ slideIndex;
} else {
current.innerHTML = slideIndex;
}
}
function dotChange() {
dots.forEach(dot => dot.style.opacity = '.5');
dots[slideIndex - 1].style.opacity = 1;
}

function delNotDig (str) {
return +str.replace(/\D/g, '');
}

next.addEventListener('click', () => {
if (offset == delNotDig(width) * (slides.length -1)) {
offset = 0;
} else {
offset += delNotDig(width);
}

slidesField.style.transform = `translateX(-${offset}px)`;

if (slideIndex == slides.length) {
slideIndex = 1;
} else {
slideIndex++;
}

add0();
dotChange();
});

prev.addEventListener('click', () => {
if (offset == 0) {
offset = delNotDig(width) * (slides.length -1);
} else {
offset += delNotDig(width);
}

slidesField.style.transform = `translateX(-${offset}px)`;

if (slideIndex == 1) {
slideIndex = slides.length;
} else {
slideIndex--;
}

add0();
dotChange();
});

dots.forEach(dot => {
dot.addEventListener('click', (e) => {
const slideTo = e.target.getAttribute('data-slide-to');

slideIndex = slideTo;
offset = delNotDig(width) * (slideTo -1);

slidesField.style.transform = `translateX(-${offset}px)`;

add0();
dotChange();
});
});
}

export default slider;