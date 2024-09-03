var params = {
    data: null,
    funcs: {
      displaySubject: null,
      learnMore: null,
    },
  }
  
  function onWindowLoad() {
    var base64String, resume, myVar;
  
    myVar = setTimeout(showPage, 3000);
  
    function showPage() {
      document.getElementById("loader").style.display = "none";
      document.getElementById("body-container").style.display = "block";
    }
  
    var ref = firebase.database().ref('jobs/');
    ref.on("value", snap);
  
    function snap(data) {
  
      params.funcs.learnMore = learnMore;
  
      var dataEntry = data.val();
      var keys = Object.keys(dataEntry);
      document.getElementById("block").style.display = "block";
  
      for (var i = keys.length - 1; i >= 0; i--) {
        var key = keys[i];
        var array = dataEntry[key];
  
        postJob();
  
        function postJob() {
  
          var jobDetailsBLock = jobContent();
          document.getElementById("block").innerHTML += jobDetailsBLock;
  
              function jobContent() {
            var strVar = "";
  
            strVar += "         <div class=\"box\">"
            strVar += "             <div class=\"row-details job-panel\">";
            strVar += "                 <div class=\"col col-1\">";
            strVar += "                     <p style=\"font-weight:bold;\"><span>" + array.company + "</span></p>";
            strVar += "                 </div>";
            strVar += "                 <div class=\"col col-2\">";
            strVar += "                     <p><span>" + array.location + "</span></p>";
            strVar += "                 </div>";
            strVar += "                 <div class=\"col col-3\">";
            strVar += "                     <p style=\"font-weight:bold;\"><span>" + array.position + "</span></p>";
            strVar += "                 </div>";
            strVar += "                 <div class=\"col col-4\">";
            strVar += "                     <p><button class=\"button\" type=\"button\" onclick=params.funcs.learnMore(" + '"' + array.id + '"' + ")>View More+</buttton></p>"
            strVar += "                 </div>";
            strVar += "             </div><br>";
            strVar += "       </div>";
            strVar += "";
            return strVar;
  
          }
        }
      }
    }
   }
  
  