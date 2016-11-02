// HTML... CSS... Javascript... JQuery.
// Long ago, the four languages worked together in harmony.
$(document).ready(function() {
	// Then everything changed when the start button was clicked...
	$('.button-start').on('click', function() {
		$(this).hide();
		// Only the mode buttons, masters of all four syntaxes, could help them.
		$('.mode-list').show();
	});

	// But when the program needed them most..
	$('.button-mode').on('click', function() {
		// ..they vanished.
		$('.mode-list').hide();

		// grab data from data.json
		game.getJSON($(this).text().toLowerCase());
		// start game
		game.playGame(true);
	});

	$('.question').on('click', function() {
		clearInterval(counter);
		$('.question-list').children().each(function() {
			$(this).removeClass('question');
		});

		if (game.answerIndex == '*') {
			game.numCorrect += 1;
			game.showAnswer('all', parseInt($(this).data('index')));
		}
		else if ($(this).data('index') == parseInt(game.jsonAnswers[game.index][4])) {
			game.numCorrect += 1;
			game.showAnswer(true);
		} 
		else if ($(this).data('index') != parseInt(game.jsonAnswers[game.index][4])) {
			game.numWrong += 1;
			game.showAnswer(false);
		}
	});

	$('.restart').on('click', function() {
		game.init();
	});

	var game = {
		timer: 10,			
		numCorrect: 0,		
		numWrong: 0,
		numTimeout: 0,
		index: '',
		answerIndex: '', 	// stores index of correct answer
		questionIndex: [],	// stores the question # in the array
		jsonQuestions: [],	// stores array of questions from data.json for selected mode
		jsonAnswers: [],	// stores array of answers from data.json for selected mode

		init: function() {
			game.timer = 10;
			game.numCorrect = 0;
			game.numWrong = 0;
			game.numTimeout = 0;
			game.index = '';
			game.answerIndex = '';
			game.questionIndex = [];
			game.jsonQuestions = [];
			game.jsonAnswers = [];

			$('.result-wrapper').hide();
			$('.mode-list').show();
		},

		// grabs questions and answers arrays and
		// stores them in respective object properties.
		getJSON: function(mode) {
			game.jsonQuestions = jsonData[mode].questions;
			game.jsonAnswers = jsonData[mode].answers;
		},

		playGame: function(start=false) {
			if (game.jsonQuestions.length == game.questionIndex.length) {
				game.endGame();
			}
			else {
				// display question and answers and store
				// correct answer's index in object property.
				game.newQuestion();

				// starts the question's timer
				game.startCountdown();

				// recursive recursion
				
			}
		},

		newQuestion: function() {
			game.timer = 10;
			$('.result-text').hide();
			$('.question-list').children().css({
				'background': '',
				'color': ''
			});
			$('.question-list').children().each(function() {
				if ($(this).hasClass('question') == false) {
					$(this).addClass('question');
				}
			})

			// picks a random question
			var index = Math.floor(Math.random() * game.jsonQuestions.length);
			if (game.questionIndex.indexOf(index) == -1) {
				// stores it's question & answer's index
				game.index = index;
				game.questionIndex.push(index);
				game.answerIndex = game.jsonAnswers[index][4];

				$('.game-wrapper').show();

				$('.time-remaining').text('Time Remaining: ' + game.timer + ' Seconds');

				$('.question-text').text(game.jsonQuestions[index]);

				// loop through and add each possible answer into the respective
				// list items we just created. 
				var ul = $('.question-list').children();
				for (var i = 0; i < 4; i++) {
					ul.eq(i).text(game.jsonAnswers[index][i]);
				}

				console.log(
					'correct: ', game.numCorrect, '\n', 
					'wrong: ', game.numWrong, '\n',
					'timeout: ', game.numTimeout, '\n',
					game.answerIndex
				);
			}
			else {game.newQuestion();}
		},

		showAnswer: function(result, clicked='') {
			if (result == 'miss') {
				$('.question-text').text('Out of Time!');
				$('.result-text').text('The correct answer was: ');
				$('.result-text').show();
				$('.question-list').children().eq(game.answerIndex).css({
					'background-color': 'green',
					'color': 'white'
				});
			}
			else if (result == 'all') {
				$('.question-text').text('Correct!');
				$('.question-list').children().eq(clicked).css({
					'background-color': 'green',
					'color': 'white'
				});
			}
			else if (result == false) {
				$('.question-text').text('Nope!');
				$('.result-text').text('The correct answer was: ');
				$('.result-text').show();
				$('.question-list').children().eq(game.answerIndex).css({
					'background-color': 'green',
					'color': 'white'
				});
			}
			else if (result == true) {
				$('.question-text').text('Correct!');
				$('.question-list').children().eq(game.answerIndex).css({
					'background-color': 'green',
					'color': 'white'
				});
			}

			game.answerIndex = '';
			setTimeout(game.playGame, 3000);
		},

		// starts each question's countdown
		startCountdown: function() {
			counter = setInterval(game.countdown, 1000);
		},

		// decrements game.timer by 1 every second and adapts the word 'Seconds'
		// to be grammatically correct on you're screen.
		countdown: function() {
			game.timer -= 1;

			if (game.timer == 0) {
				clearInterval(counter);
				$('.question-list').children().each(function() {
					$(this).removeClass('question');
				});

				game.numTimeout += 1;
				$('.time-remaining').text('Time Remaining: ' + game.timer + ' Seconds');
				game.showAnswer('miss');
			}
			else if (game.timer == 1) {
				$('.time-remaining').text('Time Remaining: ' + game.timer + ' Second');
			}
			else {
				$('.time-remaining').text('Time Remaining: ' + game.timer + ' Seconds');
			}
		},

		endGame: function() {
			$('.game-wrapper').hide();
			$('.result-correct').text('Correct Answers: ' + game.numCorrect);
			$('.result-incorrect').text('Incorrect Answers: ' + game.numWrong);
			$('.result-unanswered').text('Unanswered: ' + game.numTimeout);
			$('.result-wrapper').show();
		}
	}
});