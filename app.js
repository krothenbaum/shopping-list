var state = {
	items: []
};

function addItem (state, item) {
	state.items.push({
		name: item,
		checked: false
	});
}

function findItemIndex(state, item) {
	for(var i = 0; i < state.items.length; i++) {
		if (state.items[i].name === item){
			return i;
		}
	}
}

function updateStatus(state, element) {
	// get item name
	var itemName = element.closest('li').children('.shopping-item').text();
	//find item in state.items
	var itemIndex = findItemIndex(state, itemName);
	// flip checked prop
	state.items[itemIndex].checked = !state.items[itemIndex].checked;
}

function removeItem(state, element) {
	//find item name
	var itemName = element.closest('li').children('.shopping-item').text();
	//find item in state.items
	var itemIndex = findItemIndex(state, itemName);
	// remove item from state.items
	state.items.splice(itemIndex, 1);
}

function renderCheck(element) {
	element.closest('li').children('.shopping-item').toggleClass('shopping-item__checked');
}

function renderList (state, element, item, action) {
	if (action === 'add') {
		var itemIndex = findItemIndex(state, item);
		var itemsHTML = '<li><span class="shopping-item">' + state.items[itemIndex].name + '</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>';
		element.append(itemsHTML);
	} else if (action === 'remove') {
		element.closest('li').remove();
	}
;}

$('document').ready(function () {
	$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    var itemName = $('#shopping-list-entry').val();
    addItem(state, itemName);
    renderList(state, $('.shopping-list'), itemName, 'add');
	});

	$('.shopping-list').on('click', '.shopping-item-toggle' ,function() {
		updateStatus(state, $(this));
		renderCheck($(this));
	});

	$('.shopping-list').on('click', '.shopping-item-delete', function() {
		removeItem(state, $(this));
		renderList(state, $(this), null, 'remove');
	});
})