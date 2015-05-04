var cards = $('.card');

$.each(cards, function(index, card) {
	attachHammerEvents(new Hammer(card), card);
});

// listen to events...
function attachHammerEvents (hammer, context) {
	hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
	// console.log(mc, context);
	hammer.on("swipeup swipedown panup pandown", function(ev) {
		if (ev.type == 'panup') {
			$(context).addClass('out');
		}
		if (ev.type == 'pandown') {
			if($(context).next().hasClass('out')) {
				$(context).next().removeClass('out');
			}
		}
	});
}

$('.card').on('click', '.reset', function(event) {
	event.preventDefault();
	reset();
});

function reset() {
	$.each(cards, function(index, card) {
		setTimeout(function() {
			$(card).removeClass('out');
		}, 30*index);
	});
}