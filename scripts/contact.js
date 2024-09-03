/* SmtpJS.com - v3.0.0 */
// var Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };

function submitForm() {
  var name = document.forms["contact_form"]["firstname"].value;
  var email = document.forms["contact_form"]["email"].value;
  var phone = document.forms["contact_form"]["phone"].value;
  var comment = document.forms["contact_form"]["subject"].value;

  if(name == "" || email === "" || phone === "" || comment === "")
  {
    alert("please fill the full form!")
  }
  else
    sendEmail(name,phone,email,comment);
}

function sendEmail(name,phone,email,comment){
  debugger
   Email.send({
    Host : "smtpout.secureserver.net",
    port : 465,
    // Username: "webjunction2019@gmail.com",
    // Password: "ghqcreykfeucqryw",
    Username: "venkat@gvmshiring.com",
    Password: "Yerraiah@79",
    To: "venkat@gvmshiring.com",
    From: email,
    Subject: "Enquiry mail from "+ name+"",
    Body: "Name: "+ name +" <br /> <br /> Email: "+email+" <br />  <br /> Phone: "+phone+" <br /> <br /> Comment: "+comment+" ",
  }).then(
    window.alert("Mail sent successfully")
  );

}
