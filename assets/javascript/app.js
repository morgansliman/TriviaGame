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
		numCorrect: 0,
		numWrong: 0,
		numTimeout: 0,
		answerIndex: '',

		startGame: function(mode) {
			this.answerIndex = this.newQuestion(mode);
			this.startCountdown();

			$('.question').on('click', function() {
				if ($(this).data('index') == game.answerIndex) {
					game.numCorrect += 1;
				} else {
					game.numWrong += 1;
				}
			});
		},

		newQuestion: function(mode) {
			var div = $('<div>', {
				'class': 'center-block game-wrapper',
				'data-mode': mode.toLowerCase()
			}).html(
			'<p class="time-remaining-text">Time Remaining: <span id="time-remaining">' + 
			game.timer + ' Seconds</span></p>' + 
			'<p class="question-text">' + jsonData[mode.toLowerCase()].question[0] + '</p><br>' +
			'<ul class="question-list center-block">' +
			'<li class="question" data-index="0"></li>' +
			'<li class="question" data-index="1"></li>' +
			'<li class="question" data-index="2"></li>' +
			'<li class="question" data-index="3"></li>' +
			'</ul>'
			);
			$('.main-game').append(div);

			var ul = $('.question-list').children();
			for (var i = 0; i < 4; i++) {
				ul.eq(i).text(jsonData[mode.toLowerCase()].answer[0][i]);
			}

			return jsonData[mode.toLowerCase()].answer[0][4];
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