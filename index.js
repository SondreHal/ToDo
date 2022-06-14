const input = document.querySelector("#input");
const additem = document.querySelector("#additem");
const sortitems = document.querySelector("#sortitems");
const clearitems = document.querySelector("#clearitems");

additem.addEventListener("click", () => {
   addStuff();
   input.focus();
});

document.addEventListener("keyup", (e) => {
   if (e.code !== "Enter") return;
   addStuff();
});

sortitems.addEventListener("click", () => {
   console.log("click");
   sortList("lists");
});

clearitems.addEventListener("click", () => {
   document.querySelectorAll("li").forEach((li) => li.remove());
});

function sortList(ul) {
   ul = document.querySelector("ul");

   Array.from(ul.getElementsByTagName("LI"))
      .sort((a, b) => a.textContent.localeCompare(b.textContent))
      .forEach((li) => ul.appendChild(li));
}

function addStuff() {
   if (input.value.match(/^ *$/)) return;
   const li = document.createElement("li");
   const p = document.createElement("p");
   const button = document.createElement("button");

   document.querySelector("ul").append(li);
   li.append(p, button);

   p.textContent = input.value;
   button.textContent = "Yeet";
   button.classList.add("removebtn");

   input.value = "";

   button.addEventListener("click", () => {
      li.remove();
   });
}
