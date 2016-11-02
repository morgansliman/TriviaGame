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

	var game = {
		timer: 10,			
		numCorrect: 0,		
		numWrong: 0,
		numTimeout: 0,
		answerIndex: '', 	// stores index of correct answer
		jsonQuestions: [],	// stores array of questions from data.json for selected mode
		jsonAnswers: [],	// stores array of answers from data.json for selected mode

		// grabs questions and answers arrays and
		// stores them in respective object properties.
		getJSON: function(mode) {
			this.jsonQuestions = jsonData[mode].questions;
			this.jsonAnswers = jsonData[mode].answers;
		},

		playGame: function(start=false) {
			if (this.jsonQuestions.length == 0) {
				this.endGame();
			}
			else {
				// display the first question and answers and 
				// store the correct answer's index in object property.
				this.newQuestion();

				// starts the question's timer
				this.startCountdown();

				// recursive recursion
				$('.question').on('click', function() {
					if ($(this).data('index') == game.answerIndex) {
						clearInterval(counter);
						game.numCorrect += 1;
						game.showAnswer(true);
					} else {
						clearInterval(counter);
						game.numWrong += 1;
						game.showAnswer(false);
					}

					game.playGame();
					console.log('correct: ', game.numCorrect, '\n', 'wrong: ', game.numWrong);
				});
			}
		},

		showAnswer: function(result='') {
			
		},

		newQuestion: function() {
			game.timer = 10;
			// picks a random question
			var index = Math.floor(Math.random() * game.jsonQuestions.length);
			// stores it's answer's index
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

			// removes question and answers we just used so we don't get duplicates
			game.jsonQuestions.splice(index, 1);
			game.jsonAnswers.splice(index, 1);
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
				game.numTimeout += 1;
				$('.time-remaining').text('Time Remaining: ' + game.timer + ' Seconds');
				game.showAnswer();
			}
			else if (game.timer == 1) {
				$('.time-remaining').text('Time Remaining: ' + game.timer + ' Second');
			}
			else {
				$('.time-remaining').text('Time Remaining: ' + game.timer + ' Seconds');
			}
		}
	}
});