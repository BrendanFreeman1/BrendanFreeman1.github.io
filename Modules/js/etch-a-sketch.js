const gridContainer = document.querySelector(".gridContainer");
let gridSize = 32;
let boxSize = `${600/gridSize}px`; 
let colour = "black";

let mouseDown = false;
document.body.onload = buildGrid(gridSize);
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

gridContainer.addEventListener("mouseover", (e) => { changeBoxColour(e, colour); });

function buildGrid(gridSize) 
{
  for(let i=0; i<gridSize; i++)
  {
    let row = document.createElement("div");
    row.className = "row";
    row.style.height = boxSize;

    for(let j=0; j<gridSize; j++)
    {
          let box = document.createElement("div");
          box.id = `${i}${j}`;
          setBoxStyle(box)
          row.appendChild(box);
    }

    gridContainer.appendChild(row);
  }
}

function setBoxStyle(box)
{
  box.className = "box";
  box.style.display = "inline-block";
  box.style.width = boxSize;
  box.style.height = boxSize;
}

function changeBoxColour(e, colour) {
  if (e.type === "mouseover" && !mouseDown) return;
  // figure out which table cell it occurs within
  let td = e.target.closest(".box");
  if (!td) return true;

  //let cellId = td.getAttribute('id')
  td.style.backgroundColor = colour;
}

