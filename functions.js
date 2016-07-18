var ingredients = [], difficulty;

for(i = 0; ingredientsArray.length > i; i++) ingredients[ingredientsArray[i][0]] = ingredientsArray[i][1];

$('.difficulty').on('click','button', function () {
	difficulty = $(this).val();
	$('.difficulty').hide();
	easyMode();
});

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