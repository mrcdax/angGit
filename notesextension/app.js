$(function () {
    var db = new PouchDB('notesdb');
    var remoteCouch = 'https://notepad.iriscouch.com/notepad';

    //no. of notes max=13
    function noofnotes() {
        db.allDocs({ include_docs: true }, function (error, doc) {
            if (error) {
                console.log(error);
            } else {
                return doc.rows.length;
            }
        });
    }
    $("body").on("click", ".button",function () {
        if (noofnotes() > 13) {
            alert("Maximum 13 notes...sorry. I'm not sorry, actually.")
        } else {
            if ($('#notetitle').val() === "") {
                alert("Add at least a title.")
            } else {
                var notes = {
                    _id: $.now().toString(),
                    texttitle: $('#notetitle').val(),
                    textbody: $('#notebody').val()
                };
                db.put(notes, function callback(error, result) {
                    if (error) {
                        alert("There was an error, goddamit!" + error);
                    } else {
                        //alert("Note inserted in PouchDB.");
                    }
                    showNotes();
                    $('#notetitle,#notebody').val('');
                });
            }
        }
    });
    function showNotes() {
        db.allDocs({ include_docs: true, descending: true }, function (error, doc) {
            $('#saved').html("<ul></ul>");
            for (var i = 0; i < doc.rows.length; i++) {
                $('ul').append("<li><img id='delete" + doc.rows[i].doc._id + "' src='http://localhost:34966/rxhss58c.bmp'></img><a href='#note" + doc.rows[i].doc._id + "'>" + doc.rows[i].doc.texttitle + "</a></li>");               
            };
            var fakeListener = setInterval(function () {
                if ($("h1").css("text-align") === "center") {//check if css is loaded
                    //different colors for side notes
                    var color = ['#D12E5B', '#309663', '#D1C35C', '#5CC5D1', '#AD73C9', '#6E8C41', '#858585', '#D98A52', '#015A78', '#A35252', '#61635C', '#AECF76', '#544D94'];
                    $('li').each(function (i) {
                        $(this).css('background-color', color[i]);
                    })
                        .hover(
                        function (e) {
                            $(this).css('border', '2px dashed white');
                        },
                        function (e) {
                            $(this).css('border', '');
                        });
                    clearInterval(fakeListener);
                }
            }, 1);
        });
    }
    showNotes();
    //delete note on click
    $("#saved").on("click", "img[id^='delete']", function () {
        var noteToDelete = $(this).attr('id').substring(6);
        db.get(noteToDelete, function (err, doc) {
            db.remove(doc);
        });
        $(this).parent().hide('slow');
    });
    //edit note on name click
    $("#saved").on("click", "a", function () {
        noteToEdit = $(this).attr('href').substring(5);
        db.get(noteToEdit, function (err, doc) {
            $("#notetitle").val(doc.texttitle);
            $("#notebody").val(doc.textbody);
            $("#button").removeClass("button").addClass("update").val("Update");
        });
    });
    //update note
    $("body").on("click", ".update", function () {
        db.get(noteToEdit, function (err, doc) {
            return db.put({
                _id: noteToEdit,
                _rev:doc._rev,
                texttitle: $('#notetitle').val(),
                    textbody: $('#notebody').val()
            }, function (err, response) {
                if (err) {
                    alert("Error" + err);
                } else {
                    $("#button").removeClass("update").addClass("button").val("Save");
                    $('#notetitle').val("");
                    $('#notebody').val("");
                    showNotes();
                }
            });
        });       
    });

    //syncronize with iriscouch in cloud
    function sync() {
        //syncDom.setAttribute('data-sync-state', syncing);
        var opts = { live: true ,};
        db.replicate.to(remoteCouch, opts);
        db.replicate.from(remoteCouch, opts);
    }
    sync();
    //PouchDB.destroy('notesdb', function (err, info) { console.log(err + info); });

});
