const video = document.getElementById("introVideo");
const source = document.getElementById("videoSource");
const main = document.getElementById("mainContent");

if(video){

    if(window.innerWidth > 768){
        source.src = "assets/introdesktop.mp4";
        main.style.backgroundImage = "url('assets/bgdesktop.jpeg')";
    } else {
        source.src = "assets/intromobile.mp4";
        main.style.backgroundImage = "url('assets/bgmobile.png')";
    }

    video.load();

    // If video ends normally
    video.onended = showMain;

    // If video fails
    video.onerror = showMain;

    // Fallback timeout (VERY IMPORTANT)
    setTimeout(showMain, 5000); // show after 5 sec max
}

function showMain(){
    if(video){
        video.style.display = "none";
    }
    if(main){
        main.style.display = "block";
    }
}
const introVideo = document.getElementById("introVideo");
const mainContent = document.getElementById("mainContent");

introVideo.addEventListener("ended", function () {
    introVideo.style.display = "none";
    mainContent.style.display = "block";
});