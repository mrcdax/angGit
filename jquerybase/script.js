﻿//the page loaded
$(function () {
    $("#pp").css("background-color", "green");

    //switch color on click
    var flag = false;
    var togg = function () {
        flag = !flag;
        if (flag) {
            $(this).css("color", "red");
        } else {
            $(this).css("color", "blue");
        }
    };

    //also change the cursor
    $("#pp").css("cursor", "pointer").click(togg);

    //append elements
    $("#main").append("<p>other</p>");
    $("#main").append($("#pp")) //moves the element..no cloning
    $("<p>third one</p>").appendTo($("#main"));
    $("#pp").clone(true).appendTo($("#main"));//clone
    console.log($("p").length);
    console.log($("p")[2]);//third one

    //maps an array to another array after modifications
    var arr = ["a", "b", "c", "d", "e"];
    $("#unmap").css({ "background-color": "red" }).text(arr.join(";"));
    arr = jQuery.map(arr, function (item, index) {
        return item + index;
    });
    $("#map").css({ "background-color": "cyan" }).text(arr.join("."));
    //iterate through array
    $(".each").each(function(){
        console.log($(this).text()+"and has this attribute: "+$(this).attr("class"));
    });

    //add classes
    $("p").addClass("class");
    $(".class").css("border", "1px solid yellow");
    
    //animate
    $(document).keydown(function (e) {
        switch (e.which) {
            case 38: $("#animation").animate({ "top": "-=50px" }, "fast");
                break;
            case 40: $("#animation").animate({ "top": "+=50px" }, "fast");
                break;
            case 39: $("#animation").animate({ "left": "+=50px" }, "fast");
                break;
            case 37: $("#animation").animate({ "left": "-=50px" }, "fast");
                break;
        }
    })
    
});