$(document).ready(function(){


  var lastHeight = 0;
  var open = false;

  var timer;
  $(window).bind('scroll',function () {
    clearTimeout(timer);
    timer = setTimeout( refresh , 150 );
  });
  var refresh = function () { 


    if($(this).scrollTop() > 160)
    {
      if(open==false){
       $('.bar').animate({
        top: '0px',
        opacity: '1',
      },150);
     }
     else{
             $('.cvbar').animate({
        top: '0px',
        opacity: '1',
      },150);
     }

   }
   else
   {
    if(open==false){
      $('.bar').animate({
        top: '-40px',
        opacity: '0',
      },150);
    }
    else{
             $('.cvbar').animate({
        top: '-40px',
        opacity: '0',
      },150);
    }

  }

        // do stuff
        console.log('Stopped Scrolling'); 
      };

        //Persistent top bar
        $(window).scroll(function(){

        });


        $('.viewcv').click(function(event){
          event.preventDefault();

          open = true;
          $('.bar').animate({
            top: '-40px',
            opacity: '0',
          },150);

          lastHeight = $(window).scrollTop();

          $('.container').animate({
            right: '10%',
            opacity: '1',
          },500,function(event){
            if($(window).scrollTop() > 160){
              $("html, body").animate({ scrollTop: 0 }, 500);
            }
          });

          $('.dark').css('display','block');

          $('.dark').animate({
            opacity: '.9',
          },500);

          $('.cv,.cvbar').animate({
            opacity: '1',
            right: '0',
          },500);
        });


        $('.cv .close, .closecv').click(function(event){
          event.preventDefault();
          open = false;
                    $('.cvbar').animate({
            top: '-40px',
            opacity: '0',
          },150);
          $('.container').animate({
            right: '0%',
            opacity: '1',
          },500);
          $('.cv,.cvbar').animate({
            right: '-601px',
            opacity: '1',
          },500, function(){
            $("html, body").animate({ scrollTop: lastHeight }, 500);
          });

          $('.dark').animate({
            opacity: '0',
          },500,function()
          {  
           $('.dark').css('display','none');

         });

          $('.cv').animate({
            opacity: '.3',
          },500);
        });


        /*WORD SCROLL*/
        var arr = ["Coding",
        "social media", "UI/UX",
        "Mobile Development",
        "branding",
        "print design",
        "web development"];

        (function recurse(counter) {
          var text = arr[counter];

          $( '.current').delay(2000).animate({
            left: "50%",
            opacity: '0',
    // opacity: "100",
  }, 400, 'easeInCubic', function() {

    //mover actual a la derecha y poner el próximo texto
    $('.current').css("left","-50%");
    $(this).find('h1').html(text);

    $( '.current').animate({
      left: "0%",
      opacity: "100",
    }, 400, 'easeOutCubic', function() {
    });
  });

    // delete the value to save memory
    delete arr[counter];
    // add the value at the end of the array
    arr.push(text);
    // run it again for the next number
    setTimeout(function() {
      recurse(counter + 1);
    }, 4000);
// start it for the first number.
})(0);

/*KNOB*/


$('.knob').each(function () {

 var $this = $(this);
 var myVal = $this.attr("rel");
           // alert(myVal);
           $this.knob({

            'readOnly': true,
            'width': 180,
            'height': 180,
          });

         });


$('.other-skills').bind('inview', function(event, isInView, visiblePartX, visiblePartY) {
  if (isInView) {
    // element is now visible in the viewport
    if (visiblePartY == 'top') {
      // top part of element is visible
    } else if (visiblePartY == 'bottom') {
      // bottom part of element is visible
    } else {


      $('.knob').each(function () {

       var $this = $(this);
       var myVal = $this.attr("rel");
           // alert(myVal);
           $this.knob({

            'readOnly': true,
            'width': 180,
            'height': 180,
          });
           $({
             value: 0
           }).animate({

             value: myVal
           }, {
             duration: 2000,
             easing: 'swing',
             step: function () {
               $this.val(Math.ceil(this.value)).trigger('change');

             }
           })

         });

      // whole part of element is visible
    }
  } else {

    $('.knob').each(function () {

     var $this = $(this);
     var myVal = $this.attr("rel");
           // alert(myVal);
           $this.knob({

            'readOnly': true,
            'width': 180,
            'height': 180,
          });
           $({
             value: myVal
           }).animate({

             value: 0
           }, {
             duration: 2000,
             easing: 'swing',
             step: function () {
               $this.val(Math.ceil(this.value)).trigger('change');

             }
           })

         });


    // element has gone out of viewport
  }
});



//        $('.skill-list').bind('inview', function (event, visible) {
//         if (visible == true) {
//            $('.knob').each(function () {

//              var $this = $(this);
//              var myVal = $this.attr("rel");
//            // alert(myVal);
//            $this.knob({

//             'readOnly': true,
//             'width': 180,
//             'height': 180,
//         });
//            $({
//              value: 0
//          }).animate({

//              value: myVal
//          }, {
//              duration: 2000,
//              easing: 'swing',
//              step: function () {
//                  $this.val(Math.ceil(this.value)).trigger('change');

//              }
//          })

//      });
//         // element is now visible in the viewport
//     } else {
//         // element has gone out of viewport
//     }
// });

});