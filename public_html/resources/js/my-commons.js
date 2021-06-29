
var jpdbBaseURL = "http://api.login2explore.com:5577";
var connToken = "90936571|-31948846965960543|90934225";

//var jpdbBaseURL = "http://api.jsonpowerdb.com:5577";
//var connToken = "1429107693|-280740700383286763|1429107683";

var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var empDBName = "HR-DEPT-DB";
var empRelationName = "EmployeeRel";
var userRelationName = "UserRel";

setBaseUrl(jpdbBaseURL);

var myName, myStatus;
var index_prim = "id";
var user_prim = "email";
var user_unique = ["phone"];
function checkSession() {
    console.log("Inside: checkSession()");
    var sessionStatus = isJpdbSessionTokenExists(connToken, empDBName, userRelationName);
    console.log("    sessionStatus: " + sessionStatus);
    if (sessionStatus === 400) {
        if (myStatus === "in") {
            window.location.href = "login.html";
        } else {
            return;
        }
    } else if (sessionStatus === 200) {
        if (myStatus === "out") {
            window.location.href = "home.html";
        } else {
            return;
        }
    }
    return;
}

function loadName() {
    var email = localStorage.getItem("userID");
    $("#myUser").html(email);
    return;
}

function loadHeader() {
    $("#myHeader").load("resources/header.html");
    currentTab();
    loadName();
}

function currentTab() {
    if (myName === "home") {
        $("#myhome").prop("class", "active");
    }
    if (myName === "profile") {
        $("#myprofile").prop("class", "active");
    }
    if (myName === "change") {
        $("#mychange").prop("class", "active");
    }
    if (myName === "form") {
        $("#myform").prop("class", "active");
    }
    return;
}

function loadFooter() {
    $("#myFooter").load("resources/footer.html");
}

function deleteSession() {
    var removeSession = removeSessionTokenFromJPDB(connToken, empDBName, userRelationName);
    if (removeSession === 200) {
        console.log("Session removed");
        localStorage.removeItem("rec_no");
        window.location.replace("login.html");
    } else
        return;
}
