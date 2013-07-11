// Need to deal with HTTPS
if (!($ == window.jQuery)) {  // load jQuery if not present
  script        = document.createElement( 'script' );
  script.src    = 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js';
  script.onload = ouiseo;

  document.body.appendChild(script);
  console.log('ouiseo loaded jQuery');
} else {
  ouiseo();
}

function ouiseo() {
  console.log('ouiseo has been loaded');
}
