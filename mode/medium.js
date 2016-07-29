var title = "Choose all the ingredients that belong in the menu item";

function mediumMode() {
	$('.question .title').text(title);
	$('.question').show();
	newQuestionMedium();
}

function newQuestionMedium() {
	var item = randomItem();
	$('.question .info').html("<h2 style=\"text-align:center\">" + item.itemName + "</h2>")

	var ingredients = item.ingredients;
	while(ingredients.length < 20) {
		var rItem = randomItem();
		for(i = 0; i < rItem.ingredients.length; i++) {
			var ingredient = rItem.ingredients[i];
			if(!inArray(ingredients,ingredient)) {
				ingredients.push(ingredient);
			}
		}
	}
	
	ingredients = shuffle(ingredients).slice(0,10);
	$('.question .answers').html(checkboxList(ingredients));
}

function checkboxList(data) {
	var html = [];
	html.push('<ul>');
	for(i = 0; i < data.length; i++) html.push('<li>' + ingredients[data[i][0]] + (data[i][1] ? " (If Ordered)</li>" : "</li>"))
	html.push('</ul>');
	return html.join("");
}