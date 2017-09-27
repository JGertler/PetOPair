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
      $('#button-toggle-profile').text('actions')
      $('#button-toggle-profile').prependTo("#navbar");
    }, // A function to be called when sideNav is closed
  });



  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }


}); //end doc ready
