'use strict';

$(window).on('load', function(){
  console.log('on load');
});

$(document).ready(function(){
  $('#circle').click(function() {
    $('html,body').animate({ scrollTop: 0 }, 500, 'swing');
  });
  
  var mainVisualTimer;
  var mainVisual = {
  	  current: 0,
  	  length: $('.main_visual_holder img').length,
  	  imgHeight: $('.main_visual_container .main_visual_holder img').height(),
  	  imgWidth: $('.main_visual_container .main_visual_holder img').width(),
  	  containerWidth: $('.main_visual_container').width()
  }
  
  for (var i=0; i<mainVisual.length; i++) {
  	var flag = 'off';
  	if (i === 0) {
  		flag = 'on';
  	} else {
  		flag = 'off';
  	}	
  	$('.header_slider ul').append('<li><img src="image/nav_ball_' + flag + '.png" width="52" height="52" alt="ナビ"></li>');
  }
  
  $(window).on('load resize', function(){
    mainVisual.imgHeight = $('.main_visual_container .main_visual_holder img').height();
    mainVisual.imgWidth = $('.main_visual_container .main_visual_holder img').width();
    mainVisual.containerWidth = $('.main_visual_container').width();
    
    $('.main_visual_container').height(mainVisual.imgHeight);
    $('.main_visual_container .main_visual_holder').width(mainVisual.imgWidth * mainVisual.length);
    $('.main_visual_container .main_visual_holder p').width(mainVisual.containerWidth);
    
    $('.main_visual_holder').css({ left: mainVisual.current * -mainVisual.containerWidth });
  });
  
  function setNavigationStatus() {
  	  $('.header_slider ul li img').attr('src','image/nav_ball_off.png');
  	  var active = $('.header_slider ul li:nth-child(' + (mainVisual.current + 1) + ')');
      $('img', active).attr('src','image/nav_ball_on.png');
  }
  
  $('.header_slider ul li').each(function(i, elem) {
  	$(elem).click(function(){
  	  clearTimeout(mainVisualTimer);
      $('.main_visual_holder').animate({ left: i * -mainVisual.containerWidth });
      mainVisual.current = i;
      setNavigationStatus();
      //mainVisualTimer = setTimeout(changeMainVisual, 4000);
      if (mainVisual.length > 1) {
       mainVisualTimer = setTimeout(changeMainVisual, 4000);
       }
    });
  });
  
  var changeMainVisual = function() {
  	  if (mainVisual.current >= mainVisual.length - 1) {
  	  	  mainVisual.current = 0;
  	  } else {
  	  	  mainVisual.current++;
  	  }
  	  $('.main_visual_holder').animate({ left: mainVisual.current * -mainVisual.containerWidth });
  	  setNavigationStatus();
      //mainVisualTimer = setTimeout(changeMainVisual, 4000);
      if (mainVisual.length > 1) {
       mainVisualTimer = setTimeout(changeMainVisual, 4000);
      }
  };
  
  mainVisualTimer = setTimeout(changeMainVisual, 4000);
});
