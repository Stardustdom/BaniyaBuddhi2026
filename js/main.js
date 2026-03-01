const video = document.getElementById("introVideo");
const source = document.getElementById("videoSource");
const main = document.getElementById("mainContent");
const heroImg = document.getElementById("heroImg");

function setupIntro() {

    if (!video) return;

    if (window.innerWidth > 1200) {
        source.src = "assets/introdesktop.mp4";
        if (heroImg) heroImg.src = "assets/bgdesktop.jpeg";
    } else {
        source.src = "assets/intromobile.mp4";
        if (heroImg) heroImg.src = "assets/bgmobile.jpeg";
    }

    video.load();
}

function showMain() {
    video.style.display = "none";
    main.style.display = "block";
}

setupIntro();
window.addEventListener("resize", setupIntro);
video.addEventListener("ended", showMain);