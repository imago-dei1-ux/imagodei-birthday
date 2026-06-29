/* =========================
ELEMENT
========================= */

const openBtn = document.getElementById("openBtn");
const opening = document.getElementById("opening");
const mainContent = document.getElementById("mainContent");
const bgMusic = document.getElementById("bgMusic");
const bubbleContainer = document.getElementById("bubbleContainer");

/* =========================
CREATE BUBBLE
========================= */

function createBubble(){

    const bubble = document.createElement("img");

    const images = [
        "assets/images/bubble1.png",
        "assets/images/bubble2.png"
    ];

    bubble.src =
        images[Math.floor(Math.random() * images.length)];

    bubble.classList.add("bubble");

    const sizes = [
        "small",
        "medium",
        "large"
    ];

    bubble.classList.add(
        sizes[Math.floor(Math.random() * sizes.length)]
    );

    bubble.style.left =
        Math.random() * 100 + "%";

    bubble.style.animationDuration =
        (8 + Math.random() * 12) + "s";

    bubble.style.opacity =
        (0.4 + Math.random() * 0.5);

    bubbleContainer.appendChild(bubble);

    setTimeout(() => {
        bubble.remove();
    },25000);

}

/* =========================
INITIAL BUBBLE
========================= */

for(let i=0;i<30;i++){

    setTimeout(() => {
        createBubble();
    }, i * 250);

}

setInterval(createBubble,700);

/* =========================
OPEN INVITATION
========================= */

openBtn.addEventListener("click", () => {

    /* start music */

    bgMusic.play().catch(() => {});
    confetti({
    particleCount:150,
    spread:120,
    origin:{
        y:0.6
    }
});

    /* show content */

    mainContent.style.display = "block";

    /* fade opening */

    opening.style.transition =
        "opacity .8s ease";

    opening.style.opacity = "0";

    setTimeout(() => {

        opening.style.display = "none";

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    },800);

});

/* =========================
PRELOAD
========================= */

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});
/* =========================
COUNTDOWN
========================= */

const targetDate =
new Date("2026-07-12T17:00:00");

function updateCountdown(){

    const now = new Date();

    const distance =
        targetDate - now;

    if(distance < 0){
        return;
    }

    const days =
        Math.floor(distance / (1000*60*60*24));

    const hours =
        Math.floor(
            (distance %
            (1000*60*60*24))
            /
            (1000*60*60)
        );

    const minutes =
        Math.floor(
            (distance %
            (1000*60*60))
            /
            (1000*60)
        );

    const seconds =
        Math.floor(
            (distance %
            (1000*60))
            /
            1000
        );

    const d =
    document.getElementById("days");

    if(!d) return;

    d.textContent = days;

    document.getElementById("hours")
    .textContent = hours;

    document.getElementById("minutes")
    .textContent = minutes;

    document.getElementById("seconds")
    .textContent = seconds;
}

setInterval(updateCountdown,1000);

updateCountdown();

/* =========================
SCROLL ANIMATION
========================= */

const reveals =
document.querySelectorAll(".reveal");

const observer =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});

reveals.forEach(item => {
    observer.observe(item);
});