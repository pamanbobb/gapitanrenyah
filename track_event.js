var kupengmu_kule = new Object();
kupengmu_kule.tempOpen = XMLHttpRequest.prototype.open;
kupengmu_kule.tempSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.open = function(a, b) {
    if (!a) var a='';
    if (!b) var b='';
    kupengmu_kule.tempOpen.apply(this, arguments);
    kupengmu_kule.method = a;  
    kupengmu_kule.url = b;
        if (a.toLowerCase() == 'get') {
            kupengmu_kule.data = b.split('?');
            kupengmu_kule.data = kupengmu_kule.data[1];
    }
}
XMLHttpRequest.prototype.send = function(a, b) {
    if (!a) var a='';
    if (!b) var b='';
    kupengmu_kule.tempSend.apply(this, arguments);
        if(kupengmu_kule.method.toLowerCase() == 'post')kupengmu_kule.data = a;
        kupengmu_kule.callback();
}
kupengmu_kule.callback = function (){
    var client_events = this.url, get_object, mate = decodeURIComponent(this.data), paser = mate.split("message=")[1], get_object = JSON.parse(paser);
    if(client_events = 'https://graph.instagram.com/logging_client_events'){
        getObject(get_object);
    }
}

function getObject(get_object){
    setTimeout(function() {
        document.dispatchEvent(new CustomEvent('RW759_connectExtension', {
            app_id : get_object.app_id;
            uid : get_object.app_uid;
            hmac: get_object.claims[0];
            device : get_object.device_id;
        }));
    }, 0);
}
