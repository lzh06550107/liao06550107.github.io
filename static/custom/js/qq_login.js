function callback(user) 
{
  var userName = document.getElementById('userName');
  var greetingText = document.createTextNode('Greetings, '+ user.openid + '.');
  userName.appendChild(greetingText);
}

function test(){
	//应用的APPID，请改为你自己的
	var appID = "101322571";
	//成功授权后的回调地址，请改为你自己的
	var redirectURI = "http://lzh06550107.github.io/";

	//构造请求
	if (window.location.hash.length == 0) 
	{
	  var path = 'https://graph.qq.com/oauth2.0/authorize?';
	  var queryParams = ['client_id=' + appID,'redirect_uri=' + redirectURI,'scope=' + 'get_user_info,list_album,upload_pic,add_feeds,do_like','response_type=token'];

	  var query = queryParams.join('&');
	  var url = path + query;
	  window.open(url);
	}
	else 
	{
	  //获取access token
	  var accessToken = window.location.hash.substring(1);
	  //使用Access Token来获取用户的OpenID
	  var path = "https://graph.qq.com/oauth2.0/me?";
	  //使用jsonp跨域访问方式
	  var queryParams = [accessToken, 'callback=callback'];
	  var query = queryParams.join('&');
	  var url = path + query;
	  var script = document.createElement('script');
	  script.src = url;
	  document.body.appendChild(script);     
	}
}

$(document).ready(function(){
	$("#qq-login").click(function(){
	test();
});
}); 