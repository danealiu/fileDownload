# fileDownload
download a file without open a new window.

## Installation
npm install -g bower
bower install --save fileDownload

## Example
###IE
```javascript
        var url = '//code.jquery.com/jquery-3.0.0.min.js';
        var fileName = 'jquery-3.0.0.min.js';
        var fileDownload = fD(url, fileName);
        fileDownload.downloadByIframe();
```

###others
```javascript
        var url = '//code.jquery.com/jquery-3.0.0.min.js';
        var fileName = 'jquery-3.0.0.min.js';
        var fileDownload = fD(url, fileName);
        fileDownload.downloadByCreateObjectURL();
```