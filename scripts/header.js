function onWindowLoad() {
    var headerContent = headerFunction();
    document.getElementById("header").innerHTML += headerContent;

    function headerFunction() {
        var strVar = "";
        strVar += "<a href=\"index.html\">";
        strVar += "<img class=\"logo\" src=\"images/GVMS-LOGO.svg\" style=\"position:initial;top: 10px;\"></a>"
        strVar += "    <div class=\"topnav\" id=\"myTopnav\">"
        strVar += "<a href=\"#\"></a>"
        strVar += "<a class=\"home\" href=\"index.html\" target=\"_self\">Home</a>"
        strVar += "<a class=\"about\" href=\"aboutUs.html\" target=\"_self\">About Us</a>"
        strVar += "<div class=\"dropdown\"><a class=\"services\" href=\"services.html\" target=\"_self\" style=\"padding: 0;\"></a>"
        strVar += "<button class=\"dropbtn\">Services<i class=\"fa fa-caret-down\"></i> </button>"
        strVar += "<div class=\"dropdown-content\">"
        strVar += "<a href=\"consulting.html\" target=\"_self\" class=\"consulting\">Consulting</a>"
        strVar += "<a href=\"itStaffing.html\" class=\"ItStaffing\" target=\"_self\">IT Staffing</a>"
        strVar += " <a href=\"specialities.html\" class=\"specialities\" target=\"_self\">Specialities</a>"
        strVar += "</div>"
        strVar += "</div>"
        strVar += "<a href=\"clients.html\" class=\"clients\" target=\"_self\">Clients</a>"
        strVar += "<a href=\"careers.html\" class=\"careers\" target=\"_self\">Careers</a>"
        strVar += "<a href=\"javascript:void(0);\" style=\"font-size:25px;\" class=\"icon\" onclick=\"myFunction()\">&#9776;</a>"
        strVar += "<a class=\"contact\" href=\"contact.html\">Contact</a>"
        strVar += "</div>"
        strVar += "</div>"
        strVar += "";
        return strVar;
    }

}