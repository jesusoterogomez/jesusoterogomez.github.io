//////////////////////
// Global Variables //
//////////////////////

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];


//Defaults 
var holidays = [];

var options = {
  id:'date1',
  // startDate:'03-05-2015',
  daysAhead:180,
  holidays:holidays,
  previousWeeks:2,
  startDay:1
};

initCalendar(options);


function initCalendar (options) {

  var initDate = options.startDate === undefined ? new Date() : new Date(options.startDate);
  initDate.setHours(0);
  initDate.setMinutes(0);
  initDate.setSeconds(0);
  initDate.setMilliseconds(0);
  options.initDate = initDate; //save initDate to object
  
  //Add JQuery Selector for current datepicker.
  options.datepickerSelector = $('.datepicker#'+options.id);

  //Wrap around a parent element for calendar positioning.
  $('.datepicker#'+options.id).wrap('<div class="calendarWrapper">');

  var template = '<div class="calendar">'+
    '<div class="grid">'+
      '<div class="header"></div>'+
      '<div class="weekdays"></div>'+
      '<div class="days"></div>'+
    '</div>'+
  '</div>';

  //Add Calendar as a sibling of datepicker.
  $(options.datepickerSelector).after(template);

  //Add JQuery Selector for current calendar.
  options.calendarSelector = $(options.datepickerSelector).siblings('.calendar');

  $(options.calendarSelector).find('.header').html(monthNames[initDate.getMonth()]+' '+initDate.getFullYear() );

  //Rotate days according to starting day of the week
  for (var i = 0; i < options.startDay ; i++) {
    dayNames.push(dayNames.shift());
  }

  //set weekday labels;
  $.each(dayNames, function( index, data ) {
   $(options.calendarSelector).find('.weekdays').append('<a>'+data+'</a>');
  });

  //Fill Calendar Days 
  fillCalendar(options);

}; //initCalendar


function fillCalendar(options){

  var calendar = [];

  for (var i = 0; i < options.daysAhead ; i++) {
    var date = new Date(options.initDate);
    var tempDate = new Date(date.setDate(date.getDate() + i));
    var enabled = tempDate.getDay() == 0 || tempDate.getDay() == 6 ? 'disabled' : 'enabled';

    //Starting on current day, push all the
    calendar.push({
      day: tempDate.getDate(),
      date:tempDate,
      weekday:tempDate.getDay(),
      enabled: enabled,
      dayName:dayNames[tempDate.getDay()]
    });

  };

  //Complete days of the initial week missing + weeks to show before current date.
  var offset = options.initDate.getDay();
  for (var i = options.startDay; i < offset + options.previousWeeks*7 ; i++) {
    var tDate = new Date(options.initDate);
    var tempDate = new Date(tDate.setDate(tDate.getDate() - i - 1 + options.startDay));

    calendar.unshift({
      day:tempDate.getDate(),
      date:tempDate,
      weekday:tempDate.getDay(),
      enabled: 'disabled',
      dayName:dayNames[tempDate.getDay()]
    });
  }

  renderCalendar(calendar, options);

}; //fillCalendar


//Render Calendar Content inside Grid
function renderCalendar(calendar, options){
  $.each(calendar, function( index, data ) {
   var isToday = options.initDate.getTime() == data.date.getTime() ? 'today' : "";

   if(data.day != 1){
     $(options.calendarSelector).find('.days').append('<a data-date="'+data.date+'" class="'+data.enabled+' '+isToday+'">'+data.day+'</a>');
   }
   else{
     $(options.calendarSelector).find('.days').append('<a data-date="'+data.date+'"  data-month="'+monthNames[data.date.getMonth().toString()]+'" class="'+data.enabled+' '+isToday+'"><span class="monthlabel"><span>'+monthNames[data.date.getMonth().toString()].substring(0,3)+'</span></span>'+data.day+'</a>');
   }
 });
}; //renderCalendar


/////////////////////
// Event Listeners //
/////////////////////

//Click outside of datepicker to hide
$(document).on('click', function (e){
  $('.calendar').fadeOut();
});

// Open Calendar on Datepicker Click.
$(document).on('click', '.datepicker',  function (e) {
  e.stopPropagation();
  e.preventDefault();
  $(this).blur(); 
  $(this).siblings('.calendar').fadeToggle(); 
  //A Second click on the datepicker dismisses the calendar
});

//Prevent bubbling of events on click inside calendar
$(document).on('click', '.calendar', function(event) {
  event.preventDefault();
  event.stopPropagation();
});

//Update Month/Years Header on Scroll.
$('.days').on('scroll', function () {
  var months = $(this).find('.monthlabel').parent();
  var header = $(this).siblings('.header');
  $.each(months, function( index, cell ) {
    var top = $(cell).position().top;
    var targetOffset = $(cell).height(); 

    /* Update header on first of the month reaching 
    1 cell's height from the top of the grid. */
    if(top <= targetOffset ){
      var y = new Date( $(cell).last().data('date') );
      var m = $(cell).last().data('month');
      $(header).html(m+' '+y.getFullYear());
    }
  });
});

//Update Datepicker on Selection
$(document).on('click', '.days a',  function (e) {  
  e.preventDefault();
  $(this).siblings().removeClass('today');
  $(this).addClass('today');
  var selectedDate = new Date($(this).data('date'));
  var result = {
    day: (selectedDate.getDate()+'').length == 1 ? '0'+selectedDate.getDate() : selectedDate.getDate() ,
    month: (selectedDate.getMonth()+'').length == 1 ? '0'+selectedDate.getMonth() : selectedDate.getMonth() ,
    year: selectedDate.getFullYear()
  }
  $(this).parents('.calendar').siblings('.datepicker').val( result.day+'-'+result.month+'-'+result.year);

  //Hide calendar after selection
  $('.calendar').fadeOut();
});





