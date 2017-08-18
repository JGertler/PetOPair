$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

    $('.material-icons').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
      onOpen: function(el) {console.log("onOpen working")}, 
      onClose: function(el) {console.log("onCloseworking")},
 });
    $('select').material_select();


//first slide of form switch to second slide of form on submit click
  $(".submitBtn").click(function(){
    $(".slideOne").toggle();
    $(".slideTwo").css("display","block");
}); 
}); //end doc ready
          