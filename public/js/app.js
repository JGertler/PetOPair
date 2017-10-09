$(document).ready(function() {

  $("select").material_select();
  ///This toggles the profile view onOpen/onClose functions move the
  //button around

  $('.modal').modal({
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '4%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
    ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      console.log(modal, trigger);
    },
    complete: function() {
      console.log("modal closed")} // Callback for Modal close
  }
);



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
      $('#button-toggle-profile').text('Sniff Around')
      $('#button-toggle-profile').prependTo("#navbar");
    }, // A function to be called when sideNav is closed
  });



  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }


  var currentUser;
    $("#login-btn").on("click", loginData);

    function loginData(event) {
      event.preventDefault();


      var username = $("#login-name").val().trim();
      var password = $("#login-password").val().trim();



      var info = {
        username: username,
        password: password
      }

      $.post("/signin", info, function(userObject) {
        //console.log(userObject);
        currentUser=JSON.stringify(userObject);
        //  window.location.href ='/bulletin';
        window.location.href = '/profile';

      }).catch(function(data) {
      //  window.location.href='/';
        JSON.stringify(data);
        var message=$('<p>').text("Wrong user name or password!");
        message.css("color","red");
        $("#error-div").empty();
        $("#error-div").append(message);
        //console.log(data);
      })
    }

}); //end doc ready
