/**
 * Created by jasontao on 2016/6/19.
 */

; (function (win) {

    var fD = function (url, filename) {
        var _fD = function(url, filename, browser) {
            this.url =  url;
            this.filename = filename;
            this.browser = browser;
        };

        _fD.prototype = {
            'downloadByIframe': function() {
                if (!fD.getBrowser() === 'IE') new Error('only IE support downloadByIframe');

                var d = win.document;
                    var iframeEl= document.createElement('iframe');
                    iframeEl.src = this.url;
                    iframeEl.style.display = 'none';
                d.body.appendChild(iframeEl);
                //fixme add this in function "onload", But "onload" function not trigger. why?
                d.body.removeChild(iframeEl);
            },
            'downloadByCreateObjectURL': function() {
                if (fD.getBrowser() !== 'IE') new Error('downloadByCreateObjectURL not support IE');
                var d = document;
                var event = d.createEvent('MouseEvents');
                var aEl = document.createElement("a");

                //fixme: initEvent is effective.
                event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, aEl);

                    aEl.href = this.url;
                    aEl.download = this.filename;
                    aEl.style.display = 'none';
                d.body.appendChild(aEl);

                aEl.dispatchEvent(event);
                d.body.removeChild(aEl);
            }
        };

        return new _fD(url, filename, fD.getBrowser());
    };

    fD.getBrowser = function () {
        var userAgent = win.navigator.userAgent;
        var isOpera = userAgent.indexOf('Opera') > -1;
        var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera;
        var isFF = userAgent.indexOf('Firefox') > -1;
        var isChrome = userAgent.indexOf('Chrome') > -1;
        if (isIE)     return 'IE';
        if (isFF)     return 'FF';
        if (isOpera)  return 'Opera';
        if (isChrome) return 'Chrome';
    };

    if (typeof module != 'undefined' && module.exports && this.module !== module) { module.exports = fD }
    else if (typeof define === 'function' && define.amd) { define(fD) }
    else { win.fD = fD };
})(Function('return this')());