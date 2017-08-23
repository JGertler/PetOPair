$(document).ready(function() {
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();

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

  // $('.material-icons').sideNav({
  //   menuWidth: 300, // Default is 300
  //   edge: 'right', // Choose the horizontal origin
  //   closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
  //   draggable: true, // Choose whether you can drag to open on touch screens,
  //   onOpen: function(el) {console.log("onOpen working")},
  //   onClose: function(el) {console.log("onCloseworking")},
  // });
  // $('select').material_select();


  // first slide of form switch to second slide of form on next
  $('#next1').click(function() {
    $('#slideOne').animate({
      width: 'toggle'
    });
    $('#slideTwo').animate({
      width: 'toggle'
    });
  });

  $('#next2').click(function() {
    $('#slideTwo').animate({
      width: 'toggle'
    });
    $('#slideThree').animate({
      width: 'toggle'
    });
  });

}); //end doc ready
