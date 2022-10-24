//DOM Elements
const gridContainer = document.querySelector(".gridContainer");
const sizeText = document.querySelector(".sizeText");
const sizeSlider = document.querySelector(".sizeSlider");
const colourPicker = document.querySelector(".colourPicker");
const rainbowBtn = document.querySelector(".rainbowBtn");
const clearBtn = document.querySelector(".clearBtn");
const resetBtn = document.querySelector(".resetBtn");

//Constants
const DEFAULT_SIZE = 16;
const BACKGROUND_COLOUR = "#2e2e2e80";
const DEFAULT_COLOUR = "#000000";
const ERASE_COLOUR = "#ffffff";

//Global Variables
let colour = DEFAULT_COLOUR;
let mouseDown = false;
let rainbowMode = false;
let rainbowModeArray = []
let rainbowArrIndex = 0;

//Start
loadDocument();

function loadDocument() 
{
  setSizePicker(DEFAULT_SIZE);
  setRainbowModeArray();

  gridContainer.addEventListener("mouseover", (e) => { draw(e, colour); });
  sizeSlider.addEventListener("input", (e) => { setGridSize(); });
  colourPicker.addEventListener("input", (e) => { setCurrentColour(colourPicker.value, false) });
  rainbowBtn.addEventListener("click", (e) => { 
    if(!rainbowMode) 
    {
      rainbowMode = true; 
      rainbowArrIndex = 0;
    }else{
      rainbowMode = false;
    }    
    
     toggleButton(rainbowBtn, rainbowMode); 
  });
  clearBtn.addEventListener("click", (e) => { clearSketch(); });
  resetBtn.addEventListener("click", (e) => { resetPage(); });
  
  document.body.onmousedown = () => (mouseDown = true);
  document.body.onmouseup = () => (mouseDown = false);
  document.body.ondragstart = () => { return false; };
  document.body.ondrop = () => { return false; };

  document.body.onload = buildGrid(DEFAULT_SIZE, false);
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
      setBoxStyle(box, boxSize);
      row.appendChild(box);
    }

    gridContainer.appendChild(row);
  }
}

function draw(e, colourToUse) 
{
  if (!mouseDown) return;

  let targetBox = e.target.closest(".box");
  if (!targetBox) return;

  if (rainbowMode) 
  { 
    setBoxColour(targetBox, setRainbowColour());
  } else { 
    setBoxColour(targetBox, colourToUse); 
  }
}

function clearSketch() 
{
  const allBoxes = document.querySelectorAll(".box");

  allBoxes.forEach(box => setBoxColour(box, ERASE_COLOUR));
}

function resetPage()
{
  rainbowMode = false;
  toggleButton(rainbowBtn, rainbowMode);
  setSizePicker(DEFAULT_SIZE);
  buildGrid(DEFAULT_SIZE, true);
  colourPicker.value = DEFAULT_COLOUR;
  setCurrentColour(DEFAULT_COLOUR, false)
}

function toggleButton(button, toggleOn)
{
  if(toggleOn)
  {
    button.style.color = DEFAULT_COLOUR;
    button.style.backgroundColor = ERASE_COLOUR;
  }else{
    button.style.color = ERASE_COLOUR;
    button.style.backgroundColor = BACKGROUND_COLOUR;
  }
}



function setCurrentColour(newColour, isRainbowMode) {
  toggleButton(rainbowBtn, isRainbowMode);
  
  colour = newColour;
  rainbowMode = isRainbowMode;
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

function setBoxStyle(box, boxSize) 
{
  box.className = "box";
  box.style.display = "inline-block";
  box.style.width = boxSize;
  box.style.height = boxSize;
}

function setRainbowColour() 
{
  let red = rainbowModeArray[rainbowArrIndex][0];
  let green = rainbowModeArray[rainbowArrIndex][1];
  let blue = rainbowModeArray[rainbowArrIndex][2];

  if (rainbowArrIndex >= 29) {
    rainbowArrIndex = 0;
  }

  rainbowArrIndex++;

  return `rgb(${red}, ${green}, ${blue})`;
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
