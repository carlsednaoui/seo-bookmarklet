;(function() {
  // The minimum version of jQuery required
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
    console.log('ouiseo loaded jQuery v%s', v);
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    initOuiseo();
  }

  function initOuiseo() {
    (window.ouiseo = function() {
      // Add ouiseo
      $('head').append("<link rel='stylesheet' id='ouiseo-styles' href='http://carlsednaoui.s3.amazonaws.com/ouiseo/ouiseo.css'>");
      $('body').append(createHTML());
      initializeOuiseoHandlers();
      $("#ouiseo").fadeIn(250);

      // Remove ouiseo when user clicks outside of frame
      $("#ouiseo_frame").click(function(event){
        $("#ouiseo").fadeOut(750);
        $("#ouiseo_frame").slideUp(750);
        setTimeout("$('#ouiseo_frame').remove()", 750);
        setTimeout("$('#ouiseo-styles').remove()", 750);
        setTimeout("$('#ouiseo').remove()", 750);
      });
    })();

    function createHTML() {
      var html = '';
      html += createOuiseoFrame().outerHTML;
      html += createOuiseoBody().outerHTML;
      return html;
    }

    // Create ouiseo_frame -- allows user to close ouiseo
    function createOuiseoFrame() {
      var frame = document.createElement('div');
      frame.id = 'ouiseo_frame';
      return frame;
    }

    // Call ouiseo html element creation functions
    function createOuiseoBody() {
      var container = createOuiseoContainer();

      var basicSection = createBasicSEOSection();
      basicSection.appendChild(getTitle());
      basicSection.appendChild(getDescription());
      basicSection.appendChild(getKeywords());
      basicSection.appendChild(getImages());
      basicSection.appendChild(getLinks());

      container.appendChild(basicSection);
      return container;
    }

    function createOuiseoContainer() {
      var container = document.createElement('div');
      container.id = 'ouiseo';
      container.className = 'ouiseo';
      return container;
    }

    function createBasicSEOSection() {
      var div = document.createElement('div');
      div.id = 'ouiseo-basic-seo';

      var title = document.createElement('h1');
      title.innerHTML = 'Basic SEO';

      div.appendChild(title);
      return div;
    }

    function getTitle() {
      var el    = document.createElement('p'),
          span  = document.createElement('span'),
          input = document.createElement('input');

      el.className     = 'ouiseo-basic-result';
      span.id          = 'ouiseo-title-length';
      input.type       = 'text';
      input.id         = 'ouiseo-title';
      input.className  = 'ouiseo-input-text';

      var title     = $('title').text() || '';
      var titleLen  = 0;
      if (!!title)
        titleLen  = title.length;

      span.innerHTML  = titleLen;
      input.setAttribute('value', title); // Need to use setAttribute here so that value gets pased when appending child

      el.innerHTML = 'Title (';
      el.appendChild(span);
      el.innerHTML += '): ';
      el.appendChild(input);

      return el;
    }

    function getDescription() {
      var el    = document.createElement('p'),
          span  = document.createElement('span'),
          input = document.createElement('input');

      el.className     = 'ouiseo-basic-result';
      span.id          = 'ouiseo-description-length';
      input.type       = 'text';
      input.id         = 'ouiseo-description';
      input.className  = 'ouiseo-input-text';

      var metaDescription     = $('meta[name=description]').attr('content') || '';
      var metaDescriptionLen  = 0;
      if (!!metaDescription)
        metaDescriptionLen  = metaDescription.length;

      span.innerHTML  = metaDescriptionLen;
      input.setAttribute('value', metaDescription); // Need to use setAttribute here so that value gets pased when appending child

      el.innerHTML = 'Meta Description (';
      el.appendChild(span);
      el.innerHTML += '): ';
      el.appendChild(input);

      return el;
    }

    function getKeywords() {
      var el    = document.createElement('p'),
          span  = document.createElement('span'),
          input = document.createElement('textarea');

      el.className     = 'ouiseo-basic-result';
      span.id          = 'ouiseo-keywords-length';
      input.id         = 'ouiseo-keywords';
      input.className  = 'ouiseo-input-text';

      var metaKeywords     = $('meta[name=keywords]').attr('content') || '';
      var metaKeywordsLen  = 0;
      if (metaKeywords !== '')
        metaKeywordsLen = metaKeywords.split(',').length;

      span.innerHTML  = metaKeywordsLen;
      input.innerHTML = metaKeywords;
      // input.setAttribute('value', metaKeywords); // Need to use setAttribute here so that value gets pased when appending child

      el.innerHTML = 'Meta Keywords (';
      el.appendChild(span);
      el.innerHTML += '): ';
      el.appendChild(input);

      return el;
    }

    function calculateImageAltTextCount() {
      var imgAltCount = 0;
      $.each($('img'), function(index) {
         if ($('img')[index].alt) imgAltCount++;
       });
      return imgAltCount == [] ? 0 : imgAltCount;
    }

    function getImages() {
      var el       = document.createElement('p');
      el.className = 'ouiseo-basic-result';

      var imgCount     = $('img').length,
          imgAltCount  = calculateImageAltTextCount();

      el.innerHTML  = 'Images with alt text: ';
      el.innerHTML += imgAltCount;
      el.innerHTML += ' out of ';
      el.innerHTML += imgCount;

      return el;
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

    function getLinks() {
      var el       = document.createElement('p');
      el.className = 'ouiseo-basic-result';

      var linkCount           = $('a').length,
          linkWithTitleCount  = calculateLinksWithTitleCount(),
          noFollowLinkCount   = calculateNoFollowLinkCount();

      el.innerHTML  = 'Links with title set: ';
      el.innerHTML += linkWithTitleCount;
      el.innerHTML += ' out of ';
      el.innerHTML += linkCount;
      el.innerHTML += ' links. This page has ';
      el.innerHTML += noFollowLinkCount;
      el.innerHTML += ' nofollow links.';

      return el;
    }

    function initializeOuiseoHandlers() {
      function calculateCharLen(selector) {
        return $(selector).val().length;
      }

      //////////////////////
      // Update values
      //////////////////////
      $('#ouiseo-title').keyup( function() { $('#ouiseo-title-length').text(calculateCharLen('#ouiseo-title')); });
      $('#ouiseo-description').keyup( function() { $('#ouiseo-description-length').text(calculateCharLen('#ouiseo-description')); });
      $('#ouiseo-keywords').keyup( function() { $('#ouiseo-keywords-length').text($('#ouiseo-keywords').val().split(',').length); });
    }
  }
})();

// Need to deal with HTTPS
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