$(function(){

  $('.signup').click(function(){
    $(this).css('visibility', 'hidden');
    $('.signup-form').css('visibility', 'visible');
  });

  $('.login').click(function(){
    $(this).css('visibility', 'hidden');
    $('.login-form').css('visibility', 'visible');
  });

  // $('.add-comment').click(function(){
  //   $(this).css('visibility', 'hidden');
  //   $('.comment-form').css('visibility', 'visible');
  // });

});
