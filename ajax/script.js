$(function(){
    $("#btn").click(function (e) {
        var data = $("#myForm").serialize();
        console.log("Here: " + data);
        $.ajax({
            url: "process.php",
            type: "POST",
            data: data,
            cache: false
        }).done(function (result) {
            $("#result").html(result);
        })
        e.preventDefault();
    });

    /* 
    
    //javascript oldschool
    document.getElementById("requestJS").addEventListener('click', function () {
        httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === 4 && httpRequest.status === 200) {//response 4 (complete) and 200(ok)
                alert(httpRequest.responseText);
            }
        };
        httpRequest.open('GET', 'test.html?123', true);
        httpRequest.send();
    }, false);

    //jquery style
    $("#requestJQ").click(function () {
        $.ajax({ url: 'test.html', cache: false })
            .done(function (result) {
                alert(result);
            })
            .fail(function () {
                alert("fail");
            });
    });

    */
});