var Quiz = function (array) {
    this.title = array.title; // Question Title
    this.amountOfQuestions = array.amountOfQuestions; // Amount of Questions

    this.questionPosition = 0; // Current question number
    this.amountCorrect = 0; // Amount of correct answers
    this.percent = 1; // Percentage of correct answers

    this.questions = array.questions;

    this.currentQuestion = this.questions[this.questionPosition];

    this.start = function () {
    	if(array.before) array.before(); // Code to run before starting quiz

    	$('.question .title').text(this.title); // Insert title into page
		$('.question').show(); // Show question

		if(array.question) array.question(this); // Start first question
		this.updateStatus();
    }

    this.updateStatus = function () {
    	$('.status .questions').text(this.questionPosition + "/" + this.amountOfQuestions + " ");
    }

}

var easyAnswer = "";
var sortedMenu = [];

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

var EASY = new Quiz({
	title: "Match the menu item to the ingredients",
	amountOfQuestions: 15,
	questions: shuffle(menu).slice(0,this.amountOfQuestions),
	before: function () {
		// Sort Menu into categories
		for(i = 0; i < menu.length; i++) {
			var curItem = menu[i];
			if(!sortedMenu[curItem.cat]) sortedMenu[curItem.cat] = [];
			sortedMenu[curItem.cat].push(curItem.itemName);
		}
	},
	question: function (quiz) {
		var item = quiz.currentQuestion; // Current question
		var answers = getAnswers(item , 5); // Get answers

		easyAnswer = item.itemName;

		$('.info').html(listIngredients(item.ingredients));
		$('.answers').html(listAnswers(answers));
	},
	checkAnswer: function (data) {
		checkAnswer(data);
	}
});

$(document).ready(function () {
	$('.answers').on('click', '.answer', function () {
		checkAnswer($(this).val());
	});
});

function easyMode() {
	EASY.start();
}

function newQuestion() {

	var item = EASY.questions[EASY.questionPosition];
	var answers = getAnswers(item , 5);

	easyAnswer = item.itemName;

	$('.info').html(listIngredients(item.ingredients));
	$('.answers').html(listAnswers(answers));
}

function getAnswers (realItem, maxNum) {
	var answers = sortedMenu[realItem.cat]; // Get all items in current category
	var curLoc = answers.indexOf(realItem.itemName); // Get location of correct item in array
	answers.splice(curLoc,1); // Remove current item before shuffling
	answers = shuffle(answers).slice(0, (maxNum - 1)); // Shuffling items, and selecting one less than the max
	answers.push(realItem.itemName); // Re-adding current item
	return shuffle(answers); // shuffling and returning answers
}

function inArray(array, item) {
	var inArray = false;
	for(i = 0; i < array.length; i++) {
		if(array[i] == item) inArray = true;
	}
	return inArray;
}

function listAnswers (data) {
	var html = [];
	for(i = 0; i < data.length; i++) html.push('<input type="radio" name="answer" class="answer" value="' + data[i] + '"> ' + data[i] + '<br />');
	return html.join("");
}

function checkAnswer(data) {
	if(data == easyAnswer) {
		EASY.amountCorrect++;
		$('.status .correct').html('<font color="green">Correct! </font>');
	} else $('.status .correct').html('<font color="red">Incorrect (It was ' + easyAnswer + ')</font>');

		EASY.questionPosition++;
		EASY.percent = EASY.amountCorrect/ EASY.questionPosition;
		$('.status .percent').text("[" + Math.round(EASY.percent * 100) + "%]");

		if(EASY.questionPosition < EASY.amountOfQuestions) newQuestion();
		else finishQuiz();
}

function finishQuiz () {
	$('.question, .status').hide();
	$('.difficulty, .results').show();

	$('.results').text('Congrats You Got: ' + Math.round(EASY.percent * 100) + "% Would you like to try again?");
}