var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var audio = audioContext.createMediaElementSource(document.getElementById("myAudio"));
var panSlider = document.getElementById("panSlider");
var volumeSlider = document.getElementById("volumeSlider");

var panNode = audioContext.createStereoPanner();
var volumeNode = audioContext.createGain();

audio.connect(panNode);
panNode.connect(volumeNode);
volumeNode.connect(audioContext.destination);

panNode.pan.value = 0;
volumeNode.gain.value = 1;

audio.pan = panNode;
audio.volume = volumeNode;

function playMusic(audioSrc) {
    audio.mediaElement.src = audioSrc;

    if (audio.mediaElement.paused) {
        audio.mediaElement.play();
        document.querySelector('.playing')?.classList.remove('playing');
        event.target.classList.add('playing');
        audio.mediaElement.setAttribute("loop", "true");
    } else {
        audio.mediaElement.pause();
        audio.mediaElement.removeAttribute("loop");
        event.target.classList.remove('playing');
    }
}

document.addEventListener("click", function() {
    audioContext.resume().then(() => {
        console.log("AudioContext resumed successfully");
    });
});

function updatePan() {
    var panValue = panSlider.value;
    panNode.pan.value = panValue;
}

function updateVolume() {
    var volumeValue = volumeSlider.value;
    volumeNode.gain.value = volumeValue;
}
