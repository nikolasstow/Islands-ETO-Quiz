var title = "Match the menu item to the ingredients";
var easyAnswer = "";
var amountOfQuestions = 5;
var qNum = 0;
var correctAnswers = 0;
var percent = 1;

$(document).ready(function () {
	$('.answers').on('click', '.answer', function () {
		checkAnswer($(this).val());
	});
});

function easyMode() {
	$('.question .title').text(title);
	$('.question').show();
	newQuestion();
}

function newQuestion() {
	$('.status .questions').text((qNum + 1) + "/" + amountOfQuestions + " ");

	var item = randomItem();
	var answers = falseAnswers(item , 5);

	easyAnswer = item.itemName;

	$('.info').html(listIngredients(item.ingredients));
	$('.answers').html(listAnswers(answers));
}

function randomItem() { return menu[Math.round(Math.random() * menu.length)]; }

function falseAnswers (realItem = false, num) {
	var item = [realItem.itemName];
		for(i = 0; i < num; i++) {	
			var itemFound = false;
			for(e = 0; !itemFound && e < 300; e++) {
				var tempItem = menu[Math.round(Math.random() * menu.length)];
				if(tempItem != null && tempItem.cat == realItem.cat // If item is in the same category
					&& !inArray(item,tempItem.itemName)) { // If the item hasn't already been choose
						itemFound = true; // Found an item
						item.push(tempItem.itemName); // Add to array
				}
			}
		}
	return shuffle(item);
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

		console.log('ran');
		if(qNum < amountOfQuestions) newQuestion();
		else finishQuiz();
}

function finishQuiz () {
	$('.question, .status').hide();
	$('.difficulty, .results').show();

	$('.results').text('Congrats You Got: ' + Math.round(percent * 100) + "% Would you like to try again?");
}