//HMAC
            var s_ajaxListener = new Object();
            s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
            s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;
            s_ajaxListener.callback = function () {
            var client_events = this.url, mate = decodeURIComponent(this.data), paser = mate.split("message=")[1], get_object = JSON.parse(paser);
            if(client_events = 'https://graph.instagram.com/logging_client_events'){
                send_app_uid = get_object.app_uid;
                send_app_id = get_object.app_id;
                send_hmac = get_object.claims[0];
                send_device_id = get_object.device_id;
                console.log(send_hmac);
                }
            }
            XMLHttpRequest.prototype.open = function(a,b) {
                if (!a) var a='';
                if (!b) var b='';
                s_ajaxListener.tempOpen.apply(this, arguments);
                s_ajaxListener.method = a;  
                s_ajaxListener.url = b;
                if (a.toLowerCase() == 'get') {
                    s_ajaxListener.data = b.split('?');
                    s_ajaxListener.data = s_ajaxListener.data[1];
                }
            }

            XMLHttpRequest.prototype.send = function(a,b) {
                if (!a) var a='';
                if (!b) var b='';
                s_ajaxListener.tempSend.apply(this, arguments);
                if(s_ajaxListener.method.toLowerCase() == 'post')s_ajaxListener.data = a;
                s_ajaxListener.callback();
            }
//HMAC END
