var ingredients = [], difficulty;

for(i = 0; ingredientsArray.length > i; i++) ingredients[ingredientsArray[i][0]] = ingredientsArray[i][1];

$('.difficulty').on('click','button', function () {
	difficulty = $(this).val();
	$('.difficulty').hide();
	switch(difficulty) {
        case 'easy':
            easyMode();
            break;
        case 'medium':
            mediumMode();
            break;
    }
});

function randomItem() { return menu[Math.round(Math.random() * menu.length)]; }

function listIngredients(data) {
	var html = [];
	html.push('<ul>');
	for(i = 0; i < data.length; i++) html.push('<li>' + ingredients[data[i][0]] + (data[i][1] ? " (If Ordered)</li>" : "</li>"))
	html.push('</ul>');
	return html.join("");
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

function inArray(array, item) {
    var inArray = false;
    for(i = 0; i < array.length; i++) {
        if(array[i] == item) inArray = true;
    }
    return inArray;
}