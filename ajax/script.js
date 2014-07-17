$(function () {
    var data = new FormData($("#myForm")[0]);
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
        handleFile(e);
    });
    $("#dragdrop").on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
        console.log("1");
        $(this).css({ border: "1px solid red" });
    });
    $("#dragdrop").on('dragleave', function (e) {
        e.preventDefault();
        $(this).css({ border: "1px dashed #009aff" });
    });
    $("#dragdrop").on('drop', function (e) {
        $("#progress").css({ width: 0 });
        $(this).css({ border: "2px solid #009aff" });
        $(this).css({ background: "#cfcfcf" })
        $(this).text("Ready to upload image...");
        $("#bar").show();
        e.preventDefault();
        var file = e.originalEvent.dataTransfer.files;
        data.append('file', file[0]);
    });
    //prevent opening in new window when dragging outside the area
    $(document).on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    $(document).on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
    //works IE>10
    function handleFile(e, file) {
        console.log("Data that will be sent to server: " + data);
        $.ajax({
            url: "process.php",
            type: "POST",
            processData: false,
            contentType: false,
            data: data,
            cache: false,
            xhr: function () {
                //get the native XmlHttpRequest object
                var xhr = $.ajaxSettings.xhr();
                //set the onprogress event handler
                xhr.upload.onprogress = function (e) {
                    $("#progress").css({ width: (Math.floor(e.loaded / e.total * 100) + "%") });
                    $("#bar span").text(Math.floor(e.loaded / e.total * 100) + "%");
                };
                //set the onload event handler
                //xhr.upload.onload = function () { $("#progress").attr({ value: 100 }) };
                //return the new customized xhr obj
                return xhr;
            }
        }).done(function (result) {
            $("#result").html(result).hide().slideDown("slow", function () {
                $("#progress").css({ width: 0 });
                $("#bar").hide("slow");
                $("#bar span").text("0%");
                $("#dragdrop").css({ background: "white" })
                $("#dragdrop").text("Drag & drop an image here");
            });
        });
        e.preventDefault();
    }
    $("#result").on("click", "img", function () {//access element returned from ajax
        $(this).toggleClass("zoomin");
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