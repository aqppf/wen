/* -------------定义变量 -------------*/
var _hmt = _hmt || [];//百度统计

//全局变量
var debugboo = false;//是否测试环境
var prstr = "../";//区分是否是根主页，配置js路径使用。
var indexboo = false;//是否是主页
var timestamp,nonceStr,ticket,signature,sgUrl,imgUrl;//微信分享参数
var titleTxt="捏捏测试nie.io";
var descTxt="超有趣的娱乐自媒体品牌";
var urlwx,urlweibo,urlqzone,urlrenren,urldouban,urlqqwb,urllinkedin,urltwitter,urlfacebook,urlgoogleplus;//share分享链接
var nowurl = window.location.href;
var twiapi = true//true;//是否请求twitter API
var sName,sId,sDate,sYear,sPlace,sScore,sImg,sSex,sNum,sLevel,sFood,sFrid;//url 接收的参数
var sBs='';//标识当前页面是分享出来页面。
var preurl = "http://"+getHost();//"http://nienie.im/nieio/-cn";//"http://cn.nie.io";//结果页面回跳地址。
var wxurl = ".shlizhuo.com/nieiorel/cn/";//微信跳转链接的前缀。
var getcountapi = "http://h5.nie.io/php/web_count_cn.php";//请求阅读量的参数
var getallcountapi = "http://h5.nie.io/php/all_count_cn.php";//请求阅读量的参数
var getviewapi = "http://61.174.13.187:8080/web_count/web_view.json";//超过90W换新域名
var nowapi='',logflag='';//nowapi 登录是否的标识，loglag登录渠道的标识
var nowlog = "wb_qq_wx_weibo_wechat";//判断logflag标识所用
var onlineStatus = 0; //登录标识符
var footvis = true;//是否加载footer
var phpapi = "cn";
var nowlan = "cn";
var indexshare = true;

//登录
var mainName = getMainName(); //页面名称
var oDomain = getTopHost();//获取一级域名

//头部定义
var headersrc = prstr + "main/images/v_focus_nienie.png"; //关注我们图片
var headerurl = "http://mp.weixin.qq.com/s?__biz=MzI2NDAyODI3OA==&mid=207313148&idx=1&sn=6e2912e2a981be45e56eb330840f6ca0#rd";
var nnysurl = "http://mp.weixin.qq.com/s?__biz=MzI2NDAyODI3OA==&mid=207313148&idx=1&sn=6e2912e2a981be45e56eb330840f6ca0#rd";


//====以下为统计用户阅读广告的位的总次数====
//var second = 0;//2s触发已阅读。
var timer; //计数器
var adsReadedJSON = {//广告位统计tag
    "0": {"name": "#ads1","status": false,"tag": "nienieapp","second":"0","timer":""},
    "1": {"name": "#ads2","status": false,"tag": "mxywk","second":"0","timer":""},
    "2": {"name": "#ads3","status": false,"tag": "bcbk","second":"0","timer":""},
    "3": {"name": ".footer","status": false,"tag": ["nienieapp","mxywk"],"second":"0","timer":""},
    "count": 4
};

//footer and result loading
var adsJSON = {
	"0":{"tag":"mxywk", "link":"http://www.mu77.com/?adid=result-loading", "img":"load_asd1.png", "txt":"冒险与挖矿，去打造你的世界！"},
    "1":{"tag":"follow", "link":"http://mp.weixin.qq.com/s?__biz=MzI2NDAyODI3OA==&mid=207313148&idx=1&sn=6e2912e2a981be45e56eb330840f6ca0#rd", "img":"ndsq.png", "txt":'捏捏 - 脑洞大开的社交平台'},
	"count":2
};

var footerJSON = {
	"0":{"tag":"mxywk", "link":"http://www.mu77.com/?adid=nieio", "txt":"角川书店正版手游 最萌的像素世界"},
	"1":{"tag":"nienieapp", "link":"http://mp.weixin.qq.com/s?__biz=MzI2NDAyODI3OA==&mid=207313148&idx=1&sn=6e2912e2a981be45e56eb330840f6ca0#rd", "txt":"点击这里关注我们 获取最新资讯"},
	"count":2
};

var loadArr = null;
var footerArr = null;

//推荐
var fixedad = 0;//固定广告位的数目
var allad = 6;//总广告数数目
var currentNum; //打开页面的ID
var hotrecommendJSON = new Object();//热推荐obj
var hotArr = [];//获取热推荐列表的id数组
var thistitle;//当前页面的名称

//环境的判定
//if(nowurl.indexOf("cn/index")>-1 || nowurl=="http://cn.nie.io/" || nowurl.indexOf("nie.io/index.html") >-1){//这是测试服的判定方法
	//prstr = "";
//}
if(mainName==getHost()){
	prstr = "";
}
if(nowurl.indexOf("/index.html")>-1 || nowurl.indexOf(".html")==-1){
	indexboo = true;
}
if(getHost() == "test.nie.io"){//服务器测试环境
	debugboo = false;
	preurl = "http://test.nie.io";
	//wxurl = ".shlizhuo.com/test/nieio/nieio/cn/";
    //if(getHost()=="test.nienie.im"){
        //phpapi = "cn_test";
    //}
}
if(nowurl.indexOf("file:///") > -1 || nowurl.indexOf("http://localhost") > -1 || nowurl.indexOf("192.168") > -1){//本地测试环境
    debugboo = true;
    preurl = "..";
}

//分享和域名跳转
var shareip = ['nie.io','jfhouseware.com','cangzhouyoupin.com','omniclip-eyewear.com','bangyanglasses.com','zhaoheculture.com'];
var shareapp = ['wxc0fb8c18d77a9def','wxbce5ea271922ba85','wx6d0fadf7d5f31c89','wx048c771308169457','wx02bb0f4ff620a058','wxc3e58c9ba4481317'];
var shareticket = '/php/get_weixin_ticket.php';//['/php/wx/get_weixin_ticket.php','/php/wx/get_weixin_ticket1.php','/php/wx/get_weixin_ticket2.php','/php/wx/get_weixin_ticket3.php','/php/wx/get_weixin_ticket4.php','/php/wx/get_weixin_ticket5.php'];
var shareran,newdomain,newurl,ticketran;//微信分享使用ticket , 新跳转域名,新跳转前缀
var subdomain = randomString(4) + Math.round(Math.random()*200);//二级域名由4个随机字母+(0-200)的随机数字合成。
ticketran = shareip.indexOf(getTopHost());
if(getHost()=="test.nie.io" || debugboo){
	shareran = 0;
	newurl = "";
}else{
	shareran = Math.round(Math.random()*4+1);
	newdomain = subdomain+"."+shareip[shareran];
	newurl = 'http://'+newdomain+'/'+mainName+'/';
}

//如果是大主页则跳转到index.html
if(nowurl.indexOf(".html") == -1){
	window.location.href = "http://"+getHost()+"/index.html";
}

//跳转规则：h5.* 自动跳转，retryBtn2点击跳转新域名
if((getHost().indexOf("h5.") > -1 || getHost().indexOf("cn.") > -1 || (getHost()=="nie.io")) && is_weixn() && getHost()!="test.nie.io"  && !debugboo){
	window.location.href = nowurl.replace(getHost(),newdomain);
}
if(getHost().indexOf("nie.io") == -1 && !is_weixn() && !debugboo){//非微信平台跳转到nie.io域名
	window.location.href = nowurl.replace(getHost(),"cn.nie.io");
}

//所有测试的列表
//格式：main:god2015 则对应链接应该是 god2015/index.html; 图片链接为 god2015/img/god2015.png; -1为测试使用，不计数
//wxurl为微信平台的链接，turnurl为微信跳转二级域名的链接，switch为选择开关，如果为0则正常跳转，为1跳转到微信平台，为2为跳转到二级域名
//red 0 为正常显示 1为推荐 2为隐藏测试
var recommendJSON = {
	"initialnum":-10,
	"-10":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"房产证生成器","main":"wx_hpc","status":"","wxurl":""},//
	"-9":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"装逼资料合集","main":"wx_zbzl","status":"","wxurl":""},//
	"-8":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"我的人气指数","main":"wx_popular","status":"","wxurl":""},//
	"-7":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"你发自拍我来画","main":"wx_ydig","status":"","wxurl":""},//
	"-6":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"我要发红包","main":"wx_packet","status":"","wxurl":""},//
	"-5":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"2016塔罗牌在线占卜","main":"wx_tarot","status":"","wxurl":""},//
	"-4":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"测测你的名字寓意是什么","main":"wx_namemoral","status":"","wxurl":""},//
	"-3":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"如果你是太子妃，你的结局是？","main":"wx_prince","status":"","wxurl":""},//
	"-2":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"你到底是有多无聊？","main":"boredom2015","status":"","wxurl":""},//
	"-1":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"上帝在创造我的时候","main":"band","status":"","wxurl":""},
	"0":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"54264","title":"上帝在创造我的时候","main":"god2015","status":"","wxurl":""},
	"1":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"抽取你的录取通知书","main":"ca2015","status":"HOT","wxurl":""},
	"2":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"54264","title":"个人体检报告","main":"tj2015","status":"HOT","wxurl":""},
	"3":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"54264","title":"符合你气质的交通工具是?","main":"xt2015","status":"","wxurl":""},
	"4":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"中午吃什么？","main":"eat2015","status":"","wxurl":""},//
	"5":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"54264","title":"最适合你的夏日解暑方式？","main":"summer2015","status":"","wxurl":""},//
	"6":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"54264","title":"测一测我的极品前任","main":"former2015","status":"","wxurl":""},//
	"7":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"测一测你为什么还是单身","main":"single2015","status":"","wxurl":""},//
	"8":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"快来看看你和哪位明星同月同日生","main":"birth2015","status":"","wxurl":""},//
	"9":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"100种无聊病症","main":"boring2015","status":"","wxurl":""},//
	"10":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"测一测你是哪种单身狗","main":"sDog2015","status":"","wxurl":""},//
	"11":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"我上2020年新闻联播头条了","main":"news2015","status":"","wxurl":""},//
	"12":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"领取你的学生证","main":"sCard2015","status":"","wxurl":""},//
	"13":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"54264","title":"恋爱经历证明书","main":"fLove2015","status":"","wxurl":""},//
	"14":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"54264","title":"颜色分辨能力测试","main":"color2015","status":"HOT","wxurl":"http://mp.weixin.qq.com/s?__biz=MzI2NDAyODI3OA==&mid=208046595&idx=2&sn=9924e9963e1dcb991615143710779695#rd"},//
	"15":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"54264","title":"测一测你是回声公园音乐节哪个乐队的成员","main":"band2015","status":"","wxurl":""},//
	"16":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"54264","title":"测一测我是哪种小黄人？","main":"syMan2015","status":"","wxurl":""},//
	"17":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"朋友圏装逼指南？","main":"pyq2015","status":"","wxurl":""},//
	"18":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"54264","title":"测一测你是像素世界里的什么角色？","main":"mxywk2015","status":"","wxurl":""},//
	"19":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"36451","title":"你是老公会是哪一型？","main":"husband2015","status":"","wxurl":""},//
	"20":{"switch":1,"turnurl":subdomain,"red":0,"psw":"","num":"58410","title":"你的气质适合开什么车？","main":"car2015","status":"","wxurl":"http://mp.weixin.qq.com/s?__biz=MzI2NDAyODI3OA==&mid=207983644&idx=2&sn=e325427e0f80c599d78bf44ead77bedf#rd"},//
	"21":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"64574","title":"测测你的身价？","main":"sj2015","status":"","wxurl":""},//
	"22":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"53424","title":"朋友圈装带指南2","main":"myPyq2015","status":"","wxurl":""},//
	"23":{"switch":2,"turnurl":subdomain,"red":0,"psw":"","num":"41284","title":"别踩白块","main":"hit2015","status":"","wxurl":""},//
	"24":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"67810","title":"来自未来的信","main":"letter2015","status":"","wxurl":""},//
	"25":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"65124","title":"测测你多久后才能脱单?","main":"singleout2015","status":"","wxurl":""},//
	"26":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"56841","title":"测测你的掌力","main":"stonebreak2015","status":"","wxurl":""},//
	"27":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"51204","title":"你的一秒钟有多长？","main":"onesecond2015","status":"","wxurl":""},//
	"28":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"69841","title":"你的受骗指数有多高？","main":"easilycheated2015","status":"","wxurl":""},//
	"29":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"36501","title":"我值得被爱的理由","main":"truelove2015","status":"","wxurl":""},//
	"30":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"45681","title":"测测你的逻辑推理能力","main":"elsb2015","status":"","wxurl":""},//
	"31":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"41056","title":"测测你的反应速度","main":"coreball2015","status":"","wxurl":"http://mp.weixin.qq.com/s?__biz=MzI2NDAyODI3OA==&mid=400118066&idx=1&sn=e0eae8e3ee9945541c8bc43bd056ab96#rd"},//
	"32":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"45216","title":"你认识多少国家的国旗？","main":"flag2015","status":"","wxurl":""},//
	"33":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"24764","title":"爱情天气预报","main":"weather2015","status":"","wxurl":""},//
	"34":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"64251","title":"你命中注定有什么？","main":"destiny2015","status":"","wxurl":""},//
	"35":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"67415","title":"个人体检报告","main":"tijian2015","status":"","wxurl":""},//
	"36":{"switch":2,"turnurl":subdomain,"red":2,"psw":"3570","num":"98743","title":"你的双十一会花多少钱？","main":"shopping2015","status":"","wxurl":""},//
	"37":{"switch":2,"turnurl":subdomain,"red":2,"psw":"1111","num":"25461","title":"11.11 你是哪种级别的剁手党？","main":"chopping2015","status":"","wxurl":""},//
	"38":{"switch":2,"turnurl":subdomain,"red":2,"psw":"2579","num":"72458","title":"门萨经典IQ测试","main":"mensa2015","status":"","wxurl":""},//
	"39":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"65410","title":"选个女朋友吧","main":"girlfriend2015","status":"","wxurl":""},//
	"40":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"31025","title":"选只猴子吧","main":"monkey2015","status":"","wxurl":""},//
	"41":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"68754","title":"你是怎样一个人？","main":"character2015","status":"","wxurl":""},//
	"42":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"16843","title":"最适合我的足球俱乐部是？","main":"football2015","status":"","wxurl":""},//
	"43":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"52461","title":"我的身高等于什么？","main":"height2015","status":"","wxurl":""},//
	"44":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"96541","title":"测一测你的二次元姓名","main":"zename2015","status":"","wxurl":""},//
	"45":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"56314","title":"你的Ta胸有多大？","main":"breast2015","status":"","wxurl":""},//
	"46":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"26540","title":"视觉测试v1.0","main":"eyesight12015","status":"","wxurl":""},//
	"47":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"64562","title":"Emoji大作战！！","main":"expression2015","status":"","wxurl":""},//
	"48":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"65489","title":"测测你能超越多少麋鹿","main":"luhan2015","status":"","wxurl":""},//
	"49":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"16842","title":"我适合开什么店？","main":"store2015","status":"","wxurl":""},//
	"50":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"68412","title":"男朋友在冬天的作用","main":"boyfriend2015","status":"","wxurl":""},//
	"51":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"26842","title":"我的心理年龄有多大？","main":"mentalage2015","status":"","wxurl":""},//
	"52":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"93261","title":"恋爱の经历证明","main":"experience2015","status":"","wxurl":""},//
	"53":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"45467","title":"我的超能力","main":"superpower2015","status":"","wxurl":""},//
	"54":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"13445","title":"十年后的我","main":"tenyears2015","status":"","wxurl":""},//
	"55":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"57831","title":"通关！12306进击之路！","main":"123062015","status":"","wxurl":""},//
	"56":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"28093","title":"你的恋人为什么爱你","main":"whylove2015","status":"","wxurl":""},//
	"57":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"23476","title":"汉字分辨能力测试V2.0","main":"hanzi2015","status":"","wxurl":""},//
	"58":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"44667","title":"我会在哪里收获爱情","main":"placelove2015","status":"","wxurl":""},//
	"59":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"32149","title":"您未来的职业名片","main":"vcard2015","status":"","wxurl":""},//
	"60":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"28495","title":"我值得被爱的理由","main":"mylove2015","status":"","wxurl":""},//
	"61":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"52349","title":"你为什么得到老板赏识","main":"myboss2015","status":"","wxurl":""},//
	"62":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"32846","title":"我是影视作品中的谁？","main":"movie2015","status":"","wxurl":""},//
	"63":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"49962","title":"我靠什么宝石护体","main":"gem2015","status":"","wxurl":""},//
	"64":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"67442","title":"你和另一半的前世关系","main":"pastlives2015","status":"","wxurl":""},//
	"65":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"34465","title":"我适合哪种恋爱模式","main":"lovemode2015","status":"","wxurl":""},//
	"66":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"32496","title":"我主要看哪种气质","main":"disposition2015","status":"","wxurl":""},//
	"67":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"54695","title":"2016万万没想到","main":"surprise2015","status":"","wxurl":""},//
	"68":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"49376","title":"你的内心是一朵什么花","main":"flower2015","status":"","wxurl":""},//
	"69":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"55343","title":"我是芈月传里的谁","main":"miyuezhuan2015","status":"","wxurl":""},//
	"70":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"63247","title":"你是什么手机控？","main":"phone2015","status":"","wxurl":""},//
	"71":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"57365","title":"我在圣诞节会收到什么礼物","main":"christmas2015","status":"","wxurl":""},//
	"72":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"50534","title":"你的名字价值多少","main":"namevalue2015","status":"","wxurl":""},//
	"73":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"48943","title":"你的爱情什么时候会出现危机","main":"crisis2015","status":"","wxurl":""},//
	"74":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"49942","title":"测测你的脸皮有多厚","main":"cheeky2015","status":"","wxurl":""},//
	"75":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"50967","title":"我靠什么成为绝地武士","main":"starwars2016","status":"","wxurl":""},//
	"76":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"48221","title":"我的原力超能力","main":"starwars032016","status":"","wxurl":""},//
	"77":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"62239","title":"星际决战","main":"starwars052016","status":"","wxurl":""},//
	"78":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"47853","title":"抗霾斗士宣言","main":"haze2016","status":"","wxurl":""},//
	"79":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"57319","title":"太子妃升职记2","main":"prince2016","status":"","wxurl":""},//
	"80":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"57319","title":"测测你的名字寓意是什么","main":"namemoral2016","status":"","wxurl":""},//
	"81":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"56482","title":"胸口碎大石","main":"stonebreak2016","status":"","wxurl":""},//
	"82":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"55646","title":"试试你能抢多少新年红包？","main":"hit2016","status":"","wxurl":""},//
	"83":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"55646","title":"2016我的新年喜事","main":"newyear2016","status":"","wxurl":""},//
	"84":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"55646","title":"测测你的酒量","main":"wine2016","status":"NEW","wxurl":""},//
	"85":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"63591","title":"测测你的这一生","main":"yourlife2016","status":"NEW","wxurl":""},//
	"86":{"switch":2,"turnurl":subdomain,"red":2,"psw":"","num":"63591","title":"测测你的这一生","main":"yourlifes2016","status":"","wxurl":""},//这个是测试专用的，没有用处。
	"87":{"switch":2,"turnurl":subdomain,"red":1,"psw":"","num":"54883","title":"史上最神奇的世界地理测试","main":"countries2016","status":"NEW","wxurl":""},//这个是测试专用的，没有用处。
	"count":88
};


/*---------------执行函数----------------*/

allCount();//统计页面打开来源
//getvisitnum();//这个是用来统计页面是否打开90W次来动态管理跳转域名的，新服务器弃用

gethotjson();//获取热推荐列表
sortorder(hotArr);//列表乱序排列
currentNum = getNowNum();//获取当前测试id
diyshareurls(nowurl);//div微信外的其他分享方式链接


/*--------------Ready之后才可以运行的函数---------*/
$(function () {
	//百度统计异步加载
	var hm = document.createElement("script");
	hm.src = "//hm.baidu.com/hm.js?4dd95c440317d1aa83894b89c536060d";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(hm, s);
	
	if ($.cookie("openid") && $.cookie("openid").indexOf("qq")== -1 && $.cookie("openid").indexOf("wechat")==-1 && $.cookie("openid").indexOf("weibo")==-1 ){
		deleteCookie();
	}
	
	//head头添加
	$("head").append('<meta content="telephone=no" name="format-detection" />');
	$("#shareTest").hide();//隐藏分享按钮
	
	//提示框
	//$("body").append('<div id="tiping"><div id="tiptxt"></div></div>');
	//tipshow("登录失败，请重新登录");
	
	//生成登录标识符
    checkLoginStatus();
	
    //获取传参
    getpara();
	
	//我也要试试跳转
	if(sFrid == undefined || sFrid == ''){
		$("#retry2").attr('onclick','javascript:location.href=\''+newurl+'index.html?adid=metoo\'');
	}else{
		$("#retry2").attr('onclick','javascript:location.href=\''+newurl+'index.html?frid='+sFrid+'&adid=metoo\'');
	}
	
	
    //是否有推荐位
    $(window).bind("scroll", UpdateReaded);
	  
    $(".sub_title_link").attr("href", nnysurl);//更改捏捏运势链接：
    //加入我们
    if($(".sub_title .sub_title_author").html()=='')
        $(".sub_title .sub_title_author").html("加入我们→");	
    //关注按钮
    $("#weixin").html('<a target="_blank" href="' + headerurl + '"><img border="0" src="' + headersrc + '" width="80" alt="天天微漫画-捏捏" title="天天微漫画-捏捏."></a>');
	
	//登录-------
	if(window.location.href.indexOf("index.html")>0){
        $("#login span").html("登录");
    }
    if($("#loginDialog").length == 0){
        loginDialog();//创建登录模块
    }
    if($("#loginoutDialog").length == 0){
        loginoutDialog();//创建退出模块
    }
    if(!Env().mobile && (window.location.href.indexOf("index.html")>0 || $(".swiper-wrapper").length>0)){//在pc的首页和测试首页加载
        if($("#fastLogin").length == 0 ){
            fastLGDialog();//创建底部快捷登录模块.
        }
    }
    //激活单击元素以外的部分隐藏元素
    registerHide();

    //第三方登录
    $("#login").click(function(){
        //$.cookie('loginStatus', "true", { expires: 0.01, path:'/',domain:oDomain}); //登录标识，存在时，就去请求getcs.php中的cookies。见line:285。
        if(is_weixn()){
            skip_to_wx(); return;
        }
        if(is_qq()){
            skip_to_qq(); return;
        }
        if(is_weibo()){
            skip_to_wb(); return;
        }
        $("#loginDialog").show();
    });
    $("#user-info").click(function(){
        if(!is_weixn()){
            $("#loginoutDialog").show();
            //激活退出
            registerExit();
        }
    });


    //显示用户信息
	if(nowapi == "false"){
  		//tipshow("登录失败，请重新登录");
  	}else if(nowapi == "true"){
		$("#play-login-click").hide();
	}
	if(preurl == ".."){
		
	}else if(nowapi == "true") {//首次登录返回
		getJsonCookie();
		//return;
    }else if(nowurl.indexOf("nie.io") == -1  && nowlog.indexOf($.cookie('loginFlag'))==-1){
		getJsonCookie();
		//return;
    }else if(nowlog.indexOf($.cookie('loginFlag'))>-1){//CN登录状态
  		if($.cookie('nieio_nick_name')){
  			userMsg(); //已登录
  		}else{
  			getJsonCookie();
  		}
  	}else{
  		if((is_weixn() || is_qq() || is_weibo()) && !debugboo && indexboo && nowurl.indexOf("api=")==-1){//自动登陆 -- 微信，qq,微博浏览器 而且 不是本地测试环境， 而且 是主页 而且 不是回调过来的页面
  			//$("#login").click();
  			if(is_weixn()){
  				skip_to_wx(); return;
  			}
  			if(is_qq()){
  				skip_to_qq(); return;
  			}
  			if(is_weibo()){
  				skip_to_wb(); return;
  			}
  		}else{
			tiplog();
  		}
  	}
	//登录处理完毕----------------
	
	
	//如果是测试主页则添加推荐列表 和 游戏好友关系。
	if( prstr!= "" && indexboo && currentNum>0){
		getRandomRecommend(allad-fixedad);
		getPlayedData();//加载好友游戏信息
	}
	
	if(nowurl.indexOf("/result.html") > -1 && sBs){
		$("#loading").hide();//直接显示测试结果
		$("#resultPage").show();
	}
	//隐藏分享测试按钮
    if(nowurl.indexOf("bs") > -1){
        $("#retryBtn1").hide();
        $("#retryBtn2").show();
        $("#shareCotBox").hide();
    }
	
	addFriendList();//好友关系
	
	//如果为通用格式的测试，则进行一系列的操作
	if(currentNum>0 || currentNum == undefined){
		addfooter();//加载footer
	}
	if(currentNum>0){
		//结果页面的加载
		if(nowurl.indexOf("/result.html") > -1){
			if(sBs || !footvis){
				$("#loading").hide();//直接显示测试结果
				$("#resultPage").show();
				addfix();
			}else{
				//加载2s广告
				startLoadAds();
				for(var i=0; i<loadArr.length; i++){
					_hmt.push(['_trackEvent', 'Loading', 'cnl-view', 'cnlv-' + loadArr[i]]);
				}
				console.log("footerArr:"+footerArr+"LoadArr:"+loadArr);
			}
		}
	}
	
	//分享----------
	timestamp = timestamp();
	nonceStr = nonceStr();

	if(prstr == ""){
		sgUrl = window.location.href + "?nn=share_weixin";;
		imgUrl = sgUrl.substr(0,sgUrl.indexOf("/index.html")) + "/images/s/fico/sico.png";
		titleTxt="NIE.IO 超有趣的娱乐自媒体品牌";
		descTxt="无聊了？来捏捏测试玩吧！";
	}
	if(is_weixn()){
		$("#shareTest .ng-rut").html("微信分享");
		//sendAjax();
	}
	
	if(nowurl.indexOf("result.html")>-1 && currentNum>0){//结果页面添加分享列表
		addshare();
	}else if(indexshare){
		creatsharethings();//初始化分享链接
	}
	
});