$(function(){
    $("#btn").click(function (e) {
        //#region send data with .serialize()
        //works in all browsers, maybe
        //var data = $("#myForm").serialize();
        //console.log("Data that will be sent to server: " + data);
        //$.ajax({
        //    url: "process.php",
        //    type: "POST",
        //    data: data,
        //    cache: false
        //}).done(function (result) {
        //    $("#result").html(result).hide().slideDown("slow");
        //})
        //e.preventDefault();
        //#endregion
        //works IE>10
        var data = new FormData($("#myForm")[0]);
        console.log("Data that will be sent to server: " + data);
        $.ajax({
            url: "process.php",
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            cache: false
        }).done(function (result) {
            $("#result").html(result).hide().slideDown("slow");
        })
        e.preventDefault();
    });

    //#region ajax with JS and Jquery
    //javascript oldschool
    //document.getElementById("requestJS").addEventListener('click', function () {
    //    httpRequest = new XMLHttpRequest();
    //    httpRequest.onreadystatechange = function () {
    //        if (httpRequest.readyState === 4 && httpRequest.status === 200) {//response 4 (complete) and 200(ok)
    //            alert(httpRequest.responseText);
    //        }
    //    };
    //    httpRequest.open('GET', 'test.html?123', true);
    //    httpRequest.send();
    //}, false);

    ////jquery style
    //$("#requestJQ").click(function () {
    //    $.ajax({ url: 'test.html', cache: false })
    //        .done(function (result) {
    //            alert(result);
    //        })
    //        .fail(function () {
    //            alert("fail");
    //        });
    //});
    //#endregion
 
});