(function (e) {
    var f = function (a) {
        var b = a.oop.createProxy(a), c = []; b.addMessageListener = function (a, b) { return this.baseObject.addMessageListener(a, b) ? (c.push({ name: a, listener: b }), !0) : !1 }; b.removeMessageListener = function (a, b) { if (this.baseObject.removeMessageListener(a, b)) for (var d = 0; d < c.length; d++) if (c[d].name == a && c[d].listener == b) return c.splice(d, 1), !0; return !1 }; var d = function () { for (var b = 0; b < c.length; b++) a.removeMessageListener(c[b].name, c[b].listener); c = [] }; "undefined" != typeof window.addEventListener ?
        window.addEventListener("unload", function () { d() }, !1) : window.attachEvent("onunload", function () { d() }); return b
    }; e.KangoAPI = {
        _readyListeners: [], _readyFired: !1, createKangoProxy: function (a) { return f(a) }, onReady: function (a) { this._readyFired ? a() : this._readyListeners.push(a) }, closeWindow: function () { }, resizeWindow: function (a, b) { }, getBackgroundPage: function () { }, fireReady: function () {
            var a = KangoAPI.getBackgroundPage(); if (a) {
                var b = a.kango; b.array.forEach(b._externalObjects, function (c) {
                    "kango" == c ? window.kango =
                    KangoAPI.createKangoProxy(b) : window[c] = a[c]
                })
            } for (var c = 0; c < this._readyListeners.length; c++) this._readyListeners[c](); this._readyFired = !0
        }
    }
})(window);
