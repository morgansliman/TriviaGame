$(document).ready(function() {
	$('.button-start').on('click', function() {
		$(this).hide();
		$('.mode-list').show();
	});

	$('.button-mode').on('click', function() {
		$('.mode-list').hide();
		newGame = new Game($(this).text());
		newGame.startGame();
	});

	function Game (mode) {
		this.mode = mode;
	}

	Game.prototype.startGame = function() {
		var div = $('<div>', {
			'class': 'center-block',
			'data-mode': this.mode.toLowerCase()
		}).html(
		'<p class="time-remaining-text">Time Remaining: <span id="time-remaining">' + 30 +
		'</span> Seconds</p><br>' + 
		'<p class="question-text">placeholder</p><br>' +
		'<ul class="question-list">' +
		'<li class="question">' + 'question 1 placeholder' + '</li>' +
		'<li class="question">' + 'question 2 placeholder' + '</li>' +
		'<li class="question">' + 'question 3 placeholder' + '</li>' +
		'<li class="question">' + 'question 4 placeholder' + '</li>' +
		'</ul>'
		);
/*
		var p_time = $('<p>', {
			'class': 'time-remaining-text'
		}).text('Time Remaining: <span id="time-remaining">' + 30 + '</span> Seconds');

		var p_question = $('<p>', {
			'class': 'question-text'
		}).text('placeholder');
*/
		$('.main-game').append(div);
	}
});