$(function(){

  $('.signup').click(function(){
    $(this).css('visibility', 'hidden');
    $('.signup-form').css('visibility', 'visible');
  });

  $('.login').click(function(){
    $(this).css('visibility', 'hidden');
    $('.login-form').css('visibility', 'visible');
  });

  var audio = new Audio('/sounds/puck.mp3');

  $('.puck').click(function(){
    audio.play();
    $(this).css('visibility', 'hidden');
  });

  // $('.add-comment').click(function(){
  //   $(this).css('visibility', 'hidden');
  //   $('.comment-form').css('visibility', 'visible');
  // });

});
