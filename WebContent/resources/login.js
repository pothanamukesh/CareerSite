$( ".input" ).focusin(function() {
  $( this ).find( "span" ).animate({"opacity":"0"}, 100);
});

$( ".input" ).focusout(function() {
  $( this ).find( "span" ).animate({"opacity":"1"}, 200);
});

$(".login").submit(function(){
  $(this).find(".submit i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
  $(".submit").css({"background":"#2ecc71", "border-color":"#2ecc71"});
  $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 300);
  $("input").css({"border-color":"#2ecc71"});
  return false;
});