function sendMail() {
    var mail = $("#email").val();
    var jsonStr = {
        email: mail
    };
    var getRequest = createGET_BY_KEYRequest(connToken, empDBName, userRelationName, JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommand(getRequest, irlPartUrl);
    if (jsonObj.status === 200) {
        var pwd = createPwd();
        var jsonStr = {
            "emailTo": mail,
            "emailCc": "mitika.project@gmail.com",
            "emailSubject": "Password Reset",
            "emailContent": "Here's the new password for " + mail + " : " + pwd + ".\nPlease reset it yourself."
        };
        var sendRequest = createEmailToSendReq(connToken , JSON.stringify(jsonStr));
        var jsonObj = executeCommand(sendRequest, "/serverless/send_email");
        if (jsonObj.status === 200) {
            var changeObj = {
                email : mail,
                password: pwd,
            };
            var setRequest = createSETRequest(connToken , JSON.stringify(changeObj), empDBName, userRelationName, "UPDATE", pkUserEmailID, ukUserMobileNo);
            var responseObj = executeCommand(setRequest, "/api/iml/set");
            if (responseObj.status === 200){
                alert("Mail sent!");
                $("#email").val("");
            }
        }
    }
    else{
        alert("Email ID not registered");
        window.location = "register.html";
    }
    jQuery.ajaxSetup({async: true});
    return;
}

function createPwd() {
    var max = 999999;
    var min = 100000;
    return Math.floor(min + Math.random() * (max - min + 1));
}