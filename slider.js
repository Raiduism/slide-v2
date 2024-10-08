const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let isDragging = false;
let startX;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let currentIndex = 0;

// Clone the slides to create an infinite loop effect
const firstClone = slides[0].cloneNode(true);
const secondClone = slides[1].cloneNode(true);
const thirdClone = slides[2].cloneNode(true);

slider.appendChild(firstClone);
slider.appendChild(secondClone);
slider.appendChild(thirdClone);

// Move the slider with buttons
function moveSlide(direction) {
    if (direction === 1 && currentIndex >= totalSlides) {
        currentIndex = 0;
        setPositionByIndex();
    } else if (direction === -1 && currentIndex <= 0) {
        currentIndex = totalSlides;
        setPositionByIndex();
    } else {
        currentIndex += direction;
        setPositionByIndex();
    }
}

function setPositionByIndex() {
    currentTranslate = currentIndex * (-100 / 3); // Show 3 slides per screen
    slider.style.transform = `translateX(${currentTranslate}%)`;

    // Loop back to original slides after reaching clones
    if (currentIndex >= totalSlides) {
        setTimeout(() => {
            slider.style.transition = 'none';
            currentIndex = 0;
            slider.style.transform = `translateX(${currentIndex * (-100 / 3)}%)`;
        }, 500);
    }

    if (currentIndex < 0) {
        setTimeout(() => {
            slider.style.transition = 'none';
            currentIndex = totalSlides - 1;
            slider.style.transform = `translateX(${currentIndex * (-100 / 3)}%)`;
        }, 500);
    }
}

// Drag functionality
slider.addEventListener('mousedown', startDrag);
slider.addEventListener('touchstart', startDrag);
slider.addEventListener('mouseup', endDrag);
slider.addEventListener('touchend', endDrag);
slider.addEventListener('mouseleave', endDrag);
slider.addEventListener('mousemove', drag);
slider.addEventListener('touchmove', drag);

function startDrag(e) {
    isDragging = true;
    startX = getPositionX(e);
    slider.style.transition = 'none'; // Disable transition during drag
    animationID = requestAnimationFrame(animation);
}

function endDrag() {
    isDragging = false;
    cancelAnimationFrame(animationID);

    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 / 6) currentIndex += 1;
    if (movedBy > 100 / 6) currentIndex -= 1;

    setPositionByIndex();
    slider.style.transition = 'transform 0.5s ease'; // Re-enable transition after drag
}

function drag(e) {
    if (isDragging) {
        const currentPosition = getPositionX(e);
        currentTranslate = prevTranslate + ((currentPosition - startX) / window.innerWidth) * 100;
    }
}

function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

function animation() {
    slider.style.transform = `translateX(${currentTranslate}%)`;
    if (isDragging) requestAnimationFrame(animation);
}
