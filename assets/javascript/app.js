$(document).ready(function() {
	$('.button-start').on('click', function() {
		$(this).hide();
		$('.mode-list').show();
	});

	$('.button-mode').on('click', function() {
		$('.mode-list').hide();
		game.startGame($(this).text());
	});

	var game = {
		timer: 10,

		startGame: function(mode) {
			var div = $('<div>', {
				'class': 'center-block game-wrapper',
				'data-mode': mode.toLowerCase()
			}).html(
			'<p class="time-remaining-text">Time Remaining: <span id="time-remaining">' + 
			game.timer + ' Seconds</span></p>' + 
			'<p class="question-text">placeholder</p><br>' +
			'<ul class="question-list center-block">' +
			'<li class="question">' + 'question 1 placeholder' + '</li>' +
			'<li class="question">' + 'question 2 placeholder' + '</li>' +
			'<li class="question">' + 'question 3 placeholder' + '</li>' +
			'<li class="question">' + 'question 4 placeholder' + '</li>' +
			'</ul>'
			);

			$('.main-game').append(div);
			this.startCountdown();
		},

		startCountdown: function() {
			counter = setInterval(game.countdown, 1000);
		},

		countdown: function() {
			game.timer -= 1;

			if (game.timer == 0) {
				// next question and/or end game code goes here
				$('#time-remaining').text(game.timer + ' Seconds');
				clearInterval(counter);
			}
			else if (game.timer == 1) {
				$('#time-remaining').text(game.timer + ' Second');
			}
			else {
				$('#time-remaining').text(game.timer + ' Seconds');
			}
		}
	}

	var questions = {
		'html': [

		],

		'css': [

		],

		'javascript': [

		],

		'jquery': [

		]
	}
});