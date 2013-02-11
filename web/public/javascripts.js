var $resonseTo404 = $("<p>The webpage requested is has not been archived. Please submit an archive request below.</p>");

var getWebPage = function (submittedUrl) {
  $.ajax({
    url: "http://0.0.0.0:8080/" + submittedUrl,
    success: function(data){
      $("#webpage").append(data);
    },
    statusCode: {
      404: function(){
        $("#webpage").append($resonseTo404);
      }
    }
  });
};

$(document).ready(function(){
  $("#retrieve").click(function(){
    var submittedUrl = $("#urlToRetrieve").val()
    getWebPage(submittedUrl);
  });
});