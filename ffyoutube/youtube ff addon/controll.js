//get a ref to play/pause button from the youtube page
var btnpp = document.getElementsByClassName("ytp-button ytp-button-play");

if (btnpp.length == 0) {
    var btnpp = document.getElementsByClassName("ytp-button ytp-button-pause");
}

//click on all the play/pause buttons from all the youtube tabs
for (var i = 0; i <= btnpp.length; i++) {
    btnpp[i].click();
}