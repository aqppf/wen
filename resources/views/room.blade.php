<!DOCTYPE HTML>
<!-- saved from url=(0098)http://cn.nie.io/wx_hpc/index.html -->
<!DOCTYPE html PUBLIC "" ""><HTML lang="zh-cn"><HEAD><META content="IE=11.0000" 
http-equiv="X-UA-Compatible">
     
<META charset="UTF-8">     
<META name="format-detection" content="telephone=no">     
<META name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"> 
<TITLE>东玖汇集团</TITLE>     
<LINK href="/room/hpc2.css" rel="stylesheet" type="text/css">
<LINK href="/room/global.css" rel="stylesheet" type="text/css">
<META name="GENERATOR" content="MSHTML 11.00.9600.18212"></HEAD> 
<script src="/room/jquery-1.11.3.nie.js"></script>
<script>
$(function(){

	$("#text").on('click','li',function(){

		$(this).addClass('mover').siblings().removeClass('mover');
	})

	$("#submit").on('click',function(){

		var area = $("#text li").filter('.mover').text();
		var name = $("#insert-name").val().match(/\S+/);
		if ( name == null ) { alert('请输入您的姓名'); return; }

		var url = '/generation/room_gen?area='+area+'&name='+name;
		$("#content_show").hide();
		$("#tip").show();
		$("#newpic").attr('src',url);
	})
})
</script>
<BODY>
<DIV style="width: 0px; height: 0px; overflow: hidden;"><IMG src="/room/logo.png"> 
</DIV>

<DIV class="rich_media">

<DIV class="rich_media_bg hide" id="tip">
<DIV ></DIV><IMG src="/room/sp.jpg"><IMG id="newpic" src="/room/water3.png">
</DIV>

<DIV class="rich_media_inner" id="content_show">
<DIV class="rich_media_content" id="js_content">
<DIV id="main">
<DIV class="title"><IMG alt="房产证生成器" src="/room/hpcbg2.jpg"></DIV>
<DIV class="cotbox">
<DIV style="height: 4px; clear: both;"></DIV>
<DIV  class="ng-scope">
	<INPUT class="insert-name2" id="insert-name" type="text" placeholder="请输入您的姓名" value=""> 
</DIV>
<UL class="textlist" id="text">
  <LI class="static mover" >北京</LI>
  <LI class="static">上海</LI>
  <LI class="static">广州</LI>
  <LI class="static">深圳</LI>
</UL>
</DIV>
<DIV class="cotbox">
<DIV class="start">
<DIV class="ng-btn">
<IMG width="100%" id="submit" src="/room/hpcbtn.png"> 
</DIV></DIV></DIV>

<A href="http://asasaa.com/">

<DIV class="ggggg"></DIV></A>             
</DIV></DIV></DIV>

<A href="http://mp.weixin.qq.com/">

<DIV class="banners"><IMG width="100%" src="/room/banner.png">
</DIV></A> </DIV>
</BODY>
</HTML>
