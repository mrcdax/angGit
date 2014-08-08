$(function () {
    var db = new PouchDB('notesdb');
    var remoteCouch = 'https://notepad.iriscouch.com/pushnote';

    //refresh UI on data change in cloud
    db.info(function (err, info) {
        db.changes({
            since: info.update_seq,
            live: true
        }).on('change', showNotes);
    });
    
    //push note to db
    $(".hidable").on("click", "#button", function () {
        //if there is'n a note don't do anything
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
                showNotes();
                $("#notetopush").val("");
            } else {
                console.log("Could not insert the note." + err)
            }
        });
    });

    //draw UI
    //show notes
    function showNotes() {
        db.allDocs({ include_docs: true, descending: true }, function (error, doc) {
            $('#notesfromdb').html("<ul></ul>");
            for (var i = 0; i < doc.rows.length; i++) {
                $('ul').append("<li><a href='#note" + doc.rows[i].doc._id + "' title='Show note'>" + doc.rows[i].doc.notetext + "</a><img id='delete" + doc.rows[i].doc._id + "' src='delete.png' title='Delete'></img></li>");
            };
        });
    };
    showNotes();

    //syncronize local db with iriscouch db in cloud
    function sync() {
        var opts = { live: true };
        db.replicate.to(remoteCouch, opts);
        db.replicate.from(remoteCouch, opts);
    }
    sync();

    ////delete button on li hover
    $("#notesfromdb").on('click', 'img', function () {
        var noteToDelete = $(this).attr('id').substring(6);
        db.get(noteToDelete, function (err, doc) {
            db.remove(doc);
        });
    });

    /*************************** UI interaction *********************************/
    //keep toggle status in a cookie
    var toggled= $.cookie("ToggleStatus");
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

    $("#notesfromdb").on("click", "a", function () {
        noteToEdit = $(this).attr('href').substring(5);
        db.get(noteToEdit, function (err, doc) {
            $("#notetopush").val(doc.notetext);
        });
    });
});
