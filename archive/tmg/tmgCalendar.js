/*
Timepicker Assessment - TMG

Author: Jesus Otero.
Site: http://jesusoterogomez.com

Example:

In HTML create a text input with an ID and use 'datepicker' as a class.
<input class="datepicker" type="text" id="date1" placeholder="Click to select a date">

To initialize the control, use the initCalendar function.
A configuration object is required to be passed as an attribute in order to render the datepicker.

Below is an example of a configuration file.

var config = {
  id:'date1', //ID of the timepicker element in HTML.
  // startDate:'03-05-2015', //Starting date for the calendar, if it's not passed, today's date will be automatically chosen.
  daysAhead:180, // How many days to load in the calendar
  previousWeeks:2, // Previous weeks to show in the calendar before the actual starting date.
  startDay:1, //Starting day of the week, 0 Sunday, 1 Monday, 2 Tuesday and so on.
  holidays:['03-11-2015','04-11-2015'], // Array of dates in any format recognized by javascript's Date() 
  disabledWeekdays: [0,6],   //0 for Sunday, 1 Monday, 2 Tuesday and so on.
};

*/

// Global Variables 
var _daysPerWeek = 7;
var _monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];

// Reset times in date objects to match equal dates.
function resetTime(date){
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
}

//Config
var options = {
  id:'date1',
  // startDate:'03-05-2015',
  daysAhead:180,
  previousWeeks:2,
  startDay:1,
  // holidays:['03-11-2015','04-11-2015'],
  disabledWeekdays: [0,6],
};

initCalendar(options);



function initCalendar (options) {

  var initDate = options.startDate === undefined ? new Date() : new Date(options.startDate);
  resetTime(initDate);
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

  $(options.calendarSelector).find('.header').html(_monthNames[initDate.getMonth()]+' '+initDate.getFullYear() );

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


//Get Disabled Weekdays & Holidays
function disabledDays(date,options){

 //Check for disabled day of week.
 if(options.disabledWeekdays != undefined){
 for (var i = 0; i < options.disabledWeekdays.length; i++) {
    if (date.getDay() == options.disabledWeekdays[i]) {
      return 'disabled';

    }
  };
 }
 //Check for disabled holidays.
 if(options.holidays != undefined){
 for (var i = 0; i < options.holidays.length; i++) {
    if (date.getTime() == new Date(options.holidays[i]).getTime()) {
      return 'disabled';
    }
 };
 }

return '';//return empty if no match is disabled
}


function fillCalendar(options){

  var calendar = [];

  for (var i = 0; i < options.daysAhead ; i++) {
    var date = new Date(options.initDate);
    var tempDate = new Date(date.setDate(date.getDate() + i));

    //Starting on current day, push all the
    calendar.push({
      day: tempDate.getDate(),
      date:tempDate,
      weekday:tempDate.getDay(),
      enabled: disabledDays(tempDate,options),
      dayName:dayNames[tempDate.getDay()]
    });

  };

  //Complete days of the initial week missing + weeks to show before current date.
  var offset = options.initDate.getDay();
  for (var i = options.startDay; i < offset + options.previousWeeks* _daysPerWeek ; i++) {
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
   var selectedClass = options.initDate.getTime() == data.date.getTime() ? 'selected' : "";

   if(data.day != 1){
     $(options.calendarSelector).find('.days').append('<a data-date="'+data.date+'" class="'+data.enabled+' '+selectedClass+'">'+data.day+'</a>');
   }
   else{
     $(options.calendarSelector).find('.days').append('<a data-date="'+data.date+'"  data-month="'+_monthNames[data.date.getMonth().toString()]+'" class="'+data.enabled+' '+selectedClass+'"><span class="monthLabel"><span>'+_monthNames[data.date.getMonth().toString()].substring(0,3)+'</span></span>'+data.day+'</a>');
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
  var months = $(this).find('.monthLabel').parent();
  var header = $(this).siblings('.header');
  $.each(months, function( index, cell ) {
    var top = $(cell).position().top;
    var targetOffset = $(cell).height(); 

    /* Update header on first of the month reaching 
    1 cell's height from the top of the grid. */
    if(top <= targetOffset ){
      var year = new Date( $(cell).last().data('date') );
      var month = $(cell).last().data('month');
      $(header).html(month+' '+year.getFullYear());
    }
  });
});

//Update Datepicker on Selection
$(document).on('click', '.days a',  function (e) {  
  e.preventDefault();
  $(this).siblings().removeClass('selected');
  $(this).addClass('selected');
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
