window.onscroll = () => {
    animate();

    animateBrands();
}

window.onload = () => {
    animate();
}

function animateBrands() {
    var row1 = document.getElementById("brands-row-1");
    var row2 = document.getElementById("brands-row-2");
    var row3 = document.getElementById("brands-row-3");

    if (row1 !== null && row2 !== null && row3 !== null) {
        const y = window.pageYOffset;
        const height = window.innerHeight;

        if (row1.getBoundingClientRect().y <= height && row3.getBoundingClientRect().y > 0) {
            const unit = 110 / height;

            row1.style.paddingLeft = parseInt(138 + (y * unit)) + "px";
            row2.style.paddingLeft = parseInt(y * unit) + "px";
            row3.style.paddingLeft = parseInt(138 + (y * unit)) + "px";
        }
    }
}

export function animate() {
    var height = window.innerHeight;

    var fadeIn = document.getElementsByClassName("fade-in");

    [].forEach.call(fadeIn, function(element) {
        if (element.getBoundingClientRect().top <= height) {
            element.classList.add("animate__animated");
            element.classList.add("animate__fadeIn");
        } /*else {
            element.classList.remove("animate__animated");
            element.classList.remove("animate__fadeIn");
        }*/
    });

    var fadeInUp = document.getElementsByClassName("fade-in-up");

    [].forEach.call(fadeInUp, function(element) {
        if (element.getBoundingClientRect().top <= height) {
            element.classList.add("animate__animated");
            element.classList.add("animate__fadeInUp");
        } /*else {
            element.classList.remove("animate__animated");
            element.classList.remove("animate__fadeInUp");
        }*/
    });

    var fadeInLeft = document.getElementsByClassName("fade-in-left");

    [].forEach.call(fadeInLeft, function(element) {
        if (element.getBoundingClientRect().top <= height) {
            element.classList.add("animate__animated");
            element.classList.add("animate__fadeInLeft");
        } /*else {
            element.classList.remove("animate__animated");
            element.classList.remove("animate__fadeInLeft");
        }*/
    });

    var fadeInRight = document.getElementsByClassName("fade-in-right");

    [].forEach.call(fadeInRight, function(element) {
        if (element.getBoundingClientRect().top <= height) {
            element.classList.add("animate__animated");
            element.classList.add("animate__fadeInRight");
        } /*else {
            element.classList.remove("animate__animated");
            element.classList.remove("animate__fadeInRight");
        }*/
    });

    var delay1 = document.getElementsByClassName("delay-1s");
    var delay2 = document.getElementsByClassName("delay-2s");
    var delay3 = document.getElementsByClassName("delay-3s");
    var delay4 = document.getElementsByClassName("delay-4s");
    var delay5 = document.getElementsByClassName("delay-5s");

    [].forEach.call(delay1, function(element) {
        if (element.getBoundingClientRect().top <= height) {
            element.classList.add("animate__delay-1s");
        }
    });

    [].forEach.call(delay2, function(element) {
        if (element.getBoundingClientRect().top <= height) {
            element.classList.add("animate__delay-2s");
        }
    });

    [].forEach.call(delay3, function(element) {
        if (element.getBoundingClientRect().top <= height) {
            element.classList.add("animate__delay-3s");
        }
    });

    [].forEach.call(delay4, function(element) {
        if (element.getBoundingClientRect().top <= height) {
            element.classList.add("animate__delay-4s");
        }
    });

    [].forEach.call(delay5, function(element) {
        if (element.getBoundingClientRect().top <= height) {
            element.classList.add("animate__delay-5s");
        }
    });
}