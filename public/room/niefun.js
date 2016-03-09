/*---------------通用方法----------------*/

//获取当天时间
function getDate() {
	var sDate;
	var d = new Date();
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var year = d.getFullYear();
	sDate = year + "-" + checkNum(month) + "-" + checkNum(day);
	return sDate;
}

function checkNum(val) {
	if (val < 10) {
		val = "0" + val;
	}
	return val;
}

//获取域名
function getHost() {
	var host = "null"
	var url = window.location.href;
	var regex = /.*\:\/\/([^\/]*).*/;
	var match = url.match(regex);
	if (typeof match != "undefined" && null != match) host = match[1];
	return host;
}

//获取一级域名
function getTopHost() {
	var url = window.location.href;
	return url.replace(/http:\/\/.*?([^\.]+\.(com\.cn|org\.cn|net\.cn|[^\.]+))\/.+/, "$1").split("/")[0];
}

//判断网页是否在微信中打开
function is_weixn() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

//判断网页是否在新浪微博客户端中打开
function is_weibo() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/WeiBo/i) == "weibo") {
		return true;
	} else {
		return false;
	}
}
//判断网页是否在qq中打开
function is_qq() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/QQ\//i) == "qq/") {
		return true;
	} else {
		return false;
	}
}
//判断操作系统
function Env() {
	var ua = navigator.userAgent.toLowerCase();
	function check(r) {
		return r.test(ua);
	}
	return {
		//操作系统
		mobile: check(/applewebkit.*mobile.*/),
		isWindows: check(/windows|win32/),
		isMac: check(/macintosh|mac os x/)
	}
}

//乱序排序
function sortorder(o) {
	for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

//清除所有cookie
function deleteAllCookie() {
	var cookies = document.cookie.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var spcook = cookies[i].split("=");
		if(spcook[0].indexOf('packet_accid')>-1 || spcook[0].indexOf('packet_img')>-1 || spcook[0].indexOf('packet_id')>-1){
			continue;
		}else{
			document.cookie = spcook[0] + "=; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/; domain=" + oDomain;
		}
	}
}

//获取Url参数
function getpara() {
	var url = document.URL;
	var para = "";
	if (url.lastIndexOf("?") > 0) {
		para = url.substring(url.lastIndexOf("?") + 1, url.length);
		var arr = para.split("&");
		para = "";
		for (var i = 0; i < arr.length; i++) {
			var name = arr[i].split("=")[0];
			var key = arr[i].split("=")[1];
			if (name == 'name') {
				sName = decodeURIComponent(key);
			}
			if (name == 'id') {
				sId = decodeURIComponent(key);
				$.cookie('packet_accid', sId, { expires: 1 ,path:'/',domain:oDomain});
			}
			if (name == 'date') {
				sDate = decodeURIComponent(key);
			}
			if (name == 'year') {
				sYear = decodeURIComponent(key);
			}
			if (name == 'place') {
				sPlace = decodeURIComponent(key);
			}
			if (name == 'bs') {
				sBs = decodeURIComponent(key);
			}
			if (name == 'score') {
				sScore = decodeURIComponent(key);
			}
			if (name == 'sex') {
				sSex = decodeURIComponent(key);
			}
			if (name == 'img') {
				if (key != '' && key != 'undefined') {
					sImg = decodeURIComponent(key);
					$.cookie('packet_img', sImg, { expires: 1 ,path:'/',domain:oDomain});
				}
			}
			if (name == 'num') {
				sNum = decodeURIComponent(key);
				$.cookie('packet_id', sNum, { expires: 1 ,path:'/',domain:oDomain});
			}
			if (name == 'level') {
				sLevel = decodeURIComponent(key);
			}
			if (name == 'food') {
				sFood = decodeURIComponent(key);
			}
			if (name == 'frid') {
				sFrid = decodeURIComponent(key);
			}
			if (name == 'api') {
				nowapi = decodeURIComponent(key);
			}
			if (name == 'logflag') {
				logflag = decodeURIComponent(key);
			}
		}
	} else {
		// document.write("没有参数!");
	}
}

//随机1个不重复的数
/*
 * all:总个数
 * count:要随机出来的个数
 * current:当前数
 * 返回Array,eg: [2]
 * */
function createArray(all, count, current) {
	var ary = [];
	ary.push(current);
	while (ary.length < (count + 1)) {
		var tmp = parseInt(Math.random() * all);
		var b = false;
		for (var i = 0; i < ary.length; i++) {
			if (ary[i] == tmp) {
				b = true;
				break;
			}
		}
		if (!b) {
			ary[ary.length] = tmp;
		}
	}
	ary.shift();
	return ary;
}

//动态加载JS CSS 此方法在执行回退页面的时候会出问题，导致js css 不加载的情况。
function include_js(path) {
	var sobj = document.createElement('script');
	sobj.type = "text/javascript";
	sobj.src = path;
	var headobj = document.getElementsByTagName('head')[0];
	headobj.appendChild(sobj);
}
function include_css(path) {
	var fileref = document.createElement("link");
	fileref.rel = "stylesheet";
	fileref.type = "text/css";
	fileref.href = path;
	var headobj = document.getElementsByTagName('head')[0];
	headobj.appendChild(fileref);
}

//随机生成len个字母
function randomString(len) {
	len = len || 32;
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
	/****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
	var maxPos = $chars.length;
	var pwd = '';
	for (i = 0; i < len; i++) {
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
	}
	return pwd;
}

/*--------------------nieio--------------------*/
//tiping提示框
function tipshow(val) {
	$("#tiptxt").html(val);
	$("#tiping").fadeIn();
	setTimeout(function() {
		$("#tiping").fadeOut();
	},
	2000);
}

//页面访问量超过90W次之后更换新域名。-- 新域名已弃用
function seturl(val) {
	var vals = "";
	if (val < 10) {
		vals = "act0" + val;
	} else {
		vals = "act" + val;
	}
	if (val > 20) {
		vals = "act20";
	}
	for (var key in recommendJSON) {
		recommendJSON[key]["turnurl"] = vals;
	}
}

function getvisitnum() {
	var str = '{"key":"visits"}';
	$.jsonp({
		url: getviewapi,
		data: {
			"req": str
		},
		callback: "success",
		success: function(response) {
			var newnum = Number(response.num);
			console.log(newnum);
			console.log(response);
			seturl(Number(response.typ));
		},
		error: function(xOptions, textStatus) {
			console.log(textStatus);
		}
	});
}

//获取当前页面的id
function getNowNum(val) {
	var urlarr = nowurl.split("?")[0].split("?")[0].split("/");
	var str = urlarr[urlarr.length - 2];
	if (val != undefined) str = val;
	for (var ii = recommendJSON.initialnum; ii < recommendJSON.count; ii++) {
		if (str == recommendJSON[ii].main) {
			thistitle = recommendJSON[ii].main;
			return ii;
			break;
		}
	}
}

//获取当前页面的名称
function getMainName() {
	var urlarr = nowurl.split("?")[0].split("?")[0].split("/");
	var strtitle = urlarr[urlarr.length - 2];
	return strtitle;
}

// 页面访问量 如果flag==5 则表示为结果页面
function getFoodCount(val, flag) {
	var str = "";
	if (flag == 1 || flag == 2) {
		str = '{"key":"' + val + '","typ":"main"}';
	} else if (flag == 5) {
		str = '{"key":"' + val + '","typ":"result"}';
	}
	$.jsonp({
		url: getcountapi,
		data: {
			"req": str
		},
		callback: "success",
		success: function(response) {
			var newnum = Number(recommendJSON[currentNum].num);
			console.log(newnum);
			console.log(response);
			if (flag == 1) { //首页
				$(".participation-status .count").text((Number(response.num) * 3 + newnum));
				descTxt = (Number(response.num) * 3 + newnum) + "人已参加该测试";
				//change(titleTxt,sgUrl,descTxt,imgUrl);
			}
			if (flag == 2) { //结果
				$(".participation-status .count").text((Number(response.num) * 3 + newnum));
				dealResult(response, 2);
			}
			if (flag == 3) { //点赞
				if ((Number(response.num) + Math.ceil(newnum / 10)) > 100000) {
					$("#prase-result span.count").html("10万+");
				} else {
					$("#prase-result span.count").html(Number(response.num) + Math.ceil(newnum / 10));
					// $("#prase-result span.count").html("99992");
				}
			}
			if (flag == 5) { //分结果页面处理
				dealResult(response, 5);
			}
		},
		error: function(xOptions, textStatus) {
			console.log(textStatus);
		}
	});
}

//判断是否IE,如果为IE则动态更改result loading的位置
function isIE() {
	if ( !! window.ActiveXObject || "ActiveXObject" in window) {
		var num = (document.getElementsByTagName('body')[0].offsetWidth - document.getElementById('loadADs').offsetWidth) / 2;
		$("#loadADs").css("left", num + "px");
		$(window).resize(function() {
			var num = (document.getElementsByTagName('body')[0].offsetWidth - document.getElementById('loadADs').offsetWidth) / 2;
			$("#loadADs").css("left", num + "px");
		});
	}
}

/*--------------------广告---------------------*/
//统计打开来源
function allCount() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		//在微信中打开
		_hmt.push(['_trackEvent', 'platform', 'open', 'weixin']);
	} else if (ua.match(/WeiBo/i) == "weibo") {
		//在新浪微博客户端打开
		_hmt.push(['_trackEvent', 'platform', 'open', 'weibo']);
	} else if (ua.match(/QQ\//i) == "qq/") {
		//在QQ
		_hmt.push(['_trackEvent', 'platform', 'open', 'qq']);
	} else {
		//否则就是PC浏览器打开
		_hmt.push(['_trackEvent', 'platform', 'open', 'others']);
	}
}

//更新用户已阅读广告位：+1
function UpdateReaded() {
	//clearInterval(timer);
	//second = 0;
	//console.log("scrolling:"+second);
	if (adsReadedJSON.count == 0) {
		$(window).unbind("scroll", UpdateReaded);
		return;
	}
	//console.log(adsReadedJSON[0].name);
	for (var i = 0; i < adsReadedJSON.count; i++) {
		adsReadedJSON[i].second = 0;
		clearInterval(adsReadedJSON[i].timer);
		addReadedElement(adsReadedJSON[i].name, i);
	}
}

//增加推荐位或者广告
function addReadedElement(adsName, adsNum) {
	if ($(adsName).length == 0) return;

	var adsNameTop = $(adsName).offset().top;
	var adsNameHeight = $(adsName).innerHeight();
	var screenTop = $(window).scrollTop() + $(window).height();
	adsName = adsName.substring(1, adsName.length);

	if (screenTop >= (adsNameTop + adsNameHeight) && $(window).scrollTop() < adsNameTop - 1) {
		adsReadedJSON[adsNum].timer = setInterval("OnlineStayTime('" + adsName + "', '" + adsNum + "')", 1000);
	}
}

//触发已阅读
function OnlineStayTime(adsName, adsNum) {
	adsReadedJSON[adsNum].second++;
	//second++;
	console.log("adsName:" + adsName);
	if (adsReadedJSON[adsNum].second > 2) {
		console.log("已触发2s update");
		//clearInterval(timer);
		clearInterval(adsReadedJSON[adsNum].timer);

		if (adsReadedJSON[adsNum].status == false) {
			if (adsName == "footer") {
				var adsArray = adsReadedJSON[adsNum].tag;
				for (var i = 0; i < adsArray.length; i++) {
					//console.log(adsArray[i]);
					_hmt.push(['_trackEvent', 'Footer', 'cnf-view', 'cnfv-' + adsArray[i]]);
				}
			} else {
				console.log(adsReadedJSON[adsNum].tag);
				_hmt.push(['_trackEvent', 'Recommend', 'cnr-view', 'cnrv-' + adsReadedJSON[adsNum].tag]);
			}
			adsReadedJSON[adsNum].status = true;
			console.log(adsReadedJSON[adsNum]);
		}
	}
}

function addAsdHtml() {
	//var oRedStr2 = '<a id="asd2" onclick="_hmt.push([\'_trackEvent\', \'Recommend\', \'cnr-click\', \'cnrc-mxywk\']);" href="http://www.mu77.com?adid=nieio&ad=1" class="related-item"><div class="img"><img src="../main/images/asd/ad1.jpg" alt=""><span class="rank-badge">2</span></div><div class="desc">角川书店正版手游 最萌的像素世界</div></a>';
	var oRedStr1 = '<a id="asd1" onclick="_hmt.push([\'_trackEvent\', \'Recommend\', \'cnr-click\', \'cnrc-nienieapp\']);" href="http://t.cn/RUPhvip' + '?bepro=' + thistitle + '" class="related-item"><div class="img"><img src="../main/images/asd/ndsq.png" alt=""><span class="rank-badge">1</span></div><div class="desc">捏捏 - 脑洞大开的社交平台</div></a>';
	//var oRedStr3 = '<a id="asd3" onclick="_hmt.push([\'_trackEvent\', \'Recommend\', \'cnr-click\', \'cnrc-bcbk\']);" href="../hit2015/index.html" class="related-item"><div class="img"><img src="../hit2015/images/hit2015.png" alt=""><span class="rank-badge">3</span></div><div class="desc">别踩白块</div></a>';
	var oRedStr = oRedStr1; //+oRedStr2+oRedStr3;
	if (fixedad > 0) {
		return oRedStr;
	} else {
		return "";
	}
}
/*
* 加载其他推荐测试列表
* count 推荐个数
* current 当前推荐
  */
function getRandomRecommend(count) {
	if (recommendJSON.count < count) {
		$("#recommend").hide();
		$('.quiz-list').hide();
		return;
	} else {
		//var oArray = getAnotherNum(recommendJSON.count,count);
		var oArray = gethotnum(count);
	}
	console.log(oArray);
	var oRedStr = addAsdHtml();
	var ht = createRedHtml(recommendJSON, oArray);
	$('.quiz-list').html('').append(oRedStr + ht);
	// console.log(ht);
}

//生成推荐页面
function createRedHtml(data, oArray) {
	var html = "";
	var str = "";
	for (var k = 0; k < oArray.length; k++) {
		var j = k + 1 + fixedad;
		//var j=3;
		var mainname = data[oArray[k]].main;
		str = '<a id="related-' + mainname + '" class="related-item" onclick="_hmt.push([\'_trackEvent\', \'Recommend\', \'cnr-click\', \'cnrc-' + mainname + '\']);" href="../' + mainname + '/index.html?adid=nieio&ad=' + j + '&bepro=' + thistitle + '">' + '<div class="img">' + '<img alt="" src="' + '../' + mainname + "/images/" + mainname + '.png">' + '<span class="rank-badge">' + j + '</span>' + '</div>' + '<div class="desc">' + data[oArray[k]].title + '</div>' + '</a>';
		html += str;
	}
	return html;
}

function gethotjson() { //获取热推荐列表
	var num = 0;
	hotArr = [];
	for (var key in recommendJSON) {
		if (key != "count") {
			if (recommendJSON[key]["red"] == 1) {
				hotrecommendJSON[key] = recommendJSON[key];
				hotArr.push(key);
				num++;
			}
		}
	}
	hotrecommendJSON["count"] = num;
}

//hotrecommendJSON的个数不能小于val
function gethotnum(val) { //获取热推荐的个数
	var arr = [];
	for (var j = 0; j < val; j++) {
		if (hotArr[j] == currentNum) {
			val++;
		} else {
			arr.push(hotArr[j]);
		}
	}
	return arr;
}

//随机n个测试
/*
* all:测试项目总个数
* count:要随机出来的个数
* current:当前的测试项除外
* */
function getAnotherNum(all, count) {
	var ary = [];
	ary.push(currentNum);
	while (ary.length < (count + 1)) {
		var tmp = parseInt(Math.random() * all);
		var b = false;
		for (var i = 0; i < ary.length; i++) {
			if (ary[i] == tmp) {
				b = true;
				break;
			}
		}
		if (!b) {
			ary[ary.length] = tmp;
		}
	}
	ary.shift();
	return ary;
};

//所有广告中选2个广告。
function getTwoAds(all, count) {
	var ary = [];
	while (ary.length < count) {
		var tmp = parseInt(Math.random() * all);
		var b = false;
		for (var i = 0; i < ary.length; i++) {
			if (ary[i] == tmp) {
				b = true;
				break;
			}
		}
		if (!b) {
			ary[ary.length] = tmp;
		}
	}
	return ary;
};

//加载 footer
function addfooter() {
	var oAll = footerJSON.count;
	var count = 2; //选两个。
	var aAry = getTwoAds(oAll, count);
	var fixedadstr;
	footerArr = [footerJSON[aAry[0]].tag, footerJSON[aAry[1]].tag];

	//页面特殊处理的footer
	if (nowurl.indexOf("band2015") > -1 || nowurl.indexOf("color2015") > -1) {
		fixedadstr = '<li><a onclick="_hmt.push([\'_trackEvent\', \'Footer\', \'cnf-click\', \'cnfc-nndbz\']);" href="http://www.acfun.tv/v/ac2177899?adid=band2015-index&ad=2">「捏捏大爆炸」租房子能和美女"生"孩子？</a></li>';
	} else {
		fixedadstr = '<li><a href="' + footerJSON[aAry[1]].link + '" onclick="_hmt.push([\'_trackEvent\', \'Footer\', \'cnf-click\', \'cnfc-' + footerArr[1] + '\']);">' + footerJSON[aAry[1]].txt + '</a></li>'
	}

	var str=	'<div class="container">' +
					'<ul>' +
						'<li><a href="'+ footerJSON[aAry[0]].link +'" onclick="_hmt.push([\'_trackEvent\', \'Footer\', \'cnf-click\', \'cnfc-'+footerArr[0]+'\']);" >'+ footerJSON[aAry[0]].txt +'</a></li>' +
						fixedadstr+
					'</ul>' +
					//'<div class="change-lang">' +
						//'<div class="change-txt"><span>语言切换</span></div>' +
					//'</div>' +
					//'<div class="change-buttons">' +
						//'<div class="chgButton cnTxt"><a href="http://cn.nie.io/">简</a></div>' +
						//'<div class="chgButton twTxt"><a href="http://hk.nie.io/">繁</a></div>' +
						//'<div class="chgButton enTxt"><a href="http://en.nie.io/">En</a></div>' +
					//'</div>' +
					'<div class="copyright"><a class="cpya" href="http://nienie.im/">&copy; 2015 捏捏</a> | <a href="'+prstr+'main/aboutservice.html">隐私条款</a> | <a href="'+prstr+'main/about.html">关于我们</a> </div>' +
				'</div>';
	$(".footer").html('').append(str);
}

//加载loading广告html
function loadADs() {
	var oAll = adsJSON.count;
	var count = 2; //选两个。
	var aAry = getTwoAds(oAll, count);
	loadArr = [adsJSON[aAry[0]].tag, adsJSON[aAry[1]].tag];

	var str = '<div id="loadADs">' + '<div id="loadADsMain">' + '<div class="header" id="adHeader"><div class="compact"> <a class="brand" href="../index.html"><img src="../main/images/logo.png"></a> <div class="weixin float1"> <a href="http://mp.weixin.qq.com/s?__biz=MzI2NDAyODI3OA==&amp;mid=207313148&amp;idx=1&amp;sn=6e2912e2a981be45e56eb330840f6ca0#rd" target="_blank"> <img width="80" border="0" title="天天微漫画-捏捏." alt="天天微漫画-捏捏" src="http://cn.nie.io/main/images/v_focus_nienie.png"> </a> </div> </div> </div>' + '<p><img width="48" height="48" class="result-loading" src="../main/images/spin.png" alt=""></p>' + '<p id="loadingword">正在计算结果中...</p>' + '<p >添加微信公众号，一手新鲜测试抢先体验！<br />Wechat ID：nie_io</p>' + '<p class="loadad">' + '<a target="_blank" onclick="_hmt.push([\'_trackEvent\', \'Loading\', \'cnl-click\', \'cnlc-' + loadArr[0] + '\']);" href="' + adsJSON[aAry[0]].link + '"><img alt="' + adsJSON[aAry[0]].txt + '" src="../main/images/asd/' + adsJSON[aAry[0]].img + '" width="100%" class="load-asd1"></a>' + '<a target="_blank" onclick="_hmt.push([\'_trackEvent\', \'Loading\', \'cnl-click\', \'cnlc-' + loadArr[1] + '\']);" href="' + adsJSON[aAry[1]].link + '"><img alt="' + adsJSON[aAry[1]].txt + '" src="../main/images/asd/' + adsJSON[aAry[1]].img + '" width="100%" class="load-asd2"></a>' + '</p>' + '</div>' + '</div>';
	$("#loading").html('').append(str);
	//console.log(aAry); console.log(adsJSON[aAry[0]].link); console.log(adsJSON[aAry[0]].img);
	isIE();
}

//开启2s广告
function startLoadAds() {
	loadADs();
	//$("#resultPage").hide();
	setTimeout(function() {
		//隐藏广告，查看结果。
		$("#loading").fadeOut(200);
		$("#resultPage").fadeIn(200);
		addfix();
	},
	2000);
}

//底部fixed页面：
function addfix() {
	//alert(currentNum + "-" +recommendJSON[currentNum].psw)
	if (nowurl.indexOf("/result.html") == -1) return;
	if (recommendJSON[currentNum] == undefined || recommendJSON[currentNum].psw == "") return;

	var str = '<div id="actfix">' + '<a href="http://mp.weixin.qq.com/s?__biz=MzI2NDAyODI3OA==&mid=400233771&idx=1&sn=79ddde1ee740098128e040cd15840b15#rd" target="_blank" onclick="_hmt.push([\'_trackEvent\', \'footeract\', \'footeract-click\', \'footeract-3570\']);">' + '<div class="actword">活动密码：' + recommendJSON[currentNum].psw + '</div>' + '</a>' + '</div>';
	$("body").append(str);
	setTimeout(function() {
		$("#actfix").fadeOut(200);
	},
	5000);
}

/*--------------------分享-----------------------*/
function creatsharethings() { //主页的时候初始化分享链接
	var nownum = currentNum;
	//alert(nownum)
	titleTxt = $(document).attr("title");
	var urlshare = nowurl;
	if (urlshare.indexOf("?") == -1) {
		urlshare += "?";
	}
	sgUrl = urlshare + "&nn=share_weixin";
	descTxt = "NIE.IO 超有趣的娱乐自媒体品牌";
	if (recommendJSON[nownum]) {
		imgUrl = preurl + "/" + recommendJSON[nownum].main + "/images/s/fico/sico.png";
	} else {
		imgUrl = preurl + "/main/images/nnys.png";
	}

	console.log("index:" + titleTxt);
	console.log("index:" + descTxt);
	console.log("index:" + imgUrl);
	console.log("index:" + sgUrl);

	//分享按钮分享
	urlweibo = "http://service.weibo.com/share/share.php?url=" + encodeURIComponent(urlshare + "&nn=share_weibo") + "&title=" + titleTxt + "&pic=" + imgUrl + "&appkey=2611781654&ralateUid=5655640783&source=捏捏运势&sourceUrl=http://www.nienie.im&content=utf8&searchPic=true";
	urlqzone = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(urlshare + "&nn=share_zone") + "&summary=" + titleTxt + "&pics=" + imgUrl + "&site=APP捏捏";
	urlrenren = "http://widget.renren.com/dialog/share?resourceUrl=http://cn.nie.io" + "&srcUrl=" + encodeURIComponent(urlshare + "&nn=share_renren") + "&title=" + titleTxt + "&description=" + descTxt + "&pic=" + imgUrl;
	urldouban = "http://shuo.douban.com/!service/share?image=" + imgUrl + "&href=" + encodeURIComponent(urlshare + "&nn=share_douban") + "&name=" + titleTxt + "&text=" + descTxt;
	urlqqwb = "http://v.t.qq.com/share/share.php?c=share&title=" + titleTxt + "&url=" + encodeURIComponent(urlshare + "&nn=share_qqweibo") + "&appkey=413d5d99865efb51bd7689741af0e13e&pic=" + imgUrl;
	urllinkedin = "http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(urlshare + "&nn=share_linkedin") + "&title=" + titleTxt;
	urltwitter = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(urlshare + "&nn=share_twitter") + "&text=" + titleTxt + "&hashtags=捏捏运势";
	urlfacebook = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(urlshare + "&nn=share_facebook") + "&picture=" + imgUrl;
	urlgoogleplus = "https://plus.google.com/share?url=" + encodeURIComponent(urlshare + "&nn=share_gooleplus");

	//微信分享
	change(titleTxt, sgUrl, descTxt, imgUrl);

}
function diyshareurls(val) {
	//加入分享发布者的openid
	var openid = $.cookie('openid');
	if (openid != "" && openid != null && val.indexOf("bs=1") > -1) val = val.replace("bs=1", "frid=" + openid + "&bs=1");
	titleTxt = titleTxt.replace("%", "%25");

	//分享按钮分享
	urlweibo = "http://service.weibo.com/share/share.php?url=" + encodeURIComponent(val + "&nn=share_weibo") + "&title=" + titleTxt + "&pic=" + imgUrl + "&appkey=2611781654&ralateUid=5655640783&source=捏捏运势&sourceUrl=http://www.nienie.im&content=utf8&searchPic=true";
	urlqzone = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(val + "&nn=share_zone") + "&summary=" + titleTxt + "&pics=" + imgUrl + "&site=APP捏捏";
	urlrenren = "http://widget.renren.com/dialog/share?resourceUrl=http://cn.nie.io" + "&srcUrl=" + encodeURIComponent(val + "&nn=share_renren") + "&title=" + titleTxt + "&description=" + descTxt + "&pic=" + imgUrl;
	urldouban = "http://shuo.douban.com/!service/share?image=" + imgUrl + "&href=" + encodeURIComponent(val + "&nn=share_douban") + "&name=" + titleTxt + "&text=" + descTxt;
	urlqqwb = "http://v.t.qq.com/share/share.php?c=share&title=" + titleTxt + "&url=" + encodeURIComponent(val + "&nn=share_qqweibo") + "&appkey=413d5d99865efb51bd7689741af0e13e&pic=" + imgUrl;
	urllinkedin = "http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(val + "&nn=share_linkedin") + "&title=" + titleTxt;
	urltwitter = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(val + "&nn=share_twitter") + "&text=" + titleTxt + "&hashtags=捏捏运势";
	urlfacebook = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(val + "&nn=share_facebook") + "&picture=" + imgUrl;
	urlgoogleplus = "https://plus.google.com/share?url=" + encodeURIComponent(val + "&nn=share_gooleplus");
}

function addshare() {
	var shareArr = ["weibo", "qzone", "renren", "douban", "tweibo", "linkedin", "twitter", "facebook", "google"];
	var str= 	'<!--分享-->'+
				'<div id="share">'+
					'<img id="shraeimg" src="../main/images/icons/shareimg.png">'+
					'<div class="sharediv">'+
						'<div class="share-close"><img width="100%" src="../main/images/login/nie-login-close.png"/></div>'+
						'<div class="share-title">'+
							'<div class="share-ts">'+
								'<span>分享</span>'+
							'</div>'+
						'</div>'+
						'<div class="shareicon">'+
							'<div id="shareweibo" class="shareway" onclick="toshare(this.id);_hmt.push([\'_trackEvent\', \'Share\', \'cns-share\', \'cns-'+shareArr[0]+'\']);">'+
								'<img src="../main/images/icons/weibo.png" />'+
								'<div class="sharetxts">新浪微博</div>'+
							'</div>'+
						'</div>'+
						'<div class="shareicon">'+
							'<div id="shareqzone" class="shareway" onclick="toshare(this.id);_hmt.push([\'_trackEvent\', \'Share\', \'cns-share\', \'cns-'+shareArr[1]+'\']);">'+
								'<img src="../main/images/icons/qzone.png" />'+
								'<div class="sharetxts">QQ空间</div>'+
							'</div>'+
						'</div>'+
						'<div class="shareicon">'+
							'<div id="sharerenren" class="shareway" onclick="toshare(this.id);_hmt.push([\'_trackEvent\', \'Share\', \'cns-share\', \'cns-'+shareArr[2]+'\']);">'+
								'<img src="../main/images/icons/renren.png" />'+
								'<div class="sharetxts">人人网</div>'+
							'</div>'+
						'</div>'+
						'<div class="clear"></div>'+
						'<div class="shareicon">'+
							'<div id="sharedouban" class="shareway" onclick="toshare(this.id);_hmt.push([\'_trackEvent\', \'Share\', \'cns-share\', \'cns-'+shareArr[3]+'\']);">'+
								'<img src="../main/images/icons/douban.png" />'+
								'<div class="sharetxts">豆瓣</div>'+
							'</div>'+
						'</div>'+
						'<div class="shareicon">'+
							'<div id="shareqqwb" class="shareway" onclick="toshare(this.id);_hmt.push([\'_trackEvent\', \'Share\', \'cns-share\', \'cns-'+shareArr[4]+'\']);">'+
								'<img src="../main/images/icons/qqwb.png" />'+
								'<div class="sharetxts">腾讯微博</div>'+
							'</div>'+
						'</div>'+
						'<div class="shareicon">'+
							'<div id="sharelinkedin" class="shareway" onclick="toshare(this.id);_hmt.push([\'_trackEvent\', \'Share\', \'cns-share\', \'cns-'+shareArr[5]+'\']);">'+
								'<img src="../main/images/icons/linkedin.png" />'+
								'<div class="sharetxts">LinkedIn</div>'+
							'</div>'+
						'</div>'+
						'<div class="clear"></div>'+
						'<div class="shareicon">'+
							'<div id="sharetwitter" class="shareway" onclick="toshare(this.id);_hmt.push([\'_trackEvent\', \'Share\', \'cns-share\', \'cns-'+shareArr[6]+'\']);">'+
								'<img src="../main/images/icons/twitter.png" />'+
								'<div class="sharetxts">Twitter</div>'+
							'</div>'+
						'</div>'+
						'<div class="shareicon">'+
							'<div id="sharefacebook" class="shareway" onclick="toshare(this.id);_hmt.push([\'_trackEvent\', \'Share\', \'cns-share\', \'cns-'+shareArr[7]+'\']);">'+
								'<img src="../main/images/icons/facebook.png" />'+
								'<div class="sharetxts">Facebook</div>'+
							'</div>'+
						'</div>'+
						'<div class="shareicon">'+
							'<div id="sharegoogleplus" class="shareway" onclick="toshare(this.id);_hmt.push([\'_trackEvent\', \'Share\', \'cns-share\', \'cns-'+shareArr[8]+'\']);">'+
								'<img src="../main/images/icons/googleplus.png" />'+
								'<div class="sharetxts">Google+</div>'+
							'</div>'+
						'</div>'+
						'<div class="clear" style="height:10px;"></div>'+
					'</div>'+
				'</div>';
	$("body").append(str);

	$(".share-close").click(function() {
		$("#share").hide();
	});
	$("#share").click(function(e) {
		if (e.target.id == "share" || e.target.id == "shraeimg") {
			$("#share").hide();
		}
	});

	//检查是否可用twitter
	window.onload = function() {
		//if(twiapi && nowurl.indexOf("result.html")>-1 ){
		//checkvpn();
		//}
	};
}

function checkvpn() {
	$.jsonp({
		//url: 'http://urls.api.twitter.com/1/urls/count.json',
		url: 'http://graph.facebook.com/',
		data: {
			id: 'http://nie.io',
			callback: "callback"
		},
		callback: "callback",
		success: function(response) {
			//console.log("2"+response);
			//$("#btn").html("OK")
			//twitter facebook google+可用
			//$("#shareTwitter img").attr("src","../main/images/icons/twitter.png")
			//$("#shareFacebook img").attr("src","../main/images/icons/facebook.png")
			//$("#shareGoogleplus img").attr("src","../main/images/icons/googleplus.png")
			console.log("22:" + response);
			shareenabled("twitter");
			shareenabled("facebook");
			shareenabled("googleplus");
		},
		error: function(xOptions, textStatus) {
			console.log("11:" + textStatus);
			shareenabled("twitter");
			shareenabled("facebook");
			shareenabled("googleplus");
		}
	});
}

function sharedisabled(val) {
	$("#share" + val + " img").attr("src", "../main/images/icons/" + val + "-grey.png")
}
function shareenabled(val) {
	$("#share" + val + " img").attr("src", "../main/images/icons/" + val + ".png")
}

function toshare(val) {
	if ($("#" + val + " img").attr("src").indexOf("grey") == -1) {
		_hmt.push(['_trackEvent', 'activity', 'share', val]);
		window.location.href = eval(val.replace("share", "url"));
	}
}
//分享控件
function shares() {
	if (is_weixn()) {
		$("#shraeimg").show();
	} else {
		$("#shraeimg").hide();
	}
	$("#share").show();

	var bott = ($(window).height() - $("#shraeimg").height() - $(".sharediv").height()) / 2;
	if (bott < 5) {
		bott = "5px";
	} else {
		bott = bott + "px"; //parseInt(100*bott/$(window).width()) + "%";
	}
	//alert($(window).height() +"---"+ $("#shraeimg").height() +"---"+ $(".sharediv").height())
	$(".sharediv").css("bottom", bott);
	$(window).resize(function() {
		var bott = ($(window).height() - $("#shraeimg").height() - $(".sharediv").height()) / 2;
		if (bott < 5) {
			bott = "5px";
		} else {
			bott = bott + "px"; //parseInt(100*bott/$(window).width()) + "%";
		}
		$(".sharediv").css("bottom", bott);
	});

	$("#share").animate({
		opacity: "1"
	},
	500);
}
function sharesnone() {
	$("#share").animate({
		opacity: "0"
	},
	500);
	$("#share").hide();
}

/******wx share***********/

// 生成随机字符串
function nonceStr() {
	return nonceStr = Math.random().toString(36).substr(2, 15);
}
// 生成时间戳
function timestamp() {
	return timestamp = parseInt(new Date().getTime() / 1000) + '';
}
// 使用ticket, nonceStr, timestamp, url生成签名
function calcSignature(ticket, nonceStr, timestamp, url) {
	var string1 = 'jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + timestamp + '&url=' + url;
	shaObj = new jsSHA(string1, 'TEXT');
	return shaObj.getHash('SHA-1', 'HEX');
}
//更改分享链接
function change(titleTxt2, sgUrl2, descTxt, imgUrl) {
	//加入分享发布者的openid
	var openid = $.cookie('openid');
	if (openid != "" && openid != null && sgUrl2 != undefined && sgUrl2.indexOf("bs=1") > -1) sgUrl = sgUrl2.replace("bs=1", "frid=" + openid + "&bs=1");
	titleTxt = titleTxt2.replace("%", "%25");
	//console.log(sgUrl);
	//alert(sgUrl)
	if (is_weixn()) {
		sendAjax();
	}
	//define_wx_share(titleTxt,sgUrl,descTxt,imgUrl);
}
//配置微信分享
function define_wx_share(titleTxt, sgUrl, descTxt, imgUrl) {
	if (!is_weixn()) return;

	// 开始配置微信JS-SDK，参数：appid，timestamp，nonceStr，signature
	wx.config({
		//true/false 开启/关闭调试
		debug: false,
		appId: shareapp[ticketran],
		timestamp: timestamp,
		nonceStr: nonceStr,
		signature: signature,
		jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
	});
	// 调用微信API
	wx.ready(function() {
		var sdata = {
			title: titleTxt,
			desc: descTxt,
			link: sgUrl,
			imgUrl: imgUrl,
			success: function() {
				//alert('用户确认分享后执行的回调函数');
			},
			cancel: function() {
				//alert('用户取消分享后执行的回调函数');
			}
		};
		//分享到朋友圈
		wx.onMenuShareTimeline(sdata);
		//分享给朋友
		wx.onMenuShareAppMessage(sdata);

	});

}

//发送请求
function sendAjax() {
	var request;
	request = "http://" + getHost() + shareticket;
	$.ajax({
		type: "POST",
		url: request,
		data:{id: shareapp[ticketran]},
		success: function(data) {
			if (typeof(data) == "string") {
				data = JSON.parse(data);
			}
			if (data.result == 0) {
				// alert(sgUrl);
				ticket = data.ticket;
				signature = calcSignature(ticket, nonceStr, timestamp, window.location.href);
				define_wx_share(titleTxt, sgUrl, descTxt, imgUrl);
				// alert(sgUrl);
			}
		},
		error: function() {
			//alert("请求出错,请重新访问！");
		}
	});
}

/*----------------好友关系-------------------------*/
//登录标识符，通过cookies判断
function checkLoginStatus() {
	var account_id = $.cookie('account_id');
	var name = $.cookie('nieio_nick_name');

	if (name != null && name != "") {
		onlineStatus = 1; //有用户信息
	}

	if (account_id != null && account_id != "") {
		if (onlineStatus != 1) onlineStatus = 2; //有token信息，但没有用户信息
		else onlineStatus = 3; //有token信息，也有用户信息
	}
}

//分享链接，增加好友关系
function addFriendList() {
	var account_id = $.cookie('account_id');
	var openid = $.cookie('openid');
	console.log("onlineStatus:" + onlineStatus);

	if (sFrid == undefined || sFrid == '') {
		sFrid = $.cookie("frid");
	} else {
		//防止跳转微信取不到cookie
		$("#retry2").attr('onclick','javascript:location.href=\''+newurl+'index.html?frid='+sFrid+'&adid=metoo\'');
		$.cookie("frid", sFrid, {path: '/',domain: oDomain});
	}
	console.log("sFrid:" + sFrid);

	//必须有token信息
	if ((onlineStatus == 2 || onlineStatus == 3) && openid != sFrid && sFrid != null && sFrid != "") {
		var url = "http://" + getHost() + "/php/friend.php";
		$.post(url, {
			account_id: account_id,
			frid: sFrid
		},
		function(data) {
			console.log(data);
			if (typeof(data) == "string") {
				data = JSON.parse(data);
			}

			if (data.result == "0") {
				//防止重复操作
				$.cookie('frid', null, {path: '/',domain: oDomain});
			}
		});
	}
}

/*----------------登录-------------*/
//跳转到wx授权
function skip_to_wx() {
	deleteCookie();
	var APPID = "wx56ce2d9f02b99033";
	var REDIRECT_URI = "http://h5.nie.io/apiweb/wechat.html";
	var adrUrl = window.location.href.split("?")[0];
	var hrefUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APPID + "&redirect_uri=" + REDIRECT_URI + "&response_type=code&scope=snsapi_userinfo&state=" + encodeURIComponent(adrUrl) + "#wechat_redirect";
	window.location.href = hrefUrl;
}

//跳转到qq授权
function skip_to_qq() {
	deleteCookie();
	var appID = "101187094";
	var redirectURI = "http://h5.nie.io/apiweb/qq.html";
	var adrUrl = window.location.href;
	var hrefUrl = "https://graph.qq.com/oauth2.0/authorize?client_id=" + appID + "&redirect_uri=" + redirectURI + "&scope=get_user_info&response_type=token&state=" + encodeURIComponent(adrUrl);
	window.location.href = hrefUrl;
}

//跳转到wb授权
function skip_to_wb() {
	deleteCookie();
	var client_id = "2611781654";
	var redirectURI = "http://h5.nie.io/apiweb/weibo.html";
	var adrUrl = window.location.href;
	var hrefUrl = "https://api.weibo.com/oauth2/authorize?client_id=" + client_id + "&redirect_uri=" + redirectURI + "&response_type=code&state=" + encodeURIComponent(adrUrl);
	window.location.href = hrefUrl;
}

//清除cookie
function deleteCookie() {
	// alert("delete cookie");
	$.cookie('nieio_avatar', null, {path: '/',domain: oDomain});
	$.cookie('nieio_nick_name', null, {path: '/',domain: oDomain	});
	$.cookie('nieio_sex', null, {path: '/',domain: oDomain	});
	if ($.cookie("nieio_age"))
		$.cookie('nieio_age', null, {path: '/',domain: oDomain});
	if ($.cookie("openid"))
		$.cookie('openid', null, {path: '/',domain: oDomain});
	if ($.cookie('access_token')) {
		$.cookie('access_token', null, {path: '/',domain: oDomain});
		$.cookie('account_id', null, {path: '/',domain: oDomain});
	}
}

//请求cookie
function getJsonCookie() {
	$.jsonp({
		url: "http://h5.nie.io/php/getcs.php",
		data: {},
		callback: "nienie",
		success: function(data) {
			if (nowapi == "true") { //首次登录成功，loginFlag给七天的cookie
				$.cookie('loginFlag', logflag, {expires: 7,path: '/',domain: oDomain});
			} else if (!$.cookie('loginFlag')) {
				$.cookie('loginFlag', data.loginFlag, {expires: 1,path: '/',domain: oDomain});
			}

			if (data.access_token != undefined && data.access_token != "" && data.access_token != null) {
				loginNieio(data.access_token, data.openid, data.account_id);
			} else {
				console.log("获取信息失败，请重新登录");
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
		},
		error: function(xOptions, textStatus) {
			console.log(textStatus);
		}
	});
}

//删除cookie
function deleleJsonCookie() {
	$.jsonp({
		url: "http://h5.nie.io/php/delcs.php",
		data: {},
		callback: "nienie",
		success: function(data) {
			console.log(data + "删除成功");
		},
		error: function(xOptions, textStatus) {
			console.log(textStatus);
		}
	});
}

//微信登录
function loginNieio(access_token, openid, account_id) {
	var obj = {
		access_token: access_token,
		account_id: account_id
	};

	$("#login").html("..."); //正在登录的过程中显示loading
	var request_url = "http://" + getHost() + "/php/user.php";
	$.post(request_url, obj,
	function(data) {
		if (typeof(data) == "string") {
			data = JSON.parse(data);
		}
		console.log(data);
		if (data.result == "0") {
			$.cookie('nieio_avatar', data.avatar, {expires: 1,path: '/',domain: oDomain});
			$.cookie('nieio_nick_name', data.name, {expires: 1,path: '/',domain: oDomain});
			$.cookie('nieio_sex', data.sex, {expires: 1,path: '/',domain: oDomain});
			if(!$.cookie('openid'))
				$.cookie('openid', openid, {expires: 1,path: '/',domain: oDomain});
			if(!$.cookie('account_id'))
				$.cookie('account_id', account_id, {expires: 1,path: '/',domain: oDomain});
			if (data.age > 0) {
				$.cookie('nieio_age', data.age, {expires: 1,path: '/',domain: oDomain});
			}
			userMsg();
		} else {
			deleteCookie();
			deleteAllCookie();

			tiplog();
		}
	}).error(function(data, status) {
		tiplog();
		//tipshow("登录失败，请重新登录");
	});
}

function tiplog(){
	if(indexboo){
		$("#login").html("登录");
		$("#login").show();
		$("#user-info").hide();
	}	
}

//登录
function loginDialog() {
	var str = '<div id="loginDialog"> <div class="loginMain"> <div class="loginDiv"> <div class="LG-close">关闭</div> <div class="LG-title"><div class="LG-ts"><span>可以用以下方式登录</span></div></div> <p class="login-txt login-wb">微博登录</p> <p class="login-txt lgtxt1 login-qq">QQ登录</p> </div> </div></div>';
	$("body").append(str);
	$(".login-qq").bind("click",
	function() {
		skip_to_qq();
	});
	$(".login-wb").bind("click",
	function() {
		skip_to_wb();
	});
	$(".LG-close").bind("click",
	function() {
		$("#loginDialog").hide();
	});
}

//退出
function loginoutDialog() {
	var str = '<div id="loginoutDialog"> <div class="LGoutMain"> <div class="LGoutDiv fr"> <div class="LGArrow"></div> <div class="LGmsg clearfix"> <dl> <dt><img id="LGAvatar" src="" alt="头像"/></dt> <dd id="LGName">vincent</dd> </dl> </div> <div class="login-exit"><button>退出</button></div> </div> </div></div>';
	$("body").append(str);
}

//以下为快捷登录代码
function fastLGDialog() {
	var str = '<div id="fastLogin"> <div id="fast-close" class="fast-close"><a href="javascript: ;">关闭</a></div> <div id="fastMain"> <div class="fastGz"> <dl> <dt class="codeImg"></dt> <dd> <p> 扫描左侧二维码，关注</p> <p>NIE.IO官方微信公众账号</p> </dd> </dl> </div> <div class="fastLG"> <p>快捷登录</p> <a href="javascript: ;" class="LGWB fLGBtn">新浪微博登录</a> <a href="javascript: ;" class="LGQQ fLGBtn">qq登录</a> </div> </div></div>';
	if (currentNum > 0) $("body").append(str);
	$("#fast-close").bind("click",function() {
		$("#fastLogin").fadeOut();
	});
	$(".LGWB").bind("click",function() {
		skip_to_wb();
	});
	$(".LGQQ ").bind("click",function() {
		skip_to_qq();
	});
}

// 激活退出
function registerExit() {
	$(".login-exit").bind("click",function() {
		deletePlayedView();
		deleteAllCookie();

		$("#loginoutDialog").hide();
		tiplog();
		if ($("#insert-name")) $("#insert-name").attr("value", "");
		if ($("#insert-name2")) $("#insert-name2").attr("value", "");
		deleleJsonCookie();
		// if($.cookie("loginFlag") == "wb"){
		//     $.cookie("loginFlag",null, { path:'/',domain:oDomain});
		//     location.href="http://nienie.im/apiweb/outwb.html";
		// }else{
		//     $.cookie("loginFlag",null, { path:'/',domain:oDomain});
		// }
	});
}

// 激活单击元素以外的部分隐藏元素
function registerHide() {
	//单击元素以外的部分隐藏元素
	$("#loginDialog").click(function(evt) {
		if (evt.target.id == "loginDialog" || evt.target.className == 'loginMain') {
			$('#loginDialog').hide();
		}
	});
	$("#loginoutDialog").click(function(evt) {
		if (evt.target.id == "loginoutDialog" || evt.target.className == 'LGoutMain') {
			$('#loginoutDialog').hide();
		}
	});
}

//显示用户信息
function userMsg() {
	$("#fastLogin").hide();
	$("#login").hide();
	$("#LGAvatar").attr("src", $.cookie('nieio_avatar'));
	$("#LGName").html($.cookie('nieio_nick_name'));
	$("#user-info").show().css({
		"background": "url(" + $.cookie('nieio_avatar') + ") no-repeat center center / cover"
	});
	$("#header").append("<img src='" + $.cookie('nieio_avatar') + "' alt='头像' style='display:none' id='usrAvatar' />");
	if ($("#insert-name")) $("#insert-name").attr("value", $.cookie('nieio_nick_name'));

	if ($.cookie('nieio_sex') == "男") {
		$("#sexTxt").attr("value", 1);
	} else {
		$("#sexTxt").attr("value", 0);
	}
	if ($("#nameBox")) $("#nameBox").show();
	if ($("#submit")) $("#submit").show();
	if ($("#submit2")) $("#submit2").hide();
	
	//用户信息存储后直接调用某些需要登录要求的方法
	logafter();

	//存储游戏记录
	addPlayedData();

	//加载被赞数据
	getLikesPlayed();
		
	if(indexboo && $("#play-login-click")[0] && nowurl.indexOf("nie.io") == -1){
		getPlayedData();//加载好友游戏信息
		$("#play-login-click").hide();
	}
	//if( prstr!= "" && indexboo && currentNum>0){
		//getPlayedData();//加载好友游戏信息
	//}
	//if( prstr = ""){
		//getPlayedData();//加载好友游戏信息,大主页
	//}
}

function logafter(){
	
}

// 存储游戏记录
function addPlayedData() {
	//测试首页
	if (indexboo && prstr != "") {
		var uid = $.cookie('account_id');
		if (uid != null && uid != "") {
			$.post("http://" + getHost() + "/php/play.php", {
				source: nowlan,
				handle: "playing",
				name: mainName,
				id: currentNum,
				account_id: uid
			},
			function(data) {
				console.log(data);
			});
		}
	}
}

// 获取游戏信息
function getPlayedData() {
	var uid = $.cookie('account_id');
	if (uid != null && uid != "") {
		$.ajax({
			type: "POST",
			url: "http://" + getHost() + "/php/play.php",
			data: {
				source: nowlan,
				handle: "played",
				id: currentNum,
				account_id: uid
			},
			dataType: "json",
			success: function(data) {
				console.log(data);
				if (typeof(data) == "string") {
					data = JSON.parse(data);
				}

				//请求成功返回数据
				if (data.result == 0) {
					echoPlayedView(data);
				}

				//获取被赞记录
				getLikesData();
			}
		});
	} else {
		deletePlayedView();
	}
}

// 删除好友关系显示的视图
function deletePlayedView() {
	//清除
	$(".quiz-list a").find(".played-game").remove();
	$(".quiz-list a").find(".played-reco").remove();
	$("#main").find(".played-index").remove();
	$("#main").find(".likes").remove();
	//登录条
	$(".quiz-item:first-child").find(".count").before('<div class="play-index-login"><a id="play-login-click" href="javascript:;" title="登录查看好友关系" ><img src="main/images/login.png"/></a></div>');
	$(".related-item:first-child").append('<div class="play-reco-login"><a id="play-login-click" href="javascript:;" title="登录查看好友关系"><img src="../main/images/login.png"/></a></div>');
	//监听点击
	$("#play-login-click").click(function() {
		$("#login").click();
	});
}
var echoplayed = false;
// 显示好友头像
function echoPlayedView(data) {
	var game = data.game;
	for (var names in game) {
		var name = names.replace("%0A","");
		var game_info = game[name]['user'];
		var game_num = game[name]['num'];
		var img_data = '';
		var span_info = game_num > 3 ? '...等': '';

		//把头像存入数组中
		for (var id in game_info) {
			img_data += '<img src="' + game_info[id].avatar + '"/>';
		}

		//主页
		if (indexboo && prstr == "") {
			$("#" + name).find(".count").before('<div class="played-game">' + img_data + '<span>' + span_info + '<b>' + game_num + '</b>位好友也在玩</span></div>');
		}

		//测试首页
		if (indexboo && prstr != "") {
			if (name == mainName && !echoplayed) {
				echoplayed = true;
				$("#main").find(".top").after('<div class="played-index">' + img_data + '<span>' + span_info + '<b>' + game_num + '</b>位好友也在玩</span></div>');
			}
			//推荐页面
			$("#related-" + name).append('<div class="played-reco">' + img_data + '<span>' + span_info + '<b>' + game_num + '</b>位好友也在玩</span></div>');
		}
	}
}

// 获取被赞记录
function getLikesData() {
	var uid = $.cookie('account_id');
	if (uid != null && uid != "") {
		var played = $("#main").find(".played-index");
		//没有好友的游戏信息
		if (played.length == 0) {
			$("#main").find(".top").after('<div class="played-index"></div>');
			played = $("#main").find(".played-index");
		}

		$.ajax({
			type: "POST",
			url: "http://" + getHost() + "/php/likes.php",
			data: {
				source: nowlan,
				handle: "search",
				name: mainName,
				account_id: uid
			},
			dataType: "json",
			success: function(data) {
				console.log(data);
				if (typeof(data) == "string") {
					data = JSON.parse(data);
				}

				if (data.result == 0) {
					if (data.has == true) {
						played.append('<div class="liked-link" title="已经赞过了"></div>');
					} else {
						played.append('<div class="like-link" title="赞一下"></div>');
					}
				} else {
					played.append('<div class="like-link" title="赞一下"></div>');
				}

				//监听点击事件
				addLikeListener(mainName, uid);
			}
		});
	}
}

// 更多按钮的点击事件
function addLikeListener(name, uid) {
	//已存在赞过的按钮
	var btn_liked = $("#main").find(".liked-link");
	btn_liked.click(function() {
		alert('你已经赞过了');
	});

	var btn_like = $("#main").find(".like-link");
	btn_like.click(function() {
		$.ajax({
			type: "POST",
			url: "http://" + getHost() + "/php/likes.php",
			data: {
				source: nowlan,
				handle: "add",
				name: name,
				id: currentNum,
				account_id: uid
			},
			dataType: "json",
			success: function(data) {
				console.log(data);
				if (typeof(data) == "string") {
					data = JSON.parse(data);
				}

				if (data.result == 0) {
					//移除未赞按钮
					btn_like.remove();

					var played = $("#main").find(".played-index");
					played.append('<div class="liked-link" title="已经赞过了"></div>');
					//监听赞过的按钮点击
					btn_liked = $("#main").find(".liked-link");
					btn_liked.click(function() {
						alert('你已经赞过了');
					});
				} else {
					alert('点赞发生错误，请稍后再试');
				}
			}
		});
	});
}

// 获取10条被赞记录和游戏信息
function getLikesPlayed() {
	var uid = $.cookie('account_id');
	if (uid != null && uid != "") {
		$.ajax({
			type: "POST",
			url: "http://" + getHost() + "/php/likes.php",
			data: {
				source: nowlan,
				handle: "glp",
				account_id: uid
			},
			dataType: "json",
			success: function(data) {
				//console.log(data);
				if (typeof(data) == "string") {
					data = JSON.parse(data);
				}
				//请求成功返回数据
				if (data.result == 0) {
					echoLikesView(data);
				}
			}
		});
	}
}

// 显示被赞记录和好友游戏的信息
function echoLikesView(data) {
	var likes = new Array();
	//对象转数组
	for (var item in data.likes) {
		likes.push(data.likes[item]);
	}
	//乱序排序
	likes = sortorder(likes);

	var likes_data = '<div class="likes"><div class="likes-title"><span>好友动态</span><i></i></div>';
	likes_data += '<div class="likes-data"><ul>';

	for (var num = 0; num < likes.length; num++) {
		var game = likes[num];
		for (var name in game) {
			var id = game[name].id;

			if (game[name].type == "game") {
				likes_data += '<li><span class="likes-name">' + name + '</span><span> 玩过 </span><a href="../' + recommendJSON[id].main + '/index.html">' + recommendJSON[id].title + '</a></li>';
			} else {
				likes_data += '<li><span class="likes-name">' + name + '</span><span> 赞过 </span><a href="../' + recommendJSON[id].main + '/index.html">' + recommendJSON[id].title + '</a></li>';
			}
		}
	}

	likes_data += '</ul></div>';
	likes_data += '<div class="likes-more"><a id="likes-arrow" href="javascript:;" title="更多数据" onclick="showLikesData(0,' + likes.length + ');"></a><span id="likes-no-more" style="display: none">......</span></div></div>';
	$("#main").find(".participation-status").after(likes_data);

	//初始化显示3条数据
	showLikesData(0, likes.length);
}

//显示好友动态
function showLikesData(num, total) {
	if (num + 3 < total) {
		var showNum = num + 3;
		for (var i = num; i < showNum; i++) {
			$(".likes-data li:eq(" + i + ")").fadeIn(500);
		}
		$("#likes-arrow").attr("onclick", "showLikesData(" + showNum + "," + total + ")");
	} else {
		for (var i = num; i < total; i++) {
			$(".likes-data li:eq(" + i + ")").fadeIn(500);
		}
		$("#likes-arrow").attr("onclick", "showLikesData(" + total + "," + total + ")");
		$("#likes-arrow").hide();
		$("#likes-no-more").show();
	}
}