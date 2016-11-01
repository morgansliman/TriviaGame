$(document).ready(function() {
	$('.button-start').on('click', function() {
		$(this).hide();
		$('.mode-list').show();
	});

	$('.button-mode').on('click', function() {
		$('.mode-list').hide();
		game.startGame($(this).text().toLowerCase());
	});

	var game = {
		timer: 10,
		numCorrect: 0,
		numWrong: 0,
		numTimeout: 0,
		answerIndex: '',
		json: false,
		jsonQuestions: [],
		jsonAnswers: [],

		startGame: function(mode) {
			if (this.json == false) {
				this.getJSON(mode);
			}
			this.answerIndex = this.newQuestion(mode);
			this.startCountdown();

			$('.question').on('click', function() {
				if ($(this).data('index') == game.answerIndex) {
					clearInterval(counter);
					game.numCorrect += 1;
				} else {
					clearInterval(counter);
					game.numWrong += 1;
				}
				console.log('correct: ', game.numCorrect, '\n', 'wrong: ', game.numWrong);
				game.answerIndex = game.newQuestion(mode);
				game.startCountdown();
			});
		},

		init: function() {
			game.timer = 10;
			$('.main-game').empty()

		},

		getJSON: function(mode) {
			this.json = true;
			this.jsonQuestions = jsonData[mode].questions;
			this.jsonAnswers = jsonData[mode].answers;
		},

		newQuestion: function(mode) {
			var index = Math.floor(Math.random() * game.jsonQuestions.length);
			var correctAnswerIndex = game.jsonAnswers[index][4];

			var div = $('<div>', {
				'class': 'center-block game-wrapper',
				'data-mode': mode
			}).html(
			'<p class="time-remaining-text">Time Remaining: <span id="time-remaining">' + 
			game.timer + ' Seconds</span></p>' + 
			'<p class="question-text">' + game.jsonQuestions[index] + '</p><br>' +
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
				ul.eq(i).text(game.jsonAnswers[index][i]);
			}

			game.jsonQuestions.splice(index, 1);
			game.jsonAnswers.splice(index, 1);
			return correctAnswerIndex;
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