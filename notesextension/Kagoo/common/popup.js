$(function () {
    var db = new PouchDB('notesdb');
    var remoteCouch = 'https://notepad.iriscouch.com/pushnote';

    //push note to db
    $(".hidable").on("click", "#button", function () {
        //if there isn't a note don't do anything
        if ($("#notetopush").val() === '') {
            return;
        }
        var note = {
            _id: $.now().toString(),
            notetext: $("#notetopush").val()
        };
        db.put(note, function callback(err, result) {
            if (!err) {
                console.log('Note pushed successfully.');
                db.replicate.to(remoteCouch, { continous: false });//send new data from local to cloud
                showNotes();
                $("#notetopush").val("");
            } else {
                callback();
                console.log("Could not insert the note...retrying" + err)
            }
        });
    });

    //show notes
    function showNotes() {
        db.replicate.from(remoteCouch/*, {filter:filterByUserPass }*/);//get the data from cloud
        db.allDocs({ include_docs: true, descending: true }, function (error, doc) {
            $('#notesfromdb').html("<ul></ul>");
            for (var i = 0; i < doc.rows.length; i++) {
                $('ul').append("<li><a href='#note" + doc.rows[i].doc._id + "' title='Show note'>" + doc.rows[i].doc.notetext + "</a><img id='delete" + doc.rows[i].doc._id + "' src='delete.png' title='Delete'></img></li>");
            };
            kango.ui.browserButton.setBadgeValue(doc.rows.length);//kangoo cross browser api
        });
    };
    showNotes();

    //save check interval, user,pass
    $("#buttonSave").click(function () {
        $("#optionWindow").css("display", "none");//ff
        kango.storage.setItem("checkInterval", $("#config").val());//ff
        //send message to background
        kango.dispatchMessage('Content2Background', $("#config").val());
    });

    ////delete button on li hover
    $("#notesfromdb").on('click', 'img', function () {
        $(this).parent().hide("fast");
        var noteToDelete = $(this).attr('id').substring(6);
        db.get(noteToDelete, function callback(err, doc) {
            if (!err) {
                db.remove(doc);
                db.replicate.to(remoteCouch);//send new data from local to cloud
            } else {
                calback();
                console.log("Could not delete note...retrying.");
            }
        });
    });

    /*************************** UI interaction *********************************/
    //keep toggle status in a cookie
    var toggled = $.cookie("ToggleStatus");
    if (toggled == 'false') {
        $(".hidable").hide();
        $("#hidetextarea").html('Show ▲');
    } else {
        $(".hidable").show();
        $("#hidetextarea").html('Hide ▼');
    }
    //show/hide input
    $("#hidetextarea").click(function () {
        $(".hidable").slideToggle("fast", function () {
            var hide = 'Hide ▼';
            var show = 'Show ▲';//'Show &#x25B2;';
            var text = $("#hidetextarea").text();
            text = text == hide ? show : hide;
            $("#hidetextarea").html(text);
            //keep toggle status in a cookie
            toggled = toggled == 'true' ? 'false' : 'true';
            $.cookie("ToggleStatus", toggled);
            console.log($.cookie("ToggleStatus"));
        });
    });

    //show full note
    $("#notesfromdb").on("click", "a", function () {
        noteToShow = $(this).attr('href').substring(5);
        db.get(noteToShow, function (err, doc) {
            $("#notetopush").val(doc.notetext);
        });
    });

    //show options on click
    $("#options").click(function (e) {
        $("#optionWindow").css("display", "inline-block")
        $("#config").val(kango.storage.getItem("checkInterval"));//ff
    });

    //while the popup is open, check for changes in cloud every second and show them if they exist
    setInterval(function () {
          showNotes();
    }, parseInt(kango.storage.getItem("checkInterval")));
});
