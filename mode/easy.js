var AMOUNT_OF_QUESTIONS = 15;
var MAX_ANSWERS = 5;

var EASY = new Quiz({
	title: "Match the menu item to the ingredients",
	amountOfQuestions: AMOUNT_OF_QUESTIONS,
	questions: shuffle(menu).slice(0,AMOUNT_OF_QUESTIONS),
	before: function () {
		// Sort Menu into categories
		EASY.sortedMenu = [];
		for(i = 0; i < menu.length; i++) {
			var curItem = menu[i];
			if(!EASY.sortedMenu[curItem.cat]) EASY.sortedMenu[curItem.cat] = [];
			EASY.sortedMenu[curItem.cat].push(curItem.itemName);
		}
		$('.quiz').show();
	},
	question: function (quiz) {
		var item = quiz.questions[quiz.questionPosition]; // Current question

		var answers = quiz.sortedMenu[item.cat]; // Get all items in current category
		var curLoc = answers.indexOf(item.itemName); // Get location of correct item in array
		answers.splice(curLoc,1); // Remove current item before shuffling
		answers = shuffle(answers).slice(0, (MAX_ANSWERS - 1)); // Shuffling items, and selecting one less than the max
		answers.push(item.itemName); // Re-adding current item
		answers = shuffle(answers); // Re-shuffle answers

		quiz.correctAnswer = item.itemName;

		// List Ingredients
		var ingredientsHTML = [];
		ingredientsHTML.push('<ul>');
		for(i = 0; i < item.ingredients.length; i++) ingredientsHTML.push('<li>' + ingredients[item.ingredients[i][0]] + (item.ingredients[i][1] ? " (If Ordered)</li>" : "</li>"))
		ingredientsHTML.push('</ul>');
		$('.info').html(ingredientsHTML.join(""));

		// List Answers
		var answersHTML = [];
		for(i = 0; i < answers.length; i++) answersHTML.push('<input type="radio" name="answer" class="answer" value="' + answers[i] + '"> ' + answers[i] + '<br />');
		$('.answers').html(answersHTML.join(""));
	},
	checkAnswer: function (quiz, data) {
		if(data == quiz.correctAnswer) { // If answer is correct
			quiz.amountCorrect++;
			$('.status .correct').html('<font color="green">Correct! </font>');
		} else $('.status .correct').html('<font color="red">Incorrect (It was ' + quiz.correctAnswer + ')</font>');

			quiz.questionPosition++; // Move to next question
			quiz.percent = quiz.amountCorrect/ quiz.questionPosition; // update percent correct
			quiz.updateStatus();

			if(quiz.questionPosition < quiz.amountOfQuestions) quiz.question();
			else quiz.finish();
	},
	finish: function (quiz) {
		$('.quiz').hide();
		$('.question, .status').hide(); // Hide question and status
		$('.difficulty, .results').show(); // show results

		$('.results').text('Congrats You Got: ' + Math.round(quiz.percent * 100) + "% Would you like to try again?"); // Results text
	}
});

$(document).ready(function () {
	$('.answers').on('click', '.answer', function () {
		EASY.checkAnswer($(this).val());
	});
});