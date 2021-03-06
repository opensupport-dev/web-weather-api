function ipGeoLocation(){
    var ipLocURL = "http://ipinfo.io/";
    ipLocURL += "json";
       
    httpRequest = new XMLHttpRequest();
    if(!httpRequest) {
        alert('could not XML-HTTP instance.');
        //return false;
    }
    httpRequest.open("GET", ipLocURL, true);
    function alertContents() {
        try {
          if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
              alert(httpRequest.responseText);
            } else {
              alert('There was a problem with the request.');
            }
          }
        }
        catch( e ) {
          alert('Caught Exception: ' + e.description);
        }
    }
    //httpRequest.onreadystatechange = alertContents;
    httpRequest.onreadystatechange = function(response) {
        if(httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status == 200)
        {
            //console.log("response: ", response);
            //alert(httpRequest.responseText);
            var text = httpRequest.responseText;
            console.log("responseText: ",text);
            text = text.replace(/(<([^>]+)>)/ig,"");
            text = '[' + text + ']';

            var jsonObj = JSON.parse(text);
            console.log("jsonObj: ",jsonObj);
            var ip = jsonObj[0].ip;
            var city = jsonObj[0].city;
            var region = jsonObj[0].region;
            var country = jsonObj[0].country;
            var loc = jsonObj[0].loc;
            var org = jsonObj[0].org;

            var lats = loc.split(',')[0];
            var lngs = loc.split(',')[1];
            
          /*    
            var ip = response.ip;
            var city = response.city;
            var region = response.region;
            var country = response.country;
            var lats = response.loc.split(',')[0];
            var lngs = response.loc.split(',')[1];
            var org = response.org;
          */  
            console.log("ip: ", ip);
            console.log("city: ", city);
            console.log("region: ", region);
            console.log("country: ", country);
            console.log("latitude: ", lats);
            console.log("logitude: ", lngs);
            console.log("organization: ", org);

            var contentText = document.getElementById('ipLocation');
            contentText.innerHTML = "ip: " + ip + " latitude: " + lats + " longitude: " + lngs;
        }
    }
    httpRequest.send();
}