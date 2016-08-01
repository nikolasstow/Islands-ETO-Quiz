var ingredients = [], difficulty;

for(i = 0; ingredientsArray.length > i; i++) ingredients[ingredientsArray[i][0]] = ingredientsArray[i][1];

var Quiz = function (array) {
    this.title = array.title; // Question Title
    this.amountOfQuestions = array.amountOfQuestions; // Amount of Questions

    this.questionPosition = 0; // Current question number
    this.amountCorrect = 0; // Amount of correct answers
    this.percent = 1; // Percentage of correct answers
    this.correctAnswer = "";

    this.questions = array.questions;
    this.question = function () { 
        this.updateStatus();
        $('.status .correct').text("");
        $('.next').hide();
        array.question(this); 
         $("html, body").animate({ scrollTop: $(document).height() }, "slow"); // Scroll to bottom of page
    }
    this.finish = function () { array.finish(this); }
    this.checkAnswer = function (data) { array.checkAnswer(this, data); }

    this.start = function () {
        if(array.before) array.before(); // Code to run before starting quiz

        $('.question .title').text(this.title); // Insert title into page
        $('.question').show(); // Show question

        if(this.question) this.question(this); // Start first question
    }

    this.updateStatus = function () {
        $('.status .questions').text(this.questionPosition + "/" + this.amountOfQuestions + " ");
    }
    this.updatePercent = function () {
        $('.status .percent').text("[" + Math.round(this.percent * 100) + "%]");
    }

}

$(document).ready(function () {
    $(".quiz").hide();
    $('.difficulty').on('click','button', function () {
        difficulty = $(this).val();
        $('.difficulty, .next').hide();
        EASY.start();
    });
});

function listIngredients(data) {
	var html = [];
	html.push('<ul>');
	for(i = 0; i < data.length; i++) html.push('<li>' + ingredients[data[i][0]] + (data[i][1] ? " (If Ordered)</li>" : "</li>"))
	html.push('</ul>');
	return html.join("");
}

function inArray(array, item) {
    var inArray = false;
    for(i = 0; i < array.length; i++) {
        if(array[i] == item) inArray = true;
    }
    return inArray;
}

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