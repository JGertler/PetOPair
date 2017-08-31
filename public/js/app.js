$(document).ready(function() {

  $("select").material_select();
  ///This toggles the profile view onOpen/onClose functions move the
  //button around

  $('#button-toggle-profile').sideNav({
    menuWidth: 300, // Default is 300
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on click
    draggable: true, // Choose whether you can drag to open on touch screens,
    onOpen: function(el) {
      $('#button-toggle-profile').prependTo("#slide-out");
      $('#button-toggle-profile').text('<<');
      $('#button-toggle-profile').css('float', 'right');
    }, // A function to be called when sideNav is opened
    onClose: function(el) {
      $('#button-toggle-profile').css('float', 'none');
      $('#button-toggle-profile').text('Profile')
      $('#button-toggle-profile').prependTo("#navbar");
    }, // A function to be called when sideNav is closed
  });



  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }







var i = 1;
  $('.progressBar .circle').removeClass().addClass('circle');
  $('.progressBar .bar').removeClass().addClass('bar');
  setInterval(function() {
    $('.progressBar .circle:nth-of-type(' + i + ')').addClass('active');
    
    $('.progressBar .circle:nth-of-type(' + (i-1) + ')').removeClass('active').addClass('done');
    
    $('.progressBar .circle:nth-of-type(' + (i-1) + ') .label').html('&#10003;');
    
    $('.progressBar .bar:nth-of-type(' + (i-1) + ')').addClass('active');
    
    $('.progressBar .bar:nth-of-type(' + (i-2) + ')').removeClass('active').addClass('done');
    
    i++;
    
    if (i==0) {
      $('.progressBar .bar').removeClass().addClass('bar');
      $('.progressBar div.circle').removeClass().addClass('circle');
        i = 1;
      }
    }, 1000);


}); //end doc ready
