var _client_id = "";
var _type = ""; //code or token
var _application_state = "";
var _auth_callback = "";

//Placing in document ready for now, could be 
// initialized from any java script
$(document).ready(function() {
    // OAuth Lib
    var client_Id = "daa5e643bcb7355";
    var client_secret = "a779f8f3e499be59673b08b96dfc8e76670f14bf"
    var response_type = "token";
    var application_state = "login"
    var callback = function() {
      imgurCallback();
    }

    var json = {"client_id":client_Id, "response_type":response_type, "application_state":application_state, "callback":callback};

    init(json)
});

function init(json) {
    _client_id = json["client_id"];
    _type = json["response_type"];
    _application_state = json["application_state"];
    _auth_callback = json["callback"];
}

function login() {
    //Launch OAuth flow and redirect to the redirect URL
        
    var imgur_login = "https://api.imgur.com/oauth2/authorize?client_id=" + _client_id + "&response_type="  + _type + "&state=" + _application_state;
    
    var popUp = window.open(imgur_login, 'imgur login', 'height=550, width=550');
    if (window.focus) {
        popUp.focus()
        }
        
    return ;
}

function imgurCallback() {
    //Present popup
    
    var endpoint = "https://api.imgur.com/3/account/" + localStorage["account_username"];
    
    $.ajax({
       url         : endpoint,
       dataType    : "json",       
       crossDomain : true,
       async       : false,
       beforeSend: function (xhr) {
           //Auth Header
            xhr.setRequestHeader('Authorization','Bearer ' + localStorage["access_token"]);
        },
       success: function( json ) {
           alert("Imgur Username: " + json["data"]["url"]);
       },
       error: function( xhr, status, errorThrown ) {
           alert("😓 there was a problem... B-?" );
       }
    });
}