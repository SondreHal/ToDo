const input = document.querySelector("#input");
const addItem = document.querySelector(".additem");
const sortItemsAZ = document.querySelector(".sortitems");
const clearItems = document.querySelector(".clearitems");

input.focus();

//If user hits Enter key, add input text as list item
document.addEventListener("keyup", (e) => {
	if (e.code !== "Enter") return;
	addStuff();
	input.focus();
});

//If user clicks "Add Items", add input text as list item
addItem.addEventListener("click", () => {
	addStuff();
	input.focus();
});

//If user clicks "Sort Items", sort list items
sortItemsAZ.addEventListener("click", () => {
	sortListAZ();
	input.focus();
});

//If user clicks "Clear Items", clear list items
clearItems.addEventListener("click", () => {
	document.querySelectorAll("li").forEach((li) => li.remove());
	input.focus();
	document.querySelector(".sortitems").replaceWith(sortItemsAZ);
});

//Function for sorting items A-Z
function sortListAZ() {
	const sortItemsZA = document.createElement("button");
	const ul = document.querySelector("ul");

	//Grabs li array, comparing the values and sorting A-Z
	Array.from(ul.querySelectorAll("li"))
		.sort((a, b) => a.textContent.localeCompare(b.textContent))
		.forEach((li) => ul.append(li));

	//Replaces sort button(A-Z) with sort button(Z-A)
	sortItemsAZ.replaceWith(sortItemsZA);

	//Gives new button a name and a class
	sortItemsZA.textContent = "SORT ITEMS Z-A";
	sortItemsZA.classList.add("sortitems");

	//Sorts items Z-A when clicking new button
	sortItemsZA.addEventListener("click", () => {
		sortItemsZA.replaceWith(sortItemsAZ);
		input.focus();

		//Grabs li array, comparing the values and sorting Z-A
		Array.from(ul.querySelectorAll("li"))
			.sort((a, b) => b.textContent.localeCompare(a.textContent))
			.forEach((li) => ul.append(li));
	});
}

//Function for adding input text as list items
function addStuff() {
	//If there is whitespace, user cannot make list item
	if (input.value.match(/^ *$/)) return;
	document.querySelector(".sortitems").replaceWith(sortItemsAZ);

	const li = document.createElement("li");
	const p = document.createElement("p");
	const yeetButton = document.createElement("button");
	const editButton = document.createElement("button");
	const confirmButton = document.createElement("button");
	const editText = document.createElement("input");
	const doneButton = document.createElement("button");

	//Makes a p, and two buttons(edit and delete) in the ul element
	document.querySelector("ul").append(li);
	li.append(
		//doneButton,
		p,
		editButton,
		yeetButton
	);

	//Makes it so p is value of input text
	p.textContent = input.value;

	//Gives new buttons a name and a class
	// doneButton.textContent = "DONE";
	// doneButton.classList.add("donebtn");

	yeetButton.textContent = "REMOVE";
	yeetButton.classList.add("removebtn");

	editButton.textContent = "EDIT";
	editButton.classList.add("editbtn");

	confirmButton.textContent = "CONFIRM";
	confirmButton.classList.add("editbtn");

	editText.classList.add("inputEdit");

	//Resets input field when making a list item
	input.value = "";

	//Delete button removes the li element
	yeetButton.addEventListener("click", () => {
		li.remove();
	});

	//Edit button changes p to input and "Edit" button to "Confirm" button,
	editButton.addEventListener("click", () => {
		p.replaceWith(editText);
		editButton.replaceWith(confirmButton);

		//adds input with previous list item value as textContent
		editText.value = p.textContent;
		editText.focus();

		//If "Confirm" is clicked, run function
		confirmButton.addEventListener("click", () => {
			edit();
		});

		//If user hits Enter key, run function
		document.addEventListener("keydown", (e) => {
			if (e.code !== "Enter") return;
			edit();
		});

		//Function for confirming edit, replaces input with p, also removes buttons and adds new ones
		function edit() {
			//If there is whitespace, user cannot confirm edit
			if (editText.value.match(/^ *$/)) return;
			editText.remove();
			confirmButton.remove();
			yeetButton.remove();
			li.append(p, editButton, yeetButton);
			p.textContent = editText.value;
		}
	});
	const allToDos = document.getElementsByTagName(p);

	// localStorage.setItem("todos"), JSON.stringify(allToDos);
	console.log(p);
}
