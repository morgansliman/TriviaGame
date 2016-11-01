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
			'<p class="question-text">' + jsonData[mode.toLowerCase()].question[0] + '</p><br>' +
			'<ul class="question-list center-block">' +
			'<li class="question">' + jsonData[mode.toLowerCase()].answer[0][0] + '</li>' +
			'<li class="question">' + jsonData[mode.toLowerCase()].answer[0][1] + '</li>' +
			'<li class="question">' + jsonData[mode.toLowerCase()].answer[0][2] + '</li>' +
			'<li class="question">' + jsonData[mode.toLowerCase()].answer[0][3] + '</li>' +
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
});