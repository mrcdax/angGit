$(function () {
    var db = new PouchDB('notesdb');
    var remoteCouch = 'https://notepad.iriscouch.com/pushnote';
    var badgeOnOpen;

    //refresh UI on data change in cloud
    //db.info(function (err, info) {
    //    db.changes({
    //        since: info.update_seq,
    //        live: true
    //    }).on('change', showNotes);
    //});

    //push note to db
    $(".hidable").on("click", "#button", function () {
        //if there isn't a note don't do anything
        if ($("#notetopush").val() === '') {
            return;
        }
        var note = {
            _id: $.now().toString(),
            notetext: $("#notetopush").val(),
            user: $("#user").val(),
            pass: $.md5($("#config").val())
        };
        db.put(note, function callback(err, result) {
            if (!err) {
                console.log('Note pushed successfully.');
                db.replicate.to(remoteCouch, { continous: false });//send new data from local to cloud
                showNotes();
                $("#notetopush").val("");
            } else {
                console.log("Could not insert the note." + err)
            }
        });
    });

    //replicationfilter funstion
    //function filterByUserPass(doc) {
    //    //console.log(doc);
    //    if (doc.notetext == '123') {
    //        console.log("filter:" + doc);
    //        return false;
    //    }
    //}
    //show notes
    function showNotes() {
        db.replicate.from(remoteCouch/*, {filter:filterByUserPass }*/);//get the data from cloud
        db.allDocs({ include_docs: true, descending: true }, function (error, doc) {
            $('#notesfromdb').html("<ul></ul>");
            for (var i = 0; i < doc.rows.length; i++) {
                $('ul').append("<li><a href='#note" + doc.rows[i].doc._id + "' title='Show note'>" + doc.rows[i].doc.notetext + "</a><img id='delete" + doc.rows[i].doc._id + "' src='delete.png' title='Delete'></img></li>");
            };
            chrome.browserAction.setBadgeText({ text: doc.rows.length + '' });
        });
    };
    showNotes();


    //save check interval, user,pass
    $("#buttonSave").click(function () {
        localStorage.setItem("checkInterval", $("#config").val());
        localStorage.setItem("user", $("#user").val());
        localStorage.setItem("pass", $("#pass").val());
        $("#optionWindow").slideToggle('slow');

        //send message to background
        chrome.runtime.sendMessage($("#config").val(), function (response) {
            console.log(response);
        });
    });

    //syncronize local db with iriscouch db in cloud
    //function sync() {
    //    var opts = { live: true };
    //    //db.replicate.from(remoteCouch, opts);
    //    //db.replicate.to(remoteCouch, opts);
    //}
    //sync();

    ////delete button on li hover
    $("#notesfromdb").on('click', 'img', function () {
        var noteToDelete = $(this).attr('id').substring(6);
        db.get(noteToDelete, function (err, doc) {
            db.remove(doc);
        });
        $(this).parent().hide("fast");
        db.replicate.to(remoteCouch);//send new data from local to cloud
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


    (function () {
        chrome.browserAction.getBadgeText({}, function (result) {
            badgeOnOpen = result;
        });
    })();

    //show options on click
    $("#options").click(function () {
        $("#config").val(localStorage.getItem("checkInterval"));
        $("#optionWindow").slideToggle('slow');
    });

    //while the popup is open, check for changes in cloud every second and show them if they exist
    setInterval(function () {
        chrome.browserAction.getBadgeText({}, function (result) {
            var badgeNow = result;
            if (badgeNow !== badgeOnOpen) {
                showNotes();
            }
        });
    }, 1000);
});
