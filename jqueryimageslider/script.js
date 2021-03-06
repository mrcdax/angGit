﻿$(window).load(function () {
    var timer = 3000;//ms between automatic transitions
    //comment this line to disable autoplay
    // intervalId = setInterval(cycleImage, slidetime);
    $(".main_image .desc").show();//show banner
    $(".main_image .block").animate({ opacity: 0.85 }, 1);//set opacity
    $(".imge_thumb ul li:first").addClass('active');
    $(".image_thumb ul li").click(function () {
        var imgAlt = $(this).find("img").attr("alt");//get alt tag of selected image
        var imgURL = $(this).find("a").attr('href');//get the url of the image
        var imgDesc = $(this).find(".block").html();//get html of block
        var imgDescHeight = $(this).find(".block").height();//calculate height of the block
        if ($(this).is(".active")) {
            //if the li is already selected:
            return false;//prevent default handler action
        } else {
            //animate it
            $(".main_image .block").animate({ opacity: 0, marginBottom: -imgDescHeight }, "slow", function () {
                $(".main_image .block").html(imgDesc).animate({ opacity: 0.85, marginBottom: "0" }, "slow");
                $(".main_image img").attr({ src: imgURL, alt: imgAlt });
            });
        }
        $(".image_thumb ul li").removeClass("active");//remove active style from all the li's
        $(this).addClass("active");//add active style only to current li
        return false;//prevent default handler action

    }).hover(function () {
        //on hover, out hover
        $(this).addClass("hover");
    }, function () {
        $(this).removeClass("hover");
    });

    //close description box and change anchor text
    $("#collapse").click(function () {
        $(".main_image .block").toggle("slow");
        $(this).text($(this).text() == "Hide description" ? "Show description" : "Hide description");
        return false;
    });

    //auto slideshow
    var index = 0;
    var timeout;
    function slideshow() {
        var li = $("ul li");
        if (index < li.length) {
            $(li[index]).click();
            index++;
        } else {
            index = 0;
        }
        timeout = setTimeout(slideshow, timer);
    };
    slideshow();

    //pause on hover
    $(".main_image").hover(function () {
        clearTimeout(timeout);
    },
    function () {
        setTimeout(slideshow, timer);
    });

    //slide bar with text
    var windowWidth = $("body").width();
    var elementWidth = $("#text").width();
    var leftspace = parseInt($("#text").css("left").slice(0,-2));
    $(window).resize(function () {
        windowWidth = $("body").width();
    });//on windows resize recalculate the width
    (function scroll() {
        if (leftspace < windowWidth + elementWidth) {
            $("#text").css({ left: "+=1px" });
            leftspace++;
        } else {
            $("#text").css({ left: -elementWidth });
            leftspace = 0;
        }
        setTimeout(scroll,10);
    })();

    
});