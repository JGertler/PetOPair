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


var petObject;
function grabData_Pets(event) {
  event.preventDefault();
  var petArray = [];
  for (var i=1; i<numPets; i++){
    // get variables
    var pet_name = $("#pet_name"+i).val().trim(),
    pet_pic= $("#petPreview" +i).val().trim(),
    pet_type = $("#pet_type"+i).val().trim(),
    morning= $("#morning"+i).val().trim(),
    midday= $("#midday"+i).val().trim(),
    night= $("#night"+i).val().trim(),
    notes= $("#notes"+i).val().trim();
    var petInfo = {
      pet_name: pet_name,
      pet_pic: pet_pic,
      pet_type: pet_type,
      morning: morning,
      midday: midday,
      night: night,
      notes: notes
    };
    // push to array
    petArray.push(petInfo);
  } //end loop// ajax call because this is on the frontend
  $.post("/put_pet_in_db", petArray, function(petObject) {
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

//on click of "Submit" button, the grabdata function occurs
$("#grabdata_pets").on("click", grabData_Pets);
