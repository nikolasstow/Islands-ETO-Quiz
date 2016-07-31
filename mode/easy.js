var title = "Match the menu item to the ingredients";
var easyAnswer = "";
var amountOfQuestions = 15;
var qNum = 0;
var correctAnswers = 0;
var percent = 1;
var questions;
var sortedMenu = [];

$(document).ready(function () {
	$('.answers').on('click', '.answer', function () {
		checkAnswer($(this).val());
	});
});

function easyMode() {
	sortMenu();
	questions = shuffle(menu).slice(0, amountOfQuestions); // get random questions

	$('.question .title').text(title);
	$('.question').show();
	newQuestion();
}

function sortMenu() {
	for(i = 0; i < menu.length; i++) {
		var curItem = menu[i];
		if(!sortedMenu[curItem.cat]) sortedMenu[curItem.cat] = [];
		sortedMenu[curItem.cat].push(curItem.itemName);
	}
}

function newQuestion() {
	$('.status .questions').text(qNum + "/" + amountOfQuestions + " ");

	var item = questions[qNum];
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
		correctAnswers++;
		$('.status .correct').html('<font color="green">Correct! </font>');
	} else $('.status .correct').html('<font color="red">Incorrect (It was ' + easyAnswer + ')</font>');

		qNum++;
		percent = correctAnswers / qNum;
		$('.status .percent').text("[" + Math.round(percent * 100) + "%]");

		if(qNum < amountOfQuestions) newQuestion();
		else finishQuiz();
}

function finishQuiz () {
	$('.question, .status').hide();
	$('.difficulty, .results').show();

	$('.results').text('Congrats You Got: ' + Math.round(percent * 100) + "% Would you like to try again?");
}