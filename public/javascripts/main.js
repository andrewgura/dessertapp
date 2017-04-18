//Delete Record
$(document).ready(function(){
  //Creates a popup asking for confirmation for a deleteion
  $('.delete-tic').on('click', function(){
    var id = $(this).data('id');
    var url = '/delete/' + id;
      if(confirm("Delete Entry?")){
        $.ajax({
          url: url,
          type: "DELETE",
          success: function(result){
            console.log("Entry Deleted");
            window.location.href= "/";
          },
          //Logs any error
          error: function(err){
              console.log(err);
          }
        })
      }
  })
});

//Edit Record, fills the Modal with entry you choose to edit
$(document).ready(function(){
$('.edit-tic').on('click', function(){
  $("#edit-form-name").val($(this).data("name"));
  $("#edit-form-description").val($(this).data("description"));
  $("#edit-form-picture").val($(this).data("picture"));
  $("#edit-form-id").val($(this).data("id"));
});
});
