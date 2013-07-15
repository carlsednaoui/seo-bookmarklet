(function() {
  // Need to deal with HTTPS

  // The minimum version of jQuery we want
  var v = '1.10.2';

  // Check if jQuery is present and jQuery version
  if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
    var done      = false,
    script        = document.createElement('script');
    script.src    = 'http://ajax.googleapis.com/ajax/libs/jquery/' + v + '/jquery.min.js';

    script.onload = script.onreadystatechange = function() {
      if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
        done = true;
        initOuiseo();
      }
    };
    console.log('ouiseo loaded jQuery');
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    initOuiseo();
  }

  function initOuiseo() {
    (window.ouiseo = function() {
      $("body").append("\
        <div id='ouiseo_frame'>\
        </div>\
        <div id='ouiseo' style=''>\
          <div id='ouiseo-basic-seo'>\
            <p>Title: <input type='text' id='ouiseo-title' class='ouiseo-input-text'></p>\
            <p>Meta Description: <input type='text' id='ouiseo-description' class='ouiseo-input-text'></p>\
          </div>\
        </div>\
          <style type='text/css'>\
            #ouiseo_frame { position: fixed; width: 100%; height: 100%; top: 0; left: 0; background-color: rgba(255,255,255,.25); cursor: pointer; z-index: 900; }\
            #ouiseo { display: none; position: fixed; top: 10%; left: 10%; width: 80%; height: 80%; z-index: 999; border: 10px solid rgba(0,0,0,.5); margin: -5px 0 0 -5px; }\
            .ouiseo-input-text { width: 300px;}\
          </style>");
        $("#ouiseo").fadeIn(750);

        $("#ouiseo_frame").click(function(event){
          $("#ouiseo").fadeOut(750);
          $("#ouiseo_frame").slideUp(500);
          setTimeout("$('#ouiseo_frame').remove()", 750);
      });
      $('#ouiseo-title').val($('title').text());
      $('#ouiseo-description').val($('meta[name=description]').attr('content'));
    })();
  }
})();

// <a href="javascript:(function(){if(window.myBookmarklet!==undefined){myBookmarklet();}else{document.body.appendChild(document.createElement('script')).src='http://iamnotagoodartist.com/stuff/ouiseoframe2.js?';}})();">WikiFrame</a>