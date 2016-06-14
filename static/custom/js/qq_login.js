function callback(user) 
{
  var userName = document.getElementById('userName');
  var greetingText = document.createTextNode('Greetings, '+ user.openid + '.');
  userName.appendChild(greetingText);
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

//第1步骤，获取Authorization Code
function getAuthorizationCode(){
	var path = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&';
	var queryParams = ['client_id=' + appID, 'redirect_uri=' + redirectURI, 'state=' + state, 'scope=get_user_info,list_album,upload_pic,do_like'];
	var query = queryParams.join('&');
	var url = path + query;
	window.open(url);
}

//第2步骤，通过Authorization Code获取Access Token，该授权码是用户通过授权来获取的
function getAccessTokenByAuthorizationCode(authorizationCode){
	var path = 'https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&';
	var queryParams = ['client_id=' + appID,'client_secret=' + appKEY, 'code=' + authorizationCode, 'redirect_uri=' + redirectURI];

	var query = queryParams.join('&');
	var url = path + query;
	window.location = url; //重新定位到新的url
}

//第3步骤，使用Access Token来获取用户的OpenID
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

//第4步骤，使用Access Token以及OpenID来访问和修改用户数据


//应用的APPID，请改为你自己的
var appID = "101322571";
var appKEY = "350fc5fa05862fa9c1716f78a264fddb";
//成功授权后的回调地址，请改为你自己的
var redirectURI = "http://lzh06550107.github.io/blog";
var state= 'test'; //设置状态值
var Request = new Object(); 
Request = GetRequest(); //获取请求参数
if(Request['code']){ //如果存在授权码，则通过Authorization Code获取Access Token
	getAccessTokenByAuthorizationCode(Request['code']);
}else if(Request['access_token']){//如果存在访问令牌，则使用Access Token来获取用户的OpenID
	getOpenIdByAccessToken(Request['access_token']);
}

$(document).ready(function(){
	$("#qq-login").click(function(){
		getAuthorizationCode(); //通过点击QQ登录来获取授权码
});
}); 