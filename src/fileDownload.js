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
                var isIE = fD.getBrowser().indexOf('IE') === -1;
                if (!isIE) new Error('only IE support downloadByIframe');

                var d = win.document;
                    var iframeEl= document.createElement('iframe');
                    iframeEl.src = this.url;
                    iframeEl.style.display = 'none';
                d.body.appendChild(iframeEl);
                //fixme add this in function "onload", But "onload" function not trigger. why?
                d.body.removeChild(iframeEl);
            },
            'downloadByCreateObjectURL': function() {
                var isIE = fD.getBrowser().indexOf('IE') === -1;
                if (isIE) new Error('downloadByCreateObjectURL not support IE');
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
        if (isIE) {
            var IE5 = IE55 = IE6 = IE7 = IE8 = false;
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            IE55 = fIEVersion == 5.5;
            IE6 = fIEVersion == 6.0;
            IE7 = fIEVersion == 7.0;
            IE8 = fIEVersion == 8.0;
            if (IE55) {
                return 'IE5';
            }
            if (IE6) {
                return 'IE6';
            }
            if (IE7) {
                return 'IE7';
            }
            if (IE8) {
                return 'IE8';
            }
        }
        if (isFF) {
            return 'FF';
        }
        if (isOpera) {
            return 'Opera';
        }
        if (isChrome) {
            return 'Chrome';
        }
    };

    if (typeof module != 'undefined' && module.exports && this.module !== module) { module.exports = fD }
    else if (typeof define === 'function' && define.amd) { define(fD) }
    else { win.fD = fD };
})(Function('return this')());