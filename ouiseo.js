;(function() {
  // The minimum version of jQuery required
  var v = '1.10.2';

  // Check if jQuery is present and jQuery version
  if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
    var done = false,
      script = document.createElement('script');
    // script.src    = '//ajax.googleapis.com/ajax/libs/jquery/' + v + '/jquery.min.js';
    script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/' + v + '/jquery.min.js';

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
      // $('head').append("<link rel='stylesheet' id='ouiseo-styles' href='file:///Users/carl/sites/ouiseo/ouiseo.css'>");
      $('head').append("<link rel='stylesheet' id='ouiseo-styles' href='http://carlsednaoui.s3.amazonaws.com/ouiseo/ouiseo.css'>");
      $('body').append(createHTML());
      initializeOuiseoHandlers();
      $("#ouiseo").fadeIn(250);

      // Remove ouiseo when user clicks outside of frame
      $("#ouiseo_frame").click(function(event) {
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
      basicSection.appendChild(getHeaders());
      basicSection.appendChild(getCanonical());
      basicSection.appendChild(getCookie());
      container.appendChild(basicSection);

      var socialSection = createSocialSection();
      socialSection.appendChild(getFacebook());
      // socialSection.appendChild(getTwitter());
      container.appendChild(socialSection);

      return container;
    }

    function createOuiseoContainer() {
      var container = document.createElement('div');
      container.id = 'ouiseo';
      container.className = 'ouiseo';
      return container;
    }

    ////////////////////////////////
    // Create Basic SEO Section
    ////////////////////////////////

    function createBasicSEOSection() {
      var div = document.createElement('div');
      div.id = 'ouiseo-basic-seo';

      var title = document.createElement('h1');
      title.innerHTML = 'Basic SEO';

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
      el.innerHTML += '): ';
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
      el.innerHTML += '): ';
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
      el.innerHTML += '): ';
      el.appendChild(input);

      return el;
    }

    ////////////////////////////////
    // Create Social Section
    ////////////////////////////////

    function createSocialSection() {
      var div = document.createElement('div');
      div.id = 'ouiseo-social-section';

      var title = document.createElement('h1');
      title.innerHTML = 'Social';

      div.appendChild(title);
      return div;
    }

    function getFacebook() {
      var result = document.createElement('div');
          title  = document.createElement('h2');
      
      result.id = 'ouiseo-facebook';
      title.innerHTML = 'Facebook';
      result.appendChild(title);

      result.appendChild(getFacebookAppId());
      result.appendChild(getFacebookURL());
      result.appendChild(getFacebookSiteName());
      result.appendChild(getFacebookTitle());
      result.appendChild(getFacebookDescription());
      result.appendChild(getFacebookType());

      return result;

      // var img = function getFacebookImage(); //<meta property="og:image" content="http://davidwalsh.name/wp-content/themes/klass/img/facebooklogo.png"/>
      // // It's best to use a square image, as Facebook displays them in that matter. That image should be at least 50x50 in any of the usually supported image forms (JPG, PNG, etc.)
      // // The URL of an image which is used in stories published about this object. We suggest that you give us an image of at least 200x200 pixels. However, bigger is better, so if you have a 1500x1500 image that you can use, please give it to us. We downsample and crop it for for people using smaller-resolution devices but will use it on a larger device. The larger this image is, the better engagement stories featuring it will get. (Note: image sizes must be no more than 5MB in size.)
    }

    function getFacebookAppId() {
      var el = document.createElement('p'),
        input = document.createElement('input'),
        appIdCount;

      el.className = 'ouiseo-social-result';
      input.type = 'text';
      input.id = 'ouiseo-fb-app-id';
      input.className = 'ouiseo-input-text';
      appIdCount = $('meta[property="fb:app_id"]') ? $('meta[property="fb:app_id"]').length : 0;

      el.innerHTML = 'Facebook URL [fb:app_id]';

      if (appIdCount === 0) {
        el.innerHTML += ': ';
      } else {
        el.innerHTML += (' (');
        el.innerHTML += (appIdCount);
        el.innerHTML += ('): ');

        var result = '';
        $.each($('meta[property="fb:app_id"]'), function(index) {
          result += $('meta[property="fb:app_id"]')[index].content;
          result += ', ';
        });
        result = result.substring(0, result.length - 2); // Remove extra ', '
        input.setAttribute('value', result);
      }

      el.appendChild(input);
      return el;
    }

    function getFacebookURL() {
      var el = document.createElement('p'),
        input = document.createElement('input'),
        urlCount;

      el.className = 'ouiseo-social-result';
      input.type = 'text';
      input.id = 'ouiseo-fb-url';
      input.className = 'ouiseo-input-text';
      urlCount = $('meta[property="og:url"]') ? $('meta[property="og:url"]').length : 0;

      el.innerHTML = 'Facebook URL [og:url]';

      if (urlCount === 0) {
        el.innerHTML += ': ';
      } else {
        el.innerHTML += (' (');
        el.innerHTML += (urlCount);
        el.innerHTML += ('): ');

        var result = '';
        $.each($('meta[property="og:url"]'), function(index) {
          result += $('meta[property="og:url"]')[index].content;
          result += ', ';
        });
        result = result.substring(0, result.length - 2); // Remove extra ', '
        input.setAttribute('value', result);
      }

      el.appendChild(input);
      return el;
    }

    function getFacebookSiteName() {
      var el = document.createElement('p'),
        input = document.createElement('input'),
        siteNameCount;

      el.className = 'ouiseo-social-result';
      input.type = 'text';
      input.id = 'ouiseo-fb-site-name';
      input.className = 'ouiseo-input-text';
      siteNameCount = $('meta[property="og:site_name"]') ? $('meta[property="og:site_name"]').length : 0;

      el.innerHTML = 'Facebook URL [og:site_name]';

      if (siteNameCount === 0) {
        el.innerHTML += ': ';
      } else {
        el.innerHTML += (' (');
        el.innerHTML += (siteNameCount);
        el.innerHTML += ('): ');

        var result = '';
        $.each($('meta[property="og:site_name"]'), function(index) {
          result += $('meta[property="og:site_name"]')[index].content;
          result += ', ';
        });
        result = result.substring(0, result.length - 2); // Remove extra ', '
        input.setAttribute('value', result);
      }

      el.appendChild(input);
      return el;
    }

    function getFacebookTitle() {
      var el = document.createElement('p'),
        input = document.createElement('input'),
        titleCount;

      el.className = 'ouiseo-social-result';
      input.type = 'text';
      input.id = 'ouiseo-fb-title';
      input.className = 'ouiseo-input-text';
      titleCount = $('meta[property="og:title"]') ? $('meta[property="og:title"]').length : 0;

      el.innerHTML = 'Facebook URL [og:title]';

      if (titleCount === 0) {
        el.innerHTML += ': ';
      } else {
        el.innerHTML += (' (');
        el.innerHTML += (titleCount);
        el.innerHTML += ('): ');

        var result = '';
        $.each($('meta[property="og:title"]'), function(index) {
          result += $('meta[property="og:title"]')[index].content;
          result += ', ';
        });
        result = result.substring(0, result.length - 2); // Remove extra ', '
        input.setAttribute('value', result);
      }

      el.appendChild(input);
      return el;
    }

    function getFacebookDescription() {
      var el = document.createElement('p'),
        input = document.createElement('input'),
        descriptionCount;

      el.className = 'ouiseo-social-result';
      input.type = 'text';
      input.id = 'ouiseo-fb-description';
      input.className = 'ouiseo-input-text';
      descriptionCount = $('meta[property="og:description"]') ? $('meta[property="og:description"]').length : 0;

      el.innerHTML = 'Facebook URL [og:description]';

      if (descriptionCount === 0) {
        el.innerHTML += ': ';
      } else {
        el.innerHTML += (' (');
        el.innerHTML += (descriptionCount);
        el.innerHTML += ('): ');

        var result = '';
        $.each($('meta[property="og:description"]'), function(index) {
          result += $('meta[property="og:description"]')[index].content;
          result += ', ';
        });
        result = result.substring(0, result.length - 2); // Remove extra ', '
        input.setAttribute('value', result);
      }

      el.appendChild(input);
      return el;
    }

    function getFacebookType() {
      var el = document.createElement('p'),
        input = document.createElement('input'),
        typeCount;

      el.className = 'ouiseo-social-result';
      input.type = 'text';
      input.id = 'ouiseo-fb-type';
      input.className = 'ouiseo-input-text';
      typeCount = $('meta[property="og:type"]') ? $('meta[property="og:type"]').length : 0;

      el.innerHTML = 'Facebook URL [og:type]';

      if (typeCount === 0) {
        el.innerHTML += ': ';
      } else {
        el.innerHTML += (' (');
        el.innerHTML += (typeCount);
        el.innerHTML += ('): ');

        var result = '';
        $.each($('meta[property="og:type"]'), function(index) {
          result += $('meta[property="og:type"]')[index].content;
          result += ', ';
        });
        result = result.substring(0, result.length - 2); // Remove extra ', '
        input.setAttribute('value', result);
      }

      el.appendChild(input);
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
