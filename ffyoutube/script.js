var player;

function onYouTubePlayerAPIReady() {
    //create the global player from the specific iframe(#video)
    player = new YT.Player('video', {
        events: {
            //call this function when the player is ready
            'onReady': onPlayerReady
        }
    });
};
function onPlayerReady(event) {
    //bind events
    var play = document.getElementById("play-button");
    play.addEventListener("click", function () {
        player.playVideo();
    });
    var pause = document.getElementById("pause-button");
    pause.addEventListener("click", function () {
        player.pauseVideo();
    });
}
//inject Youtube API in the page async
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
