<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;

class GenerationController extends Controller
{
    public function room() {

    	$get = Input::get();

    	if ( empty($get['area']) ) {

    		return view('room');

    	} else {

            return view('roomgen');   		
    	}
    }

    public function gen_room_img () {

        $get = Input::get();

        $base_img = '';

        switch ($get['area']) {
            case '北京': $base_img = 'beijing.jpg'; break;
            case '上海': $base_img = 'shanghai.jpg'; break;
            case '广州': $base_img = 'guangzhou.jpg'; break;
            case '深圳': $base_img = 'shenzhen.jpg'; break;
        }
        
        $image = imagecreatefromjpeg($_SERVER['DOCUMENT_ROOT'].'/images/'.$base_img);

        //设置字体颜色  
        $textcolor = imagecolorallocate($image,105,102,97);  
          
        //把字符串写在图像左上角
        $white=imagecolorallocate($image,105,102,97);
        $font="C://WINDOWS/Fonts/simhei.ttf";

        imagettftext($image,13,-1,288,202,$white,$font,$get['name']);
        
        //输出图像  
        header("Content-type: image/jpeg");  
        imagejpeg($image);
        imagedestroy($image);
    }
}