var params = {
  data: null,
  funcs: {
    displaySubject: null,
    applyNow: null,
    closeToolTip: null,
    submitResume: null,
    getFile: null
  },

}
function onWindowLoad() {
  myVar = setTimeout(showPage, 3000);

  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("body-container").style.display = "block";
  }

  // var id = sessionStorage.getItem("key");
  
  var url = new URL(window.location.href);
  var id = url.searchParams.get("job");
  var base64String, resume, fileName;
  var ref = firebase.database().ref('jobs/');
  ref.on("value", snap);
 

  function snap(data) {

    params.funcs.applyNow = applyNow;
    params.funcs.closeToolTip = closeToolTip;
    params.funcs.submitResume = submitResume;
    params.funcs.getFile = getFile;

    var dataEntry = data.val();
    var keys = Object.keys(dataEntry);
    document.getElementById("block").style.display = "block";

    for (var i = keys.length - 1; i >= 0; i--) {
      var key = keys[i];
      var array = dataEntry[key];

      if (key === id) {
        document.getElementById("content-block-h1").innerText = array.position;
        postJob();
      }

      function postJob() {
        var jobDetailsBLock = jobContent();
        document.getElementById("block").innerHTML = jobDetailsBLock;

        function jobContent() {
          var strVar = "";
          strVar += "         <div class=\"box\">"
          strVar += "        <h2 class=\"name\" style=\"color:#05335491;text-align:left;margin:0;\">" + array.company + " <\/h2>";
          strVar += "       <p><label><b>Position:</b>  <span>" + array.position + "</span></label></p>";
          strVar += "       <p><label><b>Experience:</b>  <span>" + array.experience + "</span></label></p>";
          strVar += "       <p><label><b>Location:</b>  <span>" + array.location + "</span></label></p>";
          // strVar += "       <p><label><b>Job Description:</b>  <span>" + array.subject + "</span></p>";
          strVar += "       <p><label><b>Job Description:</b> </label<br> </p>";
          strVar += "       <p id=\"textArea\"  style=\"white-space:pre-wrap;line-height:20px;font-size:15px\"><text style=\" text-indent: 45px;\">" + array.subject + "</text></p>";
          strVar += "       <p class=\"p-apply\"><button class=\"button\" type=\"button\" onclick=params.funcs.applyNow(" + '"' + array.id + '"' + ")>Apply Now</buttton>";
          strVar += '        <button class=\"share-button\" type=\"button\" onclick="sharePost(\'' + array.id + '\')"><i class=\"fas fa-share-alt\"></i></button><\/p>';
          strVar += "       </div>";
          strVar += "       <br>";
          strVar += "";
          return strVar;

        }
      }
    }
  }

  function applyNow(key) {
    document.getElementById("uploadDetails").style.cssText = "display: block; top: 150px; width: 100%; height: 100%"
    tooltipHoverHandler();

    function tooltipHoverHandler() {
      var tooltip = tooltipContent();
      var ttContent = document.getElementById("uploadDetails");
      ttContent.innerHTML = tooltip;
    }

    function tooltipContent() {
      var strVar = "";
      strVar += "<div id=\"overlay\"></\div>"
      strVar += "  <div class=\"customTooltip\" >";
      strVar += "    <div class=\"tooltip-desc\">";
      strVar += "      <p class=\"close-btn\" onClick='params.funcs.closeToolTip()'><i class=\"fa fa-times\" aria-hidden=\"true\"></i></p>"
      strVar += "     <form action="+url.href+">"
      strVar += "    <div class=\"form\">";
      strVar += "       <label>Full Name:</label>";
      strVar += "      <input type=\"text\" id=\"userName\" name=\"username\" required />";
      strVar += "   <\/div>";
      strVar += "    <div class=\"form\">";
      strVar += "       <label>Email:  </label>";
      strVar += "      <input type=\"email\" name=\"email\"  id=\"userEmail\" required />";
      strVar += "   <\/div>";
      strVar += "    <div class=\"form\">";
      strVar += "       <label>Phone No:  </label>";
      strVar += "      <input type=\"tel\" name=\"phone\" id=\"userPhone\" placeholder=\"123-45-678\" maxlength=\"10\" required />";
      strVar += "   <\/div>";
      strVar += "    <div class=\"form\">";
      strVar += "       <label>Upload Resume:  </label>";
      strVar += "          <input type=\"file\" name=\"file\" title=\"pdf\" id=\"userResume\" style=\"padding-top:1px;color:transparent;border:none;cursor:pointer;resize:none\" onChange= params.funcs.getFile() accept=application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document required />";
      strVar += "   <\/div>";
      // strVar += "      <input class=\"submitBtn\" id=\"submit\" value=\"Submit\" type=\"submit\" onclick=params.funcs.submitResume(" + '"' + key + '"' + ")>"
      strVar += "      <button  class=\"submitBtn\" id=\"submit\" value=\"Submit\" type=\"button\" onclick=params.funcs.submitResume(" + '"' + key + '"' + ")>Submit</button>"
      strVar + "   </form>"
      strVar += "   <\/div>";
      strVar += "   <\/div>";
      strVar += "  <\/div>";
      strVar += "";
      return strVar;
    }
  }

  function getFile(e) {

    document.getElementById("userResume").style.color="black"
    var fi = document.getElementById("userResume");
    file = fi.files[0];
    console.log(file)
    fileName =  fi.files.item(0).name
    if ((file.type == "application/msword") || (file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      var reader = new FileReader();
      reader.onload = (e) => {
        base64String = reader.result
        resume = base64String;
      };

      reader.readAsDataURL(file);
    }
    else if (file.type == "application/pdf") {
      var newBlob = new Blob([file], { type: "application/pdf" })

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }
      resume = window.URL.createObjectURL(newBlob);
    }


  }

  function closeToolTip() {
    document.getElementById("uploadDetails").style.display = "none"
  }

  function submitResume(key) {
    var name = document.getElementById("userName").value;
    var email = document.getElementById("userEmail").value;
    var phone = document.getElementById("userPhone").value;
  debugger
    // if(resume && (name == "" || email== "" || phone==""))
    if(resume == undefined || name == "" || email== "" || phone=="")
    {
      alert("please fill the fields")
    }
    else{
    var newKey = ref.child('jobs' + key + '/users/').push().key;
  
    var obj;
    obj = {
      "userId": newKey,
      "name": name,
      "email": email,
      "phone": phone,
      "fileName": fileName,
      "resume": resume,
      "companyId": key
    }
  
    var updates = {};
    updates['/jobs/' + key + '/users/' + newKey] = obj;
    firebase.database().ref().update(updates);
  debugger
    document.getElementById("uploadDetails").style.display = "none"
    alert("Job applied Succesfully!");
  }
  }
  
}

function back() {
  window.location.href = "careers.html"
}