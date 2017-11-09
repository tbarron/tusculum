// Next steps
//  + after adding a new frame, set its height to $(window).height()
//  + we don't need the buttons on the left anymore -- get rid of them
//  + encapsulate setting the iframe height in its own function
//  + call set_iframe_height() rather than the messy calls we have
//  + and document why we set the height to window height + 1
//
// It's easier to assemble big things from little things than it 
// is to break big things down into little things. So here we
// all the bits and pieces we need to put everything together.
var bcount = 1;
var url = 'src="https://en.wikipedia.org/wiki/Special:Random">'
var divtag = '<div class="row">';
var ifrtag = '<iframe class="appfrm col-md-12" ';
var ifrtail = '</iframe>';
var divtail = "</div>";

function add_frame() {
  // Assemble the HTML for the next article frame
  segment = divtag 
    + ifrtag + url + ifrtail 
    + divtail;

  // And stick the new frame on the end of the page
  $("body").append(segment);
  
  // Doing this once for the class in the window ready function doesn't
  // seem to apply to newly created members of the class. So we reissue
  // the class setting here, right after creating each new iframe.
  //$(".appfrm").css("height", $(window).height()+10);
  set_iframe_height();
}

// This function encapsulates the complexity of figuring out whether we've 
// hit the bottom of scrollable material or not. It's used in the 
// $(window).onscroll() function to decide when to add a new frame.
function hit_bottom() {
  return $(document).height() - $(window).height() <= 
      $(window).scrollTop()
}

// Set the iframe height
// We set the iframe height to the window height + 1 so that once the frame
// hits the bottom of its content, it will scroll within the window, triggering
// the onscroll event. If the iframe height is set to exactly the window height,
// it won't move in the window and the onscroll event won't fire.
function set_iframe_height() {
  $(".appfrm").css("height", $(window).height() + 1);
}

// When the document is ready...
$(document).ready(function() {
  // set the action for the first button
  $("#appbtn-0").on("click", function() {
    add_frame();
  })
})

// When the window is ready...
$(window).ready(function() {
  // set the height of the initial frame to $(window).height() plus a bit
  set_iframe_height();
})

// It seems that this has to be at the top level of javascript code,
// not inside the document ready function.
window.onscroll = function() {
  if (hit_bottom())
  {
    add_frame();
  }
}

/* ----- attic ---------------------------
function load_frame(fname) {
  size_frame(fname);
  // $(fname).src = "https://en.wikipedia.org/wiki/Special:Random";
  document.getElementById(fname).src = "https://en.wikipedia.org/wiki/Special:Random";
}

var frame_num = 0;

function frame_name() {
  return "my-frame-" + frame_num;
}

function next_frame() {
  frame_num++;
  return frame_name();
}

function size_frame(fname) {
  width = $(window).width() - 50;
  $(fname).css("width", width)
  //document.getElementById(fname).style.width = "" + width + "px";
  $(fname).css("height", $(window).height())  
  //document.getElementById(fname).style.height = "" + $(window).height() + "px";
}


function frame_loaded() {
  alert("loaded!")  
}

*/