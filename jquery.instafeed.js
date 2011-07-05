/*
jquery.instafeed.js

http://instafeed.me/jquery-plugin

Copyright (c) 2011 c&c Design Consultants LTD - http://designcc.co.uk/

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
(function( $ ){
    $.fn.instafeed = function(options) {
        var settings = {
            'items' : 30
        };
        return this.each(function(){
            // set up the options
            if ( options ) {
                $.extend( settings, options );
            }
            // if there is no feed passed then bork
            if (options.jsonp == undefined){
                throw "jquery.instafeed.js requires you pass in {'jsonp' : 'http://instafeed.me/f/myfeed.json'} when you call the plugin";
            }
            // make $(this) accessible inside the getJSON function
            var holder = $(this);
            // hold the instagrams in an array
            var  instagrams = [];
            // load the json 
            $.getJSON(options.jsonp, function(data) {
              $.each(data, function(index, val ) {
                  if ( index == parseInt(settings.items) ){
                      return false;
                  }
                  img = '<a data-standard-resolution="' + val['images']['standard_resolution'] + '" href="' + val['link'] + '" title="' + val['caption'] + '"><img src="' + val['images']['thumbnail'] + '" alt="' + val['caption'] + '"></a>'
                  instagrams.push(img);
              });
              // append to the document
              $('<div>', {
                  'class': 'instafeed-thumbnails',
                  html: instagrams.join('')
                }).appendTo(holder);
            });
        });
    };
})( jQuery );