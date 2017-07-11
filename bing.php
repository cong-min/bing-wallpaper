<?php
	$str = file_get_contents('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1');
	$data = json_decode($str);
	$imghost = 'https://www.bing.com';
	$imgpath = $data -> {"images"}[0] -> {"url"};
	if($imgpath){
	  $imgurl = $imghost . $imgpath;
	  header('Location:'.$imgurl);
	  exit();
	}else{
		exit('error');
	}
?>