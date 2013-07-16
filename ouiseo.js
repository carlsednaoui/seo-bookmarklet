(function() {
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

  function calculateCharLen(selector) {
    return $(selector).val().length;
  }

  function calculateImageAltTextCount() {
    var imgAltCount = 0;
    $.each($('img'), function(index) {
       if ($('img')[index].alt) imgAltCount++;
     });
    return imgAltCount == [] ? 0 : imgAltCount;
  }

  function calculateLinksWithTitleCount() {
    var linkTitleCount = 0;
    $.each($('a'), function(index) {
       if ($('a')[index].title !== '') linkTitleCount++;
     });
    return linkTitleCount == [] ? 0 : linkTitleCount;
  }

  function calculateNoFollowLinkCount() {
    var noFollowedLinkCount = 0;
    $.each($('a'), function(index) {
      if ($('a')[index].rel == 'nofollow') noFollowedLinkCount++;
    });
    return noFollowedLinkCount;
  }

  function initOuiseo() {
    (window.ouiseo = function() {
      $('head').append("<link rel='stylesheet' id='ouiseo-styles' href='http://carlsednaoui.s3.amazonaws.com/ouiseo/ouiseo.css'>");
      $("body").append("\
        <div id='ouiseo_frame'>\
        </div>\
        <div id='ouiseo' class='ouiseo'>\
          <div id='ouiseo-results'>\
            <div id='ouiseo-basic-seo'>\
              <h1>Basic SEO</h1>\
              <p class='ouiseo-basic-result'>Title (<span id='ouiseo-title-length'></span>): <input type='text' id='ouiseo-title' class='ouiseo-input-text'></p>\
              <p class='ouiseo-basic-result'>Meta Description (<span id='ouiseo-description-length'></span>): <input type='text' id='ouiseo-description' class='ouiseo-input-text'></p>\
              <p class='ouiseo-basic-result'>Meta Keywords (<span id='ouiseo-keywords-length'></span>): <textarea id='ouiseo-keywords' class='ouiseo-textarea'></textarea></p>\
              <p class='ouiseo-basic-result'>Images with alt text: <span id='ouiseo-images-with-alt-text'>0</span> out of <span id='ouiseo-images-on-page'>0</span> images.</p>\
              <p class='ouiseo-basic-result'>Links with title set: <span id='ouiseo-links-with-title-set'>0</span> out of <span id='ouiseo-links-on-page'>0</span> links. This page has <span id='ouiseo-no-followed-links-count'>0</span> nofollowed links.</p>\
            </div>\
          </div>\
        </div>");
        $("#ouiseo").fadeIn(750);

        $("#ouiseo_frame").click(function(event){
          $("#ouiseo").fadeOut(750);
          $("#ouiseo_frame").slideUp(500);
          setTimeout("$('#ouiseo_frame').remove()", 750);
          setTimeout("$('#ouiseo-styles').remove()", 750);
          setTimeout("$('#ouiseo').remove()", 750);
      });

      //////////////////////
      // Grab initial values
      //////////////////////

      // Title
      $('#ouiseo-title').val($('title').text());
      $('#ouiseo-title-length').text(calculateCharLen('#ouiseo-title'));

      // Meta Description
      $('#ouiseo-description').val($('meta[name=description]').attr('content'));
      $('#ouiseo-description-length').text(calculateCharLen('#ouiseo-description'));

      // Meta Keywords
      $('#ouiseo-keywords').val($('meta[name=keywords]').attr('content'));
      $('#ouiseo-keywords-length').text($('meta[name=keywords]').attr('content').split(',').length);

      // Images
      $('#ouiseo-images-on-page').text($('img').length);
      $('#ouiseo-images-with-alt-text').text(calculateImageAltTextCount());

      // Links
      $('#ouiseo-links-on-page').text($('a').length);
      $('#ouiseo-links-with-title-set').text(calculateLinksWithTitleCount());
      $('#ouiseo-no-followed-links-count').text(calculateNoFollowLinkCount());

      //////////////////////
      // Update values
      //////////////////////
      $('#ouiseo-title').keyup( function() { $('#ouiseo-title-length').text(calculateCharLen('#ouiseo-title')); });
      $('#ouiseo-description').keyup( function() { $('#ouiseo-description-length').text(calculateCharLen('#ouiseo-description')); });
      $('#ouiseo-keywords').keyup( function() { $('#ouiseo-keywords-length').text($('#ouiseo-keywords').val().split(',').length); });
    })();
  }
})();

// <a href="javascript:(function(){if(window.myBookmarklet!==undefined){myBookmarklet();}else{document.body.appendChild(document.createElement('script')).src='http://iamnotagoodartist.com/stuff/ouiseoframe2.js?';}})();">WikiFrame</a>

// Need to deal with HTTPS

// Highlight nofollowed links
// Headers H1: 1
// H2: 1
// H3: 43
// REL Canonical
// Meta Robots:
// Site cookie:
// Referrer URL:
// Social SEO

// DONT want
// Sitemap
// robots.txt