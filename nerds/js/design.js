$(document).ready(function(){


/*Get Colors from HTML Tags*/
$(".color").each(function( index ) {
	var Hex = $(this).find('#hex').html();
	$(this).find('#picker').css("background",Hex);
 	
	});

$(".link").each(function( index ) {
	var Hex = $(this).find('#hex').html();
	$(this).find('.a').css("color",Hex);
	});

/*Create Jquery UI Spinner for USD*/
$('.spinner').spinner({
    min: 0,
    max: 2500,
    step: 25,
    numberFormat: "C" /*Currency Format*/
});

/*Dropdown List*/
	$('.ui-dropdown #selector').click(function() {
		event.preventDefault();
        $('.ui-dropdown .list').toggleClass("active");
    });

	$('.ui-dropdown .list li').click(function() {
		//alert('Zing');
		$('.ui-dropdown .list li').removeClass("selected");
		$(this).toggleClass("selected");
	    $('.ui-dropdown .list').toggleClass("active");
		$('.ui-dropdown #box').attr("data-selected",$(this).find("a").attr('data-value'));
		$('.ui-dropdown #box').html($(this).find("a").html());  
	});

	$('.ui-dropdown').focusout(function() {
	   $('.ui-dropdown .list').removeClass("active");
	});

});