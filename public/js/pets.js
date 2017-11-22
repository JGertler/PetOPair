function readPetURL(input) {
    var elem = $(input);
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('petPreview').src =  e.target.result;
      }
      reader.readAsDataURL(elem.get(0).files[0]);
    }
  }

  //function which grab the pet data from the pet form and puts it into an object to route to the table
  var petObject;
  function grabData_Pets(event) {
    event.preventDefault();
      // get variables
      var pet_name = $("#pet_name").val().trim(),
      pet_pic= $("#petPreview").val().trim(),
      pet_type = $("#pet_type").val().trim(),
      morning= $("#morning").val().trim(),
      midday= $("#midday").val().trim(),
      night= $("#night").val().trim(),
      notes= $("#notes").val().trim();
      var petInfo = {
        pet_name: pet_name,
        pet_pic: pet_pic,
        pet_type: pet_type,
        morning: morning,
        midday: midday,
        night: night,
        notes: notes
      }
    // ajax call because this is on the frontend
    $.post("/put_pet_in_db", petInfo, function(petObject) {
      console.log(petInfo);
       console.log("heyhey" + petObject)
      //  console.log(userObject);
      window.location.href = '/profile';
      if (petObject == "data not entered correctly") {
        console.log("error -- this error will be more descript later depending on UX decisions")
      }
    }).catch(function(data) {
      //  window.location.href='/';
      //JSON.stringify(data);
      var message = $('<p>').text("Must add Pet Name");
      message.css("color", "red");
      $("#error-div").empty();
      $("#error-div").append(message);
      //console.log(data);
    })
  } // end grabdata function

$(document).ready(function() {
  //on click of "Submit" button, the grabdata function occurs
  $("#petForm").submit(grabData_Pets);

}); //end document ready
