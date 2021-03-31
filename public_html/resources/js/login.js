/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function checkUser() {
    var email = $("#logemail").val();
    var pwd = $("#logpwd").val();
    var jsonStr = {
        email: email,
        password : pwd    };
    var getRequest = createGET_BY_KEYRequest(connToken, "Employee", "user", JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommand(getRequest,irlPartUrl);
    if (jsonObj.status === 400) {
        $("#mymsg").html("Incorrect email or Password");
        $("#mymsg").fadeOut(4000);
        $("#logemail").val("");
        $("#logpwd").val("");
        $("#logemail").focus();
    } else if (jsonObj.status === 200) {
        createSession(email);
    }
    jQuery.ajaxSetup({async: true});
}

function createSession(email) {
//    console.log('creating token now');
    var sessionTokenStatus = createJpdbSessionToken(connToken, 1, "Employee", "user", email);
    if (sessionTokenStatus === 200) {
        if(localStorage.getItem("req-url") !== null){
            window.location.href = localStorage.getItem("req-url");
            localStorage.removeItem("req-url");
        }
        else window.location.replace("home.html");
    } else
    {
        $("#logemail").val("");
        $("#logpwd").val("");
        alert("Unable to login");
        return;
    }
    return;
}