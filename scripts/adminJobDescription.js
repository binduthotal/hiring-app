var params = {
  data: null,
  funcs: {
    deletePost: null,
    editPost: null,
    sharePost: null
  },

}

function onWindowLoad() {
  myVar = setTimeout(showPage, 3000);

  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("body-container").style.display = "block";
  }

  var base64String, resume, com, pos, exp, loc, sub;

  var url = new URL(window.location.href)
  var id = url.searchParams.get("job");
    // var id = sessionStorage.getItem("key");

  var ref = firebase.database().ref('jobs/');
  ref.on("value", snap);


  function snap(data) {

    params.funcs.deletePost = deletePost;
    params.funcs.editPost = editPost;
    params.funcs.sharePost = sharePost;

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
          com = array.company;
          pos = array.position;
          exp = array.experience;
          loc = array.location;
          sub = array.subject;
          var strVar = "";

          // display-withOutEdit
          strVar += "        <div class=\"box\" id=\"display-withOutEdit\">"
          strVar += "        <h2 class=\"name\" style=\"color:#05335491;text-align:left;margin:0;\">" + array.company + " <\/h2>";
          strVar += "       <p><label><b>Position:</b>  <span>" + array.position + "</span></label></p>";
          strVar += "       <p><label><b>Experience:</b>  <span>" + array.experience + "</span></label></p>";
          strVar += "       <p><label><b>Location:</b>  <span>" + array.location + "</span></label></p>";
          // strVar += "       <p><label><b>Job Description:</b>  <span>" + array.subject + "</span></p>";
          strVar += "       <p><label><b>Job Description:</b> </label<br> </p>";
          strVar += "       <p id=\"textArea\"  style=\"white-space:pre-wrap;line-height:20px;font-size:15px\"><text style=\" text-indent: 45px;\">" + array.subject + "</text></p>";
          strVar += "       <p class=\"delete-button\">";
          strVar += "      <button class=\"button\" type=\"button\" onclick=params.funcs.deletePost(" + '"' + array.id + '"' + ")>Delete Post</button>";
          strVar += '       <button class=\"button\" type=\"button\" style=\"margin-left:20px\" onclick="params.funcs.editPost(\'' + array.id + '\',\'' + com + '\',\'' + pos + '\',\'' + loc + '\',\'' + exp + '\')">Edit Post</button>';
          strVar += '        <button class=\"share-button\" type=\"button\" onclick="params.funcs.sharePost(\'' + array.id + '\')"><i class=\"fas fa-share-alt\"></i></button><\/p>';
          strVar += "       </div>";

          // display-withEdit
          strVar += "         <div class= \"box\" id=\"display-withEdit\" style=\"display:none;\"></div>";
          strVar += "       <br>";
          strVar += "";
          return strVar;
        }
      }
    }
  }

  function deletePost(key) {
    var currentRef = firebase.database().ref('jobs/' + key);
    currentRef.remove();

    alert("Deleted Successfully")
    window.location.href = "adminJobPosting.html";
  }

  function editPost(key) {
    console.log("com: ", com)
    console.log("pos: ", pos)
    console.log("loc: ", loc)
    console.log("exp: ", exp)
    console.log("sub: ", sub)
    document.getElementById("display-withOutEdit").style.display = "none";
    document.getElementById("display-withEdit").style.display = "block";
    editJObDetails()
    function editJObDetails() {
      var jobDetailsBLock = jobContent();
      document.getElementById("display-withEdit").innerHTML = jobDetailsBLock;

      function jobContent() {
        var strVar = "";

        // display-withEdit
        strVar += "     <form>"
        strVar += '        <h2 class=\"name\" style=\"color:#05335491;text-align:left;margin:0;\"><input id=\"com\" type=\"text\" name=\"company\" value=\'' + com + '\'  name=\"company\" required><\/h2>';
        strVar += '       <p><label><b>Position:</b></label><input id=\"pos\" type=\"text\" name=\"position\" value=\'' + pos + '\' name=\"position\" required></p>';
        strVar += '       <p><label><b>Experience:</b></label><input id=\"exp\" type=\"text\" name=\"experience\" value=\'' + exp + '\' name=\"exp\" required></p>';
        strVar += '       <p><label><b>Location:</b></label><input id=\"loc\" type=\"text\" name=\"location\" value=\'' + loc + '\' name=\"location\" required></p>';
        strVar += '       <p><label><b>Job Description:</b><textarea id=\"sub\" type=\"text\" name=\"subject\" name=\"subject\" required>\'' + sub + '\'</textarea></p>';
        strVar += '       <p><button class=\"button\" type=\"button\" onclick=params.funcs.deletePost(\'' + key + '\')>Delete Post</button>';
        strVar += '       <input class=\"button\" type=\"submit\" value=\"Save\" onclick="save(\'' + key + '\')" style=\"margin-left:20px;width:auto;border-radius:30px;border: #11e2e2 solid 1px;\"></p>';
        strVar + "   </form>"
        strVar += '       <br>';
        strVar += '';
        return strVar;
      }
    }
  }

  // function sharePost() {
  //   navigator.clipboard.writeText(window.location.href);//Copies text to clipboard
  //   alert("Link copied : "+  window.location.href);
  // }
}


function save(key) {
  var jobName = document.getElementById("com").value;
  var position = document.getElementById("pos").value;
  var exp = document.getElementById("exp").value;
  var location = document.getElementById("loc").value;
  var description = document.getElementById("sub").value;

  if (description === "" || jobName === "" || position === "" || location === "" || exp === "") {
    // alert("please fill the fields")
  }
  else {
    var ref = firebase.database().ref('jobs/');
    var obj = {
      "company": jobName,
      "position": position,
      "experience": exp,
      "location": location,
      "subject": description
    }

    firebase.database().ref(`/jobs/${key}`).update(obj);

    alert("Job updated successfully")
    document.getElementById("display-withOutEdit").style.display = "block";
    document.getElementById("display-withEdit").style.display = "none";
  }
}


function back() {
  window.location.href = "adminJobPosting.html"
}

