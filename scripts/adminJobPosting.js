
var params = {
    data: null,
    funcs: {
        closeToolTip: null,
        submitPost: null
    },
}

function enterJobDetails() {
    document.getElementById("jobTooltip").style.display = "block";
    params.funcs.closeToolTip = closeToolTip;
    params.funcs.submitPost = submitPost;

    tooltipHoverHandler();

    function tooltipHoverHandler() {
        var tooltip = tooltipContent();
        var content = document.getElementById("jobTooltip");
        content.innerHTML = tooltip;
    }

    function tooltipContent() {
        var strVar = "";
        strVar += "<div id=\"overlay\"></\div>"
        strVar += "  <div class=\"customTooltip\" >";
        strVar += "    <div class=\"tooltip-desc\">";
        strVar += "    <h2 style=\"text-align:center;margin:0;\">Enter job details</h2>";
        strVar += "      <p class=\"close-btn\" onClick='params.funcs.closeToolTip()'><i class=\"fa fa-times\" aria-hidden=\"true\"></i></p>"
        strVar += "     <form>"
        strVar += "    <div class=\"form\">";
        strVar += "       <label>Company:</label>";
        strVar += "      <input class=\"\" type=\"text\" name=\"companyName\" id=\"companyName\" placeholder=\"Company Name\" required>";
        strVar += "   <\/div>";

        strVar += "    <div class=\"form\">";
        strVar += "       <label>Position:  </label>";
        strVar += "      <input class=\"\" type=\"text\" id=\"jobPosition\" name=\"jobPosition\" placeholder=\"Designation\" required>";
        strVar += "   <\/div>";

        strVar += "    <div class=\"form\" style=\"display:flex;\">";
        strVar += "       <label style=\"padding-right: 10px;padding-top: 5px;\">Experience:  </label>";
        strVar += "      <select id='expFrom'  style=\"height:35px;padding:0;\">";
        for (var i = 0; i <= 30; i++) {
            strVar += '<option val=' + i + '>' + i + '</option>';
        }
        strVar += "     </select>"
        strVar += "     <p  style=\"padding-left:10px;padding-right:10px;display:inline;margin:0;color:black\">to</p>"
        strVar += "     <select id='expTo' style=\"height:35px;padding:0;\">";
        for (var i = 0; i <= 30; i++) {
            strVar += '<option val=' + i + '>' + i + '</option>';
        }
        strVar += "</select>"
        strVar += "<p  style=\"padding:0;padding-left:10px;padding-right:10px;display:inline;margin:0;color:black\">Years</p>"
        strVar += "   <\/div>";

        strVar += "    <div class=\"form\">";
        strVar += "       <label>Location:  </label>";
        strVar += "      <input class=\"\" type=\"text\" name=\"location\" id=\"jobLocation\" placeholder=\"Location\" required>";
        strVar += "   <\/div>";
        strVar += "    <div class=\"form\">";
        strVar += "       <label>Job Description:  </label>";
        strVar += "          <textarea id=\"joDdescription\" name=\"subject\" placeholder=\"Job Description\" style=\"height:50px;\" required></textarea>"
        strVar += "   <\/div>";
        strVar += "      <input class=\"submitBtn\" type=\"submit\" value=\"Submit\" onclick=\"return params.funcs.submitPost()\">"
        strVar + "   </form>"
        strVar += "   <\/div>";
        strVar += "   <\/div>";
        strVar += "  <\/div>";
        strVar += "";
        return strVar;
    }

    function closeToolTip() {
        document.getElementById("jobTooltip").innerHTML = ""
    }
}

function submitPost() {
    var jobName = document.getElementById("companyName").value;
    var position = document.getElementById("jobPosition").value;
    var exp1 = document.getElementById("expFrom").value;
    var exp2 = document.getElementById("expTo").value;
    var location = document.getElementById("jobLocation").value;
    var description = document.getElementById("joDdescription").value;
    if((parseInt(exp1) > 0 ) && (parseInt(exp1) >= parseInt(exp2))){
    // if(parseInt(exp1) >= parseInt(exp2)){
        alert('experiance from" should be less than "experiance to')
        return false;
    }
    else{
        var exp = exp1.toString() + " to " + exp2.toString() + " years";

        if (description == "" || jobName == "" || position == "" || location == ""){
            alert("please fill the fields")
            return false;
        }
        else {
            var ref = firebase.database().ref('jobs/');
            var newKey = ref.child('jobs').push().key;
            var obj = {
                "id": newKey,
                "company": jobName,
                "position": position,
                "experience": exp,
                "location": location,
                "subject": description,
                "time": new Date().toLocaleString()
            }
            var updates = {};
            updates['/jobs/' + newKey] = obj;
            firebase.database().ref().update(updates);
    
            // ref.push(obj);
    
            document.getElementById("jobTooltip").style.display = "none"
            alert("Job posted successfully")
            return false
            // window.location.reload();
        }
    }
  
} // End if Submit Post 




