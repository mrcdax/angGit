//references:
//https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Getting_started
//https://developer.mozilla.org/en-US/Add-ons/SDK/Tutorials/Modifying_Web_Pages_Based_on_URL


//Include buttons and PageMod appi's
var buttons = require("sdk/ui/button/action");
var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

//define icon description and onclick handler
var playbutton = buttons.ActionButton({
    id: "play",
    label: "Play/Pause all open youtube videos",
    icon: {
        "16": "./play.png"
    },
    onClick: handleClick
});

function handleClick(state) {
    // Create a page mod and add the controll.js to the page
    pageMod.PageMod({
        include: "https://www.youtube.com/watch*",
        contentScriptFile: self.data.url("controll.js"),
        attachTo: ["top", "existing"]
    });
}