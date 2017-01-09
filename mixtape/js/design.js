$(document).ready(function(){



$(".ttw-music-player .play").click(function() {
	
	var rotation = function (){
   $(".spin").rotate({
      angle:0, 
      animateTo:360, 
      duration:2000,
      callback: rotation,
      easing: function (x,t,b,c,d){        // t: current time, b: begInnIng value, c: change In value, d: duration
          return c*(t/d)+b;
      }
   });
}
rotation();
});


$(".ttw-music-player .previous").click(function() {
	
	var rotation = function (){
   $(".spin").rotate({
      angle:0, 
      animateTo:360, 
      duration:2000,
      callback: rotation,
      easing: function (x,t,b,c,d){        // t: current time, b: begInnIng value, c: change In value, d: duration
          return c*(t/d)+b;
      }
   });
}
rotation();
});



$(".ttw-music-player .next").click(function() {
	
	var rotation = function (){
   $(".spin").rotate({
      angle:0, 
      animateTo:360, 
      duration:2000,
      callback: rotation,
      easing: function (x,t,b,c,d){        // t: current time, b: begInnIng value, c: change In value, d: duration
          return c*(t/d)+b;
      }
   });
}
rotation();
});

$(".ttw-music-player .tracklist .title").click(function() {
	
	var rotation = function (){
   $(".spin").rotate({
      angle:0, 
      animateTo:360, 
      duration:2000,
      callback: rotation,
      easing: function (x,t,b,c,d){        // t: current time, b: begInnIng value, c: change In value, d: duration
          return c*(t/d)+b;
      }
   });
}
rotation();
});



});