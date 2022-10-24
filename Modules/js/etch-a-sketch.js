const gridContainer = document.querySelector(".gridContainer");
const sizeText = document.querySelector(".sizeText");
const sizeSlider = document.querySelector(".sizeSlider");
const colourPicker = document.querySelector(".colourPicker");
const rainbowBtn = document.querySelector(".rainbowBtn");
const clearBtn = document.querySelector(".clearBtn");
const resetBtn = document.querySelector(".resetBtn");

const DEFAULT_SIZE = 16;
const DEFAULT_COLOUR = "#000000";
const DEFAULT_ERASE = "#ffffff";

let colour = DEFAULT_COLOUR;
let mouseDown = false;
let rainbowMode = false;
let rainbowModeArray = []
let rainbowArrIndex = 0;

loadDocument();

function loadDocument() 
{
  setSizePicker(DEFAULT_SIZE);

  gridContainer.addEventListener("mouseover", (e) => { draw(e, colour); });
  sizeSlider.addEventListener("input", (e) => { setGridSize(); });
  colourPicker.addEventListener("input", (e) => { setColour(colourPicker.value, false) });
  rainbowBtn.addEventListener("click", (e) => { rainbowMode = true; rainbowArrIndex = 0; });
  clearBtn.addEventListener("click", (e) => { clearSketch(); });
  resetBtn.addEventListener("click", (e) => { resetPage(); });
  
  document.body.onmousedown = () => (mouseDown = true);
  document.body.onmouseup = () => (mouseDown = false);
  document.body.ondragstart = () => { return false; };
  document.body.ondrop = () => { return false; };

  document.body.onload = buildGrid(DEFAULT_SIZE, false);
  setRainbowModeArray();
}

function buildGrid(gridSize, rebuild) 
{
  if(rebuild){ gridContainer.textContent = ""; }

  let boxSize = `${600 / gridSize}px`;
  for (let i = 0; i < gridSize; i++) {
    let row = document.createElement("div");
    row.className = "row";
    row.style.height = boxSize;

    for (let j = 0; j < gridSize; j++) {
      let box = document.createElement("div");
      //box.id = `${i}${j}`;
      setBoxStyle(box, boxSize);
      row.appendChild(box);
    }

    gridContainer.appendChild(row);
  }
}

//Look into why it's missing boxes sometimes
function draw(e, colourToUse) 
{
  if (!mouseDown) return;

  let td = e.target.closest(".box");
  if (!td) return;

  if (rainbowMode) 
  { 
    setBoxColour(td, getRainbowColour());
  } else { 
    setBoxColour(td, colourToUse); 
  }
}

function getRainbowColour()
{
  let red = rainbowModeArray[rainbowArrIndex][0];
  let green = rainbowModeArray[rainbowArrIndex][1];
  let blue = rainbowModeArray[rainbowArrIndex][2];

  if(rainbowArrIndex >= 29) { rainbowArrIndex = 0;} 

  rainbowArrIndex++;

  return `rgb(${red}, ${green}, ${blue})`;
}

function clearSketch() 
{
  const allBoxes = document.querySelectorAll(".box");

  allBoxes.forEach(box => setBoxColour(box, DEFAULT_ERASE));
}

function resetPage()
{
  setSizePicker(DEFAULT_SIZE);
  buildGrid(DEFAULT_SIZE, true);
  colourPicker.value = DEFAULT_COLOUR;
  setColour(DEFAULT_COLOUR, false)
}



function setBoxColour(box, colourToUse) 
{
  box.style.backgroundColor = colourToUse;
}

function setGridSize() 
{
  clearSketch();
  buildGrid(sizeSlider.value, true);
  sizeText.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
}

function setSizePicker(size) 
{
  sizeSlider.value = size;
  sizeText.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
}

function setColour(newColour, isRainbowMode) 
{
  colour = newColour;
  rainbowMode = isRainbowMode;
}

function setBoxStyle(box, boxSize) 
{
  box.className = "box";
  box.style.display = "inline-block";
  box.style.width = boxSize;
  box.style.height = boxSize;
}

function setRainbowModeArray()
{
  rainbowModeArray = [
    [255, 0, 0],
    [225, 0, 25],
    [200, 0, 50],
    [175, 0, 75],
    [150, 0, 100],
    [125, 0, 125],
    [100, 0, 150],
    [75, 0, 175],
    [50, 0, 200],
    [25, 0, 225],
    [0, 0, 255],
    [0, 25, 225],
    [0, 50, 200],
    [0, 75, 175],
    [0, 100, 150],
    [0, 125, 125],
    [0, 150, 100],
    [0, 175, 75],
    [0, 200, 50],
    [0, 225, 25],
    [0, 255, 0],
    [25, 225, 0],
    [50, 200, 0],
    [75, 175, 0],
    [100, 150, 0],
    [125, 125, 0],
    [150, 100, 0],
    [175, 75, 0],
    [200, 50, 0],
    [225, 25, 0]
  ];
}

//set selected button to change appearance
//Edit footer to add link to github page
