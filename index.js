const input = document.querySelector("#input");
const additem = document.querySelector("#additem");
const sortitems = document.querySelector("#sortitems");
const clearitems = document.querySelector("#clearitems");

//If user hits Enter key, add input text as list item
document.addEventListener("keyup", (e) => {
	if (e.code !== "Enter") return;
	addStuff();
});

//If user clicks "Add Items", add input text as list item
additem.addEventListener("click", () => {
	addStuff();
	input.focus();
});

//If user clicks "Sort Items", sort list items
sortitems.addEventListener("click", () => {
	sortList("lists");
});

//If user clicks "Clear Items", clear list items
clearitems.addEventListener("click", () => {
	document.querySelectorAll("li").forEach((li) => li.remove());
});

//Function for sorting list items
function sortList(ul) {
	ul = document.querySelector("ul");

	Array.from(ul.getElementsByTagName("LI"))
		.sort((a, b) => a.textContent.localeCompare(b.textContent))
		.forEach((li) => ul.appendChild(li));
}

//Function for adding input text as list items
function addStuff() {
	//If there is whitespace, user cannot make list item
	if (input.value.match(/^ *$/)) return;

	const li = document.createElement("li");
	const p = document.createElement("p");
	const yeetButton = document.createElement("button");
	const editButton = document.createElement("button");
	const confirmButton = document.createElement("button");
	const editText = document.createElement("input");

	//Makes a p, and two buttons(edit and delete) in the ul element
	document.querySelector("ul").append(li);
	li.append(p, editButton, yeetButton);

	//Makes it so p is value of input text
	p.textContent = input.value;

	//Names the buttons being made and gives them a class
	yeetButton.textContent = "Yeet";
	yeetButton.classList.add("removebtn");
	editButton.textContent = "Edit";
	editButton.classList.add("editbtn");
	confirmButton.textContent = "Confirm";
	confirmButton.classList.add("editbtn");
	editText.classList.add("inputEdit");

	//Resets input field when making a list item
	input.value = "";

	//Delete button removes the li element
	yeetButton.addEventListener("click", () => {
		li.remove();
	});

	//Edit button removes p and both buttons,
	//adds input with previous list item value as textContent, adds two new buttons
	editButton.addEventListener("click", () => {
		p.remove();
		editButton.remove();
		yeetButton.remove();

		li.append(editText, confirmButton, yeetButton);

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
}
