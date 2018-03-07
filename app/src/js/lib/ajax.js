function ajaxGet(url) {
    return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest();
        req.open("GET", url);
        req.onload = function() {
            if (req.status === 200) {
                resolve(req.response);
            }
            else {
                reject(new Error(req.statusText));
            }
        };
 
        req.onerror = () => {
            reject(new Error("Network error"));
        };
 
        req.send();
    });
}


function ajaxPost(url, data) {
    return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest();
        req.open("POST", url);
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.onload = function() {
            console.log(req.status);
            console.log(req);
            if (req.status === 200) {
                resolve(req.response);
            } else if (req.status === 303){
                let redirectPath = JSON.parse(req.response)["redirectPath"];
                resolve(()=>{
                    window.location = redirectPath || "/";
                });            
            }
            else {
                reject(req, new Error(req.statusText));
            }
        };
 
        req.onerror = function() {
            reject(new Error("Network error"));
        };
 
        req.send(JSON.stringify(data));
    });
}

function ajaxDelete(url, data) {
    return new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest();
        req.open("DELETE", url);
        req.onload = function() {
            if (req.status === 204) {
                resolve(req.response);
            } else {
                reject(new Error(req.statusText));
            }
        };
 
        req.onerror = function() {
            reject(new Error("Network error"));
        };
 
        req.send();
    });
}
 
export default { ajaxGet, ajaxPost, ajaxDelete };