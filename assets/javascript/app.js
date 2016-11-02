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
		game.startGame($(this).text().toLowerCase());
	});

	var game = {
		timer: 10,			
		numCorrect: 0,		
		numWrong: 0,
		numTimeout: 0,
		answerIndex: '', 	// stores index of correct answer
		json: false, 		// true if we already grabbed data from data.json
		jsonQuestions: [],	// stores array of questions from data.json for selected mode
		jsonAnswers: [],	// stores array of answers from data.json for selected mode

		startGame: function(mode) {
			// check to see if we've grabbed from data.json yet
			if (this.json == false) {
				// if we haven't, do it.
				this.getJSON(mode);
			}

			// display the first question and answers and 
			// store the correct answer's index in object property.
			this.answerIndex = this.newQuestion(mode);

			// starts the first question's timer
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
				game.newQuestion(mode);
				game.startCountdown();
			});
		},

		init: function() {
			game.timer = 10;
			$('.main-game').empty()
		},

		// changes game.json to true, grabs questions and answers arrays and
		// stores them in respective object properties.
		getJSON: function(mode) {
			this.json = true;
			this.jsonQuestions = jsonData[mode].questions;
			this.jsonAnswers = jsonData[mode].answers;
		},

		newQuestion: function(mode) {
			// picks a random question
			var index = Math.floor(Math.random() * game.jsonQuestions.length);
			// stores it's answer's index
			game.answerIndex = game.jsonAnswers[index][4];

			/*
				Creates HTML elements for the game in the (simplified) format: 

					<div>
						<p>Time Remaining: X Seconds</p>
						<p>Question from JSON</p>
						<br>
						<ul>
							<li>Answer from JSON 1</li>
							<li>Answer from JSON 2</li>
							<li>Answer from JSON 3</li>
							<li>Answer from JSON 4</li>
						</ul>
					</div>

				Where 'X' represents seconds left on game.timer property &
				Question and possible answers are retrieved from respective
				properties using randomly generated index.

				This is all appended to the .main-game div to be displayed.
			*/
			var div = $('<div>', {
				'class': 'center-block game-wrapper',
				'data-mode': mode
			}).html(
			'<p class="time-remaining-text">Time Remaining: \
			<span id="time-remaining">' + game.timer + ' Seconds</span></p>' + 
			'<p class="question-text">' + game.jsonQuestions[index] + '</p><br>' +
			'<ul class="question-list center-block">' +
			'<li class="question" data-index="0"></li>' +
			'<li class="question" data-index="1"></li>' +
			'<li class="question" data-index="2"></li>' +
			'<li class="question" data-index="3"></li>' +
			'</ul>'
			);
			$('.main-game').append(div);

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
		//
		// TODO: if timer reaches zero before a guess is made:
		// game.numTimeout += 1;
		// if game.jsonQuestions.length == 0 -> end game
		// else -> new question
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