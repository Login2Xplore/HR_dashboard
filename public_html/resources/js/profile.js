/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function showUser() {
    var email = localStorage.getItem("userID");
    var jsonStr = {
        email: email
    };
    var getRequest = createGET_BY_KEYRequest(connToken, "Employee", "user", JSON.stringify(jsonStr));
    jQuery.ajaxSetup({async: false});
    var jsonObj = executeCommand(getRequest, irlPartUrl);
    if (jsonObj.status === 200) {
        var data = JSON.parse(jsonObj.data).record;
        $("#proemail").val(data.email);
        $("#proname").val(data.name);
        $("#prophone").val(data.phone);
    }
    jQuery.ajaxSetup({async: true});
    return;
}

function enableChange() {
    $("#proname").prop("disabled", false);
    $("#prophone").prop("disabled", false);
    $("#save").prop("disabled", false);
    $("#edit").prop("disabled", true);
    $("#name").focus();
}

function changeData() {
    var name = $("#name").val();
    var phone = $("#phone").val();
    jQuery.ajaxSetup({async: false});
    var changeObj = {
        email: localStorage.getItem("userID"),
        name: name,
        phone: phone
    };

    var setRequest = createSETRequest(connToken, JSON.stringify(changeObj), "Employee", "user", "DEFAULT", primaryKey = user_prim, uniqueKeys = user_unique);
    var responseObj = executeCommand(setRequest, "/api/iml/set");
    if (responseObj.status === 200) {
        alert("Update succesful!");
        $("#name").prop("disabled", true);
        $("#phone").prop("disabled", true);
        $("#save").prop("disabled", true);
        $("#edit").prop("disabled", false);
    } else {
        alert("Unable to make changes");
        window.location.reload();
    }
    jQuery.ajaxSetup({async: true});
    return;
}