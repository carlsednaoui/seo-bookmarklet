;(function() {
  // The minimum version of jQuery required
  var v = '1.10.2';

  // Check if jQuery is present and jQuery version
  if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
    var done = false,
      script = document.createElement('script');

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
      // $('head').append("<link rel='stylesheet' id='ouiseo-styles' href='//carlsednaoui.s3.amazonaws.com/ouiseo/ouiseo.css'>");
      $('head').append("<link rel='stylesheet' id='ouiseo-styles' href='file:///Users/carl/sites/ouiseo/ouiseo.css'>");
      $('body').append(createHTML());
      initializeOuiseoHandlers();
      $("#ouiseo").fadeIn(250);
      // $('head').append(addOuiseoGA());

      // Remove ouiseo when user clicks outside of frame
      $("#ouiseo_frame").click(function(event) {
        $("#ouiseo").fadeOut(750);
        $("#ouiseo_frame").slideUp(750);
        setTimeout("$('#ouiseo_frame').remove()", 750);
        setTimeout("$('#ouiseo-styles').remove()", 750);
        setTimeout("$('#ouiseo-ga').remove()", 750);
        setTimeout("$('#ouiseo').remove()", 750);
      });
    })();

    function addOuiseoGA() {
      return "<script id='ouiseo-ga'>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-23209172-7', window.location.hostname);ga('send', 'pageview');</script>";
    }

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
      basicSection.appendChild(getHeaders());
      basicSection.appendChild(getCanonical());
      basicSection.appendChild(getCookie());
      container.appendChild(basicSection);

      var socialSection = createSocialSection();
      socialSection.appendChild(getFacebook());
      socialSection.appendChild(getTwitter());
      container.appendChild(socialSection);

      return container;
    }

    function createOuiseoContainer() {
      var container = document.createElement('div'),
          author    = document.createElement('h1');

      container.id        = 'ouiseo';
      container.className = 'ouiseo';
      author.id           = 'ouiseo-author';
      author.innerHTML    = 'Made by ';
      author.innerHTML   += '<a href="http://www.carlsednaoui.com?utm_campaign=ouiseo&utm_medium=widget-link&utm_source=ouiseo-browser-extension" target="_blank">Carl Sednaoui</a>';
      author.innerHTML   += ' - Open sourced on ';
      author.innerHTML   += '<a href="https://github.com/carlsednaoui/ouiseo" target="_blank">Github</a>';

      container.appendChild(author);

      return container;
    }

    ////////////////////////////////
    // Create Basic SEO Section
    ////////////////////////////////

    function createBasicSEOSection() {
      var div = document.createElement('div');
      div.id = 'ouiseo-basic-seo';

      var title = document.createElement('h2');
      title.innerHTML = 'SEO';

      div.appendChild(title);
      return div;
    }

    function getTitle() {
      var el = document.createElement('p'),
        span = document.createElement('span'),
        input = document.createElement('input');

      el.className = 'ouiseo-basic-result';
      span.id = 'ouiseo-title-length';
      input.type = 'text';
      input.id = 'ouiseo-title';
      input.className = 'ouiseo-input-text';

      var title = $('title').text() || '';
      var titleLen = 0;
      if ( !! title)
        titleLen = title.replace(/\n$/, '').length; // Remove last line return, if present

      span.innerHTML = titleLen;
      input.setAttribute('value', title); // Need to use setAttribute here so that value gets pased when appending child

      el.innerHTML = 'Title (';
      el.appendChild(span);
      el.innerHTML += ')';
      el.appendChild(input);

      return el;
    }

    function getDescription() {
      var el = document.createElement('p'),
        span = document.createElement('span'),
        input = document.createElement('input');

      el.className = 'ouiseo-basic-result';
      span.id = 'ouiseo-description-length';
      input.type = 'text';
      input.id = 'ouiseo-description';
      input.className = 'ouiseo-input-text';

      var metaDescription = $('meta[name=description]').attr('content') || '';
      var metaDescriptionLen = 0;
      if ( !! metaDescription)
        metaDescriptionLen = metaDescription.replace(/\n$/, '').length; // Remove last line return, if present

      span.innerHTML = metaDescriptionLen;
      input.setAttribute('value', metaDescription); // Need to use setAttribute here so that value gets pased when appending child

      el.innerHTML = 'Meta Description (';
      el.appendChild(span);
      el.innerHTML += ')';
      el.appendChild(input);

      return el;
    }

    function getKeywords() {
      var el = document.createElement('p'),
        span = document.createElement('span'),
        input = document.createElement('input');

      el.className = 'ouiseo-basic-result';
      span.id = 'ouiseo-keywords-length';
      input.type = 'text';
      input.id = 'ouiseo-keywords';
      input.className = 'ouiseo-input-text';

      var metaKeywords = $('meta[name=keywords]').attr('content') || '';
      var metaKeywordsLen = 0;
      if (metaKeywords !== '')
        metaKeywordsLen = metaKeywords.split(',').length;

      span.innerHTML = metaKeywordsLen;
      input.setAttribute('value', metaKeywords); // Need to use setAttribute here so that value gets pased when appending child

      el.innerHTML = 'Meta Keywords (';
      el.appendChild(span);
      el.innerHTML += ')';
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
      var el = document.createElement('p');
      el.className = 'ouiseo-basic-result';

      var imgCount = $('img').length,
        imgAltCount = calculateImageAltTextCount();

      el.innerHTML = 'Images with alt text: ';
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
      var el = document.createElement('p');
      el.className = 'ouiseo-basic-result';

      var linkCount = $('a').length,
        linkWithTitleCount = calculateLinksWithTitleCount(),
        noFollowLinkCount = calculateNoFollowLinkCount();

      el.innerHTML = 'Links with title set: ';
      el.innerHTML += linkWithTitleCount;
      el.innerHTML += ' out of ';
      el.innerHTML += linkCount;
      el.innerHTML += ' links. This page has ';
      el.innerHTML += noFollowLinkCount;
      el.innerHTML += ' nofollow links.';

      return el;
    }

    function getHeaders() {
      var el = document.createElement('p');
      el.className = 'ouiseo-basic-result';

      var hOneCount = $('h1').length || 0,
        hTwoCount = $('h2').length || 0,
        hThreeCount = $('h3').length || 0;

      el.innerHTML = 'H1: ';
      el.innerHTML += hOneCount;
      el.innerHTML += "<br> H2: ";
      el.innerHTML += hTwoCount;
      el.innerHTML += "<br> H3: ";
      el.innerHTML += hThreeCount;

      return el;
    }

    function getCanonical() {
      var el = document.createElement('p');
      el.className = 'ouiseo-basic-result';

      var canonicalCount = $("link[rel='canonical']").length || 0;
      el.innerHTML = 'Rel Canonical (';
      el.innerHTML += canonicalCount;
      el.innerHTML += ')';

      if (canonicalCount !== 0) {
        $.each($("link[rel='canonical']"), function(index) {
          el.innerHTML += '<br>';
          el.innerHTML += $("link[rel='canonical']")[index].href;
        });
      }

      return el;
    }

    function getCookie() {
      var el = document.createElement('p'),
        span = document.createElement('span'),
        input = document.createElement('input');

      el.className = 'ouiseo-basic-result';
      span.id = 'ouiseo-cookie-count';
      input.type = 'text';
      input.id = 'ouiseo-cookie';
      input.className = 'ouiseo-input-text';

      var cookie = document.cookie;
      input.setAttribute('value', cookie); // Need to use setAttribute here so that value gets pased when appending child
      span.innerHTML = '0';
      if (cookie !== '')
        span.innerHTML = cookie.split(';').length;

      el.innerHTML = 'Site cookie: (';
      el.appendChild(span);
      el.innerHTML += ')';
      el.appendChild(input);

      return el;
    }

    ////////////////////////////////
    // Create Social Section
    ////////////////////////////////

    function createSocialSection() {
      var div = document.createElement('div');
      div.id = 'ouiseo-social-section';

      return div;
    }

    //////////////////////////////
    // Get Facebook Data
    //////////////////////////////

    function getFacebook() {
      var result = document.createElement('div');
      title = document.createElement('h2');

      result.id = 'ouiseo-facebook';
      title.innerHTML = 'Facebook';
      result.appendChild(title);

      result.appendChild(createElWithSelector('FB App Id', 'fb-app-id', 'meta[property="fb:app_id"]'));
      result.appendChild(createElWithSelector('OG URL', 'fb-url', 'meta[property="og:url"]'));
      result.appendChild(createElWithSelector('OG Site Name', 'fb-site-name', 'meta[property="og:site_name"]'));
      result.appendChild(createElWithSelector('OG Title', 'fb-title', 'meta[property="og:title"]'));
      result.appendChild(createElWithSelector('OG Description', 'fb-description', 'meta[property="og:description"]'));
      result.appendChild(createElWithSelector('OG Type', 'fb-type', 'meta[property="og:type"]'));
      result.appendChild(createImageEl('OG Image', 'meta[property="og:image"]'));

      return result;
    }

    //////////////////////////////
    // Get Twitter Data
    //////////////////////////////

    function getTwitter() {
      var result = document.createElement('div');
      title = document.createElement('h2');

      result.id = 'ouiseo-twitter';
      title.innerHTML = 'Twitter';
      result.appendChild(title);

      result.appendChild(createElWithSelector('Card type', 'twitter-card-type', 'meta[name="twitter:card"]'));
      result.appendChild(createElWithAlternateSelector('Site', 'twitter-site', 'meta[name="twitter:site"]', 'meta[name="twitter:site:id"]'));
      result.appendChild(createElWithAlternateSelector('Creator', 'twitter-creator', 'meta[name="twitter:creator"]', 'meta[name="twitter:creator:id"]'));
      result.appendChild(createElWithSelector('Card title', 'twitter-card-title', 'meta[name="twitter:title"]'));
      result.appendChild(createElWithSelector('Card description', 'twitter-card-description','meta[name="twitter:description"]'));
      result.appendChild(createImageEl('Image', 'meta[name="twitter:image"]'));

      return result;
    }

    function createElWithAlternateSelector(name, title, first_selector, secondary_selector) {
      var el = document.createElement('p'),
        input = document.createElement('input'),
        result;

      el.className = 'ouiseo-social-result';
      input.type = 'text';
      input.id = 'ouiseo-' + title;
      input.className = 'ouiseo-input-text';


      el.innerHTML = name;

      if ($(first_selector)[0]) {
        result = $(first_selector)[0].content;
      } else if ($(secondary_selector)[0]) {
        el.innerHTML += ' ID';
        result = $(secondary_selector)[0].content;
      } else {
        result = '';
      }

      input.setAttribute('value', result);

      el.appendChild(input);
      return el;
    }

    function createElWithSelector(name, title, selector) {
      var el = document.createElement('p'),
        input = document.createElement('input'),
        result;

      el.className = 'ouiseo-social-result';
      input.type = 'text';
      input.id = 'ouiseo-' + title;
      input.className = 'ouiseo-input-text';

      result = $(selector)[0] ? $(selector)[0].content : '';

      el.innerHTML = name;
      input.setAttribute('value', result);

      el.appendChild(input);
      return el;
    }

    function createImageEl(name, selector) {
      var el = document.createElement('p');
      el.className = 'ouiseo-social-result';
      el.innerHTML = name;

      if ($(selector)[0]) {
        el.appendChild(document.createElement('div')); // To show images below title
        var img = document.createElement('img');
        img.src = $(selector)[0].content;
        img.className = 'ouiseo-social-image';
        el.appendChild(img);
      } else {
        el.innerHTML += ': none';
      }

      return el;
    }

    //////////////////////////////////////////
    // Initialize Handlers To Update Values
    //////////////////////////////////////////

    function initializeOuiseoHandlers() {
      function calculateCharLen(selector) {
        return $(selector).val().length;
      }

      $('#ouiseo-title').keyup(function() {
        $('#ouiseo-title-length').text(calculateCharLen('#ouiseo-title'));
      });
      $('#ouiseo-description').keyup(function() {
        $('#ouiseo-description-length').text(calculateCharLen('#ouiseo-description'));
      });
      $('#ouiseo-keywords').keyup(function() {
        $('#ouiseo-keywords-length').text($('#ouiseo-keywords').val().split(',').length);
      });
    }
  }
})();
