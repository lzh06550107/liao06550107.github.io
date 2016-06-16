/*
flash跨域：
下面详细说一下插件所提供的方法： 
$.ajaxf.install(swfpath):安装Flash到页面，可指定Flash的路径。 

$.ajaxf.ready(function(){}):Flash加载完后执行的函数。 

$.ajaxf.isReady():返回Flash是否已经加载完成。返回值为Boolean 

$.ajaxf.ajax(p):原生的ajax调用支持，p为一个对象，包括：callback，回调函数；type，方法类型，支持json,text,xml,script；url，读取数据的地址；method，请求的方法，支持get,post；data，发送的数据；contentType，请求的contentType头；header，Object对象，附加的请求头。 

$.ajaxf.get(url, data, callback, type):通过get方式获取数据 

$.ajaxf.post(url, data, callback, type):通过post方式获取数据 

还在上面的基础上提供了简便方法：
$.ajaxf.getText(url, data, callback) 
$.ajaxf.getJSON(url, data, callback) 
$.ajaxf.getScript(url, data, callback) 
$.ajaxf.postJSON(url, data, callback) 
$.ajaxf.postText(url, data, callback) 

*/

$.ajaxf = new function() {
    var flash = null;
    var isready = false; //初始化是否完成
    var id = new Date().getTime().toString(); //创建时间
    this.defaults = {
        type: "text",
        header: new Object(),
        method: "get"
    };
    this.isReady = function() { return isready; }
    this.install = function(swfpath) {
        var height = 0, width = 0;

        if (swfpath) {

        }
        else {
            swfpath = "/static/custom/js/Ajax.swf";
        }

        var e = '<embed height="' + height + '" width="' + width + '" ';
        e += 'allownetworking="internal" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Pro d_Version=ShockwaveFlash" wmode="" type="application/x-shockwave-flash" menu="true" loop="false" src="' + swfpath + '" />';
        var o = '';
        if (window.ActiveXObject) {
            // browser supports ActiveX
            // Create object element with
            // download URL for IE OCX
            o += '<object id="' + id + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
            o += ' codebase="http://download.macromedia.com'
            o += '/pub/shockwave/cabs/flash/swflash.cab#version=8,5,0,0"'
            o += ' height="' + height + '" width="' + width + '">'
            o += ' <param name="movie" value="' + swfpath + '">'
            o += ' <param name="quality" value="high">'
            o += ' <param name="swliveconnect" value="true">'
            //o += e;
            o += '<\/object>'
        }
        else {
            // browser supports Netscape Plugin API

            o += '<object id="' + id + '" data="' + swfpath + '"'
            o += ' type="application/x-shockwave-flash"'
            o += ' height="' + height + '" width="' + width + '">'
            o += '<param name="movie" value="' + swfpath + '">'
            o += '<param name="quality" value="high">'
            o += '<param name="swliveconnect" value="true">'
            o += '<param name="pluginurl" value="http://www.macromedia.com/go/getflashplayer">'
            o += '<param name="pluginspage" value="http://www.macromedia.com/go/getflashplayer">'
            //o += e;
            o += '<p>You need Flash for this.'
            o += ' Get the latest version from'
            o += ' <a href="http://www.macromedia.com/software/flashplayer/">here<\/a>.'
            o += '<\/p>'
            o += '<\/object>'
        }

        flash = $(o);
        $("body").append(flash);
        this.PercentCheck();

    }
    var readyf = null;
    this.ready = function(f) {
        if (isready)
            f(); //如果准备完成，则调用f()函数
        readyf = f;
    }
    this.PercentCheck = function() {//完成进度检查
        var p = 0;
        try {
            p = flash[0].PercentLoaded();
        }
        catch (e) { }
        if (p < 100) {
            setTimeout($.ajaxf.PercentCheck, 1000);
        }
        else {
            isready = true; //导入完成，则准备完成，调用对象函数
            if (readyf)
                readyf();
        }
    }
    //
    var callbacks = new Object();
    this.callback = function(key, type) {
        var r = $(flash).get(0).GetVariable("retText");
        if (type == 'script') //如果从flash中得到的是脚本，则执行
            eval(r);

        var b = callbacks[key];
        delete callbacks[key];
        if (b) {
        }
        else {

            return;
        }
        if (type == 'text') {
            b(r);
        }
        else if (type == 'json') {
            b($.parseJSON(r));
        }
        else if (type == 'xml') {
            b($(r));
        }

    }
    this.ajax = function(p) {
        if (!isready) {
            alert('Loading');
            return;
        }
        var key = new Date().getTime().toString();
        if (p["callback"]) {
            callbacks[key] = p["callback"];
        }
        else {
            callbacks[key] = this.defaults['callback'];
        }
        if (p["type"])
        { }
        else {
            if (this.defaults['type'])
                p['type'] = this.defaults['type'];
            else
                p["type"] = "text";
        }
        var c = "$.ajaxf.callback('" + key + "','" + p["type"] + "')";
        var url = "";
        if (p["url"])
            url = p["url"];
        else
            url = this.defaults["url"];
        var method = 'get';
        if (p['method']) {
            if (p['method'] == 'post')
                method = 'post';
        }
        else {
            if (this.defaults['method'])
                method = this.defaults['method'];
        }
        var data = '';
        if (p['data'])
            data = p['data'];
        else {
            data = this.defaults['data'] ? this.defaults['data'] : data;
        }
        if (method == 'get' && data != '') {
            if (url.indexOf('?') == -1)
                url += '?' + data;
            else
                url += '&' + data;
            data = '';
        }
        var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
        if (p['contentType'])
            contentType = p['contentType'];
        else
            contentType = this.defaults['contentType'] ? this.defaults['contentType'] : contentType;

        var h = new Array();
        if (this.defaults['header']) {
            for (var k in this.defaults['header']) {
                h.push(k);
                h.push(this.defaults['header'][k]);
            }

        }
        if (p['header']) {
            for (var k in p['header']) {
                h.push(k);
                h.push(p['header'][k]);
            }
        }
        $(flash).get(0).XmlHttp(url, c, method, data, contentType, h);
    }
    this.request = function(url, data, callback, type, method) {
        var p = new Object();
        if (method)
            p['method'] = method;
        if (url)
            p['url'] = url;
        if (data)
            p['data'] = data;
        if (callback)
            p['callback'] = callback;
        if (type)
            p['type'] = type;
        this.ajax(p);
    }
    this.get = function(url, data, callback, type) {
        this.request(url, data, callback, type, 'get');
    }
    this.getText = function(url, data, callback) { this.get(url, data, callback, 'text'); }
    this.getJSON = function(url, data, callback) { this.get(url, data, callback, 'json'); }
    this.getScript = function(url, data, callback) { this.get(url, data, callback, 'script'); }
    this.post = function(url, data, callback, type) { this.request(url, data, callback, type, 'post'); }
    this.postJSON = function(url, data, callback) { this.post(url, data, callback, 'json'); }
    this.postText = function(url, data, callback) { this.post(url, data, callback, 'text'); }
}