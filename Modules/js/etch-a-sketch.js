const gridContainer = document.querySelector(".gridContainer");
const colourPicker = document.querySelector(".colourPicker");
const sizeSlider = document.querySelector(".sizeSlider");
const sizeText = document.querySelector(".sizeText");
const clearBtn = document.querySelector(".clearBtn");

gridContainer.addEventListener("mouseover", (e) => { changeBoxColour(e, colour); });
colourPicker.addEventListener("input", (e) => { colour = colourPicker.value; });
sizeText.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
sizeSlider.addEventListener("input", (e) => { changeGridSize(sizeSlider.value); });
clearBtn.addEventListener("click", (e) => { clearSketch(); });

const DEFAULT_GRID = 48;
const DEFAULT_COLOUR = "black";

let gridSize = DEFAULT_GRID;
let boxSize = `${600 / gridSize}px`;
let colour = DEFAULT_COLOUR;
let mouseDown = false;

loadDocument();

function loadDocument() {
  document.body.onmousedown = () => (mouseDown = true);
  document.body.onmouseup = () => (mouseDown = false);
  document.body.onload = buildGrid(gridSize);
  document.body.ondragstart = () => { return false; };
  document.body.ondrop = () => { return false; };
}

function buildGrid(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    let row = document.createElement("div");
    row.className = "row";
    row.style.height = boxSize;

    for (let j = 0; j < gridSize; j++) {
      let box = document.createElement("div");
      box.id = `${i}${j}`;
      setBoxStyle(box);
      row.appendChild(box);
    }

    gridContainer.appendChild(row);
  }
}

function setBoxStyle(box) {
  box.className = "box";
  box.style.display = "inline-block";
  box.style.width = boxSize;
  box.style.height = boxSize;
}

//Look into why it's missing boxes sometimes
function changeBoxColour(e, colour) {
  if (!mouseDown) return;

  let td = e.target.closest(".box");
  if (!td) return;

  //let cellId = td.getAttribute('id')
  td.style.backgroundColor = colour;
}

function changeGridSize(gridSize)
{
  clearSketch();
  gridSize = sizeSlider.value;
  sizeText.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
}

function clearSketch() {}
