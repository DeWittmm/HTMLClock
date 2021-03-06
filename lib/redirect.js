var _accessToken = ""

//Local Storage: http://diveintohtml5.info/storage.html
$(document).ready(function() {
    if(typeof(Storage) == "undefined") {
        alert("Sorry, only supporting HTML5 local storage");
        return ;
    }
});

function redirect_init(hash) {
    var params = {};
    var queryString = location.hash.substring(1);
    var regex = /([^&=]+)=([^&]*)/g;
    var m;
    while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    localStorage["account_username"] = params["account_username"];
    localStorage["token_type"] = params["token_type"];
    localStorage["access_token"] = params["access_token"];
    
    //Invoke original callback 
    _auth_callback();
}