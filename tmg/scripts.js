
var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var initdate = new Date();

initCalendar({
  id:'date1'
});

initCalendar({
  id:'date2'
});


function initCalendar (options) {

  $('.date').wrap('<div class="calendarWrapper"></div>');

  var template = '<div class="wrapper">'+
    '<div class="cal">'+
      '<div class="month"></div>'+
      '<div class="labels"></div>'+
      '<div class="days"></div>'+
    '</div>'+
  '</div>';
  
  $('.date').after(template);
  var d = initdate.getFullYear();
  var m = initdate.getMonth();
  $('.wrapper').find('.month').html( monthNames[m]+' '+d );
  
  $('.days').on('scroll', function () {
    var lbls = $(this).find('.monthlabel').parent();
    var pM = $(this).siblings('.month');
    $.each(lbls, function( index, data ) {
      var top = $(data).position().top;
      var targetOffset = $(data).height()*weeksBehind;

      if(top <= targetOffset ){
                var y = new Date( $(data).last().data('date') );
                var m = $(data).last().data('month');
                $(pM).html(m+' '+y.getFullYear());
      }
    });
  });

}




initdate.setHours(0);
initdate.setMinutes(0);
initdate.setSeconds(0);
initdate.setMilliseconds(0);
var daysAhead = 180;
var holidays = [];
var calendar = [];
var today = new Date(initdate);
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);
today.setMilliseconds(0);
weeksBehind = 2;
var startDay = 1;

var dayNames = [
'Su',
'Mo',
'Tu',
'We',
'Th',
'Fr',
'Sa',
];

for (var i = 0; i < startDay ; i++) {
  dayNames.push(dayNames.shift());
}

//set day labels;
$.each(dayNames, function( index, data ) {
 $('.cal .labels').append('<a>'+data+'</a>');
});


for (var i = 0; i < daysAhead ; i++) {

  var date = new Date(initdate);
  var tempDate = new Date(date.setDate(date.getDate() + i));
  var enabled = tempDate.getDay() == 0 || tempDate.getDay() == 6 ? 'disabled' : 'enabled';
  
  
  calendar.push({
    day: tempDate.getDate(),
    date:tempDate,
    weekday:tempDate.getDay(),
    enabled: enabled,
    dayName:dayNames[tempDate.getDay()]
  });
  
};
var offset = today.getDay();


for (var i = startDay; i < offset + weeksBehind*7 ; i++) {
  var tDate = new Date(initdate);
  var tempDate = new Date(tDate.setDate(tDate.getDate() - i - 1 + startDay));
  
  calendar.unshift({
    day:tempDate.getDate(),
    date:tempDate,
    weekday:tempDate.getDay(),
    enabled: 'disabled',
    dayName:dayNames[tempDate.getDay()]
  });
}

$(document).on('click', function (e){
  $('.wrapper').fadeOut();
});

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
  $(this).parents('.wrapper').siblings('.date').val( result.day+'-'+result.month+'-'+result.year);

  // $('.date').val( );
  //$('.result').append(selectedDate);
  $('.wrapper').fadeOut();
});

$(document).on('click', '.date',  function (e) {
  e.stopPropagation();
  e.preventDefault();
  //$('.wrapper').fadeOut();
  $(this).siblings('.wrapper').fadeToggle().css('display','inline-block');
});



$.each(calendar, function( index, data ) {
 var isToday = today.getTime() == data.date.getTime() ? 'today' : "";

 if(data.day != 1){
   $('.cal .days').append('<a data-date="'+data.date+'" class="'+data.enabled+' '+isToday+'">'+data.day+'</a>');
 }
 else{
   $('.cal .days').append('<a data-date="'+data.date+'"  data-month="'+monthNames[data.date.getMonth().toString()]+'" class="'+data.enabled+' '+isToday+'"><span class="monthlabel"><span>'+monthNames[data.date.getMonth().toString()].substring(0,3)+'</span></span>'+data.day+'</a>');
 }

});