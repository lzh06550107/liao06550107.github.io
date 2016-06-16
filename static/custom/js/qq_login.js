function callback(user) 
{
  var userName = document.getElementById('userName');
  var greetingText = document.createTextNode('Greetings, '+ user.openid + '.');
  userName.appendChild(greetingText);
}

function getQueryString(url,name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	if(url)
		var r = url.match(reg); 
	if (r != null) 
		return unescape(r[2]); 
	return null; 
} 

function GetRequest() { 
	var url = location.search; //获取url中"?"符后的字串 
	var theRequest = new Object(); 
	if (url.indexOf("?") != -1) { 
		var str = url.substr(1); 
		strs = str.split("&"); 
		for(var i = 0; i < strs.length; i++) { 
		theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
		} 
	} 
	return theRequest; 
} 

//第1步骤，获取Authorization Code，调用后会重定向到指定url
function getAuthorizationCode(){
	var path = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&';
	var queryParams = ['client_id=' + appID, 'redirect_uri=' + redirectURI, 'state=' + state, 'scope=get_user_info,list_album,upload_pic,do_like'];
	var query = queryParams.join('&');
	var url = path + query;
	window.open(url);
}

//第2步骤，通过Authorization Code获取Access Token，该授权码是用户通过授权来获取的，返回值以包的形式返回，格式如：
//access_token=9244AA2E9F09D13A5EC23DE09C85721D&expires_in=7776000&refresh_token=8EAAC59C5D6510B5CAF3AE38EF47C6EB,注意不会重定向到指定的url。
function getAccessTokenByAuthorizationCode(authorizationCode){
	var path = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&';
	var queryParams = ['client_id=' + appID,'client_secret=' + appKEY, 'code=' + authorizationCode, 'redirect_uri=' + redirectURI];

	var query = queryParams.join('&');
	var url = path + query;
	window.open(url);
}

//第3步骤，使用Access Token来获取用户的OpenID，返回值以包的形式返回，格式如：
//callback( {"client_id":"YOUR_APPID","openid":"YOUR_OPENID"} );
function getOpenIdByAccessToken(accessToken){
	//使用Access Token来获取用户的OpenID
	var path = "https://graph.qq.com/oauth2.0/me?access_token=";
	//使用jsonp跨域访问方式
	var queryParams = [accessToken, 'callback=callback'];
	var query = queryParams.join('&');
	var url = path + query;
	var script = document.createElement('script');
	script.src = url;
	document.body.appendChild(script); 
}

function displayResponse(){
	getOpenIdByAccessToken(getQueryString(AjaxCrossDomainResponse,'access_token'));
}

//通过Authorization Code跨域获取Access Token
function getAccessTokenByAuthorizationCode_acrossDomain(authorizationCode){
	var path = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&';
	var queryParams = ['client_id=' + appID,'client_secret=' + appKEY, 'code=' + authorizationCode, 'redirect_uri=' + redirectURI];

	var query = queryParams.join('&');
	var url = path + query;
	
	AjaxCrossDomainRequestWithoutForm(url,'get','displayResponse()');
}

//应用的APPID，请改为你自己的
	var appID = "101322571";
	var appKEY = "350fc5fa05862fa9c1716f78a264fddb";
	//成功授权后的回调地址，请改为你自己的
	var redirectURI = "http://lzh06550107.github.io/blog";
	var state= 'test'; //设置状态值

$(window).load(function(){ //当其它的都加载完成	
	var Request = new Object(); 
	Request = GetRequest(); //获取请求参数
	if(Request['code']){ //如果存在授权码，则通过Authorization Code获取Access Token
	getAccessTokenByAuthorizationCode_acrossDomain(Request['code']);
	//getAccessTokenByAuthorizationCode(Request['code']);
}
});

$(document).ready(function(){
	$("#qq-login").click(function(){
		getAuthorizationCode(); //通过点击QQ登录来获取授权码
});
}); 