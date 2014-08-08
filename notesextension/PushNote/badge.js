//runs in background to live update the badge
$(function () {
    var db = new PouchDB('notesdb');
    var remoteCouch = 'https://notepad.iriscouch.com/pushnote';
    var oldbadge = 0;

    //check for changes
    db.info(function (err, info) {
        db.changes({
            since: info.update_seq,
            live: true
        }).on('change', showNotes);
    });
    //send the number of notes to chrome badge
    function newNotes(number) {
        number = number || '';
        chrome.browserAction.setBadgeText({ text: number });
    };
    //get the number of notes for badge
    function showNotes() {
        db.allDocs({ include_docs: true, descending: true }, function (error, doc) {
            if (oldbadge < doc.rows.length) {
                newNotes(doc.rows.length - oldbadge + '');
                console.log(doc.rows.length - oldbadge + '');
                oldbadge = doc.rows.length;
            }
        });
    };

    //sync with the cloud
    function sync() {
        var opts = { live: true };
        db.replicate.from(remoteCouch, opts);
    }
    sync();
})