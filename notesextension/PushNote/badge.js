//runs in background to live update the badge
$(function () {
    var db = new PouchDB('notesdb');
    var remoteCouch = 'https://notepad.iriscouch.com/pushnote';
    var checkInterval = parseInt(localStorage.getItem('checkInterval')) * 1000;
    var interval;

    //listen for messages from popup and modify the check interval 
    chrome.runtime.onMessage.addListener(
    function (request) {
        console.log(request);
        clearInterval(interval);
        checkInterval = parseInt(request) * 1000;
        interval = setInterval(intervalFunction, checkInterval);
    });

    ////replicationfilter function
    //function filterByUserPass(doc) {
    //    //console.log(doc);
    //    if (doc.notetext=='123') {
    //        console.log("filter:" + doc);
    //        return true;
    //    }
    //}
    //setup the check interval for new notes on cloud
    function intervalFunction() {
        db.replicate.from(remoteCouch, { continous: false/*, filter:filterByUserPass  */});
        db.allDocs({ include_docs: true, descending: true }, function (error, doc) {
            console.log("Doc:" + doc + "or error:" + error);
            chrome.browserAction.setBadgeText({ text: doc.rows.length + '' });
        });
    };

    interval = setInterval(intervalFunction, checkInterval);
})